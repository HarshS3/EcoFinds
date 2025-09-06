import jwt from 'jsonwebtoken';

export function generateToken(user) {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'devsecret', {
    expiresIn: '1h'
  });
}

export function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET || 'devsecret');
}
