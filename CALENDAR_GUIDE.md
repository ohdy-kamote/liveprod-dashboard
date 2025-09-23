# Live Production Calendar System Guide

## Overview

The Live Production Calendar System provides a comprehensive monthly view of all scheduled events and Live Production activities. It integrates seamlessly with your existing schedule system and offers enhanced visualization, statistics, and event management capabilities.

## 🎯 **Key Features**

- ✅ **Monthly Calendar View**: Visual representation of all scheduled events
- ✅ **Live Production Events**: Special events like Easter, Christmas, New Year
- ✅ **Event Details Modal**: Click on events to see detailed information
- ✅ **Role-based Filtering**: View calendar for specific roles
- ✅ **Statistics Dashboard**: Monthly statistics and role distribution
- ✅ **Interactive Navigation**: Click on dates to view specific schedules
- ✅ **Color-coded Events**: Different colors for different roles
- ✅ **Responsive Design**: Works on desktop and mobile devices

## 📁 **Files Created**

### Core Components
- `utils/calendarUtils.ts` - Calendar utilities and event formatting
- `components/client/CCMonthlyCalendar.tsx` - Basic monthly calendar component
- `components/client/CCEnhancedMonthlyCalendar.tsx` - Enhanced calendar with modal
- `components/client/CCEventDetailsModal.tsx` - Event details modal
- `components/server/SCMonthlyCalendar.tsx` - Server component for data fetching

### Pages
- `app/schedule/calendar/page.tsx` - Main calendar page
- `app/schedule/calendar/[role]/page.tsx` - Role-specific calendar page

## 🚀 **How to Use**

### 1. Access the Calendar

**Main Calendar**: Visit `/schedule/calendar` to see all events
**Role-specific Calendar**: Visit `/schedule/calendar/[role]` for specific roles

### 2. Navigation

- **Month View**: Default view showing all events in a monthly grid
- **Week View**: Focus on a specific week
- **Agenda View**: List view of all events
- **Date Navigation**: Use arrow buttons to navigate between months

### 3. Event Interaction

- **Click on Events**: Opens detailed event information modal
- **Click on Dates**: Navigate to specific date schedules
- **Hover over Events**: See quick event details

### 4. Statistics Panel

The calendar includes a statistics panel showing:
- **Total Events**: Number of scheduled events for the month
- **Roles Covered**: Number of different roles scheduled
- **Volunteers**: Number of volunteers assigned
- **Role Distribution**: Breakdown of events by role

## 🎨 **Event Colors**

Events are color-coded by role:
- **Blue**: FOH roles (foh, foh assistant, foh trainee, etc.)
- **Red**: Audio roles (monitor mix, rf tech, etc.)
- **Purple**: Broadcast mix roles
- **Green**: Special events (Easter, Christmas, etc.)
- **Orange**: Other roles (nxtgen, audio volunteers, etc.)

## 📊 **Live Production Events**

The system includes special Live Production Events:
- **Easter Service**: April 20, 2025
- **Christmas Service**: December 25, 2025
- **New Year Service**: January 1, 2026

These events are automatically included and can be toggled on/off.

## 🔧 **Configuration Options**

### Calendar Props
```typescript
interface SCMonthlyCalendarProps {
  role?: string;                    // Filter by specific role
  startDate?: Date;                 // Filter by start date
  endDate?: Date;                   // Filter by end date
  showStatistics?: boolean;         // Show statistics panel
  showLiveProductionEvents?: boolean; // Show special events
}
```

### Event Customization
```typescript
// Add custom Live Production Events
const customEvents = [
  {
    id: 'custom-event',
    title: 'Special Event',
    start: new Date(2025, 5, 15), // June 15, 2025
    end: new Date(2025, 5, 15, 23, 59),
    type: 'special',
    description: 'Custom event description',
    location: 'Main Auditorium',
    color: '#DC2626',
    className: 'special-event'
  }
];
```

## 📱 **Responsive Design**

