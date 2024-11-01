import React from 'react';
import { X } from 'lucide-react';
import { MediaVehicle, MediaType } from '../types/mediaVehicles';

interface MediaVehicleFormProps {
  vehicle?: MediaVehicle;
  onClose: () => void;
  onSubmit: (data: Partial<MediaVehicle>) => void;
}

const mediaTypes: MediaType[] = ['TV', 'RADIO', 'DIGITAL', 'PRINT', 'OOH'];

export const MediaVehicleForm: React.FC<MediaVehicleFormProps> = ({
  vehicle,
  onClose,
  onSubmit,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data: Partial<MediaVehicle> = {
      name: formData.get('name') as string,
      type: formData.get('type') as MediaType,
      description: formData.get('description') as string,
      active: formData.get('active') === 'true',
      reachMetrics: {
        averageReach: Number(formData.get('averageReach')),
        targetAudience: (formData.get('targetAudience') as string).split(',').map(s => s.trim()),
        geographicCoverage: (formData.get('geographicCoverage') as string).split(',').map(s => s.trim()),
        primaryDemographic: formData.get('primaryDemographic') as string,
        secondaryDemographic: formData.get('secondaryDemographic') as string,
      },
      pricing: {
        baseRate: Number(formData.get('baseRate')),
        currency: formData.get('currency') as string,
        minimumBookingPeriod: Number(formData.get('minimumBookingPeriod')),
        rateCard: [{
          duration: formData.get('duration') as string,
          price: Number(formData.get('price')),
        }],
      },
      specifications: {
        format: formData.get('format') as string,
        duration: Number(formData.get('specDuration')),
      },
    };
    onSubmit(data);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-xl flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            {vehicle ? 'Edit Media Vehicle' : 'Add New Media Vehicle'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">Basic Information</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={vehicle?.name}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  name="type"
                  defaultValue={vehicle?.type}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  {mediaTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  defaultValue={vehicle?.description}
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  name="active"
                  defaultValue={vehicle?.active?.toString()}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">Reach & Demographics</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Average Reach
                </label>
                <input
                  type="number"
                  name="averageReach"
                  defaultValue={vehicle?.reachMetrics.averageReach}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Target Audience (comma-separated)
                </label>
                <input
                  type="text"
                  name="targetAudience"
                  defaultValue={vehicle?.reachMetrics.targetAudience.join(', ')}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Geographic Coverage (comma-separated)
                </label>
                <input
                  type="text"
                  name="geographicCoverage"
                  defaultValue={vehicle?.reachMetrics.geographicCoverage.join(', ')}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Primary Demographic
                </label>
                <input
                  type="text"
                  name="primaryDemographic"
                  defaultValue={vehicle?.reachMetrics.primaryDemographic}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Secondary Demographic
                </label>
                <input
                  type="text"
                  name="secondaryDemographic"
                  defaultValue={vehicle?.reachMetrics.secondaryDemographic}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t">
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">Pricing Information</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Base Rate
                </label>
                <input
                  type="number"
                  name="baseRate"
                  defaultValue={vehicle?.pricing.baseRate}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Currency
                </label>
                <input
                  type="text"
                  name="currency"
                  defaultValue={vehicle?.pricing.currency || 'USD'}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Minimum Booking Period (days)
                </label>
                <input
                  type="number"
                  name="minimumBookingPeriod"
                  defaultValue={vehicle?.pricing.minimumBookingPeriod}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">Specifications</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Format
                </label>
                <input
                  type="text"
                  name="format"
                  defaultValue={vehicle?.specifications.format}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration (seconds)
                </label>
                <input
                  type="number"
                  name="specDuration"
                  defaultValue={vehicle?.specifications.duration}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              {vehicle ? 'Save Changes' : 'Create Media Vehicle'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};