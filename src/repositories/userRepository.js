import { User } from '../models/User.js';

export const addFavorite = async (userId, packageId) => {
  return await User.findByIdAndUpdate(
    userId,
    { $addToSet: { favoritos: packageId } },
    { new: true }
  ).populate('favoritos');
};

export const removeFavorite = async (userId, packageId) => {
  return await User.findByIdAndUpdate(
    userId,
    { $pull: { favoritos: packageId } },
    { new: true }
  ).populate('favoritos');
};

export const getFavorites = async (userId) => {
  return await User.findById(userId).select('favoritos').populate('favoritos');
};
