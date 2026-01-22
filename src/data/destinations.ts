export type NaturePreference = 'mountains' | 'forests' | 'lakes';
export type ActivityType = 'trekking' | 'hiking' | 'adventure' | 'sightseeing' | 'walking' | 'wildlife';
export type BudgetLevel = 'low' | 'medium' | 'high';
export type TravelStyle = 'eco-friendly' | 'budget' | 'luxury';
export type GroupType = 'solo' | 'couple' | 'family' | 'group';

export interface Accommodation {
  name: string;
  type: 'homestay' | 'guesthouse' | 'hotel' | 'camping';
  ecoFriendly: boolean;
  amenities: string[];
  priceRange: string;
}

export interface Destination {
  id: string;
  name: string;
  location: string;
  description: string;
  image: string;
  activities: ActivityType[];
  naturePreferences: NaturePreference[];
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  duration: { min: number; max: number };
  bestMonths: string[];
  rating: number;
  reviews: number;
  
  // Cost breakdown
  estimatedCost: {
    budget: number;
    medium: number;
    luxury: number;
  };
  
  // Transport costs
  transportCost: {
    walking: number;
    bus: number;
    jeep: number;
    flight: number;
  };
  
  // Eco-friendliness
  ecoScore: number; // 0-100
  carbonFootprint: 'low' | 'medium' | 'high';
  
  // Group accessibility
  groupFriendly: boolean;
  childrenFriendly: boolean;
  elderlyFriendly: boolean;
  accessibilityNotes: string;
  
  // Accommodations
  accommodations: Accommodation[];
  
  // Activities & experiences
  activities_list: string[];
  
  // Sustainable tips
  sustainableTips: string[];
  
  // Warnings & notes
  warnings: string[];
  healthAdvisories: string[];
}

