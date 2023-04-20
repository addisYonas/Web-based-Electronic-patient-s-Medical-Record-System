import { AuthAPI } from "@/api";
import Router from "../router";
import {GET_INFO_KEY, PATIENT_ID, PATIENT_PROFILE} from "./patient.service";

export const ACCESS_TOKEN_KEY = "token";
export const PROFILE_KEY = "profile";

const AccountService = {
  login(username, password) {
    return AuthAPI.login(username, password)
      .then(res => {
        if (res && res.token) {
          localStorage.setItem(ACCESS_TOKEN_KEY, res.token);
          localStorage.setItem(PROFILE_KEY, JSON.stringify(res));
          return Promise.resolve(true);
        }
        return Promise.reject(new Error("Unauthorized"));
      })
      .catch(err => {
        throw err;
      });
  },
  logout() {
    AuthAPI.logout().then(() => {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(PROFILE_KEY);
        localStorage.removeItem(GET_INFO_KEY);
        localStorage.removeItem(PATIENT_ID);
        localStorage.removeItem(PATIENT_PROFILE);
        Router.push({ name: "home" });
    });
  },
  updateToken(token) {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  },
  getAccessToken: () => localStorage.getItem(ACCESS_TOKEN_KEY),

  getProfile: () => JSON.parse(localStorage.getItem(PROFILE_KEY)),

  isAuthenticated: () => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    return token !== null && token !== "undefined";
  }
};

export default AccountService;
