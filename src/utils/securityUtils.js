// IP and VPN validation utilities
export const validateIP = (ip) => {
  const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
  return ipRegex.test(ip);
};

export const isVPN = async (ip) => {
  // In a real implementation, this would check against a VPN detection service
  return false;
};

export const getBrowserFingerprint = () => {
  const userAgent = navigator.userAgent;
  const screenResolution = `${window.screen.width}x${window.screen.height}`;
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const language = navigator.language;
  
  return {
    userAgent,
    screenResolution,
    timezone,
    language,
    timestamp: Date.now()
  };
};