// Update the localStorage key in the countActiveUsers method
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
    // Update the localStorage key
    const currentUser = JSON.parse(localStorage.getItem('day27_auth') || '{}')?.user;
    if (currentUser) {
      localStorage.setItem(`user_session_${currentUser.id}`, Date.now().toString());
    }
    // Rest of the method remains the same
  } catch (error) {
    console.error('Error updating stats:', error);
  }
}