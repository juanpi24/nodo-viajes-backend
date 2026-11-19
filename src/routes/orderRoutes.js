import { Router } from 'express';
import { create, verify, cancel, listUser, listAdmin } from '../controllers/orderController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { clienteOnly, adminOnly } from '../middlewares/roleMiddleware.js';
import { validate } from '../validations/validate.js';
import { createOrderSchema } from '../schemas/orderSchema.js';

const router = Router();

// Cliente
router.post('/', protect, clienteOnly, validate(createOrderSchema), create);
router.get('/mis-ordenes', protect, clienteOnly, listUser);
router.get('/:id/verify', protect, verify); // Puede ser cliente o admin (el servicio valida si es dueÃ±o)
router.post('/:id/cancel', protect, clienteOnly, cancel);

// Admin
router.get('/', protect, adminOnly, listAdmin);

export default router;
