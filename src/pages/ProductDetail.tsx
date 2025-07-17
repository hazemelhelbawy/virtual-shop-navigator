import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Product } from '@/types/store';
import { api } from '@/services/api';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { addToCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      fetchProduct(parseInt(id));
    }
  }, [id]);

  const fetchProduct = async (productId: number) => {
    try {
      setLoading(true);
      const data = await api.getProduct(productId);
      setProduct(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch product details. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      toast({
        title: "Added to Cart",
        description: `${product.title} has been added to your cart.`,
      });
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  // Mock additional product images for thumbnail display
  const productImages = product ? [product.image, product.image, product.image, product.image] : [];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-pulse">
              <div className="flex gap-4">
                <div className="flex flex-col gap-3">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-16 h-16 bg-muted rounded-lg"></div>
                  ))}
                </div>
                <div className="flex-1 aspect-square bg-muted rounded-lg"></div>
              </div>
              <div className="space-y-6">
                <div className="h-6 bg-muted rounded w-32"></div>
                <div className="h-8 bg-muted rounded w-3/4"></div>
                <div className="h-6 bg-muted rounded w-24"></div>
                <div className="h-12 bg-muted rounded w-full"></div>
                <div className="h-12 bg-muted rounded w-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Link to="/">
            <Button variant="default">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Products
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="flex gap-4">
              {/* Thumbnail column */}
              <div className="flex flex-col gap-3">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`w-16 h-16 rounded-lg border-2 overflow-hidden transition-all ${
                      selectedImageIndex === index 
                        ? 'border-foreground' 
                        : 'border-border hover:border-muted-foreground'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-full object-contain bg-muted"
                    />
                  </button>
                ))}
              </div>

              {/* Main image */}
              <div className="flex-1">
                <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                  <img
                    src={productImages[selectedImageIndex]}
                    alt={product.title}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Brand */}
              <div className="bg-foreground text-background px-4 py-2 rounded-md inline-block">
                <span className="text-sm font-bold tracking-wide">MOON BOOT</span>
              </div>

              {/* Product name */}
              <h1 className="text-2xl font-normal text-muted-foreground">
                {product.title.toLowerCase()}
              </h1>

              {/* Price */}
              <div className="text-3xl font-bold text-foreground">
                {formatPrice(product.price)}
              </div>

              {/* Size Guide */}
              <div className="flex justify-end">
                <button className="text-sm text-muted-foreground hover:text-foreground underline">
                  Size Guide
                </button>
              </div>

              {/* Size Selector */}
              <div className="space-y-2">
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger className="w-full h-12 text-muted-foreground">
                    <SelectValue placeholder="Choose an option" />
                  </SelectTrigger>
                  <SelectContent>
                    {sizes.map((size) => (
                      <SelectItem key={size} value={size}>
                        Size {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Add to Cart Button */}
              <Button
                onClick={handleAddToCart}
                className="w-full h-12 bg-foreground text-background hover:bg-foreground/90 rounded-md font-medium"
                disabled={!selectedSize}
              >
                Add To Cart
              </Button>

              {/* Google Pay Button */}
              <Button
                variant="outline"
                className="w-full h-12 bg-muted hover:bg-muted/80 border-0 rounded-md font-medium"
              >
                <div className="flex items-center justify-center gap-2">
                  <span className="text-sm">Pay with</span>
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                    <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                    <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium">Pay</span>
                </div>
              </Button>

              {/* Payment Methods */}
              <div className="flex items-center justify-center gap-2 pt-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-6 bg-gradient-to-r from-red-500 to-yellow-500 rounded-sm"></div>
                  <div className="w-10 h-6 bg-blue-600 rounded-sm flex items-center justify-center">
                    <span className="text-white text-xs font-bold">VISA</span>
                  </div>
                  <div className="w-10 h-6 bg-gradient-to-r from-red-500 to-blue-500 rounded-sm"></div>
                  <div className="w-10 h-6 bg-purple-600 rounded-sm flex items-center justify-center">
                    <span className="text-white text-xs font-bold">Shop</span>
                  </div>
                  <div className="w-10 h-6 bg-black rounded-sm flex items-center justify-center">
                    <span className="text-white text-xs font-bold">Pay</span>
                  </div>
                  <div className="w-10 h-6 bg-white border rounded-sm flex items-center justify-center">
                    <span className="text-black text-xs font-bold">G Pay</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;