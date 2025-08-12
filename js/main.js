import { getRandomQuote } from './services/QuoteService.mjs';
import { getRandomImage } from './services/ImageService.mjs';
import { shareOnTwitter } from './services/Share.mjs';
import { saveToGallery } from './storage/galleryStorage.mjs';

// Elements
const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const inspirationImage = document.getElementById('inspiration-image');
const photographerName = document.getElementById('photographer-name');
const photographerLink = document.getElementById('photographer-link');

const getInspiredBtn = document.getElementById('inspire-btn');
const shareBtn = document.getElementById('share-btn');

//
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

// Save to Gallery
document.getElementById('save-gallery-btn')?.addEventListener('click', () => {
  const quote = {
    text: quoteText.textContent,
    author: quoteAuthor.textContent.replace(/^—\s*/, '') // remove leading em dash
  };

  const image = {
    url: inspirationImage.src,
    photographer: photographerName.textContent,
    photographerLink: photographerLink.href
  };

  saveToGallery(quote, image);
  alert('Quote & Image saved to your gallery!');
});

// View Gallery
document.getElementById('view-gallery-btn')?.addEventListener('click', () => {
  window.location.href = 'gallery.html';
});
//
//

// Initial load
loadInspiration();