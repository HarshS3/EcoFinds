import { Router } from 'express';
import { addToCart, getCart, removeFromCart, decreaseCartItem } from '../controllers/cartController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();
router.post('/add', protect, addToCart);
router.get('/', protect, getCart);
router.delete('/remove/:id', protect, removeFromCart);
router.patch('/decrease/:id', protect, decreaseCartItem);
export default router;
