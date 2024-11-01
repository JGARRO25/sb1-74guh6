import { MediaVehicle, BulkImportResult, VersionHistory } from '../types/mediaVehicles';

export const validateMediaVehicle = (vehicle: Partial<MediaVehicle>): string[] => {
  const errors: string[] = [];

  if (!vehicle.name?.trim()) errors.push('Name is required');
  if (!vehicle.type) errors.push('Type is required');
  if (!vehicle.description?.trim()) errors.push('Description is required');
  if (!vehicle.reachMetrics?.averageReach) errors.push('Average reach is required');
  if (!vehicle.pricing?.baseRate) errors.push('Base rate is required');

  return errors;
};

export const createVersion = (
  oldVehicle: MediaVehicle,
  newVehicle: MediaVehicle,
  userId?: string
): VersionHistory => {
  const changes = [];
  const fields = Object.keys(newVehicle) as (keyof MediaVehicle)[];

  for (const field of fields) {
    if (JSON.stringify(oldVehicle[field]) !== JSON.stringify(newVehicle[field])) {
      changes.push({
        field,
        oldValue: oldVehicle[field],
        newValue: newVehicle[field],
      });
    }
  }

  return {
    version: oldVehicle.version + 1,
    timestamp: new Date(),
    changes,
    modifiedBy: userId,
  };
};

export const processCSVImport = async (
  file: File,
  existingVehicles: MediaVehicle[]
): Promise<BulkImportResult> => {
  const result: BulkImportResult = {
    success: true,
    totalProcessed: 0,
    successful: 0,
    failed: 0,
    errors: [],
  };

  try {
    const content = await file.text();
    const rows = content.split('\n').map(row => row.split(','));
    const headers = rows[0];

    for (let i = 1; i < rows.length; i++) {
      result.totalProcessed++;
      const row = rows[i];
      
      try {
        const vehicle = mapCSVRowToVehicle(headers, row);
        const errors = validateMediaVehicle(vehicle);
        
        if (errors.length > 0) {
          result.failed++;
          result.errors.push({
            row: i,
            field: 'validation',
            error: errors.join(', '),
            value: vehicle,
          });
          continue;
        }

        result.successful++;
      } catch (error) {
        result.failed++;
        result.errors.push({
          row: i,
          field: 'processing',
          error: error.message,
          value: row,
        });
      }
    }
  } catch (error) {
    result.success = false;
    result.errors.push({
      row: 0,
      field: 'file',
      error: 'Failed to process file',
      value: error.message,
    });
  }

  return result;
};

const mapCSVRowToVehicle = (headers: string[], row: string[]): Partial<MediaVehicle> => {
  const vehicle: Partial<MediaVehicle> = {};
  
  headers.forEach((header, index) => {
    const value = row[index]?.trim();
    if (!value) return;

    switch (header.toLowerCase()) {
      case 'name':
        vehicle.name = value;
        break;
      case 'type':
        vehicle.type = value as MediaVehicle['type'];
        break;
      case 'description':
        vehicle.description = value;
        break;
      case 'baserate':
        vehicle.pricing = {
          ...vehicle.pricing,
          baseRate: Number(value),
          currency: 'USD',
          minimumBookingPeriod: 1,
          rateCard: [],
          discounts: [],
          bulkPricing: [],
        };
        break;
      case 'averagereach':
        vehicle.reachMetrics = {
          ...vehicle.reachMetrics,
          averageReach: Number(value),
          targetAudience: [],
          geographicCoverage: [],
          primaryDemographic: '',
          secondaryDemographic: '',
          demographicBreakdown: [],
          seasonalTrends: [],
        };
        break;
    }
  });

  return vehicle;
};