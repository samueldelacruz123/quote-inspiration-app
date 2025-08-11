const UNSPLASH_URL = 'https://api.unsplash.com/photos/random';
const ACCESS_KEY = 'TRkE2lzvJ4qXTgfaHS_QU8u9O6bxNLB2iHn8rxrZvbc'; // public client key

export async function getRandomImage() {
  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?query=landscape,scenery&orientation=landscape&client_id=${ACCESS_KEY}`
    );
    const data = await response.json();

    return {
      url: data.urls.regular,
      photographer: data.user.name,
      photographerUrl: data.user.links.html
    };
  } catch (err) {
    console.error('Error fetching image:', err);
    return {
      url: 'fallback-image-url.jpg',
      photographer: 'Unknown',
      photographerUrl: '#'
    };
  }
}