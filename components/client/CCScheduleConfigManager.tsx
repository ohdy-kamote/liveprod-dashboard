"use client";

import { useState, useEffect } from "react";
import { scheduleConfigManager, ServiceTime, ScheduleConfig } from "@/utils/scheduleConfig";
import GCInputText from "../global/GCInputText";
import GCSelect from "../global/GCSelect";

interface CCScheduleConfigManagerProps {
  onConfigChange?: (config: ScheduleConfig) => void;
}

export default function CCScheduleConfigManager({ onConfigChange }: CCScheduleConfigManagerProps) {
  const [config, setConfig] = useState<ScheduleConfig>(scheduleConfigManager.getConfig());
  const [editingService, setEditingService] = useState<ServiceTime | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    if (onConfigChange) {
      onConfigChange(config);
    }
  }, [config, onConfigChange]);

  const handleAddService = (newService: Omit<ServiceTime, 'id'>) => {
    const addedService = scheduleConfigManager.addService(newService);
    setConfig({ ...scheduleConfigManager.getConfig() });
    setShowAddForm(false);
  };

  const handleUpdateService = (serviceId: string, updates: Partial<ServiceTime>) => {
    scheduleConfigManager.updateService(serviceId, updates);
    setConfig({ ...scheduleConfigManager.getConfig() });
    setEditingService(null);
  };

  const handleToggleService = (serviceId: string) => {
    scheduleConfigManager.toggleService(serviceId);
    setConfig({ ...scheduleConfigManager.getConfig() });
  };

  const handleRemoveService = (serviceId: string) => {
    if (confirm('Are you sure you want to remove this service?')) {
      scheduleConfigManager.removeService(serviceId);
      setConfig({ ...scheduleConfigManager.getConfig() });
    }
  };

  const handleUpdateDisplaySettings = (updates: Partial<ScheduleConfig['displaySettings']>) => {
    scheduleConfigManager.updateConfig({
      displaySettings: { ...config.displaySettings, ...updates }
    });
    setConfig({ ...scheduleConfigManager.getConfig() });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Schedule Configuration</h2>
      
      {/* Display Settings */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Display Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Show SNS Services</label>
            <input
              type="checkbox"
              checked={config.displaySettings.showSNS}
              onChange={(e) => handleUpdateDisplaySettings({ showSNS: e.target.checked })}
              className="w-4 h-4"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Show Sunday Services</label>
            <input
              type="checkbox"
              checked={config.displaySettings.showSunday}
              onChange={(e) => handleUpdateDisplaySettings({ showSunday: e.target.checked })}
              className="w-4 h-4"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Max Columns Per Row</label>
            <input
              type="number"
              value={config.displaySettings.maxColumnsPerRow}
              onChange={(e) => handleUpdateDisplaySettings({ maxColumnsPerRow: parseInt(e.target.value) })}
              className="w-full p-2 border rounded"
              min="1"
              max="4"
            />
          </div>
        </div>
      </div>

      {/* Services List */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Service Times</h3>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Service
          </button>
        </div>

        <div className="space-y-2">
          {config.services.map((service) => (
            <div key={service.id} className="flex items-center justify-between p-3 border rounded">
              <div className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  checked={service.isActive}
                  onChange={() => handleToggleService(service.id)}
                  className="w-4 h-4"
                />
                <span className={`font-medium ${service.isActive ? 'text-gray-900' : 'text-gray-500'}`}>
                  {service.name} ({service.day})
                </span>
                <span className="text-sm text-gray-500">Order: {service.order}</span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setEditingService(service)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleRemoveService(service.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Service Form */}
      {showAddForm && (
        <AddServiceForm
          onAdd={handleAddService}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {/* Edit Service Form */}
      {editingService && (
        <EditServiceForm
          service={editingService}
          onUpdate={handleUpdateService}
          onCancel={() => setEditingService(null)}
        />
      )}
    </div>
  );
}

// Add Service Form Component
function AddServiceForm({ onAdd, onCancel }: { onAdd: (service: Omit<ServiceTime, 'id'>) => void, onCancel: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    time: '',
    day: 'sunday' as 'saturday' | 'sunday',
    order: 1,
    isActive: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h3 className="text-lg font-semibold mb-4">Add New Service</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <GCInputText
            label="Service Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <GCInputText
            label="Time (HH:MM)"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            placeholder="09:00"
            required
          />
          <div>
            <label className="block text-sm font-medium mb-2">Day</label>
            <GCSelect
              value={formData.day}
              onChange={(e) => setFormData({ ...formData, day: e.target.value as 'saturday' | 'sunday' })}
              options={[
                { value: 'saturday', label: 'Saturday' },
                { value: 'sunday', label: 'Sunday' }
              ]}
            />
          </div>
          <GCInputText
            label="Order"
            type="number"
            value={formData.order.toString()}
            onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
            required
          />
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="w-4 h-4"
            />
            <label className="text-sm font-medium">Active</label>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-600 border rounded hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add Service
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Edit Service Form Component
function EditServiceForm({ 
  service, 
  onUpdate, 
  onCancel 
}: { 
  service: ServiceTime, 
  onUpdate: (id: string, updates: Partial<ServiceTime>) => void, 
  onCancel: () => void 
}) {
  const [formData, setFormData] = useState(service);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(service.id, formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h3 className="text-lg font-semibold mb-4">Edit Service</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <GCInputText
            label="Service Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <GCInputText
            label="Time (HH:MM)"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            placeholder="09:00"
            required
          />
          <div>
            <label className="block text-sm font-medium mb-2">Day</label>
            <GCSelect
              value={formData.day}
              onChange={(e) => setFormData({ ...formData, day: e.target.value as 'saturday' | 'sunday' })}
              options={[
                { value: 'saturday', label: 'Saturday' },
                { value: 'sunday', label: 'Sunday' }
              ]}
            />
          </div>
          <GCInputText
            label="Order"
            type="number"
            value={formData.order.toString()}
            onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
            required
          />
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="w-4 h-4"
            />
            <label className="text-sm font-medium">Active</label>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-600 border rounded hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Update Service
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
