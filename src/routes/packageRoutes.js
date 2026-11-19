import { Router } from 'express';
import { list, getById, create, update, remove } from '../controllers/packageController.js';
import { getWeather } from '../controllers/weatherController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { adminOnly } from '../middlewares/roleMiddleware.js';
import { validate } from '../validations/validate.js';
import { createPackageSchema, updatePackageSchema } from '../schemas/packageSchema.js';

const router = Router();

// Rutas pÃºblicas
router.get('/', list);
router.get('/:id', getById);
router.get('/:id/weather', getWeather);

// Rutas protegidas (solo admin)
router.post('/', protect, adminOnly, validate(createPackageSchema), create);
router.put('/:id', protect, adminOnly, validate(updatePackageSchema), update);
router.delete('/:id', protect, adminOnly, remove);

export default router;
