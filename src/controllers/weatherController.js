import * as weatherService from '../services/weatherService.js';

export const getWeather = async (req, res, next) => {
  try {
    const clima = await weatherService.getWeatherForPackage(req.params.id);
    res.json(clima);
  } catch (error) { next(error); }
};
