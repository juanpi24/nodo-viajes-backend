import { MercadoPagoConfig, Preference, Payment } from 'mercadopago';
import { env } from '../config/env.js';

// Inicializamos el cliente de MP con el Access Token de prueba
const client = new MercadoPagoConfig({ accessToken: env.mpAccessToken });

export const createPreference = async (order, user) => {
  const preference = new Preference(client);

  const body = {
    items: order.items.map(item => ({
      id: item.package.toString(),
      title: item.titulo || 'Paquete Turístico',
      quantity: item.cantidad,
      unit_price: item.precioUnitario,
      currency_id: 'ARS'
    })),
    payer: {
      name: user.nombre,
      email: user.email,
    },
    back_urls: {
      success: `${env.frontendUrl}/pago/exitoso`,
      failure: `${env.frontendUrl}/pago/fallido`,
      pending: `${env.frontendUrl}/pago/pendiente`
    },
    //auto_return: 'approved',
    external_reference: order._id.toString(), // Guardamos el ID de la orden acÃ¡ para el webhook
    notification_url: `${env.backendUrl}/api/orders/webhook` // Opcional, para ngrok
  };

  const result = await preference.create({ body });
  return result;
};

export const getPaymentStatus = async (paymentId) => {
  const payment = new Payment(client);
  const result = await payment.get({ id: paymentId });
  return result; // Devuelve objeto con status: 'approved', 'rejected', etc.
};
