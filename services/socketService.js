import { socketEmitter } from './socket/socketEmitter';
import { socketSubscriber } from './socket/socketSubscriber';
import { SOCKET_EVENTS, SOCKET_CONFIG } from './socket/socketConfig';

class SocketService {
  constructor() {
    this.isInitialized = false;
    this.reconnectAttempts = 0;
    this.heartbeatInterval = null;
  }

  initialize() {
    if (this.isInitialized) return;

    // In development, simulate a successful connection
    if (process.env.NODE_ENV === 'development') {
      this.isInitialized = true;
      socketEmitter.setConnected(true);
      this.startHeartbeat();
      return;
    }
  }

  subscribe(event, callback) {
    return socketSubscriber.subscribe(event, callback);
  }

  emit(event, data) {
    if (!this.isInitialized) {
      this.initialize();
    }
    socketEmitter.emit(event, data);
  }

  startHeartbeat() {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
    }

    this.heartbeatInterval = setInterval(() => {
      this.emit('heartbeat', { timestamp: Date.now() });
    }, SOCKET_CONFIG.PING_INTERVAL);
  }

  disconnect() {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
    }
    socketSubscriber.clear();
    this.isInitialized = false;
    socketEmitter.setConnected(false);
  }
}

export const socketService = new SocketService();