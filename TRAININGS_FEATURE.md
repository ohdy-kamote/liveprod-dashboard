# Trainings Attended Feature

## Overview
Added trainings attended functionality to volunteer profiles, allowing admins to track and manage volunteer training records with full server-side persistence.

## Features
- **Admin Access Only**: Only authenticated admin users can add, edit, or remove training records
- **Two Training Slots**: Each volunteer can have up to 2 training records
- **Server-Side Persistence**: All training data is saved to MongoDB and fully editable
- **Training Information**: Each training record contains:
  - Training Name (text field)
  - Training Date (date picker with proper formatting)

## Implementation

### Database Schema
Updated `models/volunteer.ts`:
```typescript
trainings: [{
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
}]
```

### API Layer
- **Backend API**: Updated `app/api/volunteers/[id]/route.ts` to handle trainings in PUT requests
- **Client API**: Updated `utils/apis/put.ts` VolunteerData interface to include trainings
- **Data Flow**: Trainings are properly serialized and saved to MongoDB

### UI Components
- Added trainings section in volunteer profile between Basic Info and Schedule
- Training input fields with labels "Training 1 Name/Date" and "Training 2 Name/Date"
- Add Training button (appears when less than 2 trainings exist)
- Remove training button (X icon) for each training record
- Proper date formatting for database compatibility

### State Management
- Trainings included in change detection system
- Reset functionality restores original training values
- Save button activates when training data is modified

## Usage
1. Navigate to any volunteer profile page
2. Admin users will see "Trainings Attended" section
3. Click "Add Training" to create new training record
4. Fill in training name and select date
5. Click "Save" to persist changes to server
6. Use X button to remove individual training records
7. Click "Cancel" to revert unsaved changes

## Technical Details
- **Date Handling**: Dates are converted to ISO format for database storage
- **Validation**: Training records require both name and date fields
- **Persistence**: All changes are saved via PUT request to `/api/volunteers/[id]`
- **Error Handling**: Failed saves are handled gracefully with user feedback

## Access Control
- **Admin Users**: Full CRUD access to training records with server persistence
- **Non-Admin Users**: Read-only access (can view existing trainings)
- **Unauthenticated Users**: Read-only access (can view existing trainings)

## Status
✅ **Complete** - Feature is fully implemented with server-side saving and editing capabilities