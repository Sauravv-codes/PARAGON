export interface TravelAgency {
  id: string;
  name: string;
  specialization: string[];
  rating: number;
  reviews: number;
  phone: string;
  email: string;
  website: string;
  location: string;
  priceRange: string;
  experience: string;
}

export const travelAgencies: TravelAgency[] = [
  {
    id: '1',
    name: 'Himalayan Guides Nepal',
    specialization: ['Langtang', 'Manaslu', 'Everest'],
    rating: 4.9,
    reviews: 342,
    phone: '+977-1-4414141',
    email: 'info@himalayanguides.com',
    website: 'www.himalayanguides.com',
    location: 'Kathmandu',
    priceRange: '$$$$',
    experience: '20+ years',
  },
  {
    id: '2',
    name: 'Adventure Bound Nepal',
    specialization: ['Annapurna', 'Langtang', 'Khopra Ridge'],
    rating: 4.8,
    reviews: 287,
    phone: '+977-1-4425252',
    email: 'contact@adventurebound.com.np',
    website: 'www.adventurebound.com.np',
    location: 'Kathmandu',
    priceRange: '$$$',
    experience: '15+ years',
  },
  {
    id: '3',
    name: 'Nepal Trekking Association',
    specialization: ['All Treks', 'Custom Tours', 'Group Expeditions'],
    rating: 4.7,
    reviews: 521,
    phone: '+977-1-4430303',
    email: 'trek@nepaltrekking.com',
    website: 'www.nepaltrekking.com',
    location: 'Kathmandu',
    priceRange: '$$',
    experience: '25+ years',
  },
  {
    id: '4',
    name: 'Sacred Mountain Treks',
    specialization: ['Everest', 'Annapurna', 'Manaslu'],
    rating: 4.9,
    reviews: 198,
    phone: '+977-1-4456789',
    email: 'info@sacredmountaintreks.com',
    website: 'www.sacredmountaintreks.com',
    location: 'Kathmandu',
    priceRange: '$$$$',
    experience: '18+ years',
  },
  {
    id: '5',
    name: 'Green Trek Nepal',
    specialization: ['Eco-Friendly Treks', 'Khopra Ridge', 'Hidden Gems'],
    rating: 4.8,
    reviews: 156,
    phone: '+977-1-4467890',
    email: 'hello@greentreknepal.com',
    website: 'www.greentreknepal.com',
    location: 'Kathmandu',
    priceRange: '$$',
    experience: '12+ years',
  },
];
