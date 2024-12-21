export const SOCKET_EVENTS = {
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  PRESENCE: 'presence',
  MEMBER_STATUS: 'memberStatus',
  SERVER_METRICS: 'serverMetrics',
  DASHBOARD_UPDATE: 'dashboardUpdate'
};

export const SOCKET_CONFIG = {
  RECONNECTION_ATTEMPTS: 3,
  RECONNECTION_DELAY: 1000,
  PING_INTERVAL: 30000,
  CONNECTION_TIMEOUT: 10000
};