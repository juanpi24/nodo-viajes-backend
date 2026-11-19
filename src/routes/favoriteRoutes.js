import { Router } from 'express';
import { list, add, remove } from '../controllers/favoriteController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { clienteOnly } from '../middlewares/roleMiddleware.js';

const router = Router();

// Todas las rutas de favoritos requieren estar logueado como cliente
router.use(protect, clienteOnly);

router.get('/', list);
router.post('/:packageId', add);
router.delete('/:packageId', remove);

export default router;
