export interface Trek {
  id: string;
  name: string;
  location: string;
  duration: string;
  altitude: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  vibes: ('Peaceful' | 'Adventure' | 'Cultural' | 'Wildlife')[];
  highlights: string[];
  amenities: string[];
  image: string;
  carbonScore: number;
  cost: number;
  crowdLevel: 'Low' | 'Medium' | 'High';
  rating: number;
  isHiddenGem: boolean;
}

export const treks: Trek[] = [
  {
    id: '1',
    name: 'Langtang Valley Trek',
    location: 'Langtang National Park',
    duration: '7-10 days',
    altitude: '3,870m',
    difficulty: 'Moderate',
    vibes: ['Peaceful', 'Cultural'],
    highlights: ['Kyanjin Gompa Monastery', 'Cheese Factory', 'Yak Pastures', 'Himalayan Views'],
    amenities: ['Tea Houses', 'Hot Springs', 'Local Guides', 'Porter Service'],
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800',
    carbonScore: 45,
    cost: 800,
    crowdLevel: 'Low',
    rating: 4.8,
    isHiddenGem: true,
  },
  {
    id: '2',
    name: 'Annapurna Base Camp',
    location: 'Annapurna Conservation Area',
    duration: '10-14 days',
    altitude: '4,130m',
    difficulty: 'Moderate',
    vibes: ['Adventure', 'Peaceful'],
    highlights: ['Machapuchare View', 'Gurung Villages', 'Hot Springs at Jhinu', 'Sunrise at ABC'],
    amenities: ['Tea Houses', 'Dining Halls', 'Wi-Fi Spots', 'First Aid Posts'],
    image: 'https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=800',
    carbonScore: 52,
    cost: 1200,
    crowdLevel: 'High',
    rating: 4.9,
    isHiddenGem: false,
  },
  {
    id: '3',
    name: 'Khopra Ridge Trek',
    location: 'Annapurna Region',
    duration: '6-8 days',
    altitude: '3,660m',
    difficulty: 'Moderate',
    vibes: ['Peaceful', 'Wildlife'],
    highlights: ['Khopra Danda Viewpoint', 'Khayer Lake', 'Rhododendron Forests', 'Magar Villages'],
    amenities: ['Community Lodges', 'Local Cuisine', 'Bird Watching', 'Eco-Lodges'],
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800',
    carbonScore: 35,
    cost: 650,
    crowdLevel: 'Low',
    rating: 4.7,
    isHiddenGem: true,
  },
  {
    id: '4',
    name: 'Everest Base Camp',
    location: 'Sagarmatha National Park',
    duration: '12-16 days',
    altitude: '5,364m',
    difficulty: 'Challenging',
    vibes: ['Adventure'],
    highlights: ['Kala Patthar Sunrise', 'Tengboche Monastery', 'Sherpa Culture', 'Khumbu Glacier'],
    amenities: ['Tea Houses', 'Altitude Medicine', 'Helicopter Rescue', 'Communication'],
    image: 'https://images.unsplash.com/photo-1486911278844-a81c5267e227?w=800',
    carbonScore: 85,
    cost: 2500,
    crowdLevel: 'High',
    rating: 4.9,
    isHiddenGem: false,
  },
  {
    id: '5',
    name: 'Manaslu Circuit',
    location: 'Manaslu Conservation Area',
    duration: '14-18 days',
    altitude: '5,106m',
    difficulty: 'Challenging',
    vibes: ['Adventure', 'Cultural'],
    highlights: ['Larkya La Pass', 'Tibetan Buddhist Culture', 'Remote Villages', 'Pristine Nature'],
    amenities: ['Basic Tea Houses', 'Camping Options', 'Local Guides Required', 'Permits'],
    image: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=800',
    carbonScore: 40,
    cost: 1800,
    crowdLevel: 'Low',
    rating: 4.8,
    isHiddenGem: true,
  },
  {
    id: '6',
    name: 'Poon Hill Trek',
    location: 'Annapurna Region',
    duration: '4-5 days',
    altitude: '3,210m',
    difficulty: 'Easy',
    vibes: ['Peaceful', 'Cultural'],
    highlights: ['Poon Hill Sunrise', 'Ghandruk Village', 'Gurung Culture', 'Rhododendron Trail'],
    amenities: ['Comfortable Lodges', 'Hot Showers', 'Good Food', 'Easy Access'],
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800',
    carbonScore: 25,
    cost: 400,
    crowdLevel: 'Medium',
    rating: 4.6,
    isHiddenGem: false,
  },
  {
    id: '7',
    name: 'Upper Mustang Trek',
    location: 'Mustang District',
    duration: '12-14 days',
    altitude: '3,840m',
    difficulty: 'Moderate',
    vibes: ['Cultural', 'Adventure'],
    highlights: ['Lo Manthang Walled City', 'Cave Monasteries', 'Tibetan Plateau', 'Ancient Traditions'],
    amenities: ['Traditional Lodges', 'Cultural Experiences', 'Special Permits', 'Jeep Options'],
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800',
    carbonScore: 55,
    cost: 2200,
    crowdLevel: 'Low',
    rating: 4.9,
    isHiddenGem: true,
  },
  {
    id: '8',
    name: 'Chitwan Jungle Trek',
    location: 'Chitwan National Park',
    duration: '3-4 days',
    altitude: '200m',
    difficulty: 'Easy',
    vibes: ['Wildlife', 'Adventure'],
    highlights: ['One-Horned Rhino', 'Bengal Tigers', 'Elephant Safari', 'Tharu Culture'],
    amenities: ['Jungle Lodges', 'Safari Guides', 'Canoe Rides', 'Bird Tours'],
    image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800',
    carbonScore: 30,
    cost: 350,
    crowdLevel: 'Medium',
    rating: 4.5,
    isHiddenGem: false,
  },
];

