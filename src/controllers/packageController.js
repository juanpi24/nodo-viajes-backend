import * as packageService from '../services/packageService.js';

export const list = async (req, res, next) => {
  try {
    const result = await packageService.listPackages(req.query);
    res.json(result);
  } catch (error) { next(error); }
};

export const getById = async (req, res, next) => {
  try {
    const pkg = await packageService.getPackageById(req.params.id);
    res.json({ data: pkg });
  } catch (error) { next(error); }
};

export const create = async (req, res, next) => {
  try {
    const pkg = await packageService.createPackage(req.body);
    res.status(201).json({ data: pkg });
  } catch (error) { next(error); }
};

export const update = async (req, res, next) => {
  try {
    const pkg = await packageService.updatePackage(req.params.id, req.body);
    res.json({ data: pkg });
  } catch (error) { next(error); }
};

export const remove = async (req, res, next) => {
  try {
    await packageService.deletePackage(req.params.id);
    res.json({ message: 'Paquete eliminado' });
  } catch (error) { next(error); }
};
