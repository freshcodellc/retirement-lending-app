import {apiClient} from '../utils/api-client'
import { queryClient } from "../context";

const accessTokenKey = "SOLERA/__JWT__";
const refreshTokenKey = "SOLERA/refresh_token";

function getToken() {
  return window.localStorage.getItem(accessTokenKey);
}

function getRefreshToken() {
  return window.localStorage.getItem(refreshTokenKey);
}

async function refreshAccessToken() {
  try {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      onTokensExpired();
    }
    const response = await window.fetch(`${apiBaseUrl}/auth/tokens`, {
      method: "PUT",
      body: JSON.stringify({
        refresh_token: refreshToken,
      }),
    });

    const result = await response.json();

    if (response.ok) {
      window.localStorage.setItem(accessTokenKey, result.token);
    } else {
      onTokensExpired();
    }
  } catch (error) {
    console.error(error);
    onTokensExpired();
  }
}

function handleUserResponse({ user }) {
  console.log('HERE', user)
  window.localStorage.setItem(accessTokenKey, user.token);
  return user;
}

function login({ email, password }) {
  return apiClient("auth/login", { data: { email, password } }).then(handleUserResponse);
}

function register(applicantData) {
  return apiClient("users/register-applicant", {
    data: { user: { ...applicantData } }
  }).then((res) => res);
}

async function logout() {
  window.localStorage.removeItem(accessTokenKey);
  window.localStorage.removeItem(refreshTokenKey);
}

function onTokensExpired() {
  console.log('LOGGIN OUT')
  logout();
  queryClient.clear();
  // window.location.replace("/");
  console.log('EXPIRED')
}

export { getToken, refreshAccessToken, login, register, logout };
