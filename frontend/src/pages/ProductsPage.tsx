import React, { useState, useMemo } from 'react';
import { Header } from '@/components/Layout/Header';
import { SplineHero } from '@/components/ui/spline-hero';
import { useData, categories } from '@/contexts/DataContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Search, Plus, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ProductsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const { products, addToCart } = useData();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Ensure scroll is enabled
  React.useEffect(() => {
    document.body.style.overflow = 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (selectedCategory !== 'All Categories') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [products, selectedCategory, searchQuery]);

  const handleAddToCart = (productId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(productId);
    toast({
      title: "Added to cart",
      description: "Product added to your cart successfully!",
      duration: 2500,
    });
  };

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section with Spline */}
      <section className="relative h-96 md:h-[500px] overflow-hidden">
        <SplineHero className="h-full" />
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center text-white animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-4">
              thrift earth
            </h1>
            <p className="text-lg md:text-xl opacity-90 max-w-md mx-auto">
              Discover unique treasures from around the globe
            </p>
          </div>
        </div>
        {/* Smooth gradient transition */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background via-background/80 to-transparent z-30 pointer-events-none" />
      </section>

      {/* Search and Filters */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-[#1B1B1B]/50 backdrop-blur-sm border border-gray-700 text-white placeholder-gray-400 focus:border-[#00BFFF] focus:ring-[#00BFFF]/20"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={`transition-all duration-200 ${
                  selectedCategory === category 
                    ? 'bg-gradient-to-r from-[#00BFFF] to-[#00B894] text-white shadow-lg hover:shadow-[#00BFFF]/20' 
                    : 'bg-[#1B1B1B]/50 backdrop-blur-sm border border-gray-700 text-gray-300 hover:bg-[#00BFFF]/10 hover:border-[#00BFFF]/50'
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="container mx-auto px-4 pb-16">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto animate-fade-in">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/50 flex items-center justify-center">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No products found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or filters
              </p>
              <Button onClick={() => navigate('/add-product')}>
                <Plus className="h-4 w-4 mr-2" />
                Add the first product
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <Card
                key={product.id}
                className="group cursor-pointer overflow-hidden bg-[#1B1B1B]/80 backdrop-blur-sm border border-gray-700 hover:shadow-lg hover:shadow-[#00BFFF]/20 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] animate-fade-in hover-glow"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => handleProductClick(product.id)}
              >
                <CardContent className="p-0">
                  {/* Product Image */}
                  <div className="relative h-48 bg-gradient-to-br from-muted/20 to-muted/40 flex items-center justify-center overflow-hidden">
                    {product.images && product.images.length > 0 ? (
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-muted-foreground text-sm">Product Image</div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  {/* Product Info */}
                  <div className="p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <h3 className="font-medium line-clamp-2 text-sm text-white">{product.title}</h3>
                      <div className="flex flex-col gap-1 ml-2 shrink-0">
                        <Badge variant="secondary" className="text-xs">
                          {product.category}
                        </Badge>
                        {product.brand && (
                          <Badge variant="outline" className="text-xs border-gray-600 text-gray-300">
                            {product.brand}
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <span>Qty: {product.quantity}</span>
                      <span>•</span>
                      <span className="capitalize">{product.condition}</span>
                    </div>
                    
                    <p className="text-gray-300 text-sm line-clamp-2">
                      {product.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-[#00BFFF]">
                        ₹{product.price.toFixed(2)}
                      </span>
                      <Button
                        size="sm"
                        onClick={(e) => handleAddToCart(product.id, e)}
                        className="bg-gradient-to-r from-[#00BFFF] to-[#00B894] hover:from-[#00B894] hover:to-[#00BFFF] text-white"
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Floating Add Button */}
      <Button
        onClick={() => navigate('/add-product')}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-to-r from-[#00BFFF] to-[#00B894] hover:from-[#00B894] hover:to-[#00BFFF] text-white shadow-xl hover:shadow-2xl hover:shadow-[#00BFFF]/30 transition-all duration-300 hover:scale-110 animate-bounce hover-glow"
        style={{ animationDuration: '2s', animationIterationCount: '3' }}
      >
        <Plus className="h-6 w-6" />
      </Button>
    </div>
  );
};