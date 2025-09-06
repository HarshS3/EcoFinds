import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, index: true },
    quantity: { type: Number, required: true, default: 1, min: 0 },
    condition: { type: String, enum: ['New', 'Like New', 'Good', 'Used', 'Heavily Used'], required: true },
    price: { type: Number, required: true, min: 0 },
    images: [{ type: String }],
    details: {
      yearOfManufacture: { type: Number },
      brand: { type: String, trim: true },
      model: { type: String, trim: true },
      dimensions: { type: String },
      weight: { type: String },
      material: { type: String },
      color: { type: String }
    },
    extras: {
      originalPackaging: { type: Boolean, default: false },
      manualIncluded: { type: Boolean, default: false }
    },
    description: { type: String, required: true, trim: true },
    workingCondition: { type: String, trim: true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
);

// Full text search over key descriptive fields
productSchema.index({ title: 'text', description: 'text', workingCondition: 'text' });
// Duplicate detection / common filtering index
productSchema.index({ seller: 1, title: 1, category: 1, price: 1, condition: 1 });

const Product = mongoose.model('Product', productSchema);
export default Product;
