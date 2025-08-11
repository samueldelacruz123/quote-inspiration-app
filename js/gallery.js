import { createQuoteImageCard } from './components/QuoteImageComponent.mjs';
import { shareOnTwitter, shareOnFacebook } from './Share.mjs';

const galleryContainer = document.querySelector('#gallery');

function loadSavedInspirations() {
  const saved = JSON.parse(localStorage.getItem('savedInspirations')) || [];

  if (saved.length === 0) {
    galleryContainer.innerHTML = '<p>No inspirations saved yet.</p>';
    return;
  }

    saved.forEach((item, index) => {
    const card = createQuoteImageCard(item);

    // Delete button
    const deleteBtn = card.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
        deleteSavedItem(index);
    });

    // Twitter share button
    const twitterBtn = card.querySelector('.twitter-btn');
    if (twitterBtn) {
        twitterBtn.addEventListener('click', () => {
        shareOnTwitter(`${item.text} — ${item.author}`, window.location.href);
        });
    }

    // Facebook share button
    const facebookBtn = card.querySelector('.facebook-btn');
    if (facebookBtn) {
        facebookBtn.addEventListener('click', () => {
        shareOnFacebook(window.location.href);
        });
    }

    galleryContainer.appendChild(card);
    });
}

function deleteSavedItem(index) {
  const saved = JSON.parse(localStorage.getItem('savedInspirations')) || [];
  saved.splice(index, 1);
  localStorage.setItem('savedInspirations', JSON.stringify(saved));
  location.reload(); // Reload the page to refresh the gallery
}

loadSavedInspirations();