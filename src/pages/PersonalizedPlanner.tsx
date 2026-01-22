import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { TripPlanner } from '@/components/TripPlanner';
import { useState, useEffect } from 'react';

const PersonalizedPlanner = () => {
  const [activeSection, setActiveSection] = useState('planner');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeSection={activeSection} onNavigate={() => {}} />

      {/* Main Content */}
      <div className="pt-16">
        <TripPlanner showAside={false} />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PersonalizedPlanner;
