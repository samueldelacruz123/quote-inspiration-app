import { getRandomQuote } from './services/QuoteService.mjs';
import { getRandomImage } from './services/ImageService.mjs';
import { shareOnTwitter } from './services/Share.mjs';

// Elements
const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const inspirationImage = document.getElementById('inspiration-image');
const photographerName = document.getElementById('photographer-name');
const photographerLink = document.getElementById('photographer-link');

const getInspiredBtn = document.getElementById('inspire-btn');
const saveToGalleryBtn = document.getElementById('save-btn');
const shareBtn = document.getElementById('share-btn');

// Load new quote & image
async function loadInspiration() {
  try {
    // Get a random quote
    const quote = await getRandomQuote();
    quoteText.textContent = quote.text;
    quoteAuthor.textContent = `— ${quote.author}`;

    // Get a random scenic/landscape image
    const image = await getRandomImage('scenery,landscape');
    inspirationImage.src = image.url;
    photographerName.textContent = image.photographer;
    photographerLink.href = image.photographerUrl;

  } catch (error) {
    console.error('Error loading inspiration:', error);
  }
}

// Save quote+image container as an image
saveToGalleryBtn?.addEventListener('click', () => {
  const container = document.getElementById('inspiration-container');
  html2canvas(container, { useCORS: true, backgroundColor: null }).then(canvas => {
    const link = document.createElement('a');
    link.download = 'inspiration.png';
    link.href = canvas.toDataURL();
    link.click();
  });
});

// Share only on Twitter
shareBtn?.addEventListener('click', () => {
  const quote = quoteText?.textContent || '';
  const author = quoteAuthor?.textContent || '';
  shareOnTwitter(`${quote} ${author}`);
});

// Full page reload on Get Inspired
getInspiredBtn?.addEventListener('click', () => {
  window.location.reload();
});

// Initial load
loadInspiration();