import { getRandomQuote } from "./QuoteService.mjs";
import { getImageForKeyword } from "./ImageService.mjs";

async function testAPIs() {
    const quote = await getRandomQuote();
    console.log('Quote:', quote.text, '-', quote.author);

    // Fow now, use the author name as a keyword for the image
    const image = await getImageForKeyword(quote.author);
    console.log('Image URL:', image.imageUrl);
    console.log('Photographer:', image.photographer);
    console.log('Photographer Link:', image.photographerLink);
}

testAPIs();