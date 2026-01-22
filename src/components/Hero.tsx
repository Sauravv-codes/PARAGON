import { Mountain, Leaf, Heart, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-mountains.jpg';

interface HeroProps {
  onExplore: () => void;
}

export const Hero = ({ onExplore }: HeroProps) => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
      
      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 animate-float opacity-20">
        <Mountain className="w-24 h-24 text-primary" />
      </div>
      <div className="absolute top-40 right-20 animate-float-delayed opacity-20">
        <Leaf className="w-16 h-16 text-secondary" />
      </div>
      <div className="absolute bottom-40 left-20 animate-float opacity-15">
        <Heart className="w-12 h-12 text-accent" />
      </div>
      <div className="absolute bottom-20 right-10 animate-float-delayed opacity-20">
        <Compass className="w-20 h-20 text-primary" />
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 animate-fade-in">
            <Leaf className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Eco-Conscious Adventures</span>
          </div>

          {/* Title */}
          <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Discover Nepal's{' '}
            <span className="text-gradient-hero">Hidden Gems</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Embark on sustainable trekking adventures through breathtaking Himalayan landscapes while preserving nature and supporting local communities.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 pt-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="text-center">
              <div className="text-3xl font-display font-bold text-primary">8,000+</div>
              <div className="text-sm text-muted-foreground">Happy Trekkers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-display font-bold text-accent">50+</div>
              <div className="text-sm text-muted-foreground">Unique Routes</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 pt-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <Button variant="hero" size="xl" onClick={onExplore}>
              <Compass className="w-5 h-5" />
              Start Exploring
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};
