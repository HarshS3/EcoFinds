import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: { type: String, required: true, index: true },
    price: { type: Number, required: true, min: 0 },
    image: { type: String },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    condition: { type: String, enum: ['new', 'like new', 'good', 'fair'], default: 'good' },
    tags: [{ type: String }]
  },
  { timestamps: true }
);

productSchema.index({ title: 'text', description: 'text', tags: 'text' });

const Product = mongoose.model('Product', productSchema);
export default Product;
