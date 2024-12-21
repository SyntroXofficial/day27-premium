// Stats tracking and calculation service
class StatsService {
  constructor() {
    this.stats = {
      totalUsers: 0,
      activeUsers: 0,
      activeAccounts: 0,
      serverStatus: 'Offline',
      uptime: '0%',
      responseTime: 0,
      bannedUsers: 0,
      newUsers: 0,
      lastUpdate: null
    };
    
    this.listeners = new Set();
    this.startTracking();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach(listener => listener(this.stats));
  }

  calculateUptime() {
    const startTime = localStorage.getItem('serverStartTime');
    if (!startTime) {
      localStorage.setItem('serverStartTime', Date.now().toString());
      return '100%';
    }

    const uptime = Date.now() - parseInt(startTime);
    const days = Math.floor(uptime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((uptime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((uptime % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${days}d ${hours}h ${minutes}m`;
  }

  async measureResponseTime() {
    const start = performance.now();
    try {
      await fetch(window.location.origin);
      return Math.round(performance.now() - start);
    } catch (error) {
      console.error('Error measuring response time:', error);
      return 0;
    }
  }

  countActiveUsers() {
    try {
      const sessions = Object.keys(localStorage).filter(key => 
        key.startsWith('user_session_')
      );
      
      const now = Date.now();
      const activeCount = sessions.reduce((count, key) => {
        const lastActive = parseInt(localStorage.getItem(key));
        return now - lastActive < 15 * 60 * 1000 ? count + 1 : count;
      }, 0);

      return activeCount;
    } catch (error) {
      console.error('Error counting active users:', error);
      return 0;
    }
  }

  async updateStats() {
    try {
      // Get stored user data
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const bannedUsers = users.filter(user => user.banned).length;
      
      // Get stored accounts data
      const accounts = JSON.parse(localStorage.getItem('accounts') || '[]');
      const activeAccounts = accounts.filter(account => !account.disabled).length;

      // Calculate new users in last 24h
      const oneDayAgo = Date.now() - (24 * 60 * 60 * 1000);
      const newUsers = users.filter(user => 
        new Date(user.joinDate).getTime() > oneDayAgo
      ).length;

      // Update session for current user
      const currentUser = JSON.parse(localStorage.getItem('prime_nexo_auth') || '{}')?.user;
      if (currentUser) {
        localStorage.setItem(`user_session_${currentUser.id}`, Date.now().toString());
      }

      // Update stats
      this.stats = {
        totalUsers: users.length,
        activeUsers: this.countActiveUsers(),
        activeAccounts,
        serverStatus: 'Online',
        uptime: this.calculateUptime(),
        responseTime: await this.measureResponseTime(),
        bannedUsers,
        newUsers,
        lastUpdate: new Date().toISOString()
      };

      this.notify();
    } catch (error) {
      console.error('Error updating stats:', error);
    }
  }

  startTracking() {
    // Initial update
    this.updateStats();

    // Update every 30 seconds
    setInterval(() => this.updateStats(), 30000);
  }
}

export const statsService = new StatsService();