export const ngos = [
  {
    id: '1',
    name: 'Nepal Wildlife Trust',
    description: 'Protecting endangered species and their habitats',
    logo: '🐅',
  },
  {
    id: '2',
    name: 'Himalayan Climate Initiative',
    description: 'Supporting sustainable tourism and climate action',
    logo: '🏔️',
  },
  {
    id: '3',
    name: 'Local Community Foundation',
    description: 'Empowering local communities through education and conservation',
    logo: '🤝',
  },
];

export const seasons = [
  {
    name: 'Spring (March - May)',
    pros: ['Blooming rhododendrons', 'Clear mountain views', 'Moderate temperatures', 'Wildlife active'],
    cons: ['Some afternoon clouds', 'Can be crowded', 'Pollen allergies possible'],
  },
  {
    name: 'Autumn (Sept - Nov)',
    pros: ['Best visibility', 'Stable weather', 'Festival season (Dashain, Tihar)', 'Perfect temperatures'],
    cons: ['Peak tourist season', 'Higher prices', 'Crowded trails'],
  },
  {
    name: 'Summer (June - Aug)',
    pros: ['Lush green landscapes', 'Fewer tourists', 'Lower prices', 'Unique monsoon experience'],
    cons: ['Heavy rainfall', 'Leeches on trails', 'Landslide risks', 'Limited visibility'],
  },
  {
    name: 'Winter (Dec - Feb)',
    pros: ['Crystal clear views', 'Quiet trails', 'Lower prices', 'Snow-capped peaks'],
    cons: ['Very cold at altitude', 'Some passes closed', 'Shorter days', 'Limited tea houses open'],
  },
];

export const packingLists = {
  Easy: [
    'Comfortable hiking shoes',
    'Light backpack (20-30L)',
    'Rain jacket',
    'Sunscreen & sunglasses',
    'Water bottle',
    'Basic first aid kit',
    'Comfortable layers',
    'Hat or cap',
  ],
  Moderate: [
    'Sturdy hiking boots',
    'Backpack (30-40L)',
    'Warm fleece jacket',
    'Waterproof layers',
    'Trekking poles',
    'Headlamp',
    'Altitude sickness medication',
    'Thermal underwear',
    'Sleeping bag liner',
    'Water purification tablets',
  ],
  Challenging: [
    'High-altitude boots',
    'Large backpack (50-60L)',
    'Down jacket',
    'Gore-Tex outer layers',
    'Trekking poles (pair)',
    'Headlamp with extra batteries',
    'Comprehensive first aid kit',
    '4-season sleeping bag',
    'Glacier glasses',
    'Hand/toe warmers',
    'Altitude medication (Diamox)',
    'GPS device or detailed maps',
  ],
};
