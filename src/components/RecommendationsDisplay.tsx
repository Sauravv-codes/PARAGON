import { MapPin, AlertTriangle, Leaf, Footprints, Clock, Users, DollarSign, Zap, Lightbulb, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Destination } from '@/data/destinations';

interface RecommendationsDisplayProps {
  recommendations: Destination[];
}

const EcoScoreBadge = ({ score }: { score: number }) => {
  const getColor = () => {
    if (score >= 80) return 'bg-green-100 text-green-800 border-green-200';
    if (score >= 60) return 'bg-lime-100 text-lime-800 border-lime-200';
    return 'bg-amber-100 text-amber-800 border-amber-200';
  };

  const stars = Math.round(score / 20);

  return (
    <div className={`px-3 py-1 rounded-full border ${getColor()} text-sm font-semibold flex items-center gap-1`}>
      <span>{'⭐'.repeat(stars)}{'☆'.repeat(5 - stars)}</span>
      <span>{score}/100</span>
    </div>
  );
};

const CarbonFootprintBadge = ({ level }: { level: 'low' | 'medium' | 'high' }) => {
  const config = {
    low: { color: 'bg-green-100 text-green-800 border-green-200', emoji: '🟢' },
    medium: { color: 'bg-amber-100 text-amber-800 border-amber-200', emoji: '🟡' },
    high: { color: 'bg-red-100 text-red-800 border-red-200', emoji: '🔴' },
  };

  const { color, emoji } = config[level];

  return (
    <div className={`px-3 py-1 rounded-full border ${color} text-sm font-semibold flex items-center gap-1`}>
      <span>{emoji}</span>
      <span className="capitalize">{level} Carbon Impact</span>
    </div>
  );
};

