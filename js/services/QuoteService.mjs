export async function getRandomQuote() {
  const fallbackQuotes = [
    { text: "The best way to predict the future is to invent it.", author: "Alan Kay" },
    { text: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt" },
    { text: "It always seems impossible until it’s done.", author: "Nelson Mandela" },
    { text: "Don’t watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
    { text: "Whether you think you can or you think you can’t, you’re right.", author: "Henry Ford" },
    { text: "Happiness is not something ready made. It comes from your own actions.", author: "Dalai Lama" },
    { text: "Your time is limited, so don’t waste it living someone else’s life.", author: "Steve Jobs" },
    { text: "Believe you can and you’re halfway there.", author: "Theodore Roosevelt" },
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "You miss 100% of the shots you don’t take.", author: "Wayne Gretzky" }
  ];

  try {
    const res = await fetch('https://api.quotable.io/random');
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    
    const data = await res.json();

    // ZenQuotes API returns an array with 1 object
    if (Array.isArray(data) && data.length > 0) {
      return {
        text: data[0].q,
        author: data[0].a
      };
    } else {
      throw new Error('Unexpected API response format');
    }
  } catch (err) {
    console.error('Error fetching quote, using fallback:', err);
    return fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
  }
}
