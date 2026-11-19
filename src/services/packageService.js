import * as packageRepository from '../repositories/packageRepository.js';

export const listPackages = async (query) => {
  const { page = 1, limit = 10, search, categoria, minPrecio, maxPrecio } = query;
  
  const filter = {};
  if (search) {
    filter.$or = [
      { titulo: { $regex: search, $options: 'i' } },
      { destino: { $regex: search, $options: 'i' } }
    ];
  }
  if (categoria) filter.categoria = categoria;
  if (minPrecio || maxPrecio) {
    filter.precio = {};
    if (minPrecio) filter.precio.$gte = Number(minPrecio);
    if (maxPrecio) filter.precio.$lte = Number(maxPrecio);
  }

  const pageNum = Math.max(1, Number(page));
  const limitNum = Math.max(1, Number(limit));
  const skip = (pageNum - 1) * limitNum;

  const [data, total] = await Promise.all([
    packageRepository.findAll(filter, skip, limitNum),
    packageRepository.countAll(filter)
  ]);

  return {
    data,
    meta: {
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum)
    }
  };
};

export const getPackageById = async (id) => {
  const pkg = await packageRepository.findById(id);
  if (!pkg) {
    const error = new Error('Paquete no encontrado');
    error.status = 404;
    throw error;
  }
  return pkg;
};

export const createPackage = async (data) => packageRepository.create(data);

export const updatePackage = async (id, data) => {
  const pkg = await packageRepository.update(id, data);
  if (!pkg) {
    const error = new Error('Paquete no encontrado');
    error.status = 404;
    throw error;
  }
  return pkg;
};

export const deletePackage = async (id) => {
  const pkg = await packageRepository.remove(id);
  if (!pkg) {
    const error = new Error('Paquete no encontrado');
    error.status = 404;
    throw error;
  }
  return pkg;
};
