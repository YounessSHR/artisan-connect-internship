import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const StarRating = ({ rating, maxRating = 5, size = 'md', className }: StarRatingProps) => {
  const fullStars = Math.floor(rating || 0);
  const hasHalfStar = (rating || 0) % 1 !== 0;
  const emptyStars = Math.max(0, maxRating - fullStars - (hasHalfStar ? 1 : 0));

  const starSizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  return (
    <div className={cn('flex items-center gap-0.5 text-amber-400', className)}>
      {[...Array(Math.max(0, fullStars))].map((_, i) => (
        <Star key={`full-${i}`} className={cn(starSizeClasses[size], 'fill-current')} />
      ))}
      {hasHalfStar && (
         <div className="relative">
            <Star key="half" className={cn(starSizeClasses[size], "text-muted-foreground/20 fill-current")} />
            <div className="absolute top-0 left-0 h-full w-1/2 overflow-hidden">
                <Star className={cn(starSizeClasses[size], 'fill-current')} />
            </div>
        </div>
      )}
      {[...Array(Math.max(0, emptyStars))].map((_, i) => (
        <Star key={`empty-${i}`} className={cn(starSizeClasses[size], 'text-muted-foreground/20 fill-current')} />
      ))}
    </div>
  );
};

export default StarRating;
