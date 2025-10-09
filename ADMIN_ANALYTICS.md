# Admin Analytics Dashboard

## Overview
Internal analytics dashboard for LiveProd team administrators, replacing Power BI with a custom solution built using Chart.js, MongoDB aggregation, and Next.js API routes.

## Features
- **Admin-only access** - Protected by authentication middleware
- **Real-time data** - Live statistics from MongoDB database
- **Interactive charts** - Built with Chart.js for responsive visualizations
- **Efficient queries** - MongoDB aggregation framework for optimal performance

## Analytics Included

### 1. Volunteer Status Distribution (Doughnut Chart)
- Active, Trainee, Observer, On Leave, Inactive volunteers
- Visual breakdown of volunteer availability

### 2. Gender Distribution (Doughnut Chart)
- Male/Female volunteer distribution
- Helps with diversity tracking

### 3. Volunteers by Segment (Bar Chart)
- Audio, Lights, Camera, Graphics, Stage, Volunteer Management
- Shows team distribution across technical areas

### 4. Schedule Trends (Line Chart)
- Last 6 months of scheduling activity
- Identifies busy periods and trends

### 5. Top 10 Roles by Schedule Count (Bar Chart)
- Most frequently scheduled roles
- Helps identify high-demand positions

## Technical Stack
- **Frontend**: Chart.js with react-chartjs-2
- **Backend**: Next.js API routes
- **Database**: MongoDB with aggregation pipeline
- **Authentication**: Admin-only access control

## Access
- **URL**: `/admin/analytics`
- **Navigation**: Admin dropdown menu → Analytics
- **Requirements**: Admin account login

## API Endpoint
- **Route**: `/api/admin/analytics`
- **Method**: GET
- **Auth**: Admin authentication required
- **Response**: JSON with aggregated statistics

## Security
- Server-side authentication check
- Admin role verification
- Protected API routes
- No public access to sensitive data

## Replacement
This dashboard replaces the previous Power BI integration and volunteer analytics system, providing a more integrated and customizable solution for the LiveProd team.