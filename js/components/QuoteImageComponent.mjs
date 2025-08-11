export function createQuoteImageCard(data) {
  const card = document.createElement('div');
  card.classList.add('quote-image-card');

  card.innerHTML = `
    <img src="${data.imageUrl}" alt="Inspiration" />
    <blockquote>
      <p class="quote">"${data.quote}"</p>
      <p class="author">- ${data.author}</p>
    </blockquote>
    <p class="credit">Photo by 
      <a href="${data.photographerUrl}" target="_blank">${data.photographer}</a> 
      on Unsplash
    </p>
    <div class="card-actions">
      <button class="twitter-btn">Share on Twitter</button>
      <button class="facebook-btn">Share on Facebook</button>
      <button class="delete-btn">Delete</button>
    </div>
  `;

  return card;
}