import { useState } from 'react';
import { Calculator, Plane, Hotel, Footprints, TreePine, Heart, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { ngos, treks } from '@/data/treks';

export const CarbonCalculator = () => {
  const [distance, setDistance] = useState<number>(5000);
  const [accommodation, setAccommodation] = useState<string>('teahouse');
  const [selectedTrek, setSelectedTrek] = useState<string>('');
  const [calculated, setCalculated] = useState(false);

  const accommodationFactors: Record<string, number> = {
    camping: 2,
    teahouse: 5,
    ecolodge: 8,
    hotel: 15,
  };

  const flightCO2 = (distance * 0.255) / 1000; // kg CO2 per km
  const accommodationCO2 = accommodationFactors[accommodation] * 10; // days * factor
  const trekCO2 = selectedTrek ? (treks.find(t => t.id === selectedTrek)?.carbonScore || 0) : 30;
  const totalCO2 = flightCO2 + accommodationCO2 + trekCO2;

  const handleCalculate = () => {
    setCalculated(true);
  };

  return (
    <section className="py-16 px-6 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Calculator className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Eco Calculator</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Calculate Your Carbon Footprint
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Understand your environmental impact and discover ways to offset it
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Calculator Form */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="font-display text-2xl flex items-center gap-2">
                <Footprints className="w-6 h-6 text-primary" />
                Your Trip Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Distance Slider */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="flex items-center gap-2">
                    <Plane className="w-4 h-4 text-muted-foreground" />
                    Flight Distance
                  </Label>
                  <span className="font-semibold text-primary">{distance.toLocaleString()} km</span>
                </div>
                <Slider
                  value={[distance]}
                  onValueChange={(value) => setDistance(value[0])}
                  min={500}
                  max={15000}
                  step={100}
                  className="py-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>500 km</span>
                  <span>15,000 km</span>
                </div>
              </div>

              {/* Accommodation Type */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <Hotel className="w-4 h-4 text-muted-foreground" />
                  Accommodation Type
                </Label>
                <Select value={accommodation} onValueChange={setAccommodation}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="camping">🏕️ Camping (Lowest Impact)</SelectItem>
                    <SelectItem value="teahouse">🏠 Tea House</SelectItem>
                    <SelectItem value="ecolodge">🌿 Eco Lodge</SelectItem>
                    <SelectItem value="hotel">🏨 Hotel (Highest Impact)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Trek Selection */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <Footprints className="w-4 h-4 text-muted-foreground" />
                  Trek Choice
                </Label>
                <Select value={selectedTrek} onValueChange={setSelectedTrek}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a trek..." />
                  </SelectTrigger>
                  <SelectContent>
                    {treks.map((trek) => (
                      <SelectItem key={trek.id} value={trek.id}>
                        {trek.name} ({trek.carbonScore} kg CO₂)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full" size="lg" onClick={handleCalculate}>
                <Calculator className="w-5 h-5" />
                Calculate Impact
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="space-y-6">
            {calculated && (
              <>
                {/* Breakdown Card */}
                <Card className="shadow-card animate-scale-in">
                  <CardHeader>
                    <CardTitle className="font-display text-2xl">Carbon Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Plane className="w-5 h-5 text-blue-500" />
                          <span>Flight Emissions</span>
                        </div>
                        <span className="font-semibold">{flightCO2.toFixed(1)} kg</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Hotel className="w-5 h-5 text-amber-500" />
                          <span>Accommodation</span>
                        </div>
                        <span className="font-semibold">{accommodationCO2.toFixed(1)} kg</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Footprints className="w-5 h-5 text-green-500" />
                          <span>Trekking Activities</span>
                        </div>
                        <span className="font-semibold">{trekCO2.toFixed(1)} kg</span>
                      </div>
                    </div>
                    
                    <div className="border-t border-border pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold">Total CO₂</span>
                        <span className="text-2xl font-display font-bold text-primary">
                          {totalCO2.toFixed(1)} kg
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Partner NGOs */}
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="font-display text-xl flex items-center gap-2">
                      <Heart className="w-5 h-5 text-secondary" />
                      Partner Organizations
                    </CardTitle>
                  </CardHeader>
              <CardContent className="space-y-4">
                {ngos.map((ngo) => (
                  <div
                    key={ngo.id}
                    className="flex items-center justify-between p-4 rounded-xl border border-border hover:border-primary/30 hover:bg-muted/50 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{ngo.logo}</span>
                      <div>
                        <h4 className="font-semibold">{ngo.name}</h4>
                        <p className="text-sm text-muted-foreground">{ngo.description}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Donate <ExternalLink className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
