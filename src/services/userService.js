import { User } from '../models/User.js';
import { hashPassword } from '../utils/bcrypt.js';

export const createUser = async ({ nombre, email, password, rol }) => {
  const existe = await User.findOne({ email });
  if (existe) {
    const error = new Error('El email ya está registrado');
    error.status = 409;
    throw error;
  }
  const hashed = await hashPassword(password);
  const user = await User.create({ nombre, email, password: hashed, rol });
  return user;
};

export const listUsers = async () => User.find().select('-password').sort({ createdAt: -1 });

export const getUserById = async (id) => {
  const user = await User.findById(id).select('-password');
  if (!user) {
    const error = new Error('Usuario no encontrado');
    error.status = 404;
    throw error;
  }
  return user;
};

export const updateUser = async (id, data) => {
  const user = await User.findByIdAndUpdate(id, data, { new: true, runValidators: true }).select('-password');
  if (!user) {
    const error = new Error('Usuario no encontrado');
    error.status = 404;
    throw error;
  }
  return user;
};

export const deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    const error = new Error('Usuario no encontrado');
    error.status = 404;
    throw error;
  }
  return user;
};
