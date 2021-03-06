import { create } from 'apisauce';

const api = create({ baseURL: process.env.REACT_APP_AUTH_BASE_URL });

const getTokenFromResponse = queryParams =>
  queryParams.match(/access_token=[a-zA-Z0-9_]+/g)[0].substring('access_token='.length);

export const storeToken = response => {
  const token = getTokenFromResponse(response.data);
  localStorage.setItem('auth_token', token);
};

export const getCurrentUser = () => localStorage.getItem('auth_token');

export const removeCurrentUser = () => localStorage.removeItem('auth_token');

export const loginToGithub = code =>
  api.get(`?code=${code}`).then(response => {
    if (response.ok) {
      storeToken(response);
    }
    window.history.replaceState({}, document.title, '/');
  });
