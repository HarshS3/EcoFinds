import User from '../models/User.js';

export async function getUserProfile(req, res) {
  const user = await User.findById(req.params.id).select('-password');
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
}

export async function updateUserProfile(req, res) {
  // Allow if the authenticated user matches the target id OR is an admin.
  if (req.user._id.toString() !== req.params.id && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  const { name, avatar } = req.body;
  if (name) user.name = name;
  if (avatar) user.avatar = avatar;
  await user.save();
  res.json({ message: 'Updated', user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar } });
}
