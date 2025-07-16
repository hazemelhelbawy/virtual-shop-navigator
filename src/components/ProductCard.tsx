import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types/store';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const truncateTitle = (title: string, maxLength: number = 50) => {
    return title.length > maxLength ? title.substring(0, maxLength) + '...' : title;
  };

  return (
    <Card className="group hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 animate-fade-in bg-gradient-card border-0">
      <Link to={`/product/${product.id}`} className="block">
        <CardContent className="p-4">
          {/* Product Image */}
          <div className="relative aspect-square mb-4 overflow-hidden rounded-lg bg-muted">
            <img
              src={product.image}
              alt={product.title}
              className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            <Badge 
              className="absolute top-2 right-2 bg-background/80 text-foreground hover:bg-background/90"
            >
              {product.category}
            </Badge>
          </div>

          {/* Product Info */}
          <div className="space-y-2">
            <h3 className="font-semibold text-sm leading-tight group-hover:text-primary transition-colors">
              {truncateTitle(product.title)}
            </h3>
            
            {/* Rating */}
            <div className="flex items-center space-x-1">
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium ml-1">{product.rating.rate}</span>
              </div>
              <span className="text-xs text-muted-foreground">
                ({product.rating.count} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-primary">
                {formatPrice(product.price)}
              </span>
            </div>
          </div>
        </CardContent>
      </Link>

      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={handleAddToCart}
          variant="cart" 
          className="w-full"
          size="sm"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;