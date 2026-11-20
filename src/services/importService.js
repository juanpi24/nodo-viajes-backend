import { Package } from '../models/Package.js';
import { env } from '../config/env.js';

export const importFromExternalApi = async () => {
  const apiUrl = env.externalApiUrl || 'https://6ae348d9933120ae20f898f8.mockapi.io/destinosAR';

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error('Error al consultar la API externa');
    
    const data = await response.json();

    // Como MockAPI ya tiene el formato correcto, hacemos una validación rápida
    // para evitar errores si algún campo falta.
    const mappedData = data.map(item => ({
      titulo: item.titulo,
      destino: item.destino,
      descripcion: item.descripcion,
      precio: Number(item.precio),
      stock: Number(item.stock),
      imagen: item.imagen,
      categoria: item.categoria,
      destacado: item.destacado,
      coordenadas: item.coordenadas // Ahora sí vienen las coordenadas
    }));

    let importedCount = 0;
    let updatedCount = 0;

    for (const pkg of mappedData) {
      const result = await Package.updateOne(
        { titulo: pkg.titulo }, 
        { $set: pkg },          
        { upsert: true }        
      );
      
      if (result.upsertedCount > 0) importedCount++;
      if (result.modifiedCount > 0) updatedCount++;
    }

    return {
      message: 'Importación completada',
      totalRecibidos: data.length,
      nuevos: importedCount,
      actualizados: updatedCount
    };

  } catch (error) {
    const err = new Error(error.message || 'Error en la importación');
    err.status = 500;
    throw err;
  }
};