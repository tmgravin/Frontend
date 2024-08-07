
import Cookies from 'js-cookie';
export function getUserFromCookies(): any | null {
  const userCookie = Cookies.get('user');
  if (userCookie) {
    try {
      return JSON.parse(userCookie);
    } catch (error) {
      console.error('Failed to parse user cookie:', error);
      return null;
    }
  } else {
    console.error('User cookie is not available');
    return null;
  }
}



    //import { getUserFromCookies } from '../utils/cookies'; // Adjust the path as necessary

    //const user = getUserFromCookies();

