"use client";

import { useState } from "react";

export default function TestVolunteerIds() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const runMigration = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/volunteers/migrate-ids', { method: 'POST' });
      const data = await response.json();
      setResult({ type: 'migration', data, status: response.status });
    } catch (error) {
      setResult({ type: 'migration', error: (error as Error).message });
    }
    setLoading(false);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Test Volunteer IDs</h1>
      
      <div className="flex gap-4 mb-6">
        <button 
          onClick={runMigration}
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Run ID Migration
        </button>
      </div>

      {loading && <p>Loading...</p>}
      
      {result && (
        <div className="bg-gray-100 p-4 rounded">
          <h3 className="font-bold mb-2">Result ({result.type}):</h3>
          <pre className="text-sm overflow-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}