import { z } from 'zod';

export const createUserSchema = z.object({
  nombre: z.string().min(2, 'Mínimo 2 caracteres').max(80),
  email: z.string().email('Email inválido').toLowerCase(),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
  rol: z.enum(['admin', 'cliente']).default('cliente'),
});

export const updateUserSchema = z.object({
  nombre: z.string().min(2).max(80).optional(),
  email: z.string().email().toLowerCase().optional(),
  rol: z.enum(['admin', 'cliente']).optional(),
});
