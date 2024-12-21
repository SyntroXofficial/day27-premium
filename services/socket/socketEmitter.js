import { SOCKET_EVENTS } from './socketConfig';

class SocketEmitter {
  constructor() {
    this.isConnected = false;
    this.pendingMessages = [];
  }

  setConnected(status) {
    this.isConnected = status;
    if (status) {
      this.flushPendingMessages();
    }
  }

  emit(event, data) {
    if (!this.isConnected) {
      this.pendingMessages.push({ event, data });
      return;
    }

    // In development, simulate successful emit
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Socket] Emitting ${event}:`, data);
      return;
    }
  }

  flushPendingMessages() {
    while (this.pendingMessages.length > 0) {
      const { event, data } = this.pendingMessages.shift();
      this.emit(event, data);
    }
  }
}

export const socketEmitter = new SocketEmitter();