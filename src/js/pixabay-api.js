const API_KEY = '47549535-932fbadf252bf563d10ac391d';
const BASE_URL = 'https://pixabay.com/api/';

export function fetchImages(search) {
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: search,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  });

  return fetch(`${BASE_URL}?${searchParams}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}