import React from 'react';
import { 
  Tv, Radio, Smartphone, Newspaper, MapPin,
  Clock, Users, DollarSign, Info, Eye
} from 'lucide-react';
import { MediaVehicle, MediaType } from '../types/mediaVehicles';

interface MediaVehicleCardProps {
  vehicle: MediaVehicle;
  onSelect: (vehicle: MediaVehicle) => void;
}

const getMediaIcon = (type: MediaType) => {
  switch (type) {
    case 'TV': return Tv;
    case 'RADIO': return Radio;
    case 'DIGITAL': return Smartphone;
    case 'PRINT': return Newspaper;
    case 'OOH': return MapPin;
    default: return Info;
  }
};

const getMediaImage = (type: MediaType) => {
  switch (type) {
    case 'TV':
      return 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=400&q=80';
    case 'RADIO':
      return 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?auto=format&fit=crop&w=400&q=80';
    case 'DIGITAL':
      return 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80';
    case 'PRINT':
      return 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=400&q=80';
    case 'OOH':
      return 'https://images.unsplash.com/photo-1587614298171-a331d8a53d7f?auto=format&fit=crop&w=400&q=80';
    default:
      return 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=400&q=80';
  }
};

export const MediaVehicleCard: React.FC<MediaVehicleCardProps> = ({ vehicle, onSelect }) => {
  const Icon = getMediaIcon(vehicle.type);
  const mediaImage = getMediaImage(vehicle.type);
  
  return (
    <div 
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border border-gray-100 overflow-hidden"
      onClick={() => onSelect(vehicle)}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={mediaImage} 
          alt={`${vehicle.type} advertising`}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <span className="px-3 py-1 text-sm font-medium text-white bg-black/30 backdrop-blur-sm rounded-full">
            {vehicle.type}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-indigo-50 rounded-lg">
            <Icon className="w-6 h-6 text-indigo-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{vehicle.name}</h3>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-2">{vehicle.description}</p>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">
              {vehicle.reachMetrics.averageReach.toLocaleString()} reach
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">
              {vehicle.pricing.minimumBookingPeriod} days min
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {vehicle.reachMetrics.targetAudience.map((audience, index) => (
            <span 
              key={index}
              className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full"
            >
              {audience}
            </span>
          ))}
        </div>
      </div>

      <div className="px-6 py-4 bg-gray-50 rounded-b-xl border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <DollarSign className="w-4 h-4 text-green-500" />
            <span className="font-semibold text-gray-900">
              {vehicle.pricing.baseRate.toLocaleString()} {vehicle.pricing.currency}
            </span>
          </div>
          <button 
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors duration-300"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};