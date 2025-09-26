# Events Feature Overview

## Summary
The Events management system provides comprehensive event planning and volunteer assignment capabilities for the Live Production Dashboard.

## Key Features

### Admin Features
- Create new events with detailed information
- Assign volunteers to specific roles
- Update event status (Active/Inactive)
- Full CRUD operations

### Public Features
- View upcoming events
- See volunteer counts per event
- Read-only access to event details

### Volunteer Assignment
- Role-based volunteer filtering
- Dropdown selection for each position
- Real-time volunteer availability checking
- Database persistence of assignments

## Access Points

### 1. Schedule Masterlist
- Path: `/schedule/role/events`
- Shows admin interface for authenticated users
- Full event management capabilities

### 2. Upcoming Schedule Tab
- Accessible via "Events" tab in segment view
- Always shows public interface
- Consistent user experience

## Technical Architecture

### Database Schema
- MongoDB collection with embedded volunteer assignments
- ObjectId references to Volunteer collection
- Status tracking and date management

### Component Structure
- **CCEventsManager**: Main component handling both admin and public views
- **SCScheduleBySegment**: Server component with Events tab integration
- **Authentication-based rendering**: Different interfaces based on user permissions

### API Endpoints
- `GET /api/events`: Fetch all events
- `POST /api/events`: Create new event
- `PUT /api/events/[id]`: Update event status