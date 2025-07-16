import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Store, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';

const Header: React.FC = () => {
  const { getTotalItems } = useCart();
  const location = useLocation();
  const totalItems = getTotalItems();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:scale-105 transition-transform duration-200">
            <Store className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              FakeStore
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Products
            </Link>
            <Link
              to="/categories"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/categories') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Categories
            </Link>
          </nav>

          {/* Cart and Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <Heart className="h-5 w-5" />
            </Button>
            
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative hover:scale-105 transition-transform">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs animate-bounce-subtle"
                  >
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;