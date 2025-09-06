import { Router } from 'express';
import { checkout, orderHistory } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();
router.post('/checkout', protect, checkout);
router.get('/history', protect, orderHistory);
export default router;
