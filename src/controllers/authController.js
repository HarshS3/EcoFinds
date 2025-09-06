import User from '../models/User.js';
import { generateToken } from '../utils/token.js';

export async function register(req, res) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: 'All fields required' });
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: 'User already exists' });
  const user = await User.create({ name, email, password });
  const token = generateToken(user);
  res.status(201).json({
    user: { id: user._id, name: user.name, email: user.email },
    token
  });
}

export async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const match = await user.matchPassword(password);
  if (!match) return res.status(401).json({ message: 'Invalid credentials' });
  const token = generateToken(user);
  res.json({
    user: { id: user._id, name: user.name, email: user.email },
    token
  });
}

export async function me(req, res) {
  res.json({ user: req.user });
}
