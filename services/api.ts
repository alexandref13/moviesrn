import axios from 'axios';

export const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    accept: 'application/json',
  }
})

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${process.env.EXPO_PUBLIC_API_KEY}`

  return config
}, function (error) {
  return Promise.reject(error);
})