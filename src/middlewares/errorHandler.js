export const errorHandler = (err, _req, res, _next) => {
  console.error('❌', err.message);

  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: 'Error de validación', errors: err.errors });
  }
  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'ID inválido' });
  }
  if (err.code === 11000) {
    return res.status(409).json({ message: 'El recurso ya existe (duplicado)' });
  }

  res.status(err.status || 500).json({ message: err.message || 'Error interno del servidor' });
};
