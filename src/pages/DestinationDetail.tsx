import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  MapPin,
  Clock,
  Mountain,
  Users,
  AlertCircle,
  Leaf,
  Star,
  ArrowLeft,
  Heart,
  Share2,
  Check,
  Zap,
  TrendingUp,
  Loader,
} from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { BookingForm } from '@/components/BookingForm';
import { TravelAgencies } from '@/components/TravelAgencies';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { destinationsService, DestinationWithDetails } from '@/services/supabaseService';
import { useCurrency } from '@/lib/CurrencyContext';

const DestinationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [destination, setDestination] = useState<DestinationWithDetails | null>(null);
  const [loading, setLoading] = useState(true);

  const { format: formatCurrency } = useCurrency();

  // Fetch destination from Supabase
  useEffect(() => {
    const fetchDestination = async () => {
      if (!id) return;
      setLoading(true);
      const data = await destinationsService.getById(id);
      setDestination(data || null);
      setLoading(false);
    };
    fetchDestination();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation activeSection={activeSection} onNavigate={() => {}} />
        <div className="flex items-center justify-center min-h-screen">
          <Loader className="w-8 h-8 animate-spin text-primary" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation activeSection={activeSection} onNavigate={() => {}} />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Destination Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The trek you're looking for doesn't exist.
            </p>
            <Button onClick={() => navigate('/')} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Trek data for compatibility
  const trek = destination;

  const difficultyColors = {
    Easy: 'bg-green-100 text-green-800 border-green-200',
    Moderate: 'bg-amber-100 text-amber-800 border-amber-200',
    Challenging: 'bg-red-100 text-red-800 border-red-200',
  };

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: destination.name,
        text: `Check out ${destination.name} - ${destination.location}`,
        url: url,
      });
    } else {
      navigator.clipboard.writeText(url);
      toast({
        title: 'Link Copied!',
        description: 'Trek details link copied to clipboard.',
      });
    }
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? 'Removed from Favorites' : 'Added to Favorites',
      description: `${destination.name} has been ${
        isFavorite ? 'removed from' : 'added to'
      } your favorites.`,
    });
  };

  const getCarbonImpact = (score: number) => {
    if (score < 40) return { label: 'Very Low', color: 'text-green-600' };
    if (score < 60) return { label: 'Low', color: 'text-green-500' };
    if (score < 80) return { label: 'Moderate', color: 'text-amber-600' };
    return { label: 'High', color: 'text-red-600' };
  };

  const carbonImpact = getCarbonImpact(destination.eco_score);

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeSection={activeSection} onNavigate={() => {}} />

      {/* Hero Section */}
      <div className="relative h-96 md:h-[500px] w-full overflow-hidden mt-16">
        <img
          src={destination.image_detail_url || destination.image_url}
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

        {/* Back Button */}
        <Button
          onClick={() => navigate('/')}
          variant="outline"
          size="icon"
          className="absolute top-6 left-6 bg-white/90 hover:bg-white"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>

        {/* Action Buttons */}
        <div className="absolute top-6 right-6 flex gap-2">
          <Button
            onClick={handleToggleFavorite}
            variant="outline"
            size="icon"
            className={`${
              isFavorite
                ? 'bg-red-500 text-white border-red-600'
                : 'bg-white/90 hover:bg-white'
            }`}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
          </Button>
          <Button
            onClick={handleShare}
            variant="outline"
            size="icon"
            className="bg-white/90 hover:bg-white"
          >
            <Share2 className="w-5 h-5" />
          </Button>
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="container mx-auto max-w-7xl">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-3">
              {destination.name}
            </h1>
            <div className="flex flex-wrap gap-3 items-center">
              <div className="flex items-center gap-1 text-white">
                <MapPin className="w-5 h-5" />
                <span>{destination.location}</span>
              </div>
              <div className="flex items-center gap-1 bg-white/90 px-3 py-1 rounded-full">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span className="font-semibold text-foreground">{destination.rating}</span>
              </div>
              {destination.is_hidden_gem && (
                <Badge className="bg-accent text-accent-foreground gap-1">
                  <Leaf className="w-3 h-3" />
                  Hidden Gem
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-12 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-card border border-border/50 rounded-xl p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="font-semibold text-foreground">
                    {destination.duration_min === destination.duration_max
                      ? `${destination.duration_min} days`
                      : `${destination.duration_min}-${destination.duration_max} days`}
                  </p>
                </div>

                <div className="bg-card border border-border/50 rounded-xl p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Mountain className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">Max Altitude</p>
                  <p className="font-semibold text-foreground">{destination.altitude}</p>
                </div>

                <div className="bg-card border border-border/50 rounded-xl p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <AlertCircle className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">Difficulty</p>
                  <p className="font-semibold text-foreground">{destination.difficulty}</p>
                </div>

                <div className="bg-card border border-border/50 rounded-xl p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <TrendingUp className={`w-5 h-5 ${carbonImpact.color}`} />
                  </div>
                  <p className="text-sm text-muted-foreground">Eco-Score</p>
                  <p className="font-semibold text-foreground">{destination.eco_score}/100</p>
                </div>
              </div>

              {/* Description Section */}
              <div className="space-y-4">
                <h2 className="font-display text-2xl font-bold">Overview</h2>
                <p className="text-foreground leading-relaxed">
                  {destination.description || `Discover the natural beauty and cultural richness of ${destination.name} in ${destination.location}. This destination offers unique experiences and breathtaking views of the Himalayan mountains.`}
                </p>
              </div>

              {/* Highlights */}
              {destination.highlights && destination.highlights.length > 0 && (
                <div className="space-y-4">
                  <h2 className="font-display text-2xl font-bold">Highlights</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {destination.highlights.map((highlight, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 bg-secondary/30 border border-secondary/50 rounded-lg p-4"
                      >
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="font-medium text-foreground">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Amenities */}
              {destination.amenities && destination.amenities.length > 0 && (
                <div className="space-y-4">
                  <h2 className="font-display text-2xl font-bold">Amenities</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {destination.amenities.map((amenity, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 bg-card border border-border/50 rounded-lg p-4"
                      >
                        <Zap className="w-5 h-5 text-accent flex-shrink-0" />
                        <span className="text-foreground">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Vibes & Characteristics */}
              <div className="space-y-4">
                <h2 className="font-display text-2xl font-bold">Trek Characteristics</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {destination.vibes && destination.vibes.length > 0 && (
                    <div className="bg-card border border-border/50 rounded-xl p-5">
                      <p className="text-sm text-muted-foreground mb-2">Mood / Vibe</p>
                      <div className="flex flex-wrap gap-2">
                        {destination.vibes.map((vibe) => (
                          <Badge key={vibe} variant="secondary">
                            {vibe}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="bg-card border border-border/50 rounded-xl p-5">
                    <p className="text-sm text-muted-foreground mb-2">Group Friendly</p>
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-primary" />
                      <Badge variant="outline" className="text-green-600">
                        {destination.group_friendly ? 'Yes' : 'No'}
                      </Badge>
                    </div>
                  </div>

                  <div className="bg-card border border-border/50 rounded-xl p-5">
                    <p className="text-sm text-muted-foreground mb-2">Carbon Impact</p>
                    <div className="flex items-center gap-2">
                      <Leaf className={`w-5 h-5 ${carbonImpact.color}`} />
                      <Badge variant="outline" className={carbonImpact.color}>
                        {carbonImpact.label} Impact
                      </Badge>
                    </div>
                  </div>

                  <div className="bg-card border border-border/50 rounded-xl p-5">
                    <p className="text-sm text-muted-foreground mb-2">Cost Range</p>
                    <div className="flex items-center gap-2">
                      <span className="font-display font-bold text-primary">
                        {formatCurrency(destination.cost_budget)} - {formatCurrency(destination.cost_luxury)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Travel Agencies */}
              <div>
                <TravelAgencies trekSpecializations={[destination.name]} />
              </div>
            </div>

            {/* Right Column - Booking Form */}
            <div className="lg:col-span-1">
              <div className="sticky top-20">
                <BookingForm trekName={destination.name} trekPrice={destination.cost_medium} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DestinationDetail;
