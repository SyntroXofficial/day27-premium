import { useState, useEffect } from 'react';
import { securityService } from '../services/securityService';

export function useSecurityDashboard() {
  const [securityStats, setSecurityStats] = useState({
    securityLevel: 'High',
    threatsBlocked: 0,
    activeSessions: 0,
    lastAttack: null,
    activeThreats: 0
  });

  const [firewallRules, setFirewallRules] = useState([
    {
      id: '1',
      name: 'Block VPN Access',
      description: 'Automatically block known VPN and proxy connections',
      enabled: true
    },
    {
      id: '2',
      name: 'Rate Limiting',
      description: 'Limit request rate to prevent DDoS attacks',
      enabled: true
    },
    {
      id: '3',
      name: 'Geo-blocking',
      description: 'Block access from specific countries',
      enabled: false
    }
  ]);

  const [accessRules, setAccessRules] = useState([
    {
      id: '1',
      name: 'Two-Factor Authentication',
      description: 'Require 2FA for all admin actions',
      type: 'Authentication',
      enabled: true
    },
    {
      id: '2',
      name: 'Session Timeout',
      description: 'Automatically logout inactive users after 30 minutes',
      type: 'Session',
      enabled: true
    },
    {
      id: '3',
      name: 'IP Whitelist',
      description: 'Only allow access from trusted IP addresses',
      type: 'Access',
      enabled: false
    }
  ]);

  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const unsubscribe = securityService.subscribe(updates => {
      setSecurityStats(updates.stats);
      setLogs(updates.logs);
    });

    return () => unsubscribe();
  }, []);

  const updateFirewallRule = (id, updates) => {
    setFirewallRules(prev => prev.map(rule =>
      rule.id === id ? { ...rule, ...updates } : rule
    ));
  };

  const updateAccessRule = (id, updates) => {
    setAccessRules(prev => prev.map(rule =>
      rule.id === id ? { ...rule, ...updates } : rule
    ));
  };

  const addFirewallRule = (rule) => {
    setFirewallRules(prev => [...prev, { ...rule, id: Date.now().toString() }]);
  };

  const addAccessRule = (rule) => {
    setAccessRules(prev => [...prev, { ...rule, id: Date.now().toString() }]);
  };

  const clearLogs = () => {
    setLogs([]);
  };

  return {
    securityStats,
    firewallRules,
    accessRules,
    logs,
    updateFirewallRule,
    updateAccessRule,
    addFirewallRule,
    addAccessRule,
    clearLogs
  };
}