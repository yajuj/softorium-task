import axios from 'axios';

const api = axios.create({
  baseURL: 'https://testtask.softorium.pro/',
  headers: { 'X-APP-ID': localStorage.getItem('id') },
});

api.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('bearer')}`;
  return config;
});

export default api;
