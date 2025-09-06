import { Router } from 'express';
import { createProduct, getProducts, getProduct, updateProduct, deleteProduct, getCategories } from '../controllers/productController.js';
import { protect } from '../middleware/authMiddleware.js';
import { body } from 'express-validator';
import { validateRequest } from '../middleware/validateRequest.js';

const router = Router();
router.route('/')
  .get(getProducts)
  .post(
    protect,
    [
      body('title').notEmpty().withMessage('Title required'),
      body('description').notEmpty().withMessage('Description required'),
      body('category').notEmpty().withMessage('Category required'),
      body('price').isFloat({ gt: 0 }).withMessage('Price > 0 required')
    ],
    validateRequest,
    createProduct
  );
router.get('/categories/list', getCategories);
router.route('/:id')
  .get(getProduct)
  .put(protect, updateProduct)
  .delete(protect, deleteProduct);
export default router;
