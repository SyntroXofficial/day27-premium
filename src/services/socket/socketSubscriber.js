class SocketSubscriber {
  constructor() {
    this.listeners = new Map();
    this.isSimulated = process.env.NODE_ENV === 'development';
  }

  subscribe(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event).add(callback);

    return () => this.listeners.get(event)?.delete(callback);
  }

  notify(event, data) {
    this.listeners.get(event)?.forEach(callback => callback(data));
  }

  clear() {
    this.listeners.clear();
  }
}

export const socketSubscriber = new SocketSubscriber();