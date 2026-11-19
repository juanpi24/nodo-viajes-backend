import { Router } from 'express';
import { register, login, me } from '../controllers/authController.js';
import { validate } from '../validations/validate.js';
import { registerSchema, loginSchema } from '../schemas/authSchema.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.get('/me', protect, me);

export default router;