The calendar is fully responsive and works on:
- **Desktop**: Full-featured experience with statistics panel
- **Tablet**: Optimized layout with collapsible statistics
- **Mobile**: Touch-friendly interface with simplified navigation

## 🎯 **Use Cases**

### 1. **Schedule Overview**
- Get a bird's-eye view of all scheduled events
- Identify busy periods and gaps in coverage
- Plan for special events and holidays

### 2. **Role Management**
- View schedules for specific roles
- Identify role coverage gaps
- Plan role assignments

### 3. **Volunteer Coordination**
- See which volunteers are scheduled
- Identify volunteer availability
- Plan volunteer assignments

### 4. **Event Planning**
- Plan for special events and holidays
- Coordinate with other departments
- Manage event logistics

## 🔍 **Event Details Modal**

When you click on an event, you'll see:
- **Event Information**: Date, time, service, role
- **Assignment Details**: Volunteer assigned, status
- **Quick Actions**: View volunteer profile, edit assignment
- **Event History**: Previous assignments and changes

## 📈 **Statistics and Analytics**

The calendar provides valuable insights:
- **Monthly Statistics**: Total events, roles, volunteers
- **Role Distribution**: Breakdown of events by role
- **Volunteer Statistics**: Most active volunteers
- **Coverage Analysis**: Identify gaps in coverage

## 🚀 **Integration with Existing System**

The calendar seamlessly integrates with your existing schedule system:
- **Uses existing API endpoints**: No new API calls needed
- **Maintains data consistency**: Same data source as schedule masterlist
- **Preserves existing functionality**: All existing features still work
- **Enhances user experience**: New visualization layer

## 🎨 **Customization**

### Adding New Event Types
```typescript
// In calendarUtils.ts
export const roleColors = {
  'new-role': '#FF6B6B', // Add new role colors
  // ... existing colors
};
```

### Custom Event Components
```typescript
// Custom event component
const CustomEventComponent = ({ event }) => {
  return (
    <div className="custom-event">
      {/* Custom event rendering */}
    </div>
  );
};
```

## 🔧 **Technical Details**

### Dependencies
- `react-big-calendar`: Calendar component
- `moment`: Date handling
- `react-big-calendar/lib/css/react-big-calendar.css`: Calendar styles

### Performance
- **Lazy Loading**: Events are loaded on demand
- **Efficient Rendering**: Only visible events are rendered
- **Optimized Updates**: Minimal re-renders on data changes

### Browser Support
- **Modern Browsers**: Chrome, Firefox, Safari, Edge
- **Mobile Browsers**: iOS Safari, Chrome Mobile
- **Responsive**: Works on all screen sizes

## 🎯 **Best Practices**

### 1. **Event Naming**
- Use clear, descriptive event titles
- Include role and volunteer information
- Use consistent naming conventions

### 2. **Color Coding**
- Use role-based colors for consistency
- Avoid too many similar colors
- Use high contrast for readability

### 3. **Date Management**
- Use consistent date formats
- Handle timezone considerations
- Plan for recurring events

### 4. **User Experience**
- Provide clear navigation
- Use intuitive interactions
- Include helpful tooltips and labels

## 🚀 **Getting Started**

1. **Visit the Calendar**: Go to `/schedule/calendar`
2. **Explore Events**: Click on events to see details
3. **Navigate**: Use month/week/agenda views
4. **Filter**: Use role-specific calendars
5. **Customize**: Adjust settings and preferences

## 🎉 **Benefits**

- **Visual Overview**: See all events at a glance
- **Better Planning**: Plan schedules more effectively
- **Improved Coordination**: Coordinate between roles and volunteers
- **Enhanced User Experience**: Intuitive and user-friendly interface
- **Data Insights**: Valuable statistics and analytics
- **Mobile Friendly**: Works on all devices

The Live Production Calendar System transforms your schedule management from a simple list into a comprehensive, visual, and interactive experience that helps you manage your Live Production team more effectively!
