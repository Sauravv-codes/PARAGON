import { useState } from 'react';
import { Users, MessageSquare, TreePine, Star, Send, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { treks } from '@/data/treks';
import { toast } from '@/hooks/use-toast';

interface Review {
  id: string;
  name: string;
  trek: string;
  rating: number;
  text: string;
  date: string;
  avatar: string;
}

const initialReviews: Review[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    trek: 'Langtang Valley Trek',
    rating: 5,
    text: 'An absolutely transformative experience! The hidden gem status is well deserved. Fewer crowds meant more authentic interactions with local communities.',
    date: '2 weeks ago',
    avatar: '👩‍🦰',
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    trek: 'Khopra Ridge Trek',
    rating: 5,
    text: 'The eco-lodges were fantastic and the natural beauty was stunning. Highly recommend for conscious travelers!',
    date: '1 month ago',
    avatar: '👨‍🦱',
  },
  {
    id: '3',
    name: 'Priya Sharma',
    trek: 'Manaslu Circuit',
    rating: 4,
    text: 'Challenging but incredibly rewarding. The cultural immersion was beyond anything I expected. The carbon calculator helped me offset my trip!',
    date: '1 month ago',
    avatar: '👩‍🦳',
  },
  {
    id: '4',
    name: 'Tom Wilson',
    trek: 'Upper Mustang Trek',
    rating: 5,
    text: 'Like stepping back in time. The ancient Tibetan culture preserved here is remarkable. Worth every step!',
    date: '2 months ago',
    avatar: '🧔',
  },
];

export const Community = () => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [newReview, setNewReview] = useState({
    trek: '',
    rating: 5,
    text: '',
  });

  const stats = {
    trekkers: 8247,
    reviews: reviews.length * 156, // Simulated larger number
  };

  const handleSubmitReview = () => {
    if (!newReview.trek || !newReview.text) {
      toast({
        title: "Please complete the form",
        description: "Select a trek and write your review",
        variant: "destructive",
      });
      return;
    }

    const review: Review = {
      id: Date.now().toString(),
      name: 'You',
      trek: treks.find(t => t.id === newReview.trek)?.name || '',
      rating: newReview.rating,
      text: newReview.text,
      date: 'Just now',
      avatar: '🙂',
    };

    setReviews([review, ...reviews]);
    setNewReview({ trek: '', rating: 5, text: '' });
    
    toast({
      title: "Review submitted! 🎉",
      description: "Thank you for sharing your experience with the community.",
    });
  };

  return (
    <section className="py-16 px-6 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-4">
            <Users className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">Community</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Join Our Trekking Family
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect with fellow adventurers and share your Nepal stories
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-12">
          <Card className="shadow-card text-center p-6 hover-lift">
            <Users className="w-8 h-8 mx-auto text-primary mb-3" />
            <p className="text-3xl font-display font-bold text-primary">{stats.trekkers.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Active Trekkers</p>
          </Card>
          <Card className="shadow-card text-center p-6 hover-lift">
            <MessageSquare className="w-8 h-8 mx-auto text-secondary mb-3" />
            <p className="text-3xl font-display font-bold text-secondary">{stats.reviews.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Reviews Shared</p>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Submit Review */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="font-display text-2xl flex items-center gap-3">
                <MessageSquare className="w-6 h-6 text-primary" />
                Share Your Experience
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Which trek did you complete?</Label>
                <Select value={newReview.trek} onValueChange={(value) => setNewReview({ ...newReview, trek: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a trek..." />
                  </SelectTrigger>
                  <SelectContent>
                    {treks.map((trek) => (
                      <SelectItem key={trek.id} value={trek.id}>
                        {trek.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Your Rating</Label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setNewReview({ ...newReview, rating: star })}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= newReview.rating
                            ? 'text-amber-500 fill-amber-500'
                            : 'text-muted-foreground/30'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Your Review</Label>
                <Textarea
                  placeholder="Tell us about your adventure..."
                  value={newReview.text}
                  onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                  rows={4}
                />
              </div>

              <Button className="w-full" size="lg" onClick={handleSubmitReview}>
                <Send className="w-5 h-5" />
                Submit Review
              </Button>
            </CardContent>
          </Card>

          {/* Recent Reviews */}
          <div className="space-y-4">
            <h3 className="font-display text-xl font-semibold flex items-center gap-2">
              <Quote className="w-5 h-5 text-muted-foreground" />
              Recent Reviews
            </h3>
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
              {reviews.map((review, index) => (
                <Card
                  key={review.id}
                  className="shadow-soft animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="pt-4">
                    <div className="flex items-start gap-4">
                      <span className="text-3xl">{review.avatar}</span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold">{review.name}</h4>
                          <span className="text-xs text-muted-foreground">{review.date}</span>
                        </div>
                        <p className="text-sm text-primary font-medium mb-2">{review.trek}</p>
                        <div className="flex gap-0.5 mb-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= review.rating
                                  ? 'text-amber-500 fill-amber-500'
                                  : 'text-muted-foreground/30'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground">{review.text}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
