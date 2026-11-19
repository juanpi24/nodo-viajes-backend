import { Router } from 'express';
import { create, list, getById, update, remove } from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { adminOnly } from '../middlewares/roleMiddleware.js';
import { validate } from '../validations/validate.js';
import { createUserSchema, updateUserSchema } from '../schemas/userSchema.js';

const router = Router();

router.use(protect, adminOnly);

router.post('/', validate(createUserSchema), create);
router.get('/', list);
router.get('/:id', getById);
router.put('/:id', validate(updateUserSchema), update);
router.delete('/:id', remove);

export default router;
