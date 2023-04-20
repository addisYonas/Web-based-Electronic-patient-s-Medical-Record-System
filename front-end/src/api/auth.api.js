import { API_ROOT } from "./";
import Request from "./request";

const path = "/UserAccounts";

const AuthAPI = {
  login(username, password) {
    const data = {
      username,
      password
    };
    return Request.post(`${API_ROOT}${path}/login`, data);
  },
  forgot(username) {
    return Request.post(`${API_ROOT}${path}/request-password-change`, {
      username
    });
  },
  logout() {
    return Request.post(`${API_ROOT}${path}/logout`);
  }
};

export default AuthAPI;
