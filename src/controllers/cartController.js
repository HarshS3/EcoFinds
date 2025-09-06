import User from '../models/User.js';
import Product from '../models/Product.js';

export async function addToCart(req, res) {
  const { productId, quantity = 1 } = req.body;
  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  const user = await User.findById(req.user._id);
  const existing = user.cart.find((c) => c.product.toString() === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    user.cart.push({ product: productId, quantity });
  }
  await user.save();
  await user.populate('cart.product');
  res.json({ cart: user.cart });
}

export async function getCart(req, res) {
  const user = await User.findById(req.user._id).populate('cart.product');
  res.json({ cart: user.cart });
}

export async function removeFromCart(req, res) {
  const productId = req.params.id;
  const user = await User.findById(req.user._id);
  user.cart = user.cart.filter((c) => c.product.toString() !== productId);
  await user.save();
  await user.populate('cart.product');
  res.json({ cart: user.cart });
}
