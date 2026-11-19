import { Package } from '../models/Package.js';

export const findAll = async (filter, skip, limit) => {
  return await Package.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 });
};

export const countAll = async (filter) => {
  return await Package.countDocuments(filter);
};

export const findById = async (id) => {
  return await Package.findById(id);
};

export const create = async (data) => {
  return await Package.create(data);
};

export const update = async (id, data) => {
  return await Package.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

export const remove = async (id) => {
  return await Package.findByIdAndDelete(id);
};
