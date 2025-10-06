"use client";

import { useState, useEffect } from "react";
import GCInputTextWithLabel from "@/components/global/GCInputTextWithLabel";

interface AnalyticsData {
  volunteers: {
    total: number;
    active: number;
    byStatus: { _id: string; count: number }[];
    byGender: { _id: string; count: number }[];
    bySegment: { _id: string; count: number }[];
  };
  roles: { _id: string; count: number }[];
  schedules: {
    recent: number;
    byRole: { _id: string; count: number }[];
  };
  trainings: {
    total: number;
    recent: number;
  };
}

export default function CCAnalytics({ isAuthenticated }: { isAuthenticated: boolean }) {
  const [powerBiUrl, setPowerBiUrl] = useState("");
  const [tempUrl, setTempUrl] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [viewMode, setViewMode] = useState<'mongodb' | 'powerbi'>('mongodb');

  useEffect(() => {
    // Load saved Power BI URL from localStorage
    const savedUrl = localStorage.getItem('powerbi-url');
    if (savedUrl) {
      setPowerBiUrl(savedUrl);
      setTempUrl(savedUrl);
    }
    
    // Fetch MongoDB analytics data
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/analytics');
      const result = await response.json();
      setAnalyticsData(result.data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  };

  const handleSave = () => {
    setPowerBiUrl(tempUrl);
    localStorage.setItem('powerbi-url', tempUrl);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempUrl(powerBiUrl);
    setIsEditing(false);
  };

  return (
    <div className="w-full">
      <div className="bg-slate-800 border border-slate-800 flex justify-between items-center px-6">
        <h2 className="text-white text-lg font-semibold py-3">Analytics</h2>
        <div className="flex gap-2">
          <div className="flex bg-slate-700 rounded">
            <button
              onClick={() => setViewMode('mongodb')}
              className={`px-3 py-1 text-sm rounded-l ${viewMode === 'mongodb' ? 'bg-blue-600 text-white' : 'text-gray-300'}`}
            >
              MongoDB
            </button>
            <button
              onClick={() => setViewMode('powerbi')}
              className={`px-3 py-1 text-sm rounded-r ${viewMode === 'powerbi' ? 'bg-blue-600 text-white' : 'text-gray-300'}`}
            >
              Power BI
            </button>
          </div>
          {isAuthenticated && viewMode === 'powerbi' && (
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-white text-sm px-3 py-1 bg-blue-600 rounded hover:bg-blue-700"
            >
              {isEditing ? 'Cancel' : 'Configure'}
            </button>
          )}
        </div>
      </div>

      {isAuthenticated && isEditing && (
        <div className="p-4 bg-slate-50 border-b">
          <div className="max-w-2xl">
            <GCInputTextWithLabel
              label="Power BI Embed URL"
              value={tempUrl}
              onChange={(e) => setTempUrl(e.target.value)}
            />
            <div className="flex gap-2 mt-4">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Enter the Power BI embed URL. You can get this from Power BI → Share → Embed → Website or blog.
            </p>
          </div>
        </div>
      )}

      <div className="p-4">
        {viewMode === 'mongodb' ? (
          <div className="space-y-6">
            {analyticsData ? (
              <>
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-blue-800">Total Volunteers</h3>
                    <p className="text-3xl font-bold text-blue-600">{analyticsData.volunteers.total}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-green-800">Active Volunteers</h3>
                    <p className="text-3xl font-bold text-green-600">{analyticsData.volunteers.active}</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-purple-800">Recent Schedules</h3>
                    <p className="text-3xl font-bold text-purple-600">{analyticsData.schedules.recent}</p>
                    <p className="text-sm text-purple-600">Last 30 days</p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-orange-800">Total Trainings</h3>
                    <p className="text-3xl font-bold text-orange-600">{analyticsData.trainings.total}</p>
                  </div>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Status Distribution */}
                  <div className="bg-white p-4 border rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">Volunteers by Status</h3>
                    <div className="space-y-2">
                      {analyticsData.volunteers.byStatus.map((item) => (
                        <div key={item._id} className="flex justify-between items-center">
                          <span className="capitalize">{item._id}</span>
                          <span className="font-semibold">{item.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Gender Distribution */}
                  <div className="bg-white p-4 border rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">Volunteers by Gender</h3>
                    <div className="space-y-2">
                      {analyticsData.volunteers.byGender.map((item) => (
                        <div key={item._id} className="flex justify-between items-center">
                          <span className="capitalize">{item._id}</span>
                          <span className="font-semibold">{item.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Top Roles */}
                  <div className="bg-white p-4 border rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">Top Roles</h3>
                    <div className="space-y-2">
                      {analyticsData.roles.slice(0, 10).map((item) => (
                        <div key={item._id} className="flex justify-between items-center">
                          <span className="text-sm">{item._id}</span>
                          <span className="font-semibold">{item.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Schedule Roles */}
                  <div className="bg-white p-4 border rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">Recent Schedule by Role</h3>
                    <div className="space-y-2">
                      {analyticsData.schedules.byRole.slice(0, 10).map((item) => (
                        <div key={item._id} className="flex justify-between items-center">
                          <span className="text-sm">{item._id}</span>
                          <span className="font-semibold">{item.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <div className="text-gray-500">Loading analytics data...</div>
              </div>
            )}
          </div>
        ) : (
          <div>
            {powerBiUrl ? (
              <div className="w-full">
                <iframe
                  src={powerBiUrl}
                  width="100%"
                  height="600"
                  frameBorder="0"
                  allowFullScreen
                  className="border border-gray-300 rounded"
                  title="Power BI Analytics Dashboard"
                />
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-gray-500">
                  <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Power BI Dashboard Configured</h3>
                  <p className="text-gray-600">
                    {isAuthenticated 
                      ? "Click 'Configure' to add your Power BI dashboard URL."
                      : "Power BI dashboard will be displayed here when configured by an admin."
                    }
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}