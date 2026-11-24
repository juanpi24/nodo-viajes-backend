import * as orderRepository from '../repositories/orderRepository.js';
import { getPackageById } from './packageService.js';
import { createPreference, getPaymentStatus } from '../utils/mpClient.js';

export const createOrder = async (userId, user, items) => {
  let total = 0;
  const orderItems = [];

  // 1. Validar paquetes y calcular total real (SEGURIDAD)
  for (const item of items) {
    const pkg = await getPackageById(item.package);
    
    if (pkg.stock < item.cantidad) {
      const error = new Error(`Stock insuficiente para el paquete: ${pkg.titulo}`);
      error.status = 400;
      throw error;
    }

    // Descontar el STOCK Actual del paquete en la DB (para evitar overselling)
    const PackageModel = (await import('../models/Package.js')).Package;
    await PackageModel.findByIdAndUpdate(pkg._id, { $inc: { stock: -item.cantidad } });

    orderItems.push({
      package: pkg._id,
      titulo: pkg.titulo,
      cantidad: item.cantidad,
      precioUnitario: pkg.precio
    });

    total += pkg.precio * item.cantidad;
  }

  // 2. Crear la orden en la DB (pending)
   const order = await orderRepository.create({
    user: userId,
    items: orderItems,
    total
  });

  // 3. Crear preferencia en MP
  const preference = await createPreference(order, user);
  
  // 4. Guardar el ID de preferencia en la orden
  await orderRepository.updatePreferenceId(order._id, preference.id);

  return {
    orderId: order._id,
    init_point: preference.init_point,
    sandbox_init_point: preference.sandbox_init_point
  };
};

export const verifyPayment = async (orderId) => {
  const order = await orderRepository.findById(orderId);
  if (!order) {
    const error = new Error('Orden no encontrada');
    error.status = 404;
    throw error;
  }

  // Si ya está aprobada, no hacemos nada
  if (order.estado === 'approved') return order;

  // Nota: En un flujo real sin webhook, necesitaríamos el payment_id que MP devuelve en la URL.
  // Como el frontend recibirá el payment_id en la URL de retorno, se lo pasamos a este servicio.
  // Si no tenemos payment_id, no podemos verificar.
  
  // Esta lógica la ajustaremos según cómo devuelva MP los datos, 
  // pero la idea es consultar a MP y actualizar.
  
  return order;
};

export const verifyPaymentById = async (orderId, paymentId) => {
  const order = await orderRepository.findById(orderId);
  if (!order) throw new Error('Orden no encontrada');
  
  const paymentData = await getPaymentStatus(paymentId);
  
  if (paymentData.external_reference !== orderId.toString()) {
    throw new Error('El pago no corresponde a esta orden');
  }

  let newStatus = 'pending';
  if (paymentData.status === 'approved') newStatus = 'approved';
  if (paymentData.status === 'rejected') newStatus = 'rejected';

  return await orderRepository.updateStatus(orderId, newStatus, paymentId);
};

export const cancelOrder = async (orderId, userId) => {
  const order = await orderRepository.findById(orderId);
  if (!order) throw new Error('Orden no encontrada');
  
  if (order.user._id.toString() !== userId.toString()) {
    const error = new Error('No autorizado');
    error.status = 403;
    throw error;
  }

  if (order.estado !== 'pending') {
    const error = new Error('Solo se pueden cancelar órdenes pendientes');
    error.status = 400;
    throw error;
  }

  return await orderRepository.updateStatus(orderId, 'cancelled');
};

export const listUserOrders = async (userId) => {
  return await orderRepository.findByUser(userId);
};

export const listAllOrders = async (query) => {
  const page = Math.max(1, Number(query.page) || 1);
  const limit = Math.max(1, Number(query.limit) || 10);
  const skip = (page - 1) * limit;

  const { data, total } = await orderRepository.findAllPaginated(skip, limit);
  return {
    data,
    meta: { total, page, limit, totalPages: Math.ceil(total / limit) }
  };
};
