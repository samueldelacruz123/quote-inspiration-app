export function createQuoteImageCard(data) {
  const card = document.createElement('article');
  card.classList.add('quote-image-card', 'fade-in');

  // If a timestamp exists on the data, attach it for deletion reference
  if (data.timestamp) card.dataset.timestamp = data.timestamp;

  const imageUrl = data.imageUrl || data.image?.url || data.image?.imageUrl || '';
  const quoteText = data.quote || data.quoteText || data.quote?.text || data.text || '';
  const author = data.author || data.quote?.author || data.author || '';
  const photographer = data.photographer || data.photographerName || data.image?.photographer || 'Unknown';
  const photographerUrl = data.photographerUrl || data.photographerLink || data.image?.photographerLink || '#';

  card.innerHTML = `
    <img src="${imageUrl}" alt="Inspiration image" loading="lazy" />
    <blockquote>
      <p class="quote">"${quoteText}"</p>
      <p class="author">- ${author}</p>
    </blockquote>
    <p class="credit">Photo by
      <a href="${photographerUrl}" target="_blank" rel="noopener">${photographer}</a>
      on Unsplash
    </p>
    <div class="card-actions">
      <button class="twitter-btn">Twitter</button>
      <button class="facebook-btn">Facebook</button>
      <button class="delete-btn">Delete</button>
    </div>
  `;

  return card;
}