// Calendar utilities for formatting schedule data into calendar events

import { serviceCodeToTime, serviceTime } from './constants';
import { formatDate } from './helpers';

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  resource: {
    role: string;
    volunteer: string;
    service: string;
    serviceName: string;
    serviceTime: string;
    date: string;
    volunteerId?: string;
    scheduleId: string;
  };
  color?: string;
  className?: string;
}

export interface LiveProductionEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  type: 'service' | 'special' | 'rehearsal' | 'event';
  description?: string;
  location?: string;
  color: string;
  className?: string;
}

// Color scheme for different roles
export const roleColors = {
  'foh': '#3B82F6', // Blue
  'foh assistant': '#8B5CF6', // Purple
  'foh trainee': '#06B6D4', // Cyan
  'foh assistant trainee': '#10B981', // Emerald
  'foh observer': '#F59E0B', // Amber
  'monitor mix': '#EF4444', // Red
  'rf tech': '#F97316', // Orange
  'monitor mix trainee': '#84CC16', // Lime
  'monitor mix observer': '#EC4899', // Pink
  'broadcast mix': '#6366F1', // Indigo
  'broadcast mix assistant': '#14B8A6', // Teal
  'broadcast mix trainee': '#F43F5E', // Rose
  'broadcast mix assistant trainee': '#A855F7', // Violet
  'broadcast mix observer': '#EAB308', // Yellow
  'nxtgen': '#22C55E', // Green
  'nxtgen trainee': '#06B6D4', // Cyan
  'nxtgen observer': '#F59E0B', // Amber
  'audio volunteer 1': '#8B5CF6', // Purple
  'audio volunteer 2': '#EC4899', // Pink
};

// Convert schedule data to calendar events. If an item is already a CalendarEvent, return it as-is.
export function formatSchedulesToEvents(schedules: any[]): CalendarEvent[] {
  return schedules
    .filter(item => !!item)
    .map((item) => {
      // If it already looks like a CalendarEvent, return it directly
      if (item.start instanceof Date && item.end instanceof Date && item.resource && item.title) {
        return item as CalendarEvent;
      }

      const schedule = item;
      const serviceCode = schedule.service;
      const serviceName = serviceCodeToTime[serviceCode] || serviceCode;
      const time = serviceTime[serviceCode] || '09:00';
      const role = schedule.role || 'Unknown Role';
      
      const startTime = new Date(schedule.date);
      const [hours, minutes] = time.split(':').map(Number);
      startTime.setHours(hours, minutes, 0, 0);
      
      const endTime = new Date(startTime);
      endTime.setHours(hours + 2, minutes, 0, 0);
      
      return {
        id: schedule._id,
        title: `${role.toUpperCase()} - ${schedule.volunteer?.name || 'Unassigned'}`,
        start: startTime,
        end: endTime,
        resource: {
          role: role,
          volunteer: schedule.volunteer?.name || 'Unassigned',
          service: serviceCode,
          serviceName,
          serviceTime: time,
          date: formatDate(schedule.date),
          volunteerId: schedule.volunteer?._id,
          scheduleId: schedule._id
        },
        color: roleColors[role as keyof typeof roleColors] || '#6B7280',
        className: `role-${role.replace(/\s+/g, '-')}`
      };
    });
}

// Group events by date for better display
export function groupEventsByDate(events: CalendarEvent[]): Record<string, CalendarEvent[]> {
  return events.reduce((groups, event) => {
    const dateKey = event.start.toISOString().split('T')[0];
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(event);
    return groups;
  }, {} as Record<string, CalendarEvent[]>);
}

// Create Live Production Events for special occasions
export function createLiveProductionEvents(): LiveProductionEvent[] {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  
  return [
    {
      id: 'easter-2025',
      title: 'Easter Service',
      start: new Date(currentYear, 3, 20), // April 20, 2025
      end: new Date(currentYear, 3, 20, 23, 59),
      type: 'special',
      description: 'Special Easter service with extended production',
      location: 'Main Auditorium',
      color: '#DC2626', // Red
      className: 'special-event'
    },
    {
      id: 'christmas-2025',
      title: 'Christmas Service',
      start: new Date(currentYear, 11, 25), // December 25, 2025
      end: new Date(currentYear, 11, 25, 23, 59),
      type: 'special',
      description: 'Christmas celebration service',
      location: 'Main Auditorium',
      color: '#059669', // Green
      className: 'special-event'
    },
    {
      id: 'new-year-2026',
      title: 'New Year Service',
      start: new Date(currentYear + 1, 0, 1), // January 1, 2026
      end: new Date(currentYear + 1, 0, 1, 23, 59),
      type: 'special',
      description: 'New Year celebration service',
      location: 'Main Auditorium',
      color: '#7C3AED', // Purple
      className: 'special-event'
    }
  ];
}

// Get events for a specific month
export function getEventsForMonth(events: CalendarEvent[], year: number, month: number): CalendarEvent[] {
  return events.filter(event => {
    const eventDate = event.start;
    return eventDate.getFullYear() === year && eventDate.getMonth() === month;
  });
}

// Get events for a specific date
export function getEventsForDate(events: CalendarEvent[], date: Date): CalendarEvent[] {
  const targetDate = new Date(date);
  targetDate.setHours(0, 0, 0, 0);
  
  return events.filter(event => {
    const eventDate = new Date(event.start);
    eventDate.setHours(0, 0, 0, 0);
    return eventDate.getTime() === targetDate.getTime();
  });
}

// Create event summary for a date
export function createEventSummary(events: CalendarEvent[]): string {
  if (events.length === 0) return 'No events';
  
  const roles = [...new Set(events.map(e => e.resource.role))];
  const volunteers = [...new Set(events.map(e => e.resource.volunteer))];
  
  return `${events.length} event(s) - ${roles.length} role(s) - ${volunteers.length} volunteer(s)`;
}

// Get role statistics for a month
export function getRoleStatistics(events: CalendarEvent[]): Record<string, number> {
  return events.reduce((stats, event) => {
    const role = event.resource.role;
    stats[role] = (stats[role] || 0) + 1;
    return stats;
  }, {} as Record<string, number>);
}

// Get volunteer statistics for a month
export function getVolunteerStatistics(events: CalendarEvent[]): Record<string, number> {
  return events.reduce((stats, event) => {
    const volunteer = event.resource.volunteer;
    if (volunteer !== 'Unassigned') {
      stats[volunteer] = (stats[volunteer] || 0) + 1;
    }
    return stats;
  }, {} as Record<string, number>);
}
