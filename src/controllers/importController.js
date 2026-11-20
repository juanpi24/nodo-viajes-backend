import * as importService from '../services/importService.js';

export const importPackages = async (req, res, next) => {
  try {
    const result = await importService.importFromExternalApi();
    res.json(result);
  } catch (error) { next(error); }
};
