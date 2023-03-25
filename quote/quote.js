const quoteText = document.querySelector("#quote-text");
const quoteAuthor = document.querySelector("#quote-author");
const generateBtn = document.querySelector("#generate-btn");

async function generateQuote() {
    // Disable button while fetching new quote
    generateBtn.disabled = true;

    // Fetch quote from API
    const response = await fetch("https://quotesondesign.com/wp-json/wp/v2/posts/?orderby=rand&_=" + new Date().getTime());
    const data = await response.json();

    // Update quote text and author
    quoteText.innerHTML = data[0].content.rendered;
    quoteAuthor.innerHTML = "~ " + data[0].title.rendered;

    // Re-enable button
    generateBtn.disabled = false;
}
