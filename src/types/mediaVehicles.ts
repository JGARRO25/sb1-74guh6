export type MediaType = 'TV' | 'RADIO' | 'DIGITAL' | 'PRINT' | 'OOH';

export interface MediaVehicle {
  id: string;
  name: string;
  type: MediaType;
  description: string;
  active: boolean;
  version: number;
  versionHistory: VersionHistory[];
  reachMetrics: ReachMetrics;
  pricing: PricingInfo;
  specifications: MediaSpecifications;
  timeSlots?: TimeSlot[];
  createdAt: Date;
  updatedAt: Date;
}

export interface VersionHistory {
  version: number;
  timestamp: Date;
  changes: {
    field: string;
    oldValue: any;
    newValue: any;
  }[];
  modifiedBy?: string;
}

export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  availability: number;
  priceMultiplier: number;
  restrictions?: string[];
}

export interface ReachMetrics {
  averageReach: number;
  targetAudience: string[];
  geographicCoverage: string[];
  primaryDemographic: string;
  secondaryDemographic: string;
  peakHours?: string[];
  impressionsPerDay?: number;
  demographicBreakdown: DemographicData[];
  seasonalTrends: SeasonalTrend[];
}

export interface DemographicData {
  segment: string;
  percentage: number;
  engagementRate: number;
  averageIncome?: string;
}

export interface SeasonalTrend {
  season: string;
  reachMultiplier: number;
  popularTimeSlots: string[];
}

export interface PricingInfo {
  baseRate: number;
  currency: string;
  minimumBookingPeriod: number;
  rateCard: RateCardItem[];
  discounts: DiscountRule[];
  bulkPricing: BulkPricingTier[];
}

export interface BulkPricingTier {
  minimumUnits: number;
  discountPercentage: number;
  minimumSpend?: number;
}

export interface RateCardItem {
  duration: string;
  price: number;
  timeSlot?: string;
  position?: string;
  premium: boolean;
}

export interface DiscountRule {
  type: 'VOLUME' | 'SEASONAL' | 'EARLY_BOOKING' | 'LOYALTY';
  percentage: number;
  conditions: string;
  validUntil?: Date;
  minimumSpend?: number;
  stackable: boolean;
}

export interface MediaSpecifications {
  format: string;
  dimensions?: string;
  duration?: number;
  fileTypes?: string[];
  maxFileSize?: number;
  resolution?: string;
  colorProfile?: string;
  bleedArea?: string;
  location?: string;
  viewingDistance?: string;
  illumination?: boolean;
  broadcastNetwork?: string;
  frequency?: string;
  coverage?: string;
  technicalRequirements?: string[];
  restrictions?: string[];
}

export interface SearchFilters {
  type?: MediaType[];
  priceRange?: { min: number; max: number };
  reach?: { min: number; max: number };
  demographics?: string[];
  location?: string[];
  availability?: boolean;
  timeSlot?: string;
  active?: boolean;
}

export interface BulkImportResult {
  success: boolean;
  totalProcessed: number;
  successful: number;
  failed: number;
  errors: ImportError[];
}

interface ImportError {
  row: number;
  field: string;
  error: string;
  value: any;
}