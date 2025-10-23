"use client";

import { useState } from "react";

export default function DebugVolunteer() {
  const [volunteerId, setVolunteerId] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [allVolunteers, setAllVolunteers] = useState<any[]>([]);

  const testLookup = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/volunteers/by-id/${volunteerId}`);
      const data = await response.json();
      setResult({ status: response.status, data });
    } catch (error) {
      setResult({ error: error.message });
    }
    setLoading(false);
  };

  const loadAllVolunteers = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/volunteers');
      const data = await response.json();
      setAllVolunteers(data.data || []);
    } catch (error) {
      console.error('Error loading volunteers:', error);
    }
    setLoading(false);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Volunteer ID Debug Tool</h1>
      
      <div className="space-y-6">
        <div className="border p-4 rounded">
          <h2 className="text-lg font-semibold mb-4">Test Volunteer ID Lookup</h2>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={volunteerId}
              onChange={(e) => setVolunteerId(e.target.value)}
              placeholder="Enter Volunteer ID (e.g., A123456)"
              className="border p-2 rounded flex-1"
            />
            <button
              onClick={testLookup}
              disabled={loading || !volunteerId}
              className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
            >
              {loading ? 'Testing...' : 'Test Lookup'}
            </button>
          </div>
          
          {result && (
            <div className="bg-gray-100 p-4 rounded">
              <h3 className="font-semibold mb-2">Result:</h3>
              <pre className="text-sm overflow-auto">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}
        </div>

        <div className="border p-4 rounded">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">All Volunteer IDs</h2>
            <button
              onClick={loadAllVolunteers}
              disabled={loading}
              className="bg-green-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
            >
              {loading ? 'Loading...' : 'Load All Volunteers'}
            </button>
          </div>
          
          {allVolunteers.length > 0 && (
            <div className="space-y-2 max-h-96 overflow-auto">
              {allVolunteers.slice(0, 20).map((volunteer) => (
                <div key={volunteer._id} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <strong>{volunteer.volunteerId || 'NO ID'}</strong> - {volunteer.firstName} {volunteer.lastName}
                  </div>
                  <button
                    onClick={() => setVolunteerId(volunteer.volunteerId || '')}
                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm"
                  >
                    Test This ID
                  </button>
                </div>
              ))}
              {allVolunteers.length > 20 && (
                <p className="text-gray-500 text-sm">Showing first 20 of {allVolunteers.length} volunteers</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}