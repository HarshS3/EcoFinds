import Product from '../models/Product.js';
import mongoose from 'mongoose';

export async function createProduct(req, res) {
  const { title, description, category, price, image, images, condition, tags, quantity } = req.body;
  if (!title || !description || !category || price == null) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  const normalizedImages = Array.isArray(images) ? images : (image ? [image] : []);
  const q = Math.max(0, Number(quantity ?? 1));
  try {
    const existing = await Product.findOne({ seller: req.user._id, title, category, price, condition: condition || { $exists: false } });
    if (existing) {
      existing.quantity += q;
      if (normalizedImages.length) {
        const merged = new Set([...(existing.images || []), ...normalizedImages]);
        existing.images = Array.from(merged);
      }
      if (tags && tags.length) {
        const mergedTags = new Set([...(existing.tags || []), ...tags]);
        existing.tags = Array.from(mergedTags);
      }
      await existing.save();
      return res.status(200).json(existing);
    }
  let product = await Product.create({
      title,
      description,
      category,
      price,
      quantity: q,
      image,
      images: normalizedImages,
      condition,
      tags,
      seller: req.user._id
    });
  // populate seller minimal fields for client convenience
  product = await product.populate('seller', 'name avatar');
  return res.status(201).json(product);
  } catch (e) {
    console.error('[CREATE_PRODUCT_ERROR]', e);
    return res.status(500).json({ message: 'Failed to create product' });
  }
}

export async function getProducts(req, res) {
  const { search, category, seller, excludeSeller } = req.query;
  const query = {};
  if (category) query.category = category;

  const isValidId = (v) => typeof v === 'string' && mongoose.isValidObjectId(v);

  if (seller && isValidId(seller)) {
    // explicit seller filter overrides exclusion
    query.seller = seller;
  } else if (excludeSeller && isValidId(excludeSeller)) {
    query.seller = { $ne: excludeSeller };
  }
  if (search) {
    query.$text = { $search: search };
  }
  try {
  const products = await Product.find(query).sort('-createdAt').populate('seller', 'name avatar');
    res.json(products);
  } catch (err) {
    console.error('[GET_PRODUCTS_ERROR]', err);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
}

export async function getProduct(req, res) {
  const product = await Product.findById(req.params.id).populate('seller', 'name avatar');
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
}

export async function updateProduct(req, res) {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  if (product.seller.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Not authorized' });
  }
  const updatable = ['title', 'description', 'category', 'price', 'image', 'images', 'condition', 'tags', 'quantity'];
  updatable.forEach((field) => {
    if (req.body[field] !== undefined) product[field] = req.body[field];
  });
  // If only image provided and images not set, sync
  if (!product.images || product.images.length === 0) {
    if (product.image) product.images = [product.image];
  }
  await product.save();
  const populated = await Product.findById(product._id).populate('seller', 'name avatar');
  res.json(populated);
}

export async function deleteProduct(req, res) {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  if (product.seller.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Not authorized' });
  }
  await product.deleteOne();
  res.json({ message: 'Deleted' });
}

export async function getCategories(req, res) {
  try {
    const categories = await Product.distinct('category');
    const cleaned = categories.filter(c => !!c).sort((a, b) => a.localeCompare(b));
    res.json({ categories: cleaned });
  } catch (e) {
    console.error('[GET_CATEGORIES_ERROR]', e);
    res.status(500).json({ message: 'Failed to fetch categories' });
  }
}
