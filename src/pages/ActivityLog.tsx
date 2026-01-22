import { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Calendar, MapPin, Star, MessageSquare, Heart, Bookmark, Download, Filter, Search
} from 'lucide-react';

interface Activity {
  id: string;
  type: 'trek_completed' | 'booking_made' | 'review_posted' | 'trek_bookmarked' | 'preferences_updated';
  title: string;
  description: string;
  destination?: string;
  rating?: number;
  date: string;
  timestamp: Date;
  icon: React.ReactNode;
  color: string;
}

const ActivityLog = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [filteredActivities, setFilteredActivities] = useState<Activity[]>([]);
  const [activeSection, setActiveSection] = useState('activity-log');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | Activity['type']>('all');

  // Mock data - in a real app, this would come from Supabase
  useEffect(() => {
    const mockActivities: Activity[] = [
      {
        id: '1',
        type: 'trek_completed',
        title: 'Completed Langtang Valley Trek',
        description: 'Successfully completed the 7-day Langtang Valley Trek at 3,870m',
        destination: 'Langtang Valley Trek',
        date: '2026-01-20',
        timestamp: new Date('2026-01-20'),
        icon: '✓',
        color: 'bg-green-100 text-green-800',
      },
      {
        id: '2',
        type: 'review_posted',
        title: 'Posted Review: Khopra Ridge Trek',
        description: 'Shared a 5-star review about your amazing experience with the hidden gem trek',
        destination: 'Khopra Ridge Trek',
        rating: 5,
        date: '2026-01-19',
        timestamp: new Date('2026-01-19'),
        icon: '⭐',
        color: 'bg-yellow-100 text-yellow-800',
      },
      {
        id: '3',
        type: 'booking_made',
        title: 'Booking Confirmed: Annapurna Base Camp',
        description: 'You booked a 10-14 day trek to Annapurna Base Camp',
        destination: 'Annapurna Base Camp Trek',
        date: '2026-01-18',
        timestamp: new Date('2026-01-18'),
        icon: '🎫',
        color: 'bg-blue-100 text-blue-800',
      },
      {
        id: '4',
        type: 'trek_bookmarked',
        title: 'Added to Favorites: Everest Base Camp',
        description: 'Saved Everest Base Camp Trek to your favorites list',
        destination: 'Everest Base Camp Trek',
        date: '2026-01-17',
        timestamp: new Date('2026-01-17'),
        icon: '❤️',
        color: 'bg-red-100 text-red-800',
      },
      {
        id: '5',
        type: 'preferences_updated',
        title: 'Updated Travel Preferences',
        description: 'Modified your eco-friendly travel preferences and budget settings',
        date: '2026-01-16',
        timestamp: new Date('2026-01-16'),
        icon: '⚙️',
        color: 'bg-purple-100 text-purple-800',
      },
      {
        id: '6',
        type: 'review_posted',
        title: 'Posted Review: Pokhara Lake & Mountain Views',
        description: 'Shared a 4-star review about the beautiful lakeside experience',
        destination: 'Pokhara Lake & Mountain Views',
        rating: 4,
        date: '2026-01-15',
        timestamp: new Date('2026-01-15'),
        icon: '⭐',
        color: 'bg-yellow-100 text-yellow-800',
      },
      {
        id: '7',
        type: 'booking_made',
        title: 'Booking Confirmed: Chitwan National Park Safari',
        description: 'You booked a 2-4 day wildlife safari experience',
        destination: 'Chitwan National Park Safari',
        date: '2026-01-14',
        timestamp: new Date('2026-01-14'),
        icon: '🎫',
        color: 'bg-blue-100 text-blue-800',
      },
      {
        id: '8',
        type: 'trek_bookmarked',
        title: 'Added to Favorites: Manaslu Circuit',
        description: 'Saved Manaslu Circuit Trek to your favorites list',
        destination: 'Manaslu Circuit Trek',
        date: '2026-01-13',
        timestamp: new Date('2026-01-13'),
        icon: '❤️',
        color: 'bg-red-100 text-red-800',
      },
    ];

    setActivities(mockActivities);
    setFilteredActivities(mockActivities);
  }, []);

  // Filter and search activities
  useEffect(() => {
    let result = activities;

    // Apply type filter
    if (selectedFilter !== 'all') {
      result = result.filter(activity => activity.type === selectedFilter);
    }

    // Apply search filter
    if (searchTerm) {
      result = result.filter(activity =>
        activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (activity.destination && activity.destination.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredActivities(result);
  }, [searchTerm, selectedFilter, activities]);

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'trek_completed':
        return <Calendar className="w-5 h-5" />;
      case 'booking_made':
        return <Bookmark className="w-5 h-5" />;
      case 'review_posted':
        return <MessageSquare className="w-5 h-5" />;
      case 'trek_bookmarked':
        return <Heart className="w-5 h-5" />;
      case 'preferences_updated':
        return <Filter className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const getActivityLabel = (type: Activity['type']) => {
    switch (type) {
      case 'trek_completed':
        return 'Trek Completed';
      case 'booking_made':
        return 'Booking Made';
      case 'review_posted':
        return 'Review Posted';
      case 'trek_bookmarked':
        return 'Trek Bookmarked';
      case 'preferences_updated':
        return 'Preferences Updated';
      default:
        return 'Activity';
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return `Today at ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
    } else if (date.toDateString() === yesterday.toDateString()) {
      return `Yesterday at ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
  };

  const exportActivities = () => {
    const csvContent = [
      ['Date', 'Type', 'Title', 'Description', 'Destination'].join(','),
      ...filteredActivities.map(a =>
        [a.date, a.type, a.title, a.description, a.destination || 'N/A'].join(',')
      )
    ].join('\n');

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent));
    element.setAttribute('download', `activity-log-${new Date().toISOString().split('T')[0]}.csv`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeSection={activeSection} onNavigate={() => {}} />

      {/* Header */}
      <div className="pt-32 pb-16 px-6 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto max-w-7xl text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Your Activity Log
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Track all your trek bookings, reviews, and adventure updates in one place
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-12 px-6">
        <div className="container mx-auto max-w-5xl">
          {/* Controls */}
          <div className="space-y-4 mb-8">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search activities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Filters and Export */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedFilter === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedFilter('all')}
                >
                  All Activities
                </Button>
                <Button
                  variant={selectedFilter === 'trek_completed' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedFilter('trek_completed')}
                >
                  Completed
                </Button>
                <Button
                  variant={selectedFilter === 'booking_made' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedFilter('booking_made')}
                >
                  Bookings
                </Button>
                <Button
                  variant={selectedFilter === 'review_posted' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedFilter('review_posted')}
                >
                  Reviews
                </Button>
              </div>
              <Button onClick={exportActivities} variant="outline" size="sm" className="gap-2">
                <Download className="w-4 h-4" />
                Export CSV
              </Button>
            </div>

            {/* Activity Count */}
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filteredActivities.length}</span> of <span className="font-semibold text-foreground">{activities.length}</span> activities
            </p>
          </div>

          {/* Activities List */}
          {filteredActivities.length > 0 ? (
            <div className="space-y-4">
              {filteredActivities.map((activity) => (
                <Card key={activity.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      {/* Icon */}
                      <div className="flex-shrink-0">
                        <div className={`w-12 h-12 rounded-full ${activity.color} flex items-center justify-center`}>
                          {getActivityIcon(activity.type)}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 flex-wrap">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                              <h3 className="font-semibold text-foreground">{activity.title}</h3>
                              <Badge variant="secondary" className="text-xs">
                                {getActivityLabel(activity.type)}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {activity.description}
                            </p>
                            {activity.destination && (
                              <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                                <MapPin className="w-4 h-4" />
                                {activity.destination}
                              </div>
                            )}
                            {activity.rating && (
                              <div className="flex items-center gap-1">
                                {Array.from({ length: activity.rating }).map((_, i) => (
                                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                ))}
                              </div>
                            )}
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-muted-foreground">
                              {formatDate(activity.timestamp)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="text-center py-12">
              <Calendar className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No activities found</h3>
              <p className="text-muted-foreground">
                {searchTerm ? 'Try adjusting your search terms' : 'Start booking treks and writing reviews to see your activities here'}
              </p>
            </Card>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ActivityLog;
