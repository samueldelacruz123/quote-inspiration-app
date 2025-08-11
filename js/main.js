import { getRandomQuote } from './services/QuoteService.mjs';
import { getRandomImage } from './services/ImageService.mjs';
import { saveToGallery } from './galleryStorage.mjs';
import { createQuoteImageCard } from './components/QuoteImageComponent.mjs';
import { shareOnTwitter, shareOnFacebook } from './Share.mjs';

const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const imageEl = document.getElementById('inspiration-image');
const photographerName = document.getElementById('photographer-name');
const photographerLink = document.getElementById('photographer-link');
const inspireBtn = document.getElementById('inspire-btn');
const saveBtn = document.getElementById('save-btn');
// Share button
const shareBtn = document.getElementById('share-btn');
const viewGalleryBtn = document.getElementById('view-gallery-btn');
const galleryModal = document.getElementById('gallery-modal');
const closeGalleryBtn = document.getElementById('close-gallery');
const galleryCards = document.getElementById('gallery-cards');

let currentQuote = null;
let currentImage = null;

async function updateContent() {
  currentQuote = await getRandomQuote();
  currentImage = await getRandomImage();

  quoteText.textContent = `"${currentQuote.text}"`;
  quoteAuthor.textContent = `- ${currentQuote.author}`;

  imageEl.src = currentImage.url;
  photographerName.textContent = currentImage.photographer;
  photographerLink.href = currentImage.photographerLink;
}

inspireBtn.addEventListener('click', updateContent);

saveBtn.addEventListener('click', () => {
  if (currentQuote && currentImage) {
    saveToGallery(currentQuote, currentImage);
    alert('Saved to Gallery!');
  }
});

// Share button functionality
shareBtn.addEventListener('click', () => {
  if (currentQuote && currentImage) {
    // Share quote and image URL on Twitter and Facebook
    shareOnTwitter(`"${currentQuote.text}" - ${currentQuote.author}`, currentImage.url);
    shareOnFacebook(currentImage.url);
  }
});


// Gallery logic
import { getGallery } from './galleryStorage.mjs';

function renderGallery() {
  galleryCards.innerHTML = '';
  const items = getGallery();
  if (items.length === 0) {
    galleryCards.innerHTML = '<p>No saved inspirations yet.</p>';
    return;
  }
  items.forEach(({ quote, image }) => {
    const card = createQuoteImageCard({
      imageUrl: image.url,
      quote: quote.text,
      author: quote.author,
      photographer: image.photographer,
      photographerUrl: image.photographerLink
    });
    galleryCards.appendChild(card);
  });
}

viewGalleryBtn.addEventListener('click', () => {
  renderGallery();
  galleryModal.classList.remove('hidden');
});

closeGalleryBtn.addEventListener('click', () => {
  galleryModal.classList.add('hidden');
});

// Initial load
updateContent();