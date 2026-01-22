import { useState, useEffect } from 'react';
import { Mountain, Leaf, Compass, PawPrint, Sparkles, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TrekCard } from './TrekCard';
import { destinationsService, DestinationWithDetails } from '../services/supabaseService';
import { toast } from '@/hooks/use-toast';

type Difficulty = 'All' | 'Easy' | 'Moderate' | 'Challenging';
type Vibe = 'All' | 'Peaceful' | 'Adventure' | 'Cultural' | 'Wildlife';

export const DiscoverTreks = () => {
  const [destinations, setDestinations] = useState<DestinationWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [difficulty, setDifficulty] = useState<Difficulty>('All');
  const [vibe, setVibe] = useState<Vibe>('All');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Fetch destinations from Supabase
  useEffect(() => {
    const fetchDestinations = async () => {
      setLoading(true);
      const data = await destinationsService.getAll();
      console.log('Fetched destinations:', data);
      if (data.length > 0) {
        console.log('First destination vibes:', data[0].vibes, 'Type:', typeof data[0].vibes);
      }
      setDestinations(data);
      setLoading(false);
    };
    fetchDestinations();
  }, []);

  const difficultyOptions: { value: Difficulty; label: string; icon: React.ReactNode }[] = [
    { value: 'All', label: 'All Levels', icon: <Sparkles className="w-4 h-4" /> },
    { value: 'Easy', label: 'Easy', icon: <span className="text-lg">🌿</span> },
    { value: 'Moderate', label: 'Moderate', icon: <span className="text-lg">🧗‍♂️</span> },
    { value: 'Challenging', label: 'Challenging', icon: <span className="text-lg">🏔️</span> },
  ];

  const vibeOptions: { value: Vibe; label: string; icon: React.ReactNode }[] = [
    { value: 'All', label: 'All Vibes', icon: <Sparkles className="w-4 h-4" /> },
    { value: 'Peaceful', label: 'Peaceful', icon: <Leaf className="w-4 h-4" /> },
    { value: 'Adventure', label: 'Adventure', icon: <Compass className="w-4 h-4" /> },
    { value: 'Cultural', label: 'Cultural', icon: <Mountain className="w-4 h-4" /> },
    { value: 'Wildlife', label: 'Wildlife', icon: <PawPrint className="w-4 h-4" /> },
  ];

  const filteredDestinations = destinations.filter((dest) => {
    const matchesDifficulty = difficulty === 'All' || dest.difficulty === difficulty;
    const matchesVibe = vibe === 'All' || (dest.vibes && dest.vibes.includes(vibe));
    const matchesFavorites = !showFavoritesOnly || favorites.includes(dest.id);
    return matchesDifficulty && matchesVibe && matchesFavorites;
  });

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const handleBook = (destination: DestinationWithDetails) => {
    toast({
      title: "Booking Initiated! 🎉",
      description: `You're booking ${destination.name}. We'll contact you shortly with details.`,
    });
  };

  // Debug: Log to verify Heart is available
  console.log('DiscoverTreks component loaded. Heart icon available:', Heart);

  return (
    <section className="py-16 px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Discover Your Perfect Trek
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose your fitness level and preferred vibe to find personalized trekking recommendations
          </p>
        </div>

        {/* Filters */}
        <div className="space-y-6 mb-12">
          {/* Difficulty Filter */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Fitness Level
            </label>
            <div className="flex flex-wrap gap-2">
              {difficultyOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={difficulty === option.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setDifficulty(option.value)}
                  className="gap-2"
                >
                  {option.icon}
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Vibe Filter */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Mood / Vibe
            </label>
            <div className="flex flex-wrap gap-2">
              {vibeOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={vibe === option.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setVibe(option.value)}
                  className="gap-2"
                >
                  {option.icon}
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Favorites Toggle */}
          <div className="flex items-center gap-4">
            <Button
              variant={showFavoritesOnly ? 'accent' : 'muted'}
              size="sm"
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              className="gap-2"
            >
              <Heart className={`w-4 h-4 ${showFavoritesOnly ? 'fill-current' : ''}`} />
              My Favorites ({favorites.length})
            </Button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{filteredDestinations.length}</span> destinations
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
            <p className="text-muted-foreground mt-4">Loading treks...</p>
          </div>
        ) : filteredDestinations.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDestinations.map((destination, index) => (
              <div
                key={destination.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <TrekCard
                  destination={destination}
                  isFavorite={favorites.includes(destination.id)}
                  onToggleFavorite={toggleFavorite}
                  onBook={handleBook}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Mountain className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
            <h3 className="text-xl font-display font-semibold mb-2">No treks found</h3>
            <p className="text-muted-foreground">
              Try adjusting your filters to discover more adventures
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
