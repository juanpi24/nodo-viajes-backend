import { z } from 'zod';

export const registerSchema = z.object({
  nombre: z.string().min(2, 'Mínimo 2 caracteres').max(80),
  email: z.string().email('Email inválido').toLowerCase(),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
});

export const loginSchema = z.object({
  email: z.string().email('Email inválido').toLowerCase(),
  password: z.string().min(1, 'Password requerido'),
});
