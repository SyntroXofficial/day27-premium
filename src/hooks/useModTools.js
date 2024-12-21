import { useState } from 'react';

export function useModTools() {
  const [reports, setReports] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  const handleReport = (id, action) => {
    setReports(prev => prev.filter(report => report.id !== id));
  };

  const createAnnouncement = () => {
    const newAnnouncement = {
      id: Date.now().toString(),
      title: 'New Announcement',
      content: 'Content here...',
      author: 'Moderator',
      date: new Date().toLocaleDateString()
    };
    setAnnouncements(prev => [newAnnouncement, ...prev]);
  };

  return { reports, announcements, handleReport, createAnnouncement };
}