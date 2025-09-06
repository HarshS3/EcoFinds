import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Product {
  id: string;
  ownerUserId: string;
  title: string;
  description: string;
  category: string;
  price: number;
  images: string[];
  quantity: number;
  condition: 'New' | 'Like New' | 'Good' | 'Used' | 'Heavily Used';
  yearOfManufacture?: number;
  brand?: string;
  model?: string;
  dimensions?: string;
  weight?: string;
  material?: string;
  color?: string;
  originalPackaging: boolean;
  manualIncluded: boolean;
  workingConditionDescription?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface Cart {
  userId: string;
  items: CartItem[];
}

export interface Purchase {
  id: string;
  userId: string;
  items: CartItem[];
  date: string;
  total: number;
}

interface DataContextType {
  products: Product[];
  cart: Cart | null;
  purchases: Purchase[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addToCart: (productId: string, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  checkout: () => void;
  getProductsByCategory: (category: string) => Product[];
  searchProducts: (query: string) => Product[];
  getUserProducts: (userId: string) => Product[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const categories = [
  'All Categories',
  'Electronics',
  'Clothing',
  'Home & Garden',
  'Books',
  'Sports',
  'Toys',
  'Automotive',
  'Beauty',
  'Health'
];

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Cart | null>(null);
  const [purchases, setPurchases] = useState<Purchase[]>([]);

  useEffect(() => {
    // Load data from localStorage
    const storedProducts = localStorage.getItem('thrift-earth-products');
    const storedCart = localStorage.getItem('thrift-earth-cart');
    const storedPurchases = localStorage.getItem('thrift-earth-purchases');

    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      // Add demo products
      const demoProducts: Product[] = [
        {
          id: "demo-1",
          ownerUserId: "demo-user",
          title: "Vintage Leather Jacket",
          description: "A beautiful vintage leather jacket in excellent condition. Perfect for casual wear.",
          category: "Clothing",
          price: 2500,
          images: ["https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400"],
          quantity: 1,
          condition: "Good",
          yearOfManufacture: 1995,
          brand: "Vintage Brand",
          model: "Classic Leather",
          dimensions: "M (40-42)",
          weight: "1.2 kg",
          material: "Genuine Leather",
          color: "Brown",
          originalPackaging: false,
          manualIncluded: false,
          workingConditionDescription: "The jacket is in good condition with minor wear on the cuffs. All zippers and buttons work perfectly. No tears or major damage.",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "demo-2", 
          ownerUserId: "demo-user",
          title: "Antique Wooden Table",
          description: "Solid wood dining table with intricate carvings. Great for home decoration.",
          category: "Home & Garden",
          price: 8000,
          images: ["https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400"],
          quantity: 1,
          condition: "Used",
          yearOfManufacture: 1980,
          brand: "Handcrafted",
          model: "Victorian Style",
          dimensions: "120x80x75 cm",
          weight: "45 kg",
          material: "Solid Oak Wood",
          color: "Natural Wood",
          originalPackaging: false,
          manualIncluded: false,
          workingConditionDescription: "This beautiful antique table has been well-maintained. Some minor scratches on the surface but overall excellent condition. Perfect for dining or as a statement piece.",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "demo-3",
          ownerUserId: "demo-user", 
          title: "Classic Literature Collection",
          description: "Set of 10 classic literature books in good condition. Perfect for book lovers.",
          category: "Books",
          price: 1200,
          images: ["https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400"],
          quantity: 10,
          condition: "Like New",
          yearOfManufacture: 2020,
          brand: "Penguin Classics",
          model: "Hardcover Collection",
          dimensions: "15x10x25 cm",
          weight: "3.5 kg",
          material: "Paper, Cardboard",
          color: "Various",
          originalPackaging: true,
          manualIncluded: true,
          workingConditionDescription: "Complete set of classic literature books in excellent condition. All books are clean with no markings or damage. Perfect for collectors or literature enthusiasts.",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
      ];
      setProducts(demoProducts);
      localStorage.setItem('thrift-earth-products', JSON.stringify(demoProducts));
    }
    
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
    if (storedPurchases) {
      setPurchases(JSON.parse(storedPurchases));
    }
  }, []);

  const addProduct = (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    localStorage.setItem('thrift-earth-products', JSON.stringify(updatedProducts));
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    const updatedProducts = products.map(product =>
      product.id === id 
        ? { ...product, ...updates, updatedAt: new Date().toISOString() }
        : product
    );
    setProducts(updatedProducts);
    localStorage.setItem('thrift-earth-products', JSON.stringify(updatedProducts));
  };

  const deleteProduct = (id: string) => {
    const updatedProducts = products.filter(product => product.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem('thrift-earth-products', JSON.stringify(updatedProducts));
  };

  const addToCart = (productId: string, quantity: number = 1) => {
    if (!cart) {
      // Initialize cart if it doesn't exist
      const currentUser = localStorage.getItem('thrift-earth-user');
      if (currentUser) {
        const user = JSON.parse(currentUser);
        const newCart = { userId: user.id, items: [{ productId, quantity }] };
        setCart(newCart);
        localStorage.setItem('thrift-earth-cart', JSON.stringify(newCart));
        return;
      }
      return;
    }

    const existingItem = cart.items.find(item => item.productId === productId);
    let updatedItems;

    if (existingItem) {
      updatedItems = cart.items.map(item =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      updatedItems = [...cart.items, { productId, quantity }];
    }

    const updatedCart = { ...cart, items: updatedItems };
    setCart(updatedCart);
    localStorage.setItem('thrift-earth-cart', JSON.stringify(updatedCart));
  };

  const removeFromCart = (productId: string) => {
    if (!cart) return;

    const updatedItems = cart.items.filter(item => item.productId !== productId);
    const updatedCart = { ...cart, items: updatedItems };
    setCart(updatedCart);
    localStorage.setItem('thrift-earth-cart', JSON.stringify(updatedCart));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (!cart) return;

    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    const updatedItems = cart.items.map(item =>
      item.productId === productId
        ? { ...item, quantity }
        : item
    );

    const updatedCart = { ...cart, items: updatedItems };
    setCart(updatedCart);
    localStorage.setItem('thrift-earth-cart', JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    if (!cart) return;

    const updatedCart = { ...cart, items: [] };
    setCart(updatedCart);
    localStorage.setItem('thrift-earth-cart', JSON.stringify(updatedCart));
  };

  const checkout = () => {
    if (!cart || cart.items.length === 0) return;

    const total = cart.items.reduce((sum, item) => {
      const product = products.find(p => p.id === item.productId);
      return sum + (product?.price || 0) * item.quantity;
    }, 0);

    const newPurchase: Purchase = {
      id: Date.now().toString(),
      userId: cart.userId,
      items: [...cart.items],
      date: new Date().toISOString(),
      total,
    };

    const updatedPurchases = [...purchases, newPurchase];
    setPurchases(updatedPurchases);
    localStorage.setItem('thrift-earth-purchases', JSON.stringify(updatedPurchases));

    clearCart();
  };

  const getProductsByCategory = (category: string) => {
    if (category === 'All Categories') return products;
    return products.filter(product => product.category === category);
  };

  const searchProducts = (query: string) => {
    return products.filter(product =>
      product.title.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase())
    );
  };

  const getUserProducts = (userId: string) => {
    return products.filter(product => product.ownerUserId === userId);
  };

  // Initialize cart for user
  useEffect(() => {
    const currentUser = localStorage.getItem('thrift-earth-user');
    if (currentUser && !cart) {
      const user = JSON.parse(currentUser);
      const userCart = { userId: user.id, items: [] };
      setCart(userCart);
      localStorage.setItem('thrift-earth-cart', JSON.stringify(userCart));
    }
  }, [cart]);

  return (
    <DataContext.Provider value={{
      products,
      cart,
      purchases,
      addProduct,
      updateProduct,
      deleteProduct,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      checkout,
      getProductsByCategory,
      searchProducts,
      getUserProducts,
    }}>
      {children}
    </DataContext.Provider>
  );
};