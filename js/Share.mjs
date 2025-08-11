export function shareOnTwitter(text, url) {
  const twitterShareURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
  window.open(twitterShareURL, '_blank');
}

export function shareOnFacebook(url) {
  const facebookShareURL = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  window.open(facebookShareURL, '_blank');
}