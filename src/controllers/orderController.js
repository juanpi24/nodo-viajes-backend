import * as orderService from '../services/orderService.js';

export const create = async (req, res, next) => {
  try {
    const result = await orderService.createOrder(req.user._id, req.user, req.body.items);
    res.status(201).json(result);
  } catch (error) { next(error); }
};

export const verify = async (req, res, next) => {
  try {
    const { payment_id } = req.query; // MP lo manda en la URL de retorno
    if (!payment_id) {
       return res.status(400).json({ message: 'Falta el payment_id en la URL' });
    }
    const order = await orderService.verifyPaymentById(req.params.id, payment_id);
    res.json({ data: order });
  } catch (error) { next(error); }
};

export const cancel = async (req, res, next) => {
  try {
    const order = await orderService.cancelOrder(req.params.id, req.user._id);
    res.json({ data: order, message: 'Orden cancelada' });
  } catch (error) { next(error); }
};

export const listUser = async (req, res, next) => {
  try {
    const orders = await orderService.listUserOrders(req.user._id);
    res.json({ data: orders });
  } catch (error) { next(error); }
};

export const listAdmin = async (req, res, next) => {
  try {
    const orders = await orderService.listAllOrders(req.query);
    res.json(orders);
  } catch (error) { next(error); }
};
