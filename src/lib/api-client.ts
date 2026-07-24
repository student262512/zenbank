const API_BASE = '/api';

export async function apiGet<T>(endpoint: string): Promise<T> {
  const res = await fetch(API_BASE + endpoint);
  if (!res.ok) throw new Error('API Error');
  return res.json();
}

export async function apiPost<T>(endpoint: string, data: unknown): Promise<T> {
  const res = await fetch(API_BASE + endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('API Error');
  return res.json();
}
