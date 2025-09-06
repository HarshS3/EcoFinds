import User from '../models/User.js';
import { generateToken } from '../utils/token.js';

// Helper to attach JWT as HttpOnly cookie (safer for browsers than localStorage)
function setAuthCookie(res, token) {
  const oneHour = 60 * 60 * 1000;
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: oneHour
  });
}

export async function register(req, res) {
  const { name, email, password, avatar } = req.body || {};
  if (!name || !email || !password) return res.status(400).json({ message: 'All fields required' });

  const normalizedEmail = email.trim().toLowerCase();
  // Debug log (remove in production)
  if (process.env.NODE_ENV !== 'production') {
    console.log('[REGISTER_ATTEMPT]', {
      originalEmail: email,
      normalizedEmail,
      time: new Date().toISOString(),
      bodyKeys: Object.keys(req.body || {})
    });
    try {
      const count = await User.countDocuments();
      const strict = await User.findOne({ email: normalizedEmail });
      const ci = await User.findOne({ email: new RegExp(`^${normalizedEmail}$`, 'i') });
      console.log('[REGISTER_PRECHECK]', {
        userCount: count,
        strictMatch: strict?._id?.toString() || null,
        ciMatch: ci?._id?.toString() || null,
        ciMatchEmail: ci?.email || null
      });
    } catch (e) {
      console.warn('[REGISTER_PRECHECK_ERROR]', e.message);
    }
  }
  // We skip the pre-check to avoid any race or collation oddities; rely on unique index.
  // Additional runtime diagnostics if DEBUG_AUTH is enabled.
  const diag = {};
  if (process.env.DEBUG_AUTH === '1') {
    try {
      diag.indexes = await User.collection.indexes();
      diag.count = await User.countDocuments();
      diag.sample = await User.find({}, { email: 1 }).limit(5).lean();
      console.log('[REGISTER_DIAG]', JSON.stringify(diag));
    } catch (e) {
      console.warn('[REGISTER_DIAG_ERROR]', e.message);
    }
  }
  try {
    const user = await User.create({ name, email: normalizedEmail, password, avatar });
    const token = generateToken(user);
    setAuthCookie(res, token);
    res.status(201).json({
      user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar || null },
      token,
      authType: 'cookie+bearer'
    });
  } catch (err) {
    if (process.env.DEBUG_AUTH === '1') {
      console.error('[REGISTER_CREATE_ERROR_RAW]', err);
      try {
        const existing = await User.findOne({ email: normalizedEmail }).lean();
        console.log('[POST_ERROR_LOOKUP]', existing ? existing._id : 'NO_EXISTING');
      } catch {}
    }
    // Handle race condition duplicate
    if (err?.code === 11000 || /duplicate key/i.test(err?.message || '')) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn('[REGISTER_DUPLICATE]', err?.message);
      }
      return res.status(400).json({ message: 'User already exists', email: normalizedEmail, code: 'DUPLICATE_EMAIL' });
    }
    if (process.env.NODE_ENV !== 'production') {
      console.error('[REGISTER_ERROR]', err);
    }
    return res.status(500).json({ message: 'Registration failed', error: err.message, code: 'REGISTER_ERROR' });
  }
}

// Debug utility (DO NOT enable in production). Lists user emails & index info.
export async function debugListUsers(req, res) {
  if (process.env.DEBUG_USERS !== '1') {
    return res.status(403).json({ message: 'Debug disabled' });
  }
  const users = await User.find({}, { email: 1, createdAt: 1 }).limit(100).lean();
  let indexes = [];
  try {
    indexes = await User.collection.indexes();
  } catch {}
  res.json({ count: users.length, users, indexes });
}

export async function login(req, res) {
  const { email, password } = req.body || {};
  const normalizedEmail = (email || '').trim().toLowerCase();
  const user = await User.findOne({ email: normalizedEmail });
  if (process.env.DEBUG_AUTH === '1') {
    console.log('[LOGIN_ATTEMPT]', { input: email, normalizedEmail, found: !!user });
  }
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const match = await user.matchPassword(password);
  if (!match) return res.status(401).json({ message: 'Invalid credentials' });
  const token = generateToken(user);
  setAuthCookie(res, token);
  res.json({
  user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar || null },
    token,
    authType: 'cookie+bearer'
  });
}

export async function me(req, res) {
  res.json({ user: req.user });
}
