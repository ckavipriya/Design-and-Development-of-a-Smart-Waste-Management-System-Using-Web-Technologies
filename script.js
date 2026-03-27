async login(username, password) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const validUsers = {
        'admin': 'admin123',
        'user': 'user123'
      };
      
      if (validUsers[username] === password) {
        resolve({ 
          success: true, 
          role: username,
          token: btoa(username + ':' + Date.now())
        });
      } else {
        resolve({ 
          success: false, 
          error: username ? 'Incorrect password' : 'Username not found' 
        });
      }
    }, 1200); // Realistic API delay
  });
}
