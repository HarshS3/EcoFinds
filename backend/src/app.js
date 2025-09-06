import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

const app = express();

// Allow multiple origins (comma separated) e.g. CORS_ORIGIN="http://localhost:5173,http://localhost:8080"
const originList = (process.env.CORS_ORIGIN || 'http://localhost:5173,http://localhost:8080')
  .split(',')
  .map(o => o.trim())
  .filter(Boolean);
app.use(cors({
  origin: (origin, cb) => {
    if (!origin || originList.includes(origin)) return cb(null, true);
    if (process.env.DEBUG_ROUTES === '1') {
      console.warn('[CORS_BLOCK]', origin, 'not in', originList);
    }
    cb(new Error('Not allowed by CORS'));
  },
  credentials: true
}));
// Basic request logger (before routes) for debugging path issues
app.use((req, res, next) => {
  if (process.env.DEBUG_ROUTES === '1') {
    console.log('[REQ]', req.method, req.originalUrl);
  }
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

app.get('/health', (req, res) => res.json({ status: 'ok', service: 'EcoFinds API' }));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
