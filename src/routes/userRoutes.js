import { Router } from 'express';
import { getUserProfile, updateUserProfile } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();
router.get('/:id', protect, getUserProfile);
router.put('/:id', protect, updateUserProfile);
export default router;
