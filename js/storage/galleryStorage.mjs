const STORAGE_KEY = 'quote_image_gallery_v1';

function safeParse(data) {
  try {
    return JSON.parse(data) || [];
  } catch (e) {
    console.error("Error parsing gallery data:", e);
    return [];
  }
}

//
export function saveToGallery(quote, image) {
  const existing = getGallery();

  const newEntry = {
    quote: { text: quote.text, author: quote.author },
    image: {
      url: image.url,
      photographer: image.photographer,
      photographerLink: image.photographerLink
    },
    timestamp: Date.now()
  };
//

  // Optional: prevent adding exact duplicates
  const isDuplicate = existing.some(
    item =>
      item.quote.text === newEntry.quote.text &&
      item.image.url === newEntry.image.url
  );

  if (!isDuplicate) {
    existing.push(newEntry);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  }
}

export function getGallery() {
  return safeParse(localStorage.getItem(STORAGE_KEY));
}

export function deleteFromGallery(timestamp) {
  const updated = getGallery().filter(item => item.timestamp !== timestamp);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function clearGallery() {
  localStorage.removeItem(STORAGE_KEY);
}
