# Announcements System

## Overview
Admin-managed announcement system for the LiveProd Dashboard landing page with theme selection and user dismissal functionality.

## Features
- **Admin-only creation** - Protected announcement management
- **Theme selection** - 5 visual themes for different announcement types
- **Landing page display** - Prominent placement on home page
- **User dismissal** - Individual announcement dismissal with localStorage persistence
- **MongoDB storage** - Persistent announcement data with timestamps

## Theme Options

### 1. Info (Blue)
- **Use case**: General information, updates, reminders
- **Color**: Blue background with blue text
- **Icon**: Information circle

### 2. Success (Green)
- **Use case**: Positive news, achievements, completions
- **Color**: Green background with green text
- **Icon**: Checkmark circle

### 3. Warning (Yellow)
- **Use case**: Important notices, upcoming changes
- **Color**: Yellow background with yellow text
- **Icon**: Warning triangle

### 4. Error (Red)
- **Use case**: Urgent alerts, critical issues, cancellations
- **Color**: Red background with red text
- **Icon**: Alert circle

### 5. Celebration (Purple)
- **Use case**: Special events, milestones, celebrations
- **Color**: Purple background with purple text
- **Icon**: Happy face

## Admin Management

### Access
- **URL**: `/admin/announcements`
- **Navigation**: Admin dropdown menu → Announcements
- **Requirements**: Admin account login

### Creating Announcements
1. Enter announcement title
2. Write announcement message
3. Select appropriate theme
4. Click "Create Announcement"

### Announcement Fields
- **Title**: Brief headline for the announcement
- **Message**: Detailed announcement content
- **Theme**: Visual style and context indicator
- **Auto-generated**: Timestamp, active status

## User Experience

### Display Location
- **Landing page**: Top of home page, above slideshow
- **Visibility**: All users (guests and authenticated)
- **Layout**: Stacked announcements with theme styling

### User Interaction
- **Dismissal**: Click X button to hide announcement
- **Persistence**: Dismissed announcements stay hidden via localStorage
- **Icons**: Theme-appropriate icons for visual context

## Technical Implementation

### Database Model
```typescript
{
  title: string,
  message: string,
  theme: 'info' | 'success' | 'warning' | 'error' | 'celebration',
  isActive: boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### API Endpoints
- **GET** `/api/announcements` - Fetch active announcements
- **POST** `/api/announcements` - Create new announcement (admin only)

### Components
- **CCAnnouncementBanner** - Landing page display component
- **CCAnnouncementManager** - Admin management interface

## Security
- Admin authentication required for creation
- Public read access for active announcements
- No user modification of announcements
- Server-side validation and authorization

## Use Cases
- **Service updates**: Info theme for schedule changes
- **Achievements**: Success theme for team milestones
- **Important notices**: Warning theme for policy updates
- **Urgent alerts**: Error theme for cancellations
- **Special events**: Celebration theme for holidays/events