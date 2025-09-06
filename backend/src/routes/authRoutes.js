import { Router } from 'express';
import { register, login, me, debugListUsers } from '../controllers/authController.js';
import User from '../models/User.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();
router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, me);
router.post('/logout', (req, res) => {
	res.clearCookie('token', {
		httpOnly: true,
		sameSite: 'lax',
		secure: process.env.NODE_ENV === 'production'
	});
	res.json({ message: 'Logged out' });
});
router.get('/_debug/users', debugListUsers); // guarded by DEBUG_USERS env
router.get('/_debug/auth-state', async (req, res) => {
	if (process.env.DEBUG_AUTH !== '1') return res.status(403).json({ message: 'Debug disabled' });
	try {
		const count = await User.countDocuments();
		const sample = await User.find({}, { email: 1, createdAt: 1 }).limit(10).lean();
		const indexes = await User.collection.indexes();
		const dbName = User.db?.name || null;
		res.json({
			env: { NODE_ENV: process.env.NODE_ENV, DEBUG_AUTH: process.env.DEBUG_AUTH, DB_NAME: dbName },
			count,
			sample,
			indexes
		});
	} catch (e) {
		res.status(500).json({ message: 'Auth debug failed', error: e.message });
	}
});
export default router;
