import httpClient from "./http";
import router from "@/router";

const AUTH_TOKEN_KEY = 'authToken';
const USER_KEY = 'user';
const ROLES_KEY = 'roles';

function saveAuthData(token, user) {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  localStorage.setItem(ROLES_KEY, user.roles[0]);
}

function clearAuthData() {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(ROLES_KEY);
}

const authService = {
  async login(formData) {
    try {
      const response = await httpClient.post('/auth/login', formData);
      if (response.data && response.data.access_token && response.data.user) {
        saveAuthData(response.data.access_token, response.data.user);
        return { success: true, data: response.data };
      } else {
        console.warn('Ответ сервера не содержит необходимых данных');
        return { success: false, data: null, errors: { message: 'No response data' }};
      }
    } catch (error) {
      console.error('Ошибка при попытке входа:', error);
      return { success: false, data: null, errors: error.response ? error.response.data.errors : error };
    }
  },

  logout() {
    clearAuthData();
    router.push({ name: 'LoginPage' });
  },

  getToken() {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  },

  getUser() {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  },

  isLoggedIn() {
    return !!this.getToken();
  }
};

export default authService;
