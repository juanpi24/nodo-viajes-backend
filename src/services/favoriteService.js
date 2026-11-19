import * as userRepository from '../repositories/userRepository.js';
import { getPackageById } from './packageService.js';

export const addFavorite = async (userId, packageId) => {
  await getPackageById(packageId); // Valida que el paquete exista
  return await userRepository.addFavorite(userId, packageId);
};

export const removeFavorite = async (userId, packageId) => {
  return await userRepository.removeFavorite(userId, packageId);
};

export const listFavorites = async (userId) => {
  const user = await userRepository.getFavorites(userId);
  return user.favoritos;
};
