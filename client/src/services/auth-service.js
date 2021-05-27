import {client} from '../utils/api-client'

const localStorageKey = "SOLERA/__JWT__";

async function getToken() {
  return window.localStorage.getItem(localStorageKey);
}

function handleUserResponse({ user }) {
  window.localStorage.setItem(localStorageKey, user.token);
  return user;
}

function login({ email, password }) {
  return client("auth/login", { data: { email, password } }).then(handleUserResponse);
}

function register(applicantData) {
  return client("users/register-applicant", {
    data: { user: { ...applicantData } }
  }).then((res) => res);
}

async function logout() {
  window.localStorage.removeItem(localStorageKey);
}

export { getToken, login, register, logout, localStorageKey };
