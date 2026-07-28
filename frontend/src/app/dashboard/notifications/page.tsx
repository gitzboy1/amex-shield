"use client";

import { useEffect, useState } from 'react';
import api from '@/lib/api';

export default function NotificationsCenter() {
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = () => {
    api.get('/api/notifications/').then(res => setNotifications(res.data.results || res.data));
  };

  const markAsRead = async (id: string) => {
    await api.put(`/api/notifications/${id}/read/`);
    fetchNotifications();
  };

  const markAllAsRead = async () => {
    await api.post('/api/notifications/read_all/');
    fetchNotifications();
  };

  const unreadCount = notifications.filter(n => !n.is_read).length;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
        {unreadCount > 0 && (
          <button onClick={markAllAsRead} className="text-sm text-blue-600 hover:underline">
            Mark all as read
          </button>
        )}
      </div>

      <div className="space-y-4">
        {notifications.length === 0 ? (
          <div className="text-center p-8 bg-white rounded-lg border border-gray-200 text-gray-500">
            You have no notifications.
          </div>
        ) : (
          notifications.map(notification => (
            <div key={notification.id} className={`p-4 rounded-lg border flex justify-between items-start ${notification.is_read ? 'bg-white border-gray-200' : 'bg-blue-50 border-blue-200'}`}>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${notification.notification_type === 'Expiring Soon' ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800'}`}>
                    {notification.notification_type}
                  </span>
                  <p className="text-sm font-semibold text-gray-800">{notification.title}</p>
                </div>
                <p className="text-sm text-gray-600">{notification.message}</p>
                <p className="text-xs text-gray-400 mt-2">{new Date(notification.created_at).toLocaleString()}</p>
              </div>
              {!notification.is_read && (
                <button onClick={() => markAsRead(notification.id)} className="text-xs text-blue-600 hover:underline mt-1">
                  Mark as read
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
