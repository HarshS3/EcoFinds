# 🌱 EcoFinds - Sustainable Second-Hand Marketplace

> **A modern, eco-friendly marketplace platform built for the Odoo x NMIT Hackathon**  
> *Problem Statement: EcoFind - Creating a sustainable ecosystem for second-hand goods*

## 👥 Team Members

- **Parth Srivastava** - Full Stack Developer
- **Harsh Shah** - Full Stack Developer  
- **Nihar Mehta** - Full Stack Developer
- **Jenil Bunha** - Full Stack Developer

## 🎯 Project Overview

EcoFinds is a comprehensive second-hand marketplace platform designed to promote sustainability and reduce waste by facilitating the exchange of pre-owned goods. The platform enables users to buy and sell used items in various categories, creating a circular economy that benefits both the environment and users' wallets.

### 🌟 Key Features

- **🛍️ Product Marketplace**: Browse, search, and filter second-hand products across multiple categories
- **📱 User Authentication**: Secure user registration and login system
- **🛒 Shopping Cart**: Add products to cart and manage quantities
- **💳 Payment Integration**: Secure payment processing via Razorpay
- **📦 Order Management**: Complete order tracking and history
- **📸 Image Upload**: Multi-image support for product listings
- **🔍 Advanced Search**: Text search, category filtering, and sorting options
- **👤 User Profiles**: Personal dashboards and listing management
- **📱 Responsive Design**: Mobile-first, modern UI/UX

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks and functional components
- **TypeScript** - Type-safe JavaScript for better development experience
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework for rapid styling
- **Shadcn/ui** - High-quality, accessible component library
- **Radix UI** - Unstyled, accessible UI primitives
- **React Router DOM** - Client-side routing
- **React Hook Form** - Performant forms with easy validation
- **TanStack Query** - Powerful data synchronization for React
- **Lucide React** - Beautiful, customizable icons
- **React Dropzone** - File upload with drag & drop support

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Fast, unopinionated web framework
- **MongoDB** - NoSQL database for flexible data storage
- **Mongoose** - Elegant MongoDB object modeling
- **JWT** - JSON Web Tokens for secure authentication
- **Bcrypt** - Password hashing for security
- **Multer** - Middleware for handling multipart/form-data
- **Express Validator** - Middleware for request validation
- **CORS** - Cross-Origin Resource Sharing support
- **Morgan** - HTTP request logger middleware

### Payment & External Services
- **Razorpay** - Payment gateway integration
- **Cloudinary** - Cloud-based image and video management

### Development Tools
- **ESLint** - Code linting and quality assurance
- **Prettier** - Code formatting
- **Nodemon** - Development server auto-restart
- **PostCSS** - CSS processing tool

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/ecofinds.git
   cd ecofinds
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Setup**
   
   Create a `.env` file in the `backend` directory:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/ecofinds
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRE=7d
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   ```

5. **Start the Development Servers**

   **Backend Server:**
   ```bash
   cd backend
   npm run dev
   ```

   **Frontend Server:**
   ```bash
   cd frontend
   npm run dev
   ```

6. **Access the Application**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:5000`

## 📁 Project Structure

```
ecofinds/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js              # Database configuration
│   │   ├── controllers/           # Route controllers
│   │   │   ├── authController.js
│   │   │   ├── cartController.js
│   │   │   ├── orderController.js
│   │   │   ├── productController.js
│   │   │   └── userController.js
│   │   ├── middleware/            # Custom middleware
│   │   │   ├── authMiddleware.js
│   │   │   ├── errorMiddleware.js
│   │   │   └── validateRequest.js
│   │   ├── models/                # Database models
│   │   │   ├── Cart.js
│   │   │   ├── Category.js
│   │   │   ├── Order.js
│   │   │   ├── Product.js
│   │   │   └── User.js
│   │   ├── routes/                # API routes
│   │   │   ├── authRoutes.js
│   │   │   ├── cartRoutes.js
│   │   │   ├── orderRoutes.js
│   │   │   ├── productRoutes.js
│   │   │   └── userRoutes.js
│   │   ├── utils/                 # Utility functions
│   │   │   └── token.js
│   │   └── app.js                 # Express app configuration
│   ├── server.js                  # Server entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/            # React components
│   │   │   ├── Layout/
│   │   │   ├── ui/                # Reusable UI components
│   │   │   ├── DebugPanel.tsx
│   │   │   ├── ImageUpload.tsx
│   │   │   └── RazorpayCheckout.tsx
│   │   ├── contexts/              # React contexts
│   │   │   ├── AuthContext.tsx
│   │   │   └── DataContext.tsx
│   │   ├── hooks/                 # Custom React hooks
│   │   ├── lib/                   # Utility libraries
│   │   ├── pages/                 # Page components
│   │   │   ├── AuthPage.tsx
│   │   │   ├── ProductsPage.tsx
│   │   │   ├── AddProductPage.tsx
│   │   │   ├── MyListingsPage.tsx
│   │   │   ├── CartPage.tsx
│   │   │   ├── ProfilePage.tsx
│   │   │   └── ProductDetailPage.tsx
│   │   ├── App.tsx                # Main App component
│   │   └── main.tsx               # React entry point
│   └── package.json
└── README.md
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update cart item quantity
- `DELETE /api/cart/remove/:productId` - Remove item from cart
- `DELETE /api/cart/clear` - Clear entire cart

### Orders
- `GET /api/orders` - Get user's orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order by ID

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `POST /api/users/upload-avatar` - Upload user avatar

## ✨ Key Features & Benefits

### 🌱 Environmental Impact
- **Reduces Waste**: Extends product lifecycle by facilitating reuse
- **Carbon Footprint**: Reduces manufacturing demand and transportation
- **Circular Economy**: Promotes sustainable consumption patterns

### 💰 Economic Benefits
- **Cost Savings**: Buy quality items at fraction of original price
- **Income Generation**: Earn money from unused items
- **Value Recovery**: Maximize value from existing possessions

### 🎨 User Experience
- **Modern UI**: Clean, intuitive interface with smooth animations
- **Mobile Responsive**: Optimized for all device sizes
- **Fast Performance**: Optimized loading and smooth interactions
- **Accessibility**: Built with accessibility best practices

### 🔒 Security & Reliability
- **Secure Authentication**: JWT-based authentication system
- **Data Validation**: Comprehensive input validation and sanitization
- **Error Handling**: Robust error handling and user feedback
- **Payment Security**: PCI-compliant payment processing

## 🚀 Deployment

### Backend Deployment (Railway/Heroku)
1. Connect your GitHub repository
2. Set environment variables
3. Deploy automatically on push

### Frontend Deployment (Vercel/Netlify)
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy automatically on push

### Database (MongoDB Atlas)
1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get connection string
4. Update `MONGODB_URI` in environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏆 Hackathon Information

- **Event**: Odoo x NMIT Hackathon
- **Problem Statement**: EcoFind - Sustainable Second-Hand Marketplace
- **Duration**: 24-48 hours
- **Team Size**: 4 members
- **Focus**: Environmental sustainability through technology

## 🔮 Future Enhancements

- **AI-Powered Recommendations**: Machine learning for product suggestions
- **Chat System**: In-app messaging between buyers and sellers
- **Rating & Review System**: User feedback and reputation system
- **Mobile App**: Native iOS and Android applications
- **Geolocation**: Location-based product discovery
- **Social Features**: Following, sharing, and social interactions
- **Analytics Dashboard**: Seller analytics and insights
- **Multi-language Support**: Internationalization
- **Advanced Search**: AI-powered search with image recognition

---

**Made with ❤️ for a sustainable future** 🌍
