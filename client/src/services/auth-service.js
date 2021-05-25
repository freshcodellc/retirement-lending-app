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

function register({ email, password }) {
  return client("register", { email, password }).then(handleUserResponse);
}

async function logout() {
  window.localStorage.removeItem(localStorageKey);
}

export { getToken, login, register, logout, localStorageKey };
