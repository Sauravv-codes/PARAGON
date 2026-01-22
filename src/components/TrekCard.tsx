import { Heart, MapPin, Clock, Mountain, Star, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DestinationWithDetails } from '../services/supabaseService';
import { useCurrency } from '@/lib/CurrencyContext';

interface TrekCardProps {
  destination: DestinationWithDetails;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onBook: (destination: DestinationWithDetails) => void;
}

export const TrekCard = ({
  destination,
  isFavorite,
  onToggleFavorite,
  onBook,
}: TrekCardProps) => {
  const difficultyColors: Record<string, string> = {
    Easy: 'bg-green-100 text-green-800 border-green-200',
    Moderate: 'bg-amber-100 text-amber-800 border-amber-200',
    Challenging: 'bg-red-100 text-red-800 border-red-200',
  };

  const carbonColors: Record<string, string> = {
    low: 'text-green-600',
    medium: 'text-amber-600',
    high: 'text-red-600',
  };

  // Duration text
  const duration =
    destination.duration_min === destination.duration_max
      ? `${destination.duration_min} days`
      : `${destination.duration_min}-${destination.duration_max} days`;

  // ✅ SAFELY normalize vibes (THIS FIXES THE CRASH)
  const vibes: string[] = Array.isArray(destination.vibes)
    ? destination.vibes.slice(0, 2)
    : typeof destination.vibes === 'string'
    ? destination.vibes.split(',').slice(0, 2)
    : [];

  // ✅ SAFELY normalize highlights
  const highlights: string[] = Array.isArray(destination.highlights)
    ? destination.highlights.slice(0, 3)
    : [];

  // Average cost
  const avgCost = Math.round(
    (destination.cost_budget +
      destination.cost_medium +
      destination.cost_luxury) / 3
  );

  const { format: formatCurrency } = useCurrency();

  const handleNavigate = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Link
      to={`/destination/${destination.id}`}
      onClick={handleNavigate}
      className="group relative bg-card rounded-2xl overflow-hidden shadow-card card-hover border border-border/50 block hover:no-underline"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={destination.image_url}
          alt={destination.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Hidden Gem */}
        {destination.is_hidden_gem && (
          <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-semibold flex items-center gap-1">
            <Leaf className="w-3 h-3" />
            Hidden Gem
          </div>
        )}

        {/* Favorite */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(destination.id);
          }}
          className={`absolute top-4 right-4 p-2 rounded-full transition-all ${
            isFavorite
              ? 'bg-red-500 text-white'
              : 'bg-white/80 text-gray-600 hover:bg-white'
          }`}
        >
          <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
        </button>

        {/* Location & Rating */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
          <div className="flex items-center gap-1 text-white text-sm">
            <MapPin className="w-4 h-4" />
            <span>{destination.location}</span>
          </div>
          <div className="flex items-center gap-1 bg-white/90 px-2 py-1 rounded-full">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span className="text-sm font-semibold text-foreground">
              {destination.rating}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        <div>
          <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-primary">
            {destination.name}
          </h3>

          <div className="flex flex-wrap gap-2 mt-2">
            <Badge
              variant="outline"
              className={difficultyColors[destination.difficulty]}
            >
              {destination.difficulty}
            </Badge>

            {vibes.map((vibe, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {vibe}
              </Badge>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 py-3 border-y border-border/50">
          <div className="text-center">
            <Clock className="w-4 h-4 mx-auto text-muted-foreground mb-1" />
            <span className="text-xs text-muted-foreground block">
              Duration
            </span>
            <span className="text-sm font-medium">{duration}</span>
          </div>

          <div className="text-center">
            <Mountain className="w-4 h-4 mx-auto text-muted-foreground mb-1" />
            <span className="text-xs text-muted-foreground block">
              Altitude
            </span>
            <span className="text-sm font-medium">
              {destination.altitude}
            </span>
          </div>

          <div className="text-center">
            <Leaf
              className={`w-4 h-4 mx-auto mb-1 ${carbonColors[destination.carbon_footprint]}`}
            />
            <span className="text-xs text-muted-foreground block">
              Carbon
            </span>
            <span
              className={`text-sm font-medium ${carbonColors[destination.carbon_footprint]}`}
            >
              {destination.carbon_footprint === 'low'
                ? '🟢'
                : destination.carbon_footprint === 'medium'
                ? '🟡'
                : '🔴'}
            </span>
          </div>
        </div>

        {/* Highlights */}
        {highlights.length > 0 && (
          <div className="space-y-2">
            <span className="text-xs font-medium text-muted-foreground uppercase">
              Highlights
            </span>
            <div className="flex flex-wrap gap-1">
              {highlights.map((highlight, index) => (
                <span
                  key={index}
                  className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground"
                >
                  {highlight}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <Leaf className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">
              {destination.eco_score}% eco-friendly
            </span>
          </div>

          <div className="text-right">
            <span className="text-lg font-display font-bold text-primary">
              {formatCurrency(avgCost)}
            </span>
            <span className="text-xs text-muted-foreground">/person</span>
          </div>
        </div>

        <Button className="w-full">View More</Button>
      </div>
    </Link>
  );
};
