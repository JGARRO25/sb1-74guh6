import React, { useState } from 'react';
import { MediaVehicleCard } from './components/MediaVehicleCard';
import { MediaVehicleForm } from './components/MediaVehicleForm';
import { LoginPage } from './components/LoginPage';
import { MediaVehicle } from './types/mediaVehicles';
import { Search, Filter, SlidersHorizontal, Plus, RotateCw } from 'lucide-react';
import { useMediaVehicles } from './hooks/useMediaVehicles';

const sampleVehicles: MediaVehicle[] = [
  {
    id: '1',
    name: 'Prime Time TV Spot',
    type: 'TV',
    description: 'Premium television advertising slot during peak evening hours with nationwide coverage.',
    active: true,
    version: 1,
    versionHistory: [],
    reachMetrics: {
      averageReach: 1500000,
      targetAudience: ['Adults 25-54', 'Urban'],
      geographicCoverage: ['National'],
      primaryDemographic: 'Adults 25-54',
      secondaryDemographic: 'Adults 18-24',
      peakHours: ['19:00-23:00'],
      demographicBreakdown: [],
      seasonalTrends: []
    },
    pricing: {
      baseRate: 15000,
      currency: 'USD',
      minimumBookingPeriod: 7,
      rateCard: [{ duration: '30s', price: 15000, timeSlot: 'Prime Time' }],
      discounts: [],
      bulkPricing: []
    },
    specifications: {
      format: 'HD Video',
      duration: 30,
      broadcastNetwork: 'National Network',
      technicalRequirements: ['1920x1080', 'H.264'],
      premium: true
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'Digital Billboard - Times Square',
    type: 'OOH',
    description: 'High-impact digital billboard located in the heart of Times Square, NYC.',
    active: true,
    version: 1,
    versionHistory: [],
    reachMetrics: {
      averageReach: 500000,
      targetAudience: ['All Demographics', 'Tourists', 'Urban'],
      geographicCoverage: ['New York City'],
      primaryDemographic: 'Adults 18-65',
      secondaryDemographic: 'Tourists',
      impressionsPerDay: 500000,
      demographicBreakdown: [],
      seasonalTrends: []
    },
    pricing: {
      baseRate: 25000,
      currency: 'USD',
      minimumBookingPeriod: 30,
      rateCard: [{ duration: '1 month', price: 25000 }],
      discounts: [],
      bulkPricing: []
    },
    specifications: {
      format: 'Digital Display',
      dimensions: '40ft x 60ft',
      resolution: '4K',
      location: 'Times Square, NYC',
      illumination: true,
      viewingDistance: '50-500ft',
      premium: true
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    name: 'Premium Podcast Integration',
    type: 'RADIO',
    description: 'Native advertising integration within top-rated business and tech podcasts.',
    active: true,
    version: 1,
    versionHistory: [],
    reachMetrics: {
      averageReach: 250000,
      targetAudience: ['Professionals', 'Tech-savvy'],
      geographicCoverage: ['Global'],
      primaryDemographic: 'Professionals 25-45',
      secondaryDemographic: 'Tech Enthusiasts',
      demographicBreakdown: [],
      seasonalTrends: []
    },
    pricing: {
      baseRate: 5000,
      currency: 'USD',
      minimumBookingPeriod: 1,
      rateCard: [{ duration: '60s', price: 5000 }],
      discounts: [],
      bulkPricing: []
    },
    specifications: {
      format: 'Audio',
      duration: 60,
      frequency: 'Weekly',
      coverage: 'Global',
      premium: false
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<MediaVehicle | null>(null);
  const [vehicles, setVehicles] = useState<MediaVehicle[]>(sampleVehicles);
  
  const {
    vehicles: filteredVehicles,
    stats,
    searchTerm,
    setSearchTerm,
    filters,
    setFilters
  } = useMediaVehicles(vehicles);

  const handleLogin = async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsAuthenticated(true);
  };

  const handleSubmit = (data: Partial<MediaVehicle>) => {
    if (selectedVehicle) {
      setVehicles(vehicles.map(v => 
        v.id === selectedVehicle.id 
          ? { ...selectedVehicle, ...data, updatedAt: new Date() }
          : v
      ));
    } else {
      const newVehicle: MediaVehicle = {
        ...data as MediaVehicle,
        id: Date.now().toString(),
        version: 1,
        versionHistory: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setVehicles([...vehicles, newVehicle]);
    }
    setShowForm(false);
    setSelectedVehicle(null);
  };

  const handleEdit = (vehicle: MediaVehicle) => {
    setSelectedVehicle(vehicle);
    setShowForm(true);
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <RotateCw className="w-8 h-8 text-indigo-600 animate-[spin_3s_linear_infinite]" />
                <span className="absolute -bottom-1 -right-1 text-[10px] font-bold text-indigo-600">360</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Nexus 360</span>
            </div>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Media Vehicle Directory</h1>
            <p className="text-gray-600">Discover and manage premium advertising opportunities across all channels</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Add Media Vehicle</span>
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search media vehicles..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 shadow-sm bg-white">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="text-gray-600">Filter</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 shadow-sm bg-white">
              <SlidersHorizontal className="w-5 h-5 text-gray-600" />
              <span className="text-gray-600">Sort</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVehicles.map((vehicle) => (
            <MediaVehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              onSelect={handleEdit}
            />
          ))}
        </div>
      </div>

      {showForm && (
        <MediaVehicleForm
          vehicle={selectedVehicle}
          onClose={() => {
            setShowForm(false);
            setSelectedVehicle(null);
          }}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}

export default App;