import { z } from 'zod';

export const createOrderSchema = z.object({
  items: z.array(
    z.object({
      package: z.string().regex(/^[0-9a-fA-F]{24}$/, 'ID de paquete inválido'),
      cantidad: z.number().int().positive('La cantidad debe ser mayor a 0')
    })
  ).min(1, 'La orden debe tener al menos un producto'),
  // Opcional: método de envío, notas, etc.
});

export const updateOrderStatusSchema = z.object({
  estado: z.enum(['pending', 'approved', 'rejected', 'cancelled'])
});
