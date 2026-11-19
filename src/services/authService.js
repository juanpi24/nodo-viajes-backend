import { User } from '../models/User.js';
import { hashPassword, comparePassword } from '../utils/bcrypt.js';
import { signToken } from '../utils/jwt.js';

export const register = async ({ nombre, email, password }) => {
  const existe = await User.findOne({ email });
  if (existe) {
    const error = new Error('El email ya estÃ¡ registrado');
    error.status = 409;
    throw error;
  }
  const hashed = await hashPassword(password);
  const user = await User.create({ nombre, email, password: hashed, rol: 'cliente' });
  const token = signToken({ id: user._id, rol: user.rol });
  return { user, token };
};

export const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error('Credenciales inválidas');
    error.status = 401;
    throw error;
  }
  const ok = await comparePassword(password, user.password);
  if (!ok) {
    const error = new Error('Credenciales inválidas');
    error.status = 401;
    throw error;
  }
  const token = signToken({ id: user._id, rol: user.rol });
  return { user, token };
};
