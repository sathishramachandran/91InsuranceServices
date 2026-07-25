import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export function getAuthToken(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }
  return window.localStorage.getItem('insurance_token');
}

export function getAuthHeaders() {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function fetchWithAuth<T>(url: string) {
  const headers = getAuthHeaders();
  return api.get<T>(url, { headers });
}

export async function postWithAuth<T>(url: string, data: any, config = {}) {
  const headers = getAuthHeaders();
  return api.post<T>(url, data, { headers, ...config });
}
