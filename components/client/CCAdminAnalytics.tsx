"use client";

import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement,
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement
);

interface AnalyticsData {
  volunteerStats: Array<{ _id: string; count: number }>;
  genderStats: Array<{ _id: string; count: number }>;
  segmentStats: Array<{ _id: string; count: number }>;
  scheduleStats: Array<{ _id: { year: number; month: number }; count: number }>;
  roleStats: Array<{ _id: string; count: number }>;
}

export default function CCAdminAnalytics() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/admin/analytics');
      if (response.ok) {
        const analyticsData = await response.json();
        setData(analyticsData);
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-96">Loading analytics...</div>;
  }

  if (!data) {
    return <div className="flex justify-center items-center h-96">Failed to load analytics</div>;
  }

  const volunteerStatusData = {
    labels: data.volunteerStats.map(item => item._id || 'Unknown'),
    datasets: [{
      data: data.volunteerStats.map(item => item.count),
      backgroundColor: ['#10b981', '#f59e0b', '#3b82f6', '#ef4444', '#8b5cf6'],
    }]
  };

  const genderData = {
    labels: data.genderStats.map(item => item._id || 'Unknown'),
    datasets: [{
      data: data.genderStats.map(item => item.count),
      backgroundColor: ['#3b82f6', '#ec4899'],
    }]
  };

  const segmentData = {
    labels: data.segmentStats.map(item => item._id || 'Unknown'),
    datasets: [{
      label: 'Volunteers by Segment',
      data: data.segmentStats.map(item => item.count),
      backgroundColor: '#3b82f6',
    }]
  };

  const scheduleData = {
    labels: data.scheduleStats.map(item => `${item._id.year}-${item._id.month.toString().padStart(2, '0')}`),
    datasets: [{
      label: 'Schedules per Month',
      data: data.scheduleStats.map(item => item.count),
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
    }]
  };

  const roleData = {
    labels: data.roleStats.map(item => item._id || 'Unknown'),
    datasets: [{
      label: 'Schedule Count by Role',
      data: data.roleStats.map(item => item.count),
      backgroundColor: '#10b981',
    }]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  return (
    <div className="px-8 py-6">
      <h1 className="text-2xl font-bold text-slate-700 mb-8">Admin Analytics Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Volunteer Status */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Volunteer Status Distribution</h2>
          <div className="h-64">
            <Doughnut data={volunteerStatusData} options={chartOptions} />
          </div>
        </div>

        {/* Gender Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Gender Distribution</h2>
          <div className="h-64">
            <Doughnut data={genderData} options={chartOptions} />
          </div>
        </div>

        {/* Segment Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Volunteers by Segment</h2>
          <div className="h-64">
            <Bar data={segmentData} options={chartOptions} />
          </div>
        </div>

        {/* Schedule Trends */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Schedule Trends (Last 6 Months)</h2>
          <div className="h-64">
            <Line data={scheduleData} options={chartOptions} />
          </div>
        </div>

        {/* Top Roles */}
        <div className="bg-white p-6 rounded-lg shadow-md lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Top 10 Roles by Schedule Count</h2>
          <div className="h-64">
            <Bar data={roleData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}