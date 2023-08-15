const API_KEY = "a3ceb1778c034649b8b5b5e422e4d3a2";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', () => fetchNews("India"));

async function fetchNews(query) {
    try {
        const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
        if (!res.ok) {
            throw new Error(`Error fetching news: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        if (data.articles) {
            bindData(data.articles);
        } else {
            console.error("No 'articles' property found in API response:", data);
        }
    } catch (error) {
        console.error("Error fetching news:", error);
    }
}

function clearCardsContainer() {
    const cardsContainer = document.getElementById('cards-container');
    cardsContainer.innerHTML = "";
}

function bindData(articles) {
    clearCardsContainer();
    const cardsContainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template-news-card');

    articles.forEach(article => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const { urlToImage, title, description, source, publishedAt, url } = article;

    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImg.src = urlToImage;
    newsTitle.innerHTML = title;
    newsDesc.innerHTML = description;

    const date = new Date(publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    });

    newsSource.innerHTML = `${source.name}.${date}`;

    cardClone.firstElementChild.addEventListener('click', () => {
        window.open(url, "_blank");
    });
}

function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);

    if (currSelectedNav) {
        currSelectedNav.classList.remove('active');
    }

    currSelectedNav = navItem;
    currSelectedNav.classList.add('active');
}

document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.getElementById("search-button");
    const searchText = document.getElementById("search-text");

    searchButton.addEventListener("click", () => {
        const query = searchText.value.trim();
        if (!query) return;
        fetchNews(query);
        currSelectedNav?.classList.remove('active');
        currSelectedNav = null;
    });
});
