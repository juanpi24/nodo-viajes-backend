import { Order } from '../models/Order.js';

export const create = async (data) => {
  return await Order.create(data);
};

export const findById = async (id) => {
  return await Order.findById(id).populate('items.package').populate('user', 'nombre email');
};

export const findByUser = async (userId) => {
  return await Order.find({ user: userId }).populate('items.package').sort({ createdAt: -1 });
};

export const findAllPaginated = async (skip, limit) => {
  const data = await Order.find().populate('items.package').populate('user', 'nombre email').skip(skip).limit(limit).sort({ createdAt: -1 });
  const total = await Order.countDocuments();
  return { data, total };
};

export const updateStatus = async (id, status, paymentId = null) => {
  return await Order.findByIdAndUpdate(
    id,
    { estado: status, ...(paymentId && { mpPaymentId: paymentId }) },
    { new: true }
  ).populate('items.package');
};

export const updatePreferenceId = async (id, preferenceId) => {
  return await Order.findByIdAndUpdate(id, { mpPreferenceId: preferenceId }, { new: true });
};
