import { useState } from 'react';
import { Mail, Phone, Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { useCurrency } from '@/lib/CurrencyContext';

interface BookingFormProps {
  trekName: string;
  trekPrice: number;
}

export const BookingForm = ({ trekName, trekPrice }: BookingFormProps) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    travelers: '1',
    startDate: '',
    specialRequests: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { format: formatCurrency } = useCurrency();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !formData.phone || !formData.startDate) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: 'Booking Request Submitted! ✨',
        description: `Thank you, ${formData.fullName}! We'll contact you within 24 hours to confirm your booking for ${trekName}.`,
      });
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        travelers: '1',
        startDate: '',
        specialRequests: '',
      });
      setIsSubmitting(false);
    }, 1000);
  };

  const totalCost = trekPrice * parseInt(formData.travelers);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20 rounded-xl p-6">
        <h3 className="font-display text-2xl font-bold mb-2">Book Your Adventure</h3>
        <p className="text-muted-foreground">Fill out the form below to reserve your spot on {trekName}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Full Name *
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="John Doe"
            className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Email Address *
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="john@example.com"
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              required
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Phone Number *
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="+1 (555) 123-4567"
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              required
            />
          </div>
        </div>

        {/* Number of Travelers */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Number of Travelers *
          </label>
          <div className="relative">
            <Users className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
            <select
              name="travelers"
              value={formData.travelers}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'Traveler' : 'Travelers'}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Start Date */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Preferred Start Date *
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              required
            />
          </div>
        </div>

        {/* Special Requests */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Special Requests or Dietary Preferences
          </label>
          <textarea
            name="specialRequests"
            value={formData.specialRequests}
            onChange={handleInputChange}
            placeholder="Let us know about any special requirements or preferences..."
            rows={4}
            className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
          />
        </div>

        {/* Price Summary */}
        <div className="bg-secondary/30 border border-secondary/50 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-muted-foreground">Price per person:</span>
            <span className="font-semibold">{formatCurrency(trekPrice)}</span>
          </div>
          <div className="flex justify-between items-center mb-2 text-sm">
            <span className="text-muted-foreground">Number of travelers:</span>
            <span>{formData.travelers}</span>
          </div>
          <div className="border-t border-secondary/50 pt-2 flex justify-between items-center">
            <span className="font-display font-bold">Total Cost:</span>
            <span className="font-display text-lg font-bold text-primary">{formatCurrency(totalCost)}</span>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-12 text-base font-semibold"
        >
          {isSubmitting ? 'Submitting...' : 'Request Booking'}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          By submitting this form, you agree to our terms and conditions. A travel consultant will reach out within 24 hours.
        </p>
      </form>
    </div>
  );
};
