// utils/apiClient.ts
import Cookies from 'js-cookie';
import { extendSession } from './session';

const apiClient = async (url: string, options: RequestInit = {}) => {
  let token = Cookies.get('access_token');

  const headers = {
    ...options.headers,
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  let response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
    ...options,
    headers,
  });

  // If token expired, try to refresh it once
  if (response.status === 401) {
    try {
      token = await extendSession();

      // Retry the original request with new token
      headers['Authorization'] = `Bearer ${token}`;
      response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
        ...options,
        headers,
      });
    } catch (error) {
      // Refresh failed, let the error propagate
      throw error;
    }
  }

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Request failed');
  }

  return response;
};

export default apiClient;