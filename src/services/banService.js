class BanService {
  constructor() {
    this.bannedIPs = new Set();
    this.bannedFingerprints = new Set();
    this.banHistory = [];
    this.loadBanData();
  }

  loadBanData() {
    try {
      const storedData = localStorage.getItem('ban_data');
      if (storedData) {
        const data = JSON.parse(storedData);
        this.bannedIPs = new Set(data.bannedIPs);
        this.bannedFingerprints = new Set(data.bannedFingerprints);
        this.banHistory = data.banHistory;
      }
    } catch (error) {
      console.error('Error loading ban data:', error);
    }
  }

  saveBanData() {
    try {
      const data = {
        bannedIPs: Array.from(this.bannedIPs),
        bannedFingerprints: Array.from(this.bannedFingerprints),
        banHistory: this.banHistory
      };
      localStorage.setItem('ban_data', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving ban data:', error);
    }
  }

  banUser(userId, reason, staffId) {
    const banEntry = {
      userId,
      reason,
      staffId,
      timestamp: Date.now(),
      fingerprint: getBrowserFingerprint()
    };

    this.banHistory.push(banEntry);
    this.bannedFingerprints.add(JSON.stringify(banEntry.fingerprint));
    this.saveBanData();

    return banEntry;
  }

  unbanUser(userId, staffId) {
    const banEntry = this.banHistory.find(entry => entry.userId === userId);
    if (banEntry) {
      this.bannedFingerprints.delete(JSON.stringify(banEntry.fingerprint));
      this.banHistory = this.banHistory.filter(entry => entry.userId !== userId);
      this.saveBanData();
      return true;
    }
    return false;
  }

  isUserBanned(fingerprint) {
    return this.bannedFingerprints.has(JSON.stringify(fingerprint));
  }

  getBanHistory() {
    return this.banHistory;
  }
}

export const banService = new BanService();