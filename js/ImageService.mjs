const UNSPLASH_URL = 'https://api.unsplash.com/photos/random';
const ACCESS_KEY = 'TRkE2lzvJ4qXTgfaHS_QU8u9O6bxNLB2iHn8rxrZvbc';

export async function getImageForKeyword(keyword = 'inspiration') {
    const url = `${UNSPLASH_URL}?query=${encodeURIComponent(keyword)}&orientation=landscape&client_id=${ACCESS_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        return {
            imageUrl: data.urls.regular,
            photographer: data.user.name,
            photographerLink: data.user.links.html
        };
    } catch (error) {
        console.error('Error fetching image:', error);
        return {
            imageUrl: 'https://via.placeholder.com/800x600?text=No+Image',
            photographer: 'Unknown',
            photographerLink: '#'
        };
    }
}
