# Flexible Schedule System Guide

## Overview

The Flexible Schedule System allows you to easily add, remove, and modify service times and columns in your schedule masterlist without hardcoding changes. This system replaces the previous hardcoded approach with a dynamic configuration system.

## Key Features

- ✅ **Dynamic Service Times**: Add/remove service times through configuration
- ✅ **Flexible Columns**: Automatically adjust table columns based on active services
- ✅ **Admin Interface**: User-friendly interface for managing schedule configuration
- ✅ **Backward Compatibility**: Works with existing schedule data
- ✅ **Real-time Updates**: Changes reflect immediately in the schedule display

## Files Created

### Core Configuration
- `utils/scheduleConfig.ts` - Main configuration system and manager
- `utils/scheduleUtils.ts` - Helper functions for common operations

### Components
- `components/client/CCFlexibleScheduleByRole.tsx` - Flexible client component
- `components/server/SCFlexibleSchedulesByRole.tsx` - Flexible server component
- `components/client/CCScheduleConfigManager.tsx` - Admin interface component

### Pages
- `app/admin/schedule-config/page.tsx` - Admin configuration page
- `app/schedule/flexible-demo/page.tsx` - Demo page showing flexible system

## How to Use

### 1. Basic Usage

Replace your existing schedule components with the flexible versions:

```tsx
// Old way (hardcoded)
import SCSchedulesByRole from "@/components/server/SCSchedulesByRole";

// New way (flexible)
import SCFlexibleSchedulesByRole from "@/components/server/SCFlexibleSchedulesByRole";
```

### 2. Adding New Service Times

#### Through Admin Interface
1. Navigate to `/admin/schedule-config`
2. Click "Add Service"
3. Fill in the service details:
   - **Name**: Display name (e.g., "5:00 pm")
   - **Time**: 24-hour format (e.g., "17:00")
   - **Day**: Saturday or Sunday
   - **Order**: Display order (1, 2, 3, etc.)
   - **Active**: Whether to show this service

#### Programmatically
```typescript
import { addServiceTime } from '@/utils/scheduleUtils';

// Add a new Saturday service at 2:00 PM
addServiceTime('2:00 pm', '14:00', 'saturday');

// Add a new Sunday service at 7:30 PM
addServiceTime('7:30 pm', '19:30', 'sunday');
```

### 3. Removing Service Times

#### Through Admin Interface
1. Go to `/admin/schedule-config`
2. Click "Remove" next to the service you want to remove
3. Confirm the removal

#### Programmatically
```typescript
import { removeServiceTime } from '@/utils/scheduleUtils';

// Remove a specific service
removeServiceTime('sns2'); // Removes 6:30 PM Saturday service
```

### 4. Toggling Service Visibility

#### Through Admin Interface
1. Go to `/admin/schedule-config`
2. Check/uncheck the service you want to show/hide

#### Programmatically
```typescript
import { toggleServiceVisibility } from '@/utils/scheduleUtils';

// Hide/show a service
toggleServiceVisibility('sunday3'); // Toggle 3:00 PM Sunday service
```

### 5. Reordering Services

```typescript
import { reorderServices } from '@/utils/scheduleUtils';

// Reorder services (array of service IDs in desired order)
reorderServices(['sunday1', 'sunday2', 'sunday3', 'sunday4']);
```

## Configuration Options

### Service Time Properties
- `id`: Unique identifier
- `name`: Display name (e.g., "9:00 am")
- `time`: 24-hour format time (e.g., "09:00")
- `day`: "saturday" or "sunday"
- `order`: Display order (1, 2, 3, etc.)
- `isActive`: Whether to show this service

### Display Settings
- `showSNS`: Show Saturday services
- `showSunday`: Show Sunday services
- `columnWidth`: "auto" or "fixed"
- `maxColumnsPerRow`: Maximum columns per row (1-4)

## Migration from Old System

### Step 1: Update Your Components
Replace hardcoded components with flexible ones:

```tsx
// Before
<SCSchedulesByRole role={role} />

// After
<SCFlexibleSchedulesByRole role={role} />
```

### Step 2: Initialize Configuration
```typescript
import { migrateToFlexibleSchedule } from '@/utils/scheduleUtils';

// Migrate existing hardcoded services to flexible system
migrateToFlexibleSchedule();
```

### Step 3: Test the System
1. Visit `/schedule/flexible-demo` to see the flexible system in action
2. Visit `/admin/schedule-config` to manage service times
3. Verify that your existing schedule data still displays correctly

## Examples

### Adding a New Service Time
```typescript
import { addServiceTime } from '@/utils/scheduleUtils';

// Add a new Saturday service
const newService = addServiceTime(
  '2:00 pm',    // Display name
  '14:00',      // 24-hour time
  'saturday',   // Day
  2             // Order (optional)
);
```

### Removing a Service Time
```typescript
import { removeServiceTime } from '@/utils/scheduleUtils';

// Remove the 6:30 PM Saturday service
removeServiceTime('sns2');
```

### Getting Services for a Specific Day
```typescript
import { getServicesForDay } from '@/utils/scheduleUtils';

// Get all active Saturday services
const saturdayServices = getServicesForDay('saturday');
console.log(saturdayServices);
// Output: [{ id: 'sns1', name: '4:00 pm', ... }, { id: 'sns2', name: '6:30 pm', ... }]
```

## Benefits

1. **Easy Management**: Add/remove service times without code changes
2. **Flexible Display**: Automatically adjust table columns
3. **Admin Friendly**: Non-technical users can manage schedule times
4. **Backward Compatible**: Works with existing data
5. **Real-time Updates**: Changes reflect immediately
6. **Scalable**: Easy to add new service types or days

## Troubleshooting

### Common Issues

1. **Services not showing**: Check if `isActive` is true
2. **Wrong order**: Verify the `order` property
3. **Missing data**: Ensure the service ID matches your database
4. **Layout issues**: Check `maxColumnsPerRow` setting

### Debug Mode
```typescript
import { scheduleConfigManager } from '@/utils/scheduleConfig';

// Get current configuration
const config = scheduleConfigManager.getConfig();
console.log('Current config:', config);

// Get active services
const activeServices = scheduleConfigManager.getActiveServices();
console.log('Active services:', activeServices);
```

## Next Steps

1. **Test the System**: Visit the demo page and admin interface
2. **Migrate Components**: Replace old components with flexible ones
3. **Configure Services**: Set up your desired service times
4. **Train Users**: Show admins how to use the configuration interface
5. **Monitor**: Check that everything works as expected

## Support

If you encounter any issues:
1. Check the browser console for errors
2. Verify your service IDs match the database
3. Ensure all required properties are set
4. Test with the demo page first

The flexible schedule system is designed to be intuitive and powerful. With this system, you can easily adapt your schedule to changing needs without touching the code!
