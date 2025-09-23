// Utility functions for working with flexible schedule system

import { scheduleConfigManager, ServiceTime } from "./scheduleConfig";
import { category } from "./constants";

/**
 * Convert old hardcoded service structure to new flexible format
 */
export function migrateToFlexibleSchedule() {
  const config = scheduleConfigManager.getConfig();
  
  // Clear existing services
  config.services = [];
  
  // Add Saturday services
  config.services.push(
    { id: 'sns1', name: '4:00 pm', time: '16:00', day: 'saturday', order: 1, isActive: true },
    { id: 'sns2', name: '6:30 pm', time: '18:30', day: 'saturday', order: 2, isActive: true }
  );
  
  // Add Sunday services
  config.services.push(
    { id: 'sunday1', name: '9:00 am', time: '09:00', day: 'sunday', order: 3, isActive: true },
    { id: 'sunday2', name: '12:00 pm', time: '12:00', day: 'sunday', order: 4, isActive: true },
    { id: 'sunday3', name: '3:00 pm', time: '15:00', day: 'sunday', order: 5, isActive: true },
    { id: 'sunday4', name: '6:00 pm', time: '18:00', day: 'sunday', order: 6, isActive: true }
  );
  
  scheduleConfigManager.updateConfig(config);
}

/**
 * Get service mapping for API compatibility
 */
export function getServiceMapping(): Record<string, string> {
  const activeServices = scheduleConfigManager.getActiveServices();
  const mapping: Record<string, string> = {};
  
  activeServices.forEach(service => {
    mapping[service.id] = service.id;
  });
  
  return mapping;
}

/**
 * Add a new service time easily
 */
export function addServiceTime(
  name: string, 
  time: string, 
  day: 'saturday' | 'sunday', 
  order?: number
): ServiceTime {
  const maxOrder = scheduleConfigManager.getActiveServices()
    .filter(s => s.day === day)
    .reduce((max, s) => Math.max(max, s.order), 0);
  
  const newOrder = order || maxOrder + 1;
  
  return scheduleConfigManager.addService({
    name,
    time,
    day,
    order: newOrder,
    isActive: true
  });
}

/**
 * Remove a service time
 */
export function removeServiceTime(serviceId: string): boolean {
  return scheduleConfigManager.removeService(serviceId);
}

/**
 * Toggle service visibility
 */
export function toggleServiceVisibility(serviceId: string): boolean {
  return scheduleConfigManager.toggleService(serviceId);
}

/**
 * Get services for a specific day
 */
export function getServicesForDay(day: 'saturday' | 'sunday'): ServiceTime[] {
  return scheduleConfigManager.getActiveServicesByDay(day);
}

/**
 * Reorder services
 */
export function reorderServices(serviceIds: string[]): void {
  const config = scheduleConfigManager.getConfig();
  
  serviceIds.forEach((serviceId, index) => {
    const service = config.services.find(s => s.id === serviceId);
    if (service) {
      service.order = index + 1;
    }
  });
  
  scheduleConfigManager.updateConfig(config);
}

/**
 * Example: Add a new service time
 */
export function addNewServiceExample() {
  // Add a new Saturday service at 2:00 PM
  addServiceTime('2:00 pm', '14:00', 'saturday');
  
  // Add a new Sunday service at 7:30 PM
  addServiceTime('7:30 pm', '19:30', 'sunday');
}

/**
 * Example: Remove a service time
 */
export function removeServiceExample() {
  // Remove the 6:30 PM Saturday service
  removeServiceTime('sns2');
}

/**
 * Example: Toggle service visibility
 */
export function toggleServiceExample() {
  // Hide the 3:00 PM Sunday service
  toggleServiceVisibility('sunday3');
}
