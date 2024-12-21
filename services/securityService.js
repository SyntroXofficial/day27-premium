class SecurityService {
  constructor() {
    this.listeners = new Set();
    this.stats = {
      securityLevel: 'High',
      threatsBlocked: 0,
      activeSessions: 0,
      lastAttack: null,
      activeThreats: 0
    };
    this.logs = [];
    this.startMonitoring();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    listener({ stats: this.stats, logs: this.logs });
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach(listener => 
      listener({ stats: this.stats, logs: this.logs })
    );
  }

  addLog(log) {
    this.logs.unshift({
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      ...log
    });
    this.notify();
  }

  updateStats(updates) {
    this.stats = {
      ...this.stats,
      ...updates
    };
    this.notify();
  }

  startMonitoring() {
    // Simulate security events
    setInterval(() => {
      const randomEvent = Math.random();
      
      if (randomEvent < 0.1) {
        this.stats.threatsBlocked++;
        this.addLog({
          type: 'security',
          severity: 'high',
          message: 'Suspicious activity blocked',
          ip: '192.168.1.' + Math.floor(Math.random() * 255)
        });
      }

      if (randomEvent < 0.05) {
        this.stats.activeThreats = Math.floor(Math.random() * 3);
        if (this.stats.activeThreats > 0) {
          this.stats.securityLevel = 'Medium';
          this.addLog({
            type: 'security',
            severity: 'critical',
            message: `${this.stats.activeThreats} new security threats detected`,
            ip: '192.168.1.' + Math.floor(Math.random() * 255)
          });
        }
      }

      this.stats.activeSessions = Math.floor(Math.random() * 10) + 5;
      this.notify();
    }, 30000);
  }
}

export const securityService = new SecurityService();