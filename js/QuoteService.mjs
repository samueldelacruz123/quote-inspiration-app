// Use a CORS proxy
const QUOTE_API_URL = 'https://cors-anywhere.herokuapp.com/https://zenquotes.io/api/random';

export async function getRandomQuote() {
  try {
    const response = await fetch(QUOTE_API_URL);
    const data = await response.json();

    const quote = data[0];

    return {
      text: quote.q,
      author: quote.a
    };
  } catch (error) {
    console.error('Error fetching quote:', error);
    return {
      text: 'Something went wrong...',
      author: 'Unknown'
    };
  }
}