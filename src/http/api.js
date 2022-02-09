import axios from 'axios';

const api = axios.create({
  baseURL: 'https://testtask.softorium.pro/',
});

api.interceptors.request.use(config => {
  config.headers['X-APP-ID'] = localStorage.getItem('id');
  config.headers.Authorization = `Bearer ${localStorage.getItem('bearer')}`;
  return config;
});

export default api;
