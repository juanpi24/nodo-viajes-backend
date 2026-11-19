export const requireRole = (...roles) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: 'No autenticado' });
  if (!roles.includes(req.user.rol)) {
    return res.status(403).json({ message: 'No tienes permisos para esta acción' });
  }
  next();
};

export const adminOnly = requireRole('admin');
export const clienteOnly = requireRole('cliente');
