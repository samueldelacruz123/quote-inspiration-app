import { getGallery, deleteFromGallery } from './storage/galleryStorage.mjs';
import { createQuoteImageCard } from './components/QuoteImageComponent.mjs';
import { shareOnTwitter, shareOnFacebook } from './services/Share.mjs';

const galleryList = document.getElementById('gallery-list');
const galleryItems = getGallery();

if (galleryItems.length === 0) {
  galleryList.innerHTML = '<p>No saved inspirations yet.</p>';
} else {
  galleryItems.forEach(item => {
    const card = createQuoteImageCard(item);

    // Twitter share
    card.querySelector('.twitter-btn')?.addEventListener('click', () => {
      shareOnTwitter(`"${item.quote.text}" — ${item.quote.author}`);
    });

    // Facebook share
    card.querySelector('.facebook-btn')?.addEventListener('click', () => {
      shareOnFacebook(window.location.href);
    });

//
    // Delete
    card.querySelector('.delete-btn')?.addEventListener('click', () => {
      deleteFromGallery(item.timestamp);
      card.remove();
    });
//  
    galleryList.appendChild(card);
    setTimeout(() => card.classList.add('fade-in'), 50);
  });
}
