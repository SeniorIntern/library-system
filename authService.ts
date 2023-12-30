const authService = {
  logout() {
    // Remove the token from the cookie
    localStorage.removeItem('token')
  },

  isAuthenticated() {
    // Check if the token exists in the cookie
    return !!localStorage.getItem('token');
  },

  getToken() {
    // Get the token from the cookie
    return localStorage.getItem('token');
  },
};

export default authService;

