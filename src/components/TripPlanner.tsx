import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Mountain, Footprints, Compass, Eye, Leaf, Wind,
  MapPin, DollarSign, Zap, AlertCircle, Check, TreePine, Waves,
  Users, Baby, Heart, AlertTriangle, Star, Home
} from 'lucide-react';
import { destinationsService, DestinationWithDetails } from '../services/supabaseService';
import { useCurrency } from '@/lib/CurrencyContext';
import { Link } from 'react-router-dom';
import React from 'react';

interface UserPreferences {
  activities: string[];
  naturePreference: string[];
  budget: 'low' | 'medium' | 'high';
  travelStyle: 'eco-friendly' | 'budget' | 'luxury';
  duration: number;
  travelers: number;
  hasChildren: boolean;
  hasElderly: boolean;
  groupType: 'solo' | 'couple' | 'family' | 'group';
  months: string[];
  season: 'peak' | 'off-season';
  interests: string[];
  transport: string;
}

interface TripPlannerProps {
  showAside?: boolean;
}

export const TripPlanner = ({ showAside = false }: TripPlannerProps) => {
  const [step, setStep] = useState<'activities' | 'preferences' | 'results'>('activities');
  const { format: formatCurrency } = useCurrency();
  const [prefs, setPrefs] = useState<UserPreferences>({
    activities: [],
    naturePreference: [],
    budget: 'medium',
    travelStyle: 'eco-friendly',
    duration: 5,
    travelers: 1,
    hasChildren: false,
    hasElderly: false,
    groupType: 'solo',
    months: [],
    season: 'peak',
    interests: [],
    transport: 'bus',
  });

  const [recommendations, setRecommendations] = useState<DestinationWithDetails[]>([]);
  const [loading, setLoading] = useState(false);
  const [allDestinations, setAllDestinations] = useState<DestinationWithDetails[]>([]);

  // Fetch destinations on mount
  useEffect(() => {
    const fetchDestinations = async () => {
      const data = await destinationsService.getAll();
      setAllDestinations(data);
    };
    fetchDestinations();
  }, []);

  const activities = [
    { id: 'trekking', label: 'Trekking', icon: Mountain },
    { id: 'hiking', label: 'Hiking', icon: Footprints },
    { id: 'adventure', label: 'Adventure', icon: Compass },
    { id: 'sightseeing', label: 'Sightseeing', icon: Eye },
    { id: 'walking', label: 'Light Walking', icon: Leaf },
    { id: 'wildlife', label: 'Wildlife & Nature', icon: Wind },
  ];

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const interests = ['Local Culture', 'Photography', 'Bird Watching', 'Eco-Tourism', 'Food', 'Festivals', 'Camping'];
  const transportOptions = ['Walking', 'Cycling', 'Public Bus', 'Shared Jeep', 'Flight'];

  const toggleActivity = (id: string) => {
    setPrefs(prev => ({
      ...prev,
      activities: prev.activities.includes(id)
        ? prev.activities.filter(a => a !== id)
        : [...prev.activities, id]
    }));
  };

  const toggleNature = (nature: string) => {
    setPrefs(prev => ({
      ...prev,
      naturePreference: prev.naturePreference.includes(nature)
        ? prev.naturePreference.filter(n => n !== nature)
        : [...prev.naturePreference, nature]
    }));
  };

  const toggleMonth = (month: string) => {
    setPrefs(prev => ({
      ...prev,
      months: prev.months.includes(month)
        ? prev.months.filter(m => m !== month)
        : [...prev.months, month]
    }));
  };

  const toggleInterest = (interest: string) => {
    setPrefs(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleGenerateRecommendations = () => {
    setLoading(true);
    
    // Filter destinations based on user preferences
    const filtered = allDestinations.filter((dest) => {
      // Check difficulty compatibility
      const difficultyMatch = 
        prefs.duration <= 3 ? dest.difficulty === 'Easy' :
        prefs.duration <= 10 ? dest.difficulty !== 'Challenging' :
        true;

      // Check group friendly
      const groupMatch = 
        prefs.hasChildren ? dest.children_friendly :
        prefs.hasElderly ? dest.elderly_friendly :
        true;

      // Check budget compatibility
      const budgetCost = 
        prefs.budget === 'low' ? dest.cost_budget :
        prefs.budget === 'medium' ? dest.cost_medium :
        dest.cost_luxury;

      // Check vibes match nature preferences
      const vibesMatch = 
        prefs.naturePreference.length === 0 ||
        (dest.vibes && dest.vibes.length > 0 &&
          prefs.naturePreference.some(pref => {
            if (pref === 'mountains') return true;
            if (pref === 'forests') return true;
            if (pref === 'lakes') return true;
            return false;
          }));

      // Check eco-score for eco-friendly preference
      const ecoMatch = 
        prefs.travelStyle === 'eco-friendly' ? dest.eco_score >= 70 :
        true;

      return difficultyMatch && groupMatch && vibesMatch && ecoMatch;
    });

    // Sort by rating and eco-score
    const sorted = filtered.sort((a, b) => {
      if (prefs.travelStyle === 'eco-friendly') {
        return b.eco_score - a.eco_score;
      }
      return b.rating - a.rating;
    });

    setRecommendations(sorted.slice(0, 6)); // Show top 6 recommendations
    setStep('results');
    setLoading(false);
  };

  return (
    <section className="py-16 px-6 bg-gradient-to-b from-background to-card">
      <div className="container mx-auto max-w-6xl">
        {showAside && (
          <aside className="hidden lg:block fixed right-6 top-28 w-72 bg-card border border-border rounded-lg p-4">
            <h4 className="font-semibold mb-2">Your Preferences</h4>
            <div className="text-sm text-muted-foreground space-y-2">
              <div><span className="font-medium">Activities:</span> {prefs.activities.length > 0 ? prefs.activities.join(', ') : '—'}</div>
              <div><span className="font-medium">Nature:</span> {prefs.naturePreference.length > 0 ? prefs.naturePreference.join(', ') : '—'}</div>
              <div><span className="font-medium">Budget:</span> {prefs.budget}</div>
              <div><span className="font-medium">Duration:</span> {prefs.duration} days</div>
              <div><span className="font-medium">Travelers:</span> {prefs.travelers}</div>
            </div>
          </aside>
        )}
        {/* Right-side sticky preferences summary for larger screens (rendered only when showAside=true) */}
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Plan Your Perfect Trip
          </h2>
          <p className="text-lg text-muted-foreground">
            Get personalized recommendations based on your preferences, budget, and interests
          </p>
        </div>

        <div className="bg-muted/10 p-6 rounded-xl border border-border/50">
        {/* Step 1: Activities */}
        {step === 'activities' && (
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mountain className="w-5 h-5" />
                  What activities interest you?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {activities.map(activity => {
                    const Icon = activity.icon;
                    const isSelected = prefs.activities.includes(activity.id);
                    return (
                      <button
                        key={activity.id}
                        onClick={() => toggleActivity(activity.id)}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          isSelected
                            ? 'border-primary bg-primary/10'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <Icon className="w-6 h-6 mx-auto mb-2" />
                        <p className="text-sm font-medium">{activity.label}</p>
                        {isSelected && <Check className="w-4 h-4 mx-auto mt-2 text-primary" />}
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Button
              onClick={() => setStep('preferences')}
              disabled={prefs.activities.length === 0}
              className="w-full md:w-auto"
            >
              Continue to Preferences →
            </Button>
          </div>
        )}
        </div>

        {/* Step 2: Preferences */}
        {step === 'preferences' && (
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Nature Preferences</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <button
                    onClick={() => toggleNature('mountains')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      prefs.naturePreference.includes('mountains')
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <Mountain className="w-6 h-6 mx-auto mb-2" />
                    <p className="text-sm font-medium">Mountains 🏔️</p>
                  </button>
                  <button
                    onClick={() => toggleNature('forests')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      prefs.naturePreference.includes('forests')
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <TreePine className="w-6 h-6 mx-auto mb-2" />
                    <p className="text-sm font-medium">Forests 🌲</p>
                  </button>
                  <button
                    onClick={() => toggleNature('lakes')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      prefs.naturePreference.includes('lakes')
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <Waves className="w-6 h-6 mx-auto mb-2" />
                    <p className="text-sm font-medium">Lakes 🌊</p>
                  </button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Budget & Style</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-3 block">Estimated Budget</label>
                  <div className="flex flex-col gap-3">
                    {(['low', 'medium', 'high'] as const).map(b => {
                      const ranges: Record<'low' | 'medium' | 'high', [number, number | null, string]> = {
                        low: [5000, 15000, 'Budget-friendly accommodations & local transport'],
                        medium: [15001, 40000, 'Mid-range hotels, guided tours & comfort'],
                        high: [40001, null, 'Luxury stays, private guides & premium experiences'],
                      };
                      const [min, max, desc] = ranges[b];
                      return (
                        <button
                          key={b}
                          onClick={() => setPrefs(p => ({ ...p, budget: b }))}
                          className={`p-4 rounded-lg border-2 transition-all text-left ${
                            prefs.budget === b
                              ? 'border-primary bg-primary/10'
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="capitalize font-semibold">{b === 'low' ? '💰' : b === 'medium' ? '💰💰' : '💰💰💰'} {b}</p>
                              <p className="text-xs text-muted-foreground mt-1">{desc}</p>
                            </div>
                            <p className="text-sm font-medium">{formatCurrency(min)} {max ? `- ${formatCurrency(max)}` : '+'}/day</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-3 block">Travel Style</label>
                  <div className="flex gap-4">
                    {(['eco-friendly', 'budget', 'luxury'] as const).map(s => (
                      <button
                        key={s}
                        onClick={() => setPrefs(p => ({ ...p, travelStyle: s }))}
                        className={`px-4 py-2 rounded-lg border-2 transition-all capitalize ${
                          prefs.travelStyle === s
                            ? 'border-primary bg-primary/10'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        {s === 'eco-friendly' ? '🌱' : s === 'budget' ? '💰' : '👑'} {s.replace('-', ' ')}
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Duration & Group</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-3 block">Duration (days): {prefs.duration}</label>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    value={prefs.duration}
                    onChange={e => setPrefs(p => ({ ...p, duration: parseInt(e.target.value) }))}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-3 block">Number of Travelers: {prefs.travelers}</label>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={prefs.travelers}
                    onChange={e => setPrefs(p => ({ ...p, travelers: parseInt(e.target.value) }))}
                    className="w-full"
                  />
                </div>

                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={prefs.hasChildren}
                      onChange={e => setPrefs(p => ({ ...p, hasChildren: e.target.checked }))}
                    />
                    <Baby className="w-4 h-4" />
                    Has Children
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={prefs.hasElderly}
                      onChange={e => setPrefs(p => ({ ...p, hasElderly: e.target.checked }))}
                    />
                    <Heart className="w-4 h-4" />
                    Has Elderly
                  </label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Time of Visit</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-3 block">Preferred Months</label>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                    {months.map(month => (
                      <button
                        key={month}
                        onClick={() => toggleMonth(month)}
                        className={`p-2 rounded text-xs font-medium transition-all ${
                          prefs.months.includes(month)
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted hover:bg-muted/80'
                        }`}
                      >
                        {month.slice(0, 3)}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-3 block">Season</label>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setPrefs(p => ({ ...p, season: 'peak' }))}
                      className={`px-4 py-2 rounded-lg border-2 ${
                        prefs.season === 'peak'
                          ? 'border-primary bg-primary/10'
                          : 'border-border'
                      }`}
                    >
                      Peak Season (Festivals)
                    </button>
                    <button
                      onClick={() => setPrefs(p => ({ ...p, season: 'off-season' }))}
                      className={`px-4 py-2 rounded-lg border-2 ${
                        prefs.season === 'off-season'
                          ? 'border-primary bg-primary/10'
                          : 'border-border'
                      }`}
                    >
                      Off-Season (Less Crowded)
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Special Interests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {interests.map(interest => (
                    <button
                      key={interest}
                      onClick={() => toggleInterest(interest)}
                      className={`p-2 rounded text-sm font-medium transition-all ${
                        prefs.interests.includes(interest)
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted hover:bg-muted/80'
                      }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={() => setStep('activities')}
                className="w-full md:w-auto"
              >
                ← Back
              </Button>
              <Button
                onClick={handleGenerateRecommendations}
                className="w-full md:w-auto"
              >
                Generate Recommendations →
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Results */}
        {step === 'results' && (
          <div className="space-y-8">
            {loading ? (
              <div className="text-center py-16">
                <div className="inline-block">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
                <p className="text-muted-foreground mt-4">Finding perfect destinations...</p>
              </div>
            ) : recommendations.length > 0 ? (
              <>
                <div>
                  <h3 className="text-2xl font-bold mb-4">Your Personalized Recommendations</h3>
                  <p className="text-muted-foreground mb-6">
                    Based on your preferences, we found {recommendations.length} destinations that match your interests.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recommendations.map((dest) => (
                    <Card key={dest.id} className="overflow-hidden hover:shadow-elevated transition-shadow">
                      <div className="relative h-40 overflow-hidden">
                        <img
                          src={dest.image_url}
                          alt={dest.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                          ⭐ {dest.rating}
                        </div>
                      </div>

                      <CardContent className="p-4 space-y-3">
                        <div>
                          <h3 className="font-display text-lg font-bold">{dest.name}</h3>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <MapPin className="w-4 h-4" /> {dest.location}
                          </p>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-3 gap-2 py-2 border-y text-xs">
                          <div className="text-center">
                            <p className="text-muted-foreground">Difficulty</p>
                            <p className="font-semibold">{dest.difficulty}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-muted-foreground">Altitude</p>
                            <p className="font-semibold">{dest.altitude}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-muted-foreground">Eco Score</p>
                            <p className="font-semibold text-green-600">{dest.eco_score}</p>
                          </div>
                        </div>

                        {/* Vibes */}
                        {dest.vibes && dest.vibes.length > 0 && (
                          <div>
                            <p className="text-xs font-semibold mb-2">Mood / Vibe</p>
                            <div className="flex flex-wrap gap-1">
                              {dest.vibes.map((vibe) => (
                                <Badge key={vibe} variant="secondary" className="text-xs">
                                  {vibe}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Carbon Footprint */}
                        <div>
                          <p className="text-xs font-semibold mb-1 flex items-center gap-1">
                            <Zap className="w-3 h-3" /> Carbon
                          </p>
                          <Badge className={dest.carbon_footprint === 'low' ? 'bg-green-600 text-xs' : dest.carbon_footprint === 'medium' ? 'bg-yellow-600 text-xs' : 'bg-red-600 text-xs'}>
                            {dest.carbon_footprint}
                          </Badge>
                        </div>

                        {/* Cost Range */}
                        <div>
                          <p className="text-xs font-semibold mb-1 flex items-center gap-1">
                            <DollarSign className="w-3 h-3" /> Cost (per person)
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatCurrency(dest.cost_budget)} - {formatCurrency(dest.cost_luxury)}
                          </p>
                        </div>

                        {/* Group Compatibility */}
                        <div className="text-xs space-y-1">
                          {prefs.hasChildren && dest.children_friendly && <p className="text-green-600">✓ Good for children</p>}
                          {prefs.hasElderly && dest.elderly_friendly && <p className="text-green-600">✓ Accessible for elderly</p>}
                          {dest.group_friendly && <p className="text-green-600">✓ Group friendly</p>}
                        </div>

                        <Button
                          className="w-full mt-2"
                          size="sm"
                          asChild
                        >
                          <Link
                            to={`/destination/${dest.id}`}
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                          >
                            Learn More
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="flex gap-4 justify-center">
                  <Button
                    variant="outline"
                    onClick={() => setStep('preferences')}
                  >
                    ← Modify Preferences
                  </Button>
                  <Button
                    onClick={() => setStep('activities')}
                  >
                    Start Over
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <Mountain className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
                <h3 className="text-xl font-display font-semibold mb-2">No matching destinations found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your preferences to discover more adventures
                </p>
                <Button onClick={() => setStep('preferences')}>
                  Modify Preferences
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
