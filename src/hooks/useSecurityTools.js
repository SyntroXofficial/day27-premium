import { useState, useEffect } from 'react';
import { banService } from '../services/banService';
import { validateIP, isVPN, getBrowserFingerprint } from '../utils/securityUtils';

export function useSecurityTools() {
  const [security, setSecurity] = useState({
    vpnBlocking: true,
    ipBlocking: true,
    blockedVPNs: 0,
    blockedIPs: 0,
    lastAttack: 'No recent attacks',
    securityLevel: 'High',
    banHistory: [],
    settings: {
      autoBlockVPNs: true,
      autoBlockSuspiciousIPs: true,
      maxLoginAttempts: 5,
      banDuration: 24 // hours
    }
  });

  useEffect(() => {
    // Load ban history
    setSecurity(prev => ({
      ...prev,
      banHistory: banService.getBanHistory()
    }));
  }, []);

  const toggleVPNBlock = () => {
    setSecurity(prev => ({
      ...prev,
      vpnBlocking: !prev.vpnBlocking,
      settings: {
        ...prev.settings,
        autoBlockVPNs: !prev.vpnBlocking
      }
    }));
  };

  const toggleIPBlock = () => {
    setSecurity(prev => ({
      ...prev,
      ipBlocking: !prev.ipBlocking,
      settings: {
        ...prev.settings,
        autoBlockSuspiciousIPs: !prev.ipBlocking
      }
    }));
  };

  const updateSecuritySettings = (newSettings) => {
    setSecurity(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        ...newSettings
      }
    }));
  };

  return { 
    security, 
    toggleVPNBlock, 
    toggleIPBlock, 
    updateSecuritySettings
  };
}