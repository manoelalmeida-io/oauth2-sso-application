import axios from 'axios';
import { useContext, useEffect } from 'react';
import AuthContext from '../contexts/auth';

export const tokenKey = process.env.REACT_APP_TOKEN_KEY;
export const baseUrl = process.env.REACT_APP_TODO_API_URL;

const api = axios.create({
  baseURL: baseUrl
});

api.interceptors.request.use(async config => {
  const token = localStorage.getItem(tokenKey);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const UnauthorizedInterceptor = ({ children }) => {
  const { loginRedirect } = useContext(AuthContext);

  useEffect(() => {
    api.interceptors.response.use(response => {
      return response;
    }, error => {
    
      if (error.response.status === 401) {
        loginRedirect();
      }
    
      return error;
    });
  }, [loginRedirect]);

  return children;
}

export default api;