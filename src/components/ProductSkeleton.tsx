import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const ProductSkeleton: React.FC = () => {
  return (
    <Card className="animate-pulse">
      <CardContent className="p-4">
        {/* Image skeleton */}
        <Skeleton className="aspect-square w-full rounded-lg mb-4" />
        
        {/* Title skeleton */}
        <Skeleton className="h-4 w-3/4 mb-2" />
        
        {/* Rating skeleton */}
        <div className="flex items-center space-x-1 mb-2">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-8" />
          <Skeleton className="h-3 w-16" />
        </div>
        
        {/* Price skeleton */}
        <Skeleton className="h-6 w-20" />
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Skeleton className="h-9 w-full" />
      </CardFooter>
    </Card>
  );
};

export default ProductSkeleton;