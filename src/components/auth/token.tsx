
//using localstoagre not cookies here
export function getUserFromCookies(): any | null {
    if (typeof window !== 'undefined') { // Check if window is available
      const userLocalStorage = localStorage.getItem('user');
      if (userLocalStorage) {
        try {
          return JSON.parse(userLocalStorage);
        } catch (error) {
          console.error('Failed to parse user data from localStorage:', error);
          return null;
        }
      } else {
        console.error('User data is not available in localStorage');
        return null;
      }
    } else {
      console.error('Window is not available');
      return null;
    }
  }
  