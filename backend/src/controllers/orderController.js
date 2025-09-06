import User from '../models/User.js';
import Order from '../models/Order.js';

export async function checkout(req, res) {
  const { paymentMethod = 'razorpay' } = req.body || {};
  const user = await User.findById(req.user._id).populate('cart.product');
  if (user.cart.length === 0) return res.status(400).json({ message: 'Cart empty' });
  const items = user.cart.map((c) => ({
    product: c.product._id,
    quantity: c.quantity,
    priceAtPurchase: c.product.price
  }));
  const total = items.reduce((sum, i) => sum + i.priceAtPurchase * i.quantity, 0);
  const order = await Order.create({
    user: user._id,
    items,
    total,
    paymentMethod,
    paymentStatus: paymentMethod === 'pay_later' ? 'pending' : 'paid'
  });
  user.purchases.push({ order: order._id });
  user.cart = [];
  await user.save();
  res.status(201).json({ order });
}

export async function orderHistory(req, res) {
  const orders = await Order.find({ user: req.user._id })
    .populate('items.product')
    .sort('-createdAt');
  res.json({ orders });
}
