// src/services/cookieService.js
import Cookies from 'js-cookie';

const cookieService = {
  setCookie(name, value, options = {}) {
    Cookies.set(name, value, {
      expires: 365,
      secure: true,
      sameSite: 'None',
      ...options
    });
  },
  getCookie(name) {
    return Cookies.get(name);
  },
  removeCookie(name) {
    Cookies.remove(name, {
      secure: true,
      sameSite: 'None'
    });
  }
};

export default cookieService;