export const destinations: Destination[] = [
  {
    id: '1',
    name: 'Kathmandu Valley Heritage Tour',
    location: 'Kathmandu',
    description: 'Explore the vibrant capital with ancient temples, bustling bazaars, and cultural experiences.',
    image: 'https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=800',
    activities: ['sightseeing', 'walking', 'wildlife'],
    naturePreferences: ['mountains'],
    difficulty: 'Easy',
    duration: { min: 2, max: 4 },
    bestMonths: ['October', 'November', 'February', 'March'],
    rating: 4.6,
    reviews: 450,
    estimatedCost: { budget: 300, medium: 600, luxury: 1200 },
    transportCost: { walking: 0, bus: 20, jeep: 80, flight: 0 },
    ecoScore: 65,
    carbonFootprint: 'low',
    groupFriendly: true,
    childrenFriendly: true,
    elderlyFriendly: true,
    accessibilityNotes: 'Good infrastructure in city center, stairs at temples',
    accommodations: [
      {
        name: 'Hotel Yak & Yeti',
        type: 'hotel',
        ecoFriendly: true,
        amenities: ['WiFi', 'Restaurant', 'Spa', 'Garden'],
        priceRange: '$$$',
      },
      {
        name: 'Kathmandu Community Homestay',
        type: 'homestay',
        ecoFriendly: true,
        amenities: ['Home-cooked meals', 'Local family experience', 'WiFi'],
        priceRange: '$$',
      },
    ],
    activities_list: ['Temple tours', 'Durbar Square exploration', 'Pashupatinath pilgrimage', 'Swayambhunath visit', 'Bazaar exploration', 'Local restaurant dining'],
    sustainableTips: ['Use public buses', 'Stay in homestays', 'Support local artisans', 'Avoid plastic bags', 'Eat at local restaurants'],
    warnings: [],
    healthAdvisories: ['Altitude: 1,345m', 'Air quality can be poor in winter', 'Traveler\'s diarrhea risk - drink bottled water'],
  },
  {
    id: '2',
    name: 'Pokhara Lake & Mountain Views',
    location: 'Pokhara',
    description: 'Serene lakeside town with stunning Annapurna views, adventure sports, and relaxation.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    activities: ['hiking', 'sightseeing', 'adventure', 'walking'],
    naturePreferences: ['lakes', 'mountains'],
    difficulty: 'Easy',
    duration: { min: 3, max: 5 },
    bestMonths: ['September', 'October', 'November', 'February', 'March', 'April'],
    rating: 4.7,
    reviews: 520,
    estimatedCost: { budget: 400, medium: 800, luxury: 1500 },
    transportCost: { walking: 0, bus: 50, jeep: 150, flight: 180 },
    ecoScore: 72,
    carbonFootprint: 'low',
    groupFriendly: true,
    childrenFriendly: true,
    elderlyFriendly: true,
    accessibilityNotes: 'Lakeside paths are accessible, some lakeside hotels have steps',
    accommodations: [
      {
        name: 'Lake View Hotel',
        type: 'hotel',
        ecoFriendly: true,
        amenities: ['Lake view', 'Restaurant', 'Water sports'],
        priceRange: '$$',
      },
      {
        name: 'Eco-Resort Pokhara',
        type: 'guesthouse',
        ecoFriendly: true,
        amenities: ['Solar energy', 'Organic garden', 'Local guides'],
        priceRange: '$$',
      },
    ],
    activities_list: ['Boating on Fewa Lake', 'Sunrise from Sarangkot', 'Paragliding', 'Cave tours', 'Waterfall hikes', 'Lakeside walks'],
    sustainableTips: ['Use eco-resorts', 'Take local boats', 'Eat at family-run restaurants', 'Visit during off-season', 'Minimize water usage'],
    warnings: ['High season (Oct-Nov) is crowded', 'Air pollution in winter months'],
    healthAdvisories: ['Altitude: 822m', 'Altitude-related issues unlikely', 'Standard traveler precautions'],
  },
  {
    id: '3',
    name: 'Langtang Valley Trek',
    location: 'Langtang National Park',
    description: 'Pristine high-altitude valley with yak herds, monasteries, and eco-lodges.',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800',
    activities: ['trekking', 'hiking', 'wildlife'],
    naturePreferences: ['mountains', 'forests'],
    difficulty: 'Moderate',
    duration: { min: 7, max: 10 },
    bestMonths: ['April', 'May', 'September', 'October', 'November'],
    rating: 4.8,
    reviews: 380,
    estimatedCost: { budget: 700, medium: 1000, luxury: 1600 },
    transportCost: { walking: 0, bus: 40, jeep: 120, flight: 0 },
    ecoScore: 82,
    carbonFootprint: 'low',
    groupFriendly: true,
    childrenFriendly: false,
    elderlyFriendly: false,
    accessibilityNotes: 'High altitude trek, not suitable for reduced mobility',
    accommodations: [
      {
        name: 'Langtang Community Lodge',
        type: 'guesthouse',
        ecoFriendly: true,
        amenities: ['Local guides', 'Hot springs', 'Community kitchen'],
        priceRange: '$',
      },
      {
        name: 'Kyanjin Gompa Eco-Lodge',
        type: 'guesthouse',
        ecoFriendly: true,
        amenities: ['Monastery views', 'Local cheese', 'Renewable energy'],
        priceRange: '$$',
      },
    ],
    activities_list: ['High-altitude trekking', 'Yak herding observation', 'Monastery visits', 'Bird watching', 'Mountain photography', 'Local village tours'],
    sustainableTips: ['Use local guides', 'Stay in community lodges', 'Carry out all trash', 'Respect local customs', 'Support local porter jobs'],
    warnings: ['High altitude (3,870m) can cause AMS', 'Remote area - limited medical facilities', 'Landslide risk in monsoon'],
    healthAdvisories: ['Acclimatize properly', 'Trek with guide', 'Carry high-altitude medication', 'Avoid overexertion'],
  },
  {
    id: '4',
    name: 'Chitwan National Park Safari',
    location: 'Chitwan',
    description: 'Wildlife sanctuary for tigers, rhinos, elephants, and diverse bird species.',
    image: 'https://images.unsplash.com/photo-1500595046891-ec534ef0d8e6?w=800',
    activities: ['wildlife', 'sightseeing', 'walking'],
    naturePreferences: ['forests', 'lakes'],
    difficulty: 'Easy',
    duration: { min: 2, max: 4 },
    bestMonths: ['November', 'December', 'January', 'February', 'March'],
    rating: 4.5,
    reviews: 290,
    estimatedCost: { budget: 400, medium: 800, luxury: 1800 },
    transportCost: { walking: 0, bus: 60, jeep: 200, flight: 150 },
    ecoScore: 78,
    carbonFootprint: 'medium',
    groupFriendly: true,
    childrenFriendly: true,
    elderlyFriendly: true,
    accessibilityNotes: 'Jeep safari accessible, lodge accommodations available',
    accommodations: [
      {
        name: 'Tiger Tops Jungle Lodge',
        type: 'hotel',
        ecoFriendly: true,
        amenities: ['All-inclusive', 'Expert guides', 'Bird watching'],
        priceRange: '$$$$',
      },
      {
        name: 'Chitwan Community Guesthouse',
        type: 'guesthouse',
        ecoFriendly: true,
        amenities: ['Local family stays', 'Budget safari', 'Village tours'],
        priceRange: '$$',
      },
    ],
    activities_list: ['Jeep safari', 'Elephant rides', 'Bird watching', 'Canoe trips', 'Jungle walks', 'Local village visits', 'Tiger spotting'],
    sustainableTips: ['Choose eco-lodges', 'Use local guides', 'Avoid elephant riding (ethical concerns)', 'Stay multi-day for better sightings', 'Eat local food'],
    warnings: ['Best season is dry (Nov-Feb)', 'Monsoon (June-Aug) flooding possible', 'Malaria risk - take precautions'],
    healthAdvisories: ['Low altitude', 'Malaria endemic area - use prophylaxis', 'Dengue risk - use insect repellent', 'Traveler\'s diarrhea precautions'],
  },
  {
    id: '5',
    name: 'Phewa Lake Light Walk',
    location: 'Pokhara',
    description: 'Easy lakeside walks with mountain views, perfect for families and seniors.',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800',
    activities: ['walking', 'sightseeing'],
    naturePreferences: ['lakes', 'mountains'],
    difficulty: 'Easy',
    duration: { min: 1, max: 2 },
    bestMonths: ['All year round'],
    rating: 4.4,
    reviews: 620,
    estimatedCost: { budget: 150, medium: 300, luxury: 500 },
    transportCost: { walking: 0, bus: 50, jeep: 150, flight: 180 },
    ecoScore: 85,
    carbonFootprint: 'low',
    groupFriendly: true,
    childrenFriendly: true,
    elderlyFriendly: true,
    accessibilityNotes: 'Fully accessible lakeside paths, easy terrain',
    accommodations: [
      {
        name: 'Lakeside Budget Hotel',
        type: 'hotel',
        ecoFriendly: false,
        amenities: ['Lake view', 'Restaurant'],
        priceRange: '$',
      },
    ],
    activities_list: ['Lakeside walking', 'Mountain photography', 'Sunset viewing', 'Boating options', 'Lakeside dining', 'Local market visits'],
    sustainableTips: ['Walk instead of jeep', 'Use reusable water bottles', 'Eat at local cafes', 'Stay near lake to minimize transport'],
    warnings: [],
    healthAdvisories: ['Low altitude', 'No special health concerns', 'Standard precautions'],
  },
  {
    id: '6',
    name: 'Khopra Ridge Trek',
    location: 'Annapurna Region',
    description: 'Hidden gem trek with rhododendron forests, alpine meadows, and stunning views.',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800',
    activities: ['trekking', 'hiking', 'wildlife'],
    naturePreferences: ['mountains', 'forests'],
    difficulty: 'Moderate',
    duration: { min: 6, max: 8 },
    bestMonths: ['March', 'April', 'May', 'September', 'October', 'November'],
    rating: 4.7,
    reviews: 260,
    estimatedCost: { budget: 600, medium: 900, luxury: 1400 },
    transportCost: { walking: 0, bus: 35, jeep: 100, flight: 0 },
    ecoScore: 88,
    carbonFootprint: 'low',
    groupFriendly: true,
    childrenFriendly: false,
    elderlyFriendly: false,
    accessibilityNotes: 'Remote mountain trek, challenging terrain',
    accommodations: [
      {
        name: 'Community Tea House',
        type: 'guesthouse',
        ecoFriendly: true,
        amenities: ['Local homestay', 'Home-cooked meals'],
        priceRange: '$',
      },
    ],
    activities_list: ['Mountain trekking', 'Forest walks', 'Bird watching', 'Photography', 'Village interactions', 'Meadow camping'],
    sustainableTips: ['Hire local porters', 'Stay in homestays', 'Pack out all trash', 'Respect restricted areas', 'Use local guides'],
    warnings: ['Limited porter facilities', 'Remote with sparse villages', 'Weather can change rapidly'],
    healthAdvisories: ['High altitude', 'Physical fitness required', 'Carry altitude sickness medication'],
  },
];
