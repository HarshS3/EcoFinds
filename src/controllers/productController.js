import Product from '../models/Product.js';

export async function createProduct(req, res) {
  const { title, description, category, price, image, condition, tags } = req.body;
  if (!title || !description || !category || price == null) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  const product = await Product.create({
    title,
    description,
    category,
    price,
    image,
    condition,
    tags,
    seller: req.user._id
  });
  res.status(201).json(product);
}

export async function getProducts(req, res) {
  const { search, category, seller } = req.query;
  const query = {};
  if (category) query.category = category;
  if (seller) query.seller = seller;
  if (search) {
    query.$text = { $search: search };
  }
  const products = await Product.find(query).sort('-createdAt');
  res.json(products);
}

export async function getProduct(req, res) {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
}

export async function updateProduct(req, res) {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  if (product.seller.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Not authorized' });
  }
  const updatable = ['title', 'description', 'category', 'price', 'image', 'condition', 'tags'];
  updatable.forEach((field) => {
    if (req.body[field] !== undefined) product[field] = req.body[field];
  });
  await product.save();
  res.json(product);
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
