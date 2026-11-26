import { z } from 'zod';
import { CATEGORIAS } from '../constants/destinos.js';

export const createPackageSchema = z.object({
  titulo: z
    .string()
    .trim()
    .min(3, 'El título debe tener al menos 3 caracteres')
    .max(80, 'El título no puede superar los 80 caracteres'),
  destino: z
    .string()
    .trim()
    .min(2, 'El destino debe tener al menos 2 caracteres')
    .max(80, 'El destino no puede superar los 80 caracteres'),
  descripcion: z
    .string()
    .trim()
    .min(10, 'La descripción debe tener al menos 10 caracteres')
    .max(500, 'La descripción no puede superar los 500 caracteres'),
  precio: z.coerce
    .number()
    .int('El precio debe ser un número entero')
    .min(1, 'El precio debe ser al menos 1'),
  stock: z.coerce
    .number()
    .int('El stock debe ser un número entero')
    .min(0, 'El stock no puede ser negativo'),
  imagen: z
    .string()
    .trim()
    .url('Ingresá una URL válida (empieza con https://)'),
  categoria: z.enum(CATEGORIAS, {
    error: 'Elegí una categoría de la lista',
  }),
  destacado: z.boolean().default(false),
  coordenadas: z
    .object({
      lat: z.coerce.number().min(-90).max(90).optional(),
      lng: z.coerce.number().min(-180).max(180).optional(),
    })
    .optional(),
});

export const updatePackageSchema = createPackageSchema
  .extend({
    destacado: z.boolean().optional(),
  })
  .partial();
