import { fetchImages } from './js/pixabay-api.js';
import { createGalleryMarkup, showErrorMessage } from './js/render-functions.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
let lightbox;

function toggleLoader(show) {
  loader.classList.toggle('hidden', !show);
}

function clearGallery() {
  gallery.innerHTML = '';
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const query = event.target.elements['search-query'].value.trim();

  if (!query) {
    showErrorMessage('Please enter a search query!');
    return;
  }

  clearGallery();
  toggleLoader(true);

  try {
    const data = await fetchImages(query);
    toggleLoader(false);

    if (data.hits.length === 0) {
      showErrorMessage('Sorry, there are no images matching your search query. Please try again!');
      return;
    }

    gallery.innerHTML = createGalleryMarkup(data.hits);

    if (!lightbox) {
      lightbox = new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionDelay: 250,
      });
    } else {
      lightbox.refresh();
    }
  } catch (error) {
    toggleLoader(false);
    console.error('Error fetching images:', error);
    showErrorMessage('Sorry, there are no images matching your search query. Please try again!');
  }
});
