import { verifyToken } from '../utils/jwt.js';
import { User } from '../models/User.js';

export const protect = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No autorizado: token faltante' });
    }
    const token = header.split(' ')[1];
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(401).json({ message: 'Usuario no encontrado' });
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
};
