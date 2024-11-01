import { useState, useMemo } from 'react';
import { MediaVehicle, SearchFilters } from '../types/mediaVehicles';

export const useMediaVehicles = (vehicles: MediaVehicle[]) => {
  const [filters, setFilters] = useState<SearchFilters>({});
  const [searchTerm, setSearchTerm] = useState('');

  const filteredVehicles = useMemo(() => {
    return vehicles.filter(vehicle => {
      // Search term matching
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch = 
          vehicle.name.toLowerCase().includes(searchLower) ||
          vehicle.description.toLowerCase().includes(searchLower) ||
          vehicle.type.toLowerCase().includes(searchLower);
        
        if (!matchesSearch) return false;
      }

      // Filter matching
      if (filters.type?.length && !filters.type.includes(vehicle.type)) {
        return false;
      }

      if (filters.priceRange) {
        const { min, max } = filters.priceRange;
        if (vehicle.pricing.baseRate < min || vehicle.pricing.baseRate > max) {
          return false;
        }
      }

      if (filters.reach) {
        const { min, max } = filters.reach;
        if (vehicle.reachMetrics.averageReach < min || vehicle.reachMetrics.averageReach > max) {
          return false;
        }
      }

      if (filters.demographics?.length) {
        const hasMatchingDemographic = filters.demographics.some(demo =>
          vehicle.reachMetrics.targetAudience.includes(demo)
        );
        if (!hasMatchingDemographic) return false;
      }

      if (filters.location?.length) {
        const hasMatchingLocation = filters.location.some(loc =>
          vehicle.reachMetrics.geographicCoverage.includes(loc)
        );
        if (!hasMatchingLocation) return false;
      }

      if (filters.active !== undefined && vehicle.active !== filters.active) {
        return false;
      }

      return true;
    });
  }, [vehicles, filters, searchTerm]);

  const sortedVehicles = useMemo(() => {
    return [...filteredVehicles].sort((a, b) => {
      // Sort by active status first
      if (a.active !== b.active) return a.active ? -1 : 1;
      // Then by creation date
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [filteredVehicles]);

  const stats = useMemo(() => {
    return {
      total: vehicles.length,
      active: vehicles.filter(v => v.active).length,
      averageReach: Math.round(
        vehicles.reduce((acc, v) => acc + v.reachMetrics.averageReach, 0) / vehicles.length
      ),
      averagePrice: Math.round(
        vehicles.reduce((acc, v) => acc + v.pricing.baseRate, 0) / vehicles.length
      ),
      typeDistribution: vehicles.reduce((acc, v) => {
        acc[v.type] = (acc[v.type] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
    };
  }, [vehicles]);

  return {
    vehicles: sortedVehicles,
    stats,
    filters,
    setFilters,
    searchTerm,
    setSearchTerm,
  };
};