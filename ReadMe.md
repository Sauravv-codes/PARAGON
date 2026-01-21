import React, { useState } from 'react';
import { Leaf, Mountain, Heart, Calculator, MapPin, Trees, Award, ChevronRight, Sparkles } from 'lucide-react';

export default function NepalEcoTourism() {
  const [activeTab, setActiveTab] = useState('discover');
  const [selectedFitness, setSelectedFitness] = useState('');
  const [selectedMood, setSelectedMood] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [carbonData, setCarbonData] = useState(null);
  const [travelDistance, setTravelDistance] = useState('');
  const [accommodation, setAccommodation] = useState('');

  const fitnessLevels = [
    { id: 'easy', name: 'Easy Going', icon: '🚶', desc: 'Gentle walks, 2-4 hrs/day' },
    { id: 'moderate', name: 'Moderate', icon: '🥾', desc: 'Regular hiking, 4-6 hrs/day' },
    { id: 'challenging', name: 'Challenging', icon: '⛰️', desc: 'Strenuous treks, 6-8 hrs/day' }
  ];

  const moods = [
    { id: 'peaceful', name: 'Peaceful Retreat', icon: '🧘' },
    { id: 'adventure', name: 'Adventure', icon: '🏔️' },
    { id: 'cultural', name: 'Cultural Immersion', icon: '🏛️' },
    { id: 'wildlife', name: 'Wildlife & Nature', icon: '🦋' }
  ];

  const hiddenGems = {
    'easy-peaceful': {
      name: 'Astam Village Trek',
      location: 'Pokhara Region',
      duration: '2-3 days',
      altitude: '1,600m',
      highlights: ['Sunrise over Annapurna', 'Traditional Gurung villages', 'Organic farms'],
      carbon: 45,
      image: '🌄'
    },
    'easy-cultural': {
      name: 'Balthali Village Trek',
      location: 'Kathmandu Valley Rim',
      duration: '2 days',
      altitude: '1,700m',
      highlights: ['Newari culture', 'Terraced fields', 'Ancient temples'],
      carbon: 35,
      image: '🏘️'
    },
    'moderate-adventure': {
      name: 'Khopra Ridge Trek',
      location: 'Annapurna Region',
      duration: '7-9 days',
      altitude: '3,660m',
      highlights: ['Khayer Lake pilgrimage', 'Dhaulagiri views', 'Community lodges'],
      carbon: 120,
      image: '🏔️'
    },
    'moderate-wildlife': {
      name: 'Mohare Danda Trek',
      location: 'Annapurna Conservation Area',
      duration: '5-7 days',
      altitude: '3,300m',
      highlights: ['Rhododendron forests', 'Bird watching', 'Eco-lodges'],
      carbon: 95,
      image: '🌺'
    },
    'challenging-adventure': {
      name: 'Makalu Base Camp Trek',
      location: 'Eastern Nepal',
      duration: '16-18 days',
      altitude: '4,870m',
      highlights: ['Fifth highest peak', 'Remote wilderness', 'Sherpa culture'],
      carbon: 180,
      image: '⛰️'
    },
    'challenging-peaceful': {
      name: 'Tsum Valley Trek',
      location: 'Manaslu Region',
      duration: '12-14 days',
      altitude: '3,700m',
      highlights: ['Hidden Tibetan valley', 'Ancient monasteries', 'Spiritual retreat'],
      carbon: 150,
      image: '🙏'
    }
  };

  const getRecommendation = () => {
    const key = `${selectedFitness}-${selectedMood}`;
    return hiddenGems[key] || hiddenGems['moderate-adventure'];
  };

  const calculateCarbon = () => {
    const distance = parseFloat(travelDistance) || 0;
    const flightCarbon = distance * 0.09; // kg CO2 per km
    const accommodationCarbon = accommodation === 'eco' ? 15 : accommodation === 'standard' ? 45 : 75;
    const trekCarbon = getRecommendation().carbon;
    
    const total = flightCarbon + accommodationCarbon + trekCarbon;
    const treesNeeded = Math.ceil(total / 21.77); // Average tree absorbs ~21.77 kg CO2/year
    
    setCarbonData({
      flight: flightCarbon.toFixed(1),
      accommodation: accommodationCarbon,
      trek: trekCarbon,
      total: total.toFixed(1),
      trees: treesNeeded,
      cost: (treesNeeded * 5).toFixed(0) // $5 per tree
    });
  };

  const ngos = [
    { name: 'Himalayan Reforestation Project', trees: '50,000+ planted', area: 'Annapurna Region' },
    { name: 'Nepal Tree Project', trees: '1M+ planted', area: 'Nationwide' },
    { name: 'Community Forest Alliance', trees: '200,000+ planted', area: 'Eastern Nepal' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-emerald-500 to-green-600 p-2 rounded-xl">
                <Mountain className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-700 to-green-600 bg-clip-text text-transparent">
                  Nepal Hidden Gems
                </h1>
                <p className="text-sm text-gray-600">Sustainable Trekking Adventures</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-emerald-100 px-4 py-2 rounded-full">
              <Leaf className="w-5 h-5 text-emerald-600" />
              <span className="text-sm font-semibold text-emerald-700">Carbon Neutral</span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="max-w-6xl mx-auto px-6 mt-6">
        <div className="flex gap-2 bg-white rounded-2xl p-2 shadow-md">
          <button
            onClick={() => setActiveTab('discover')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-semibold transition-all ${
              activeTab === 'discover'
                ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Sparkles className="w-5 h-5" />
            Discover Treks
          </button>
          <button
            onClick={() => setActiveTab('carbon')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-semibold transition-all ${
              activeTab === 'carbon'
                ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Calculator className="w-5 h-5" />
            Carbon Calculator
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {activeTab === 'discover' ? (
          <div className="space-y-8">
            {/* Fitness Level Selection */}
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Heart className="w-7 h-7 text-rose-500" />
                What's Your Fitness Level?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {fitnessLevels.map((level) => (
                  <button
                    key={level.id}
                    onClick={() => setSelectedFitness(level.id)}
                    className={`p-6 rounded-2xl border-2 transition-all text-left ${
                      selectedFitness === level.id
                        ? 'border-emerald-500 bg-emerald-50 shadow-lg scale-105'
                        : 'border-gray-200 hover:border-emerald-300 hover:shadow-md'
                    }`}
                  >
                    <div className="text-4xl mb-3">{level.icon}</div>
                    <h3 className="font-bold text-lg text-gray-800 mb-1">{level.name}</h3>
                    <p className="text-sm text-gray-600">{level.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Mood Selection */}
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Sparkles className="w-7 h-7 text-amber-500" />
                What's Your Vibe?
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {moods.map((mood) => (
                  <button
                    key={mood.id}
                    onClick={() => {
                      setSelectedMood(mood.id);
                      setShowResults(true);
                    }}
                    className={`p-6 rounded-2xl border-2 transition-all ${
                      selectedMood === mood.id
                        ? 'border-emerald-500 bg-emerald-50 shadow-lg scale-105'
                        : 'border-gray-200 hover:border-emerald-300 hover:shadow-md'
                    }`}
                  >
                    <div className="text-5xl mb-3">{mood.icon}</div>
                    <h3 className="font-semibold text-gray-800 text-center">{mood.name}</h3>
                  </button>
                ))}
              </div>
            </div>

            {/* Results */}
            {showResults && selectedFitness && selectedMood && (() => {
              const trek = getRecommendation();
              return (
                <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-3xl p-8 shadow-2xl text-white">
                  <div className="flex items-center gap-3 mb-6">
                    <Award className="w-10 h-10" />
                    <div>
                      <h2 className="text-3xl font-bold">Your Perfect Trek</h2>
                      <p className="text-emerald-100">Tailored just for you</p>
                    </div>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-6xl mb-4">{trek.image}</div>
                        <h3 className="text-3xl font-bold mb-2">{trek.name}</h3>
                        <div className="flex items-center gap-2 text-emerald-100">
                          <MapPin className="w-5 h-5" />
                          <span className="text-lg">{trek.location}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-5xl font-bold mb-1">{trek.duration}</div>
                        <div className="text-emerald-100">Duration</div>
                        <div className="mt-4 text-2xl font-semibold">↑ {trek.altitude}</div>
                        <div className="text-emerald-100 text-sm">Max Altitude</div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-xl mb-3 flex items-center gap-2">
                        <Sparkles className="w-5 h-5" />
                        Highlights
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {trek.highlights.map((highlight, idx) => (
                          <div key={idx} className="bg-white/10 rounded-xl p-4 flex items-center gap-2">
                            <ChevronRight className="w-5 h-5 flex-shrink-0" />
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-amber-400/20 rounded-xl p-4 flex items-center gap-3">
                      <Leaf className="w-6 h-6" />
                      <div>
                        <div className="font-semibold">Estimated Trek Carbon: {trek.carbon} kg CO₂</div>
                        <div className="text-sm text-emerald-100">Calculate full trip impact below</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        ) : (
          <div className="space-y-8">
            {/* Carbon Calculator */}
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Calculator className="w-7 h-7 text-blue-500" />
                Calculate Your Carbon Footprint
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block font-semibold text-gray-700 mb-2">
                    Travel Distance (km from your location)
                  </label>
                  <input
                    type="number"
                    value={travelDistance}
                    onChange={(e) => setTravelDistance(e.target.value)}
                    placeholder="e.g., 5000"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-3">
                    Accommodation Type
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { id: 'eco', name: 'Eco-Lodge', carbon: '15 kg CO₂' },
                      { id: 'standard', name: 'Standard Hotel', carbon: '45 kg CO₂' },
                      { id: 'luxury', name: 'Luxury Resort', carbon: '75 kg CO₂' }
                    ].map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setAccommodation(type.id)}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          accommodation === type.id
                            ? 'border-emerald-500 bg-emerald-50'
                            : 'border-gray-200 hover:border-emerald-300'
                        }`}
                      >
                        <div className="font-semibold text-gray-800">{type.name}</div>
                        <div className="text-sm text-gray-600 mt-1">{type.carbon}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={calculateCarbon}
                  disabled={!travelDistance || !accommodation}
                  className="w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Calculator className="w-5 h-5" />
                  Calculate Impact
                </button>
              </div>
            </div>

            {/* Carbon Results */}
            {carbonData && (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-8 shadow-2xl text-white">
                  <h3 className="text-2xl font-bold mb-6">Your Carbon Footprint</h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {[
                      { label: 'Flight', value: carbonData.flight, icon: '✈️' },
                      { label: 'Accommodation', value: carbonData.accommodation, icon: '🏨' },
                      { label: 'Trekking', value: carbonData.trek, icon: '🥾' },
                      { label: 'Total', value: carbonData.total, icon: '📊' }
                    ].map((item, idx) => (
                      <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                        <div className="text-3xl mb-2">{item.icon}</div>
                        <div className="text-2xl font-bold">{item.value}</div>
                        <div className="text-sm text-blue-100">kg CO₂</div>
                        <div className="text-xs text-blue-200 mt-1">{item.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-amber-400 text-gray-900 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Trees className="w-8 h-8" />
                      <div>
                        <div className="text-2xl font-bold">Plant {carbonData.trees} Trees</div>
                        <div className="text-sm opacity-80">to offset your entire trip</div>
                      </div>
                    </div>
                    <div className="text-3xl font-bold mt-4">
                      ${carbonData.cost} USD
                    </div>
                    <div className="text-sm opacity-80">One-time offset contribution</div>
                  </div>
                </div>

                {/* NGO Partners */}
                <div className="bg-white rounded-3xl p-8 shadow-lg">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <Trees className="w-7 h-7 text-green-600" />
                    Offset with Local NGOs
                  </h3>
                  
                  <div className="space-y-4">
                    {ngos.map((ngo, idx) => (
                      <div key={idx} className="border-2 border-gray-200 rounded-2xl p-6 hover:border-emerald-500 transition-all">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h4 className="font-bold text-lg text-gray-800">{ngo.name}</h4>
                            <div className="flex gap-4 mt-2 text-sm text-gray-600">
                              <span className="flex items-center gap-1">
                                <Trees className="w-4 h-4 text-green-600" />
                                {ngo.trees}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="w-4 h-4 text-blue-600" />
                                {ngo.area}
                              </span>
                            </div>
                          </div>
                          <button className="bg-emerald-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-emerald-600 transition-all">
                            Donate
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16 py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Leaf className="w-6 h-6 text-emerald-400" />
            <span className="text-lg font-semibold">Sustainable Tourism • Climate Action • Local Communities</span>
          </div>
          <p className="text-gray-400">
            Discover Nepal's hidden treasures while protecting its future
          </p>
        </div>
      </footer>
    </div>
  );
}
