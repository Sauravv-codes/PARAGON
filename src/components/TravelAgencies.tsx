import { Star, ExternalLink, Phone, Mail, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TravelAgency, travelAgencies } from '@/data/travelAgencies';

interface TravelAgenciesProps {
  trekSpecializations?: string[];
}

export const TravelAgencies = ({ trekSpecializations = [] }: TravelAgenciesProps) => {
  // Filter agencies that specialize in the trek or show all if no specializations
  const recommendedAgencies = trekSpecializations.length > 0
    ? travelAgencies.filter((agency) =>
        agency.specialization.some((spec) =>
          trekSpecializations.some(
            (trek) => trek.toLowerCase().includes(spec.toLowerCase()) || 
                     spec.toLowerCase().includes(trek.toLowerCase())
          )
        )
      )
    : travelAgencies;

  // Show top rated agencies or at least 5
  const displayAgencies = recommendedAgencies.length > 0 
    ? recommendedAgencies.slice(0, 5)
    : travelAgencies.slice(0, 5);

  const handleContact = (agency: TravelAgency) => {
    const subject = encodeURIComponent(`Booking Inquiry for ${agency.name}`);
    const to = encodeURIComponent(agency.email);
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${subject}`;
    window.open(gmailUrl, '_blank', 'noopener,noreferrer');
  };

  const handleWebsite = (website: string) => {
    let url = website || '';
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-accent/10 to-primary/10 border border-accent/30 rounded-xl p-6">
        <h3 className="font-display text-2xl font-bold mb-2">Recommended Travel Agencies</h3>
        <p className="text-muted-foreground">
          Browse trusted partners who specialize in this trek
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {displayAgencies.map((agency) => (
          <div
            key={agency.id}
            className="group bg-card border border-border/50 rounded-xl p-5 hover:shadow-lg hover:border-primary/30 transition-all duration-300"
          >
            {/* Header */}
            <div className="flex justify-between items-start gap-3 mb-3">
              <div className="flex-1">
                <h4 className="font-display font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                  {agency.name}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(agency.rating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-foreground">
                    {agency.rating}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    ({agency.reviews} reviews)
                  </span>
                </div>
              </div>
              <Badge variant="outline" className="whitespace-nowrap">
                {agency.priceRange}
              </Badge>
            </div>

            {/* Details */}
            <div className="space-y-2 mb-4 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{agency.location}</span>
              </div>
              <div className="text-muted-foreground">
                <span className="font-medium">Experience:</span> {agency.experience}
              </div>
              <div className="text-muted-foreground">
                <span className="font-medium">Specialization:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {agency.specialization.map((spec) => (
                    <Badge
                      key={spec}
                      variant="secondary"
                      className="text-xs"
                    >
                      {spec}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 mb-4 py-4 border-t border-border/30 text-sm">
              <div className="flex items-center gap-2 text-foreground hover:text-primary transition-colors cursor-pointer">
                <Phone className="w-4 h-4" />
                <a href={`tel:${agency.phone}`}>{agency.phone}</a>
              </div>
              <div className="flex items-center gap-2 text-foreground hover:text-primary transition-colors cursor-pointer">
                <Mail className="w-4 h-4" />
                <a href={`mailto:${agency.email}`}>{agency.email}</a>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button
                variant="default"
                size="sm"
                onClick={() => handleContact(agency)}
                className="flex-1 gap-2"
              >
                <Mail className="w-4 h-4" />
                Contact
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleWebsite(agency.website)}
                className="flex-1 gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                Website
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
