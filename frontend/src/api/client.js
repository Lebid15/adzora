const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

async function handleResponse(response) {
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || 'Unexpected API response');
  }
  return response.json();
}

export async function fetchHomepage() {
  const response = await fetch(`${API_BASE_URL}/homepage/`);
  return handleResponse(response);
}

export async function fetchVideos(params = {}) {
  const query = new URLSearchParams(params);
  const response = await fetch(`${API_BASE_URL}/videos/?${query.toString()}`);
  return handleResponse(response);
}

export async function fetchGallery(params = {}) {
  const query = new URLSearchParams(params);
  const response = await fetch(`${API_BASE_URL}/gallery/?${query.toString()}`);
  return handleResponse(response);
}