export const RecommendationsDisplay = ({ recommendations }: RecommendationsDisplayProps) => {
  if (recommendations.length === 0) {
    return (
      <div className="text-center py-12 bg-secondary/20 border border-border/50 rounded-xl">
        <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">No destinations match your preferences. Try adjusting your filters.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20 rounded-xl p-6">
        <h2 className="font-display text-3xl font-bold mb-2">Your Personalized Recommendations</h2>
        <p className="text-muted-foreground">
          {recommendations.length} destination{recommendations.length !== 1 ? 's' : ''} perfect for your travel style
        </p>
      </div>

      <div className="grid gap-8">
        {recommendations.map((destination, idx) => (
          <div
            key={destination.id}
            className="group bg-card border border-border/50 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300"
          >
            {/* Header with Image */}
            <div className="relative h-64 md:h-80 overflow-hidden bg-gradient-to-b from-primary/10 to-background">
              <img
                src={destination.image}
                alt={destination.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              {/* Badge */}
              <div className="absolute top-4 left-4">
                <Badge className="bg-accent text-accent-foreground">{idx + 1} Recommended</Badge>
              </div>

              {/* Location */}
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="font-display text-3xl font-bold text-white mb-2">{destination.name}</h3>
                <div className="flex items-center gap-2 text-white">
                  <MapPin className="w-5 h-5" />
                  <span>{destination.location}</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-secondary/30 border border-secondary/50 rounded-lg p-4 text-center">
                  <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">Difficulty</p>
                  <p className="font-display font-bold text-foreground">{destination.difficulty}</p>
                </div>
                <div className="bg-secondary/30 border border-secondary/50 rounded-lg p-4 text-center">
                  <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">Duration</p>
                  <p className="font-display font-bold text-foreground">{destination.duration.min}-{destination.duration.max} days</p>
                </div>
                <div className="bg-secondary/30 border border-secondary/50 rounded-lg p-4 text-center">
                  <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">Rating</p>
                  <p className="font-display font-bold text-foreground">⭐ {destination.rating}</p>
                </div>
                <div className="bg-secondary/30 border border-secondary/50 rounded-lg p-4 text-center">
                  <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">Reviews</p>
                  <p className="font-display font-bold text-foreground">{destination.reviews} reviews</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-foreground leading-relaxed">{destination.description}</p>

              {/* Eco-Friendliness & Carbon */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-semibold text-muted-foreground mb-2 flex items-center gap-1">
                    <Leaf className="w-4 h-4" />
                    Eco-Friendliness Score
                  </p>
                  <EcoScoreBadge score={destination.ecoScore} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-muted-foreground mb-2 flex items-center gap-1">
                    <Zap className="w-4 h-4" />
                    Carbon Footprint
                  </p>
                  <CarbonFootprintBadge level={destination.carbonFootprint} />
                </div>
              </div>

              {/* Cost Breakdown */}
              <div>
                <h4 className="font-display font-bold mb-3 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-primary" />
                  Estimated Cost (per person)
                </h4>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'Budget', price: destination.estimatedCost.budget },
                    { label: 'Medium', price: destination.estimatedCost.medium },
                    { label: 'Luxury', price: destination.estimatedCost.luxury },
                  ].map((cost) => (
                    <div key={cost.label} className="bg-secondary/30 border border-secondary/50 rounded-lg p-4 text-center">
                      <p className="text-xs text-muted-foreground mb-1">{cost.label}</p>
                      <p className="font-display font-bold text-primary text-lg">₹{cost.price}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Activities */}
              <div>
                <h4 className="font-display font-bold mb-3 flex items-center gap-2">
                  <Footprints className="w-5 h-5 text-primary" />
                  Activities & Experiences
                </h4>
                <div className="flex flex-wrap gap-2">
                  {destination.activities_list.map((activity) => (
                    <Badge key={activity} variant="secondary">
                      {activity}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Best Time to Visit */}
              <div>
                <h4 className="font-display font-bold mb-3 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Best Time to Visit
                </h4>
                <div className="flex flex-wrap gap-2">
                  {destination.bestMonths.map((month) => (
                    <Badge key={month} variant="outline">
                      {month}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Group Accessibility */}
              <div>
                <h4 className="font-display font-bold mb-3 flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Group & Accessibility
                </h4>
                <div className="space-y-2 text-sm">
                  {destination.groupFriendly && (
                    <p className="flex items-center gap-2 text-green-700">
                      <span>✓</span> Great for group travel
                    </p>
                  )}
                  {destination.childrenFriendly && (
                    <p className="flex items-center gap-2 text-green-700">
                      <span>✓</span> Family-friendly with children
                    </p>
                  )}
                  {destination.elderlyFriendly && (
                    <p className="flex items-center gap-2 text-green-700">
                      <span>✓</span> Suitable for seniors
                    </p>
                  )}
                  {!destination.childrenFriendly && (
                    <p className="flex items-center gap-2 text-amber-700">
                      <span>⚠️</span> Not recommended for young children
                    </p>
                  )}
                  {destination.accessibilityNotes && (
                    <p className="text-muted-foreground italic mt-2">📝 {destination.accessibilityNotes}</p>
                  )}
                </div>
              </div>

              {/* Accommodations */}
              <div>
                <h4 className="font-display font-bold mb-3">Accommodation Options</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {destination.accommodations.map((acc, idx) => (
                    <div key={idx} className="border border-border/50 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold">{acc.name}</p>
                          <p className="text-sm text-muted-foreground capitalize">{acc.type}</p>
                        </div>
                        <Badge variant="outline" className="text-xs">{acc.priceRange}</Badge>
                      </div>
                      {acc.ecoFriendly && (
                        <Badge variant="secondary" className="mb-2 text-xs gap-1">
                          <Leaf className="w-3 h-3" />
                          Eco-Friendly
                        </Badge>
                      )}
                      <div className="flex flex-wrap gap-1 mt-2">
                        {acc.amenities.map((amenity) => (
                          <span key={amenity} className="text-xs px-2 py-1 bg-secondary/30 rounded text-muted-foreground">
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sustainable Tips */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6">
                <h4 className="font-display font-bold mb-3 flex items-center gap-2 text-green-900">
                  <Lightbulb className="w-5 h-5" />
                  Sustainable Travel Tips 📘
                </h4>
                <ul className="space-y-2">
                  {destination.sustainableTips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-green-900">
                      <span className="text-green-600 font-bold mt-0.5">→</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Warnings */}
              {(destination.warnings.length > 0 || destination.healthAdvisories.length > 0) && (
                <div className="bg-gradient-to-r from-amber-50 to-red-50 border border-amber-200 rounded-lg p-6">
                  <h4 className="font-display font-bold mb-3 flex items-center gap-2 text-amber-900">
                    <AlertTriangle className="w-5 h-5" />
                    Important Notes & Warnings
                  </h4>
                  <div className="space-y-2 text-sm">
                    {destination.warnings.map((warning, idx) => (
                      <p key={`warning-${idx}`} className="flex items-start gap-2 text-amber-900">
                        <span className="text-amber-600 font-bold">⚠️</span>
                        <span>{warning}</span>
                      </p>
                    ))}
                    {destination.healthAdvisories.map((advisory, idx) => (
                      <p key={`advisory-${idx}`} className="flex items-start gap-2 text-amber-900">
                        <span className="text-red-600 font-bold">🏥</span>
                        <span>{advisory}</span>
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {/* Transport Cost Reference */}
              <div className="bg-secondary/20 border border-secondary/50 rounded-lg p-4">
                <p className="text-xs font-semibold text-muted-foreground uppercase mb-3">Transport Cost Reference</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                  {[
                    { name: 'Walking', cost: destination.transportCost.walking },
                    { name: 'Bus', cost: destination.transportCost.bus },
                    { name: 'Jeep', cost: destination.transportCost.jeep },
                    { name: 'Flight', cost: destination.transportCost.flight },
                  ].map((transport) => (
                    <div key={transport.name} className="text-center">
                      <p className="text-muted-foreground">{transport.name}</p>
                      <p className="font-semibold">₹{transport.cost}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
