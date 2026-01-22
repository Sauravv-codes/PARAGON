import { Mountain, Footprints, Zap, Camera, Leaf, Binoculars } from 'lucide-react';
import { Button } from '@/components/ui/button';

export type ActivityType = 'trekking' | 'hiking' | 'adventure' | 'sightseeing' | 'walking' | 'wildlife';

interface ActivitySelectorProps {
  selectedActivities: ActivityType[];
  onActivityChange: (activities: ActivityType[]) => void;
}

export const ActivitySelector = ({ selectedActivities, onActivityChange }: ActivitySelectorProps) => {
  const activities: Array<{ id: ActivityType; label: string; icon: React.ReactNode; description: string }> = [
    {
      id: 'trekking',
      label: 'Trekking',
      icon: <Mountain className="w-6 h-6" />,
      description: 'Multi-day mountain expeditions',
    },
    {
      id: 'hiking',
      label: 'Hiking',
      icon: <Footprints className="w-6 h-6" />,
      description: 'Day-long nature walks',
    },
    {
      id: 'adventure',
      label: 'Adventure',
      icon: <Zap className="w-6 h-6" />,
      description: 'Extreme sports & challenges',
    },
    {
      id: 'sightseeing',
      label: 'Sightseeing',
      icon: <Camera className="w-6 h-6" />,
      description: 'Cultural & scenic spots',
    },
    {
      id: 'walking',
      label: 'Light Walking',
      icon: <Leaf className="w-6 h-6" />,
      description: 'Easy leisurely walks',
    },
    {
      id: 'wildlife',
      label: 'Wildlife & Nature',
      icon: <Binoculars className="w-6 h-6" />,
      description: 'Animal & bird watching',
    },
  ];

  const toggleActivity = (activityId: ActivityType) => {
    const updated = selectedActivities.includes(activityId)
      ? selectedActivities.filter((a) => a !== activityId)
      : [...selectedActivities, activityId];
    onActivityChange(updated);
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-display text-2xl font-bold mb-4">What's Your Travel Style?</h3>
        <p className="text-muted-foreground mb-6">
          Select one or more activities that interest you
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {activities.map((activity) => (
          <button
            key={activity.id}
            onClick={() => toggleActivity(activity.id)}
            className={`group relative p-6 rounded-xl border-2 transition-all duration-300 text-left ${
              selectedActivities.includes(activity.id)
                ? 'border-primary bg-primary/5 shadow-lg'
                : 'border-border/50 bg-card hover:border-primary/50'
            }`}
          >
            <div className={`transition-colors ${selectedActivities.includes(activity.id) ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'}`}>
              {activity.icon}
            </div>
            <h4 className="font-display font-semibold mt-3 text-foreground">
              {activity.label}
            </h4>
            <p className="text-sm text-muted-foreground mt-1">
              {activity.description}
            </p>
            {selectedActivities.includes(activity.id) && (
              <div className="absolute top-3 right-3 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
