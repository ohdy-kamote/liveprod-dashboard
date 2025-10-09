"use client";

import { useEffect, useState } from "react";
import { IoClose, IoInformationCircle, IoCheckmarkCircle, IoWarning, IoAlert, IoHappy } from "react-icons/io5";

interface Announcement {
  _id: string;
  title: string;
  message: string;
  theme: 'info' | 'success' | 'warning' | 'error' | 'celebration';
  isActive: boolean;
}

const themeConfig = {
  info: {
    bg: 'bg-blue-50 border-blue-200',
    text: 'text-blue-800',
    icon: IoInformationCircle,
    iconColor: 'text-blue-500'
  },
  success: {
    bg: 'bg-green-50 border-green-200',
    text: 'text-green-800',
    icon: IoCheckmarkCircle,
    iconColor: 'text-green-500'
  },
  warning: {
    bg: 'bg-yellow-50 border-yellow-200',
    text: 'text-yellow-800',
    icon: IoWarning,
    iconColor: 'text-yellow-500'
  },
  error: {
    bg: 'bg-red-50 border-red-200',
    text: 'text-red-800',
    icon: IoAlert,
    iconColor: 'text-red-500'
  },
  celebration: {
    bg: 'bg-purple-50 border-purple-200',
    text: 'text-purple-800',
    icon: IoHappy,
    iconColor: 'text-purple-500'
  }
};

export default function CCAnnouncementBanner() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [dismissedIds, setDismissedIds] = useState<string[]>([]);

  useEffect(() => {
    fetchAnnouncements();
    // Load dismissed announcements from localStorage
    const dismissed = localStorage.getItem('dismissedAnnouncements');
    if (dismissed) {
      setDismissedIds(JSON.parse(dismissed));
    }
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await fetch('/api/announcements');
      const result = await response.json();
      setAnnouncements(result.data || []);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    }
  };

  const dismissAnnouncement = (id: string) => {
    const newDismissed = [...dismissedIds, id];
    setDismissedIds(newDismissed);
    localStorage.setItem('dismissedAnnouncements', JSON.stringify(newDismissed));
  };

  const activeAnnouncements = announcements.filter(
    announcement => !dismissedIds.includes(announcement._id)
  );

  if (activeAnnouncements.length === 0) return null;

  return (
    <div className="space-y-2 mb-6">
      {activeAnnouncements.map((announcement) => {
        const theme = themeConfig[announcement.theme];
        const IconComponent = theme.icon;
        
        return (
          <div key={announcement._id} className={`${theme.bg} border rounded-lg p-4 flex items-start gap-3`}>
            <IconComponent className={`${theme.iconColor} flex-shrink-0 mt-0.5`} size={20} />
            <div className="flex-1">
              <h3 className={`${theme.text} font-semibold text-sm`}>{announcement.title}</h3>
              <p className={`${theme.text} text-sm mt-1`}>{announcement.message}</p>
            </div>
            <button
              onClick={() => dismissAnnouncement(announcement._id)}
              className={`${theme.text} hover:opacity-70 flex-shrink-0`}
            >
              <IoClose size={18} />
            </button>
          </div>
        );
      })}
    </div>
  );
}