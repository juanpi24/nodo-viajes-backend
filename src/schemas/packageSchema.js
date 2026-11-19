import { z } from 'zod';

export const createPackageSchema = z.object({
  titulo: z.string().min(3, 'Mínimo 3 caracteres').max(80),
  destino: z.string().min(2, 'Mínimo 2 caracteres').max(80),
  descripcion: z.string().min(10, 'Mínimo 10 caracteres').max(500),
  precio: z.number().int().positive('El precio debe ser mayor a 0'),
  stock: z.number().int().min(0, 'El stock no puede ser negativo'),
  imagen: z.string().url('Debe ser una URL válida'),
  categoria: z.enum(['Naturaleza', 'Lagos y Glaciares', 'Montaña', 'Aventura', 'Ciudad']),
  destacado: z.boolean().optional().default(false),
  coordenadas: z.object({
    lat: z.number(),
    lng: z.number()
  }).optional()
});

export const updatePackageSchema = createPackageSchema.partial();
