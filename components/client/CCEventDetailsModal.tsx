"use client";

import { CalendarEvent } from "@/utils/calendarUtils";

interface CCEventDetailsModalProps {
  event: CalendarEvent | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: (event: CalendarEvent) => void;
  onDelete?: (event: CalendarEvent) => void;
  isAdmin?: boolean;
}

export default function CCEventDetailsModal({
  event,
  isOpen,
  onClose,
  onEdit,
  onDelete,
  isAdmin = false
}: CCEventDetailsModalProps) {
  if (!event || !isOpen) return null;

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Event Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                {event.resource.role.toUpperCase()}
              </h3>
              <div className="flex items-center space-x-2">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: event.color }}
                ></div>
                {!isAdmin && (
                  <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">
                    View Only
                  </span>
                )}
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              {event.resource.serviceName} - {event.resource.serviceTime}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Schedule Information</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">{formatDate(event.start)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time:</span>
                  <span className="font-medium">
                    {formatTime(event.start)} - {formatTime(event.end)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Service:</span>
                  <span className="font-medium">{event.resource.serviceName}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">Assignment Information</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Role:</span>
                  <span className="font-medium">{event.resource.role}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Volunteer:</span>
                  <span className="font-medium">{event.resource.volunteer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className={`font-medium ${
                    event.resource.volunteer === 'Unassigned' 
                      ? 'text-red-600' 
                      : 'text-green-600'
                  }`}>
                    {event.resource.volunteer === 'Unassigned' ? 'Unassigned' : 'Assigned'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4 border-t">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}