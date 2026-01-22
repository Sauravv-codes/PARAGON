import { useState } from 'react';
import { MapPin, DollarSign, Calendar, Users, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { useCurrency } from '@/lib/CurrencyContext';
import type { NaturePreference, BudgetLevel, TravelStyle, GroupType, ActivityType } from '@/data/destinations';

export interface UserPreferences {
  activities: ActivityType[];
  naturePreferences: NaturePreference[];
  budget: BudgetLevel;
  travelStyle: TravelStyle;
  duration: number;
  transportPreference?: string;
  groupType: GroupType;
  groupSize: number;
  hasChildren: boolean;
  hasElderly: boolean;
  specialNeeds: string;
  preferredMonths: string[];
  crowdPreference: 'peak' | 'offseason';
  interests: string[];
}

interface UserPreferencesFormProps {
  onSubmit: (preferences: UserPreferences) => void;
  selectedActivities: ActivityType[];
}

export const UserPreferencesForm = ({ onSubmit, selectedActivities }: UserPreferencesFormProps) => {
  const [formData, setFormData] = useState<UserPreferences>({
    activities: selectedActivities,
    naturePreferences: [],
    budget: 'medium',
    travelStyle: 'eco-friendly',
    duration: 5,
    groupType: 'solo',
    groupSize: 1,
    hasChildren: false,
    hasElderly: false,
    specialNeeds: '',
    preferredMonths: [],
    crowdPreference: 'peak',
    interests: [],
  });

  const { format: formatCurrency } = useCurrency();

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const interestOptions = ['Photography', 'Bird Watching', 'Culture & Festivals', 'Adventure', 'Relaxation', 'Local Cuisine', 'Art & History'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    if (type === 'checkbox') {
      if (name === 'preferredMonths') {
        setFormData((prev) => ({
          ...prev,
          preferredMonths: checked
            ? [...prev.preferredMonths, value]
            : prev.preferredMonths.filter((m) => m !== value),
        }));
      } else if (name === 'interests') {
        setFormData((prev) => ({
          ...prev,
          interests: checked
            ? [...prev.interests, value]
            : prev.interests.filter((i) => i !== value),
        }));
      } else {
        setFormData((prev) => ({ ...prev, [name]: checked }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: name === 'duration' || name === 'groupSize' ? parseInt(value) : value,
      }));
    }
  };

  const toggleNaturePreference = (preference: NaturePreference) => {
    setFormData((prev) => ({
      ...prev,
      naturePreferences: prev.naturePreferences.includes(preference)
        ? prev.naturePreferences.filter((p) => p !== preference)
        : [...prev.naturePreferences, preference],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.activities.length === 0) {
      toast({
        title: 'Select Activities',
        description: 'Please select at least one activity.',
        variant: 'destructive',
      });
      return;
    }

    if (formData.naturePreferences.length === 0) {
      toast({
        title: 'Select Nature Preference',
        description: 'Please select at least one nature preference.',
        variant: 'destructive',
      });
      return;
    }

    if (formData.preferredMonths.length === 0) {
      toast({
        title: 'Select Months',
        description: 'Please select at least one preferred month.',
        variant: 'destructive',
      });
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-card rounded-2xl p-8 border border-border/50">
      {/* Nature Preference */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary" />
          <h3 className="font-display text-xl font-bold">Nature Preference</h3>
        </div>
        <p className="text-muted-foreground text-sm">What type of scenery appeals to you?</p>
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: 'mountains' as NaturePreference, label: '🏔️ Mountains', name: 'Mountains' },
            { id: 'forests' as NaturePreference, label: '🌲 Forests', name: 'Forests' },
            { id: 'lakes' as NaturePreference, label: '🌊 Lakes', name: 'Lakes' },
          ].map((pref) => (
            <button
              key={pref.id}
              type="button"
              onClick={() => toggleNaturePreference(pref.id)}
              className={`p-3 rounded-lg border-2 transition-all text-sm font-medium ${
                formData.naturePreferences.includes(pref.id)
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border/50 text-muted-foreground hover:border-primary/50'
              }`}
            >
              {pref.label}
            </button>
          ))}
        </div>
      </div>

      {/* Budget */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-primary" />
          <h3 className="font-display text-xl font-bold">Budget</h3>
        </div>
        <p className="text-muted-foreground text-sm">Select your estimated budget per day</p>
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: 'low', label: `💰 Low (${formatCurrency(5000)} - ${formatCurrency(15000)})`, desc: `Approx ${formatCurrency(5000)} - ${formatCurrency(15000)} per day` },
            { id: 'medium', label: `💵 Medium (${formatCurrency(15001)} - ${formatCurrency(40000)})`, desc: `Approx ${formatCurrency(15001)} - ${formatCurrency(40000)} per day` },
            { id: 'high', label: `💎 High (${formatCurrency(40001)}+)`, desc: `Approx ${formatCurrency(40001)} and above per day` },
          ].map((budget) => (
            <label key={budget.id} className="relative">
              <input
                type="radio"
                name="budget"
                value={budget.id}
                checked={formData.budget === budget.id}
                onChange={handleInputChange}
                className="sr-only"
              />
              <div
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  formData.budget === budget.id
                    ? 'border-primary bg-primary/10'
                    : 'border-border/50 hover:border-primary/50'
                }`}
              >
                <p className="font-medium">{budget.label}</p>
                <p className="text-xs text-muted-foreground">{budget.desc}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Travel Style */}
      <div className="space-y-4">
        <h3 className="font-display text-xl font-bold">Travel Style</h3>
        <p className="text-muted-foreground text-sm">How do you prefer to travel?</p>
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: 'eco-friendly', label: '🌱 Eco-Friendly', desc: 'Sustainable choices' },
            { id: 'budget', label: '💰 Budget', desc: 'Cost-effective' },
            { id: 'luxury', label: '✨ Luxury', desc: 'Comfort & convenience' },
          ].map((style) => (
            <label key={style.id} className="relative">
              <input
                type="radio"
                name="travelStyle"
                value={style.id}
                checked={formData.travelStyle === style.id}
                onChange={handleInputChange}
                className="sr-only"
              />
              <div
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  formData.travelStyle === style.id
                    ? 'border-primary bg-primary/10'
                    : 'border-border/50 hover:border-primary/50'
                }`}
              >
                <p className="font-medium">{style.label}</p>
                <p className="text-xs text-muted-foreground">{style.desc}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Duration */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          <h3 className="font-display text-xl font-bold">Trip Duration</h3>
        </div>
        <div className="flex items-center gap-4">
          <input
            type="range"
            name="duration"
            min="1"
            max="30"
            value={formData.duration}
            onChange={handleInputChange}
            className="flex-1"
          />
          <div className="bg-primary/10 border border-primary/30 rounded-lg px-4 py-2 min-w-24 text-center">
            <p className="font-display font-bold text-primary">{formData.duration} days</p>
          </div>
        </div>
      </div>

      {/* Group Information */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          <h3 className="font-display text-xl font-bold">Travel Group</h3>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Type of Trip</label>
          <select
            name="groupType"
            value={formData.groupType}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg border border-border bg-background"
          >
            <option value="solo">Solo Travel</option>
            <option value="couple">Couple</option>
            <option value="family">Family</option>
            <option value="group">Group / Friends</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Number of Travelers</label>
          <input
            type="number"
            name="groupSize"
            min="1"
            max="20"
            value={formData.groupSize}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg border border-border bg-background"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="hasChildren"
              checked={formData.hasChildren}
              onChange={handleInputChange}
              className="w-4 h-4"
            />
            <span className="text-sm">Group includes children (under 12)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="hasElderly"
              checked={formData.hasElderly}
              onChange={handleInputChange}
              className="w-4 h-4"
            />
            <span className="text-sm">Group includes elderly (over 60)</span>
          </label>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Special Needs or Requirements</label>
          <textarea
            name="specialNeeds"
            value={formData.specialNeeds}
            onChange={handleInputChange}
            placeholder="E.g., wheelchair accessibility, dietary restrictions, mobility issues..."
            className="w-full px-4 py-2 rounded-lg border border-border bg-background text-sm resize-none"
            rows={3}
          />
        </div>
      </div>

      {/* Time of Visit */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          <h3 className="font-display text-xl font-bold">Time of Visit</h3>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Preferred Months (select at least one)</label>
          <div className="grid grid-cols-4 gap-2">
            {months.map((month) => (
              <label key={month} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="preferredMonths"
                  value={month}
                  checked={formData.preferredMonths.includes(month)}
                  onChange={handleInputChange}
                  className="w-4 h-4"
                />
                <span className="text-sm">{month.slice(0, 3)}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Season Preference</label>
          <div className="flex gap-3">
            {[
              { id: 'peak', label: '🎉 Peak Season', desc: 'Festivals & events' },
              { id: 'offseason', label: '🌤️ Off-Season', desc: 'Less crowded' },
            ].map((season) => (
              <label key={season.id} className="flex-1">
                <input
                  type="radio"
                  name="crowdPreference"
                  value={season.id}
                  checked={formData.crowdPreference === season.id}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                <div
                  className={`p-3 rounded-lg border-2 cursor-pointer transition-all text-center ${
                    formData.crowdPreference === season.id
                      ? 'border-primary bg-primary/10'
                      : 'border-border/50 hover:border-primary/50'
                  }`}
                >
                  <p className="font-medium text-sm">{season.label}</p>
                  <p className="text-xs text-muted-foreground">{season.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Special Interests */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" />
          <h3 className="font-display text-xl font-bold">Special Interests</h3>
        </div>
        <p className="text-muted-foreground text-sm">Select interests that matter to you</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {interestOptions.map((interest) => (
            <label key={interest} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="interests"
                value={interest}
                checked={formData.interests.includes(interest)}
                onChange={handleInputChange}
                className="w-4 h-4"
              />
              <span className="text-sm">{interest}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <Button type="submit" size="lg" className="w-full h-12 text-base font-semibold">
        Get Personalized Recommendations
      </Button>
    </form>
  );
};
