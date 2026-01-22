import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { DiscoverTreks } from '@/components/DiscoverTreks';
import { TripPlanner } from '@/components/TripPlanner';
import { Community } from '@/components/Community';
import { Footer } from '@/components/Footer';

const Index = () => {
  const [activeSection, setActiveSection] = useState('hero');
  
  const discoverRef = useRef<HTMLDivElement>(null);
  const plannerRef = useRef<HTMLDivElement>(null);
  const communityRef = useRef<HTMLDivElement>(null);

  const handleNavigate = (section: string) => {
    setActiveSection(section);
    
    const refs: Record<string, React.RefObject<HTMLDivElement>> = {
      discover: discoverRef,
      planner: plannerRef,
      community: communityRef,
    };

    // Small delay to ensure state updates and DOM are ready
    setTimeout(() => {
      if (section === 'hero') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (refs[section]?.current) {
        refs[section].current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 0);
  };

  const handleExplore = () => {
    handleNavigate('discover');
  };

  const location = useLocation();

  // If navigated here with state indicating a section to scroll to, do it.
  useEffect(() => {
    const state: any = (location && (location as any).state) || {};
    if (state && state.scrollTo) {
      const section = state.scrollTo as string;
      // small timeout to allow DOM to render
      setTimeout(() => handleNavigate(section), 50);
      // clear history state to avoid repeated scrolling
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeSection={activeSection} onNavigate={handleNavigate} />
      
      {/* Hero Section */}
      <Hero onExplore={handleExplore} />
      
      {/* Discover Treks Section */}
      <div ref={discoverRef} className="scroll-mt-16">
        <DiscoverTreks />
      </div>
      
      {/* Trip Planner Section */}
      <div ref={plannerRef} className="scroll-mt-16">
        <TripPlanner />
      </div>
      
      {/* Community Section */}
      <div ref={communityRef} className="scroll-mt-16">
        <Community />
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
