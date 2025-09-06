import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, default: 1, min: 1 },
        priceAtPurchase: { type: Number, required: true }
      }
    ],
    total: { type: Number, required: true },
    status: { type: String, enum: ['completed', 'cancelled'], default: 'completed' },
    paymentMethod: { type: String, enum: ['razorpay', 'pay_later'], default: 'razorpay' },
    paymentStatus: { type: String, enum: ['pending', 'paid'], default: 'paid' }
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);
export default Order;
