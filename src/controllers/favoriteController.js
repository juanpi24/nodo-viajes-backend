import * as favoriteService from '../services/favoriteService.js';

export const list = async (req, res, next) => {
  try {
    const favoritos = await favoriteService.listFavorites(req.user._id);
    res.json({ data: favoritos });
  } catch (error) { next(error); }
};

export const add = async (req, res, next) => {
  try {
    const user = await favoriteService.addFavorite(req.user._id, req.params.packageId);
    res.json({ message: 'Agregado a favoritos', favoritos: user.favoritos });
  } catch (error) { next(error); }
};

export const remove = async (req, res, next) => {
  try {
    const user = await favoriteService.removeFavorite(req.user._id, req.params.packageId);
    res.json({ message: 'Eliminado de favoritos', favoritos: user.favoritos });
  } catch (error) { next(error); }
};
