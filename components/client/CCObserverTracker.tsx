"use client";

import { useState, useEffect } from "react";

interface Observer {
  _id: string;
  name: string;
  roles: string[];
  status: string;
}

export default function CCObserverTracker({ isAuthenticated }: { isAuthenticated: boolean }) {
  const [observers, setObservers] = useState<Observer[]>([]);

  useEffect(() => {
    fetchObservers();
  }, []);

  const fetchObservers = async () => {
    try {
      const response = await fetch('/api/volunteers');
      const result = await response.json();
      const observerData = result.data?.filter((volunteer: Observer) => 
        volunteer.roles?.some(role => role.toLowerCase().includes('observer')) ||
        volunteer.status === 'observer'
      ) || [];
      setObservers(observerData);
    } catch (error) {
      console.error('Error fetching observers:', error);
    }
  };

  return (
    <div className="px-8 py-6">
      <div className="flex justify-end items-center mb-6">
        <span className="text-slate-600 font-medium">{observers.length} observers</span>
      </div>

      <div>
        {observers.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No observers found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {observers.map((observer) => (
              <div key={observer._id} className="border border-gray-300 rounded-lg p-4 hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-lg mb-2">{observer.name}</h3>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium text-gray-600">Status: </span>
                    <span className={`text-sm capitalize ${
                      observer.status === 'active' ? 'text-green-600' :
                      observer.status === 'observer' ? 'text-cyan-600' :
                      'text-gray-600'
                    }`}>
                      {observer.status}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Observer Roles: </span>
                    <div className="text-sm text-gray-700">
                      {observer.roles
                        ?.filter(role => role.toLowerCase().includes('observer'))
                        .map(role => role.replace(/observer/i, 'Observer'))
                        .join(', ') || 'General Observer'}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}