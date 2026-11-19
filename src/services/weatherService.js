import { getPackageById } from './packageService.js';

export const getWeatherForPackage = async (id) => {
  const pkg = await getPackageById(id);
  
  if (!pkg.coordenadas || !pkg.coordenadas.lat || !pkg.coordenadas.lng) {
    return { mensaje: "Este paquete no tiene coordenadas configuradas para mostrar el clima." };
  }

  const { lat, lng } = pkg.coordenadas;
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`;

  try {
    const response = await fetch(url); // Node 18+ tiene fetch nativo
    if (!response.ok) throw new Error('Error al consultar Open-Meteo');
    
    const data = await response.json();
    const weather = data.current_weather;
    
    // Códigos de clima de Open-Meteo (Simplificado a los más comunes)
    const weatherCodes = {
      0: 'Cielo despejado', 1: 'Mayormente despejado', 2: 'Parcialmente nublado', 3: 'Nublado',
      45: 'Niebla', 48: 'Niebla con escarcha', 51: 'Llovizna ligera', 61: 'Lluvia ligera',
      63: 'Lluvia moderada', 65: 'Lluvia fuerte', 71: 'Nevada ligera', 95: 'Tormenta'
    };

    return {
      temperatura: weather.temperature,
      viento: weather.windspeed,
      condicion: weatherCodes[weather.weathercode] || 'Desconocido'
    };
  } catch (error) {
    const err = new Error('No se pudo obtener el clima en este momento');
    err.status = 503;
    throw err;
  }
};
