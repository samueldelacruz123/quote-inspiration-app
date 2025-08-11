const STORAGE_KEY = 'quote_image_gallery_v1';

export function saveToGallery(quote, image) {
  const existing = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

  const newEntry = {
    quote: { text: quote.text, author: quote.author },
    image: { url: image.url, photographer: image.photographer, photographerLink: image.photographerLink },
    timestamp: Date.now()
  };

  existing.push(newEntry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
}

export function getGallery() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

export function deleteFromGallery(timestamp) {
  const updated = getGallery().filter(item => item.timestamp !== timestamp);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}
