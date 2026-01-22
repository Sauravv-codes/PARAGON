import { useState } from 'react';
import { Mountain, Menu, X, Compass, Calendar, Users, History } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useCurrency } from '@/lib/CurrencyContext';

interface NavigationProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export const Navigation = ({ activeSection, onNavigate }: NavigationProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'discover', label: 'Discover', icon: Compass, path: '/#discover' },
    { id: 'planner', label: 'Trip Planner', icon: Calendar, path: '/planner' },
    { id: 'community', label: 'Community', icon: Users, path: '/#community' },
    { id: 'activity-log', label: 'Activity Log', icon: History, path: '/activity-log' },
  ];

  const handleNavigate = (section: string) => {
    onNavigate(section);
    setMobileMenuOpen(false);
  };

  const location = useLocation();
  const navigate = useNavigate();

  const handleItemClick = (e: React.MouseEvent, item: { id: string; path: string }) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    // Anchors that live on the home page - use smooth scroll animation
    if (item.id === 'discover' || item.id === 'community') {
      if (location.pathname === '/') {
        // Already on home - scroll smoothly to section
        onNavigate(item.id);
      } else {
        // On another page - navigate to home with scroll state
        navigate('/', { state: { scrollTo: item.id } });
      }
      return;
    }

    // Route-based navigation - smooth scroll to top
    if (item.id === 'planner') {
      if (location.pathname === '/planner') {
        onNavigate('planner');
      } else {
        navigate('/planner');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    if (item.id === 'activity-log') {
      if (location.pathname === '/activity-log') {
        onNavigate('activity-log');
      } else {
        navigate('/activity-log');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            onClick={(e) => {
              if (location.pathname === '/') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-2 font-display text-xl font-bold text-primary hover:opacity-80 transition-opacity"
          >
            <Mountain className="w-7 h-7" />
            <span className="hidden sm:block">Nepal Hidden Gems</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.path}
                className="no-underline"
                onClick={(e) => handleItemClick(e, item)}
              >
                <Button
                  variant={activeSection === item.id ? 'default' : 'ghost'}
                  size="sm"
                  className="gap-2"
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Button>
              </a>
            ))}
            {/* Currency Switcher */}
            <div className="ml-4">
              <CurrencySwitcher />
            </div>
          </div>



          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50 animate-fade-in">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.path}
                  className="no-underline"
                  onClick={(e) => handleItemClick(e, item)}
                >
                  <Button
                    variant={activeSection === item.id ? 'default' : 'ghost'}
                    className="justify-start gap-3 w-full"
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </Button>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

const CurrencySwitcher = () => {
  const { currency, setCurrency } = useCurrency();
  return (
    <select
      value={currency}
      onChange={(e) => setCurrency(e.target.value as any)}
      className="px-3 py-1 rounded-md border border-border bg-background text-foreground"
    >
      <option value="NPR">NPR</option>
      <option value="INR">INR</option>
      <option value="USD">USD</option>
      <option value="EUR">EUR</option>
      <option value="GBP">GBP</option>
      <option value="AUD">AUD</option>
    </select>
  );
};
