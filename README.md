EcoFinds – Sustainable Second-Hand Marketplace (Backend)
=====================================================

Stack: Node.js, Express, MongoDB (Mongoose), JWT Auth, bcrypt.

Getting Started
---------------
1. Copy .env.example to .env and adjust values.
2. Install dependencies: `npm install`
3. Run development server: `npm run dev`

Environment Variables
---------------------
MONGO_URI=mongodb://localhost:27017/ecofinds
PORT=5000
JWT_SECRET=yourlongsecret
NODE_ENV=development

API Endpoints (Summary)
-----------------------
Auth:
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me (auth)

Users:
- GET /api/users/:id (auth)
- PUT /api/users/:id (auth, owner/admin)

Products:
- POST /api/products (auth)
- GET /api/products
- GET /api/products/:id
- PUT /api/products/:id (auth seller)
- DELETE /api/products/:id (auth seller)

Cart:
- POST /api/cart/add (auth)
- GET /api/cart (auth)
- DELETE /api/cart/remove/:id (auth)

Orders:
- POST /api/orders/checkout (auth)
- GET /api/orders/history (auth)

Health Check: GET /health

Notes
-----
- Passwords hashed with bcrypt pre-save hook.
- JWT expires in 1 hour.
- Text search supported on products (title, description, tags).

Future Enhancements
-------------------
- Image upload via Cloudinary.
- Pagination & sorting for product list.
- Wishlist & messaging between buyers and sellers.
- GraphQL gateway option.
