import * as userService from '../services/userService.js';

export const create = async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json({ user });
  } catch (error) {
    next(error);
  }
};

export const list = async (_req, res, next) => {
  try {
    const users = await userService.listUsers();
    res.json({ users });
  } catch (error) {
    next(error);
  }
};

export const getById = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.json({ user });
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    res.json({ user });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    await userService.deleteUser(req.params.id);
    res.json({ message: 'Usuario eliminado' });
  } catch (error) {
    next(error);
  }
};
