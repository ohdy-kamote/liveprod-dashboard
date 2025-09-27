// Dynamic Schedule Configuration
// This allows easy addition/removal of service times and columns

export interface ServiceTime {
  id: string;
  name: string;
  time: string;
  day: 'saturday' | 'sunday';
  order: number;
  isActive: boolean;
}

export interface ScheduleConfig {
  services: ServiceTime[];
  displaySettings: {
    showSNS: boolean;
    showSunday: boolean;
    columnWidth: 'auto' | 'fixed';
    maxColumnsPerRow: number;
  };
}

// Default configuration - can be overridden
export const defaultScheduleConfig: ScheduleConfig = {
  services: [
    // Saturday Services (default single column at 5:00 PM)
    { id: 'sns1', name: '5:00 pm', time: '17:00', day: 'saturday', order: 1, isActive: true },
    
    // Sunday Services
    { id: 'sunday1', name: '9:00 am', time: '09:00', day: 'sunday', order: 2, isActive: true },
    { id: 'sunday2', name: '12:00 pm', time: '12:00', day: 'sunday', order: 3, isActive: true },
    { id: 'sunday3', name: '3:00 pm', time: '15:00', day: 'sunday', order: 4, isActive: true },
    { id: 'sunday4', name: '6:00 pm', time: '18:00', day: 'sunday', order: 5, isActive: true },
  ],
  displaySettings: {
    showSNS: true,
    showSunday: true,
    columnWidth: 'auto',
    maxColumnsPerRow: 2
  }
};

// Helper functions for working with schedule configuration
export class ScheduleConfigManager {
  private config: ScheduleConfig;

  constructor(config: ScheduleConfig = defaultScheduleConfig) {
    this.config = config;
  }

  // Get active services for a specific day
  getActiveServicesByDay(day: 'saturday' | 'sunday'): ServiceTime[] {
    return this.config.services
      .filter(service => service.day === day && service.isActive)
      .sort((a, b) => a.order - b.order);
  }

  // Get all active services
  getActiveServices(): ServiceTime[] {
    return this.config.services
      .filter(service => service.isActive)
      .sort((a, b) => a.order - b.order);
  }

  // Add a new service time
  addService(service: Omit<ServiceTime, 'id'>): ServiceTime {
    const newService: ServiceTime = {
      ...service,
      id: `${service.day}${service.order}`
    };
    this.config.services.push(newService);
    return newService;
  }

  // Remove a service by id
  removeService(serviceId: string): boolean {
    const index = this.config.services.findIndex(service => service.id === serviceId);
    if (index > -1) {
      this.config.services.splice(index, 1);
      return true;
    }
    return false;
  }

  // Toggle service active status
  toggleService(serviceId: string): boolean {
    const service = this.config.services.find(service => service.id === serviceId);
    if (service) {
      service.isActive = !service.isActive;
      return true;
    }
    return false;
  }

  // Update service details
  updateService(serviceId: string, updates: Partial<ServiceTime>): boolean {
    const service = this.config.services.find(service => service.id === serviceId);
    if (service) {
      Object.assign(service, updates);
      return true;
    }
    return false;
  }

  // Get configuration
  getConfig(): ScheduleConfig {
    return this.config;
  }

  // Update configuration
  updateConfig(newConfig: Partial<ScheduleConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }
}

// Export a default instance
export const scheduleConfigManager = new ScheduleConfigManager();
