const API_KEY="a3ceb1778c034649b8b5b5e422e4d3a2";
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener('load',() => fetchNews("India"));

async function fetchNews(query){
   const res=await fetch(`${url}${query}&apiKey=${API_KEY}`);
   const data=await res.json();
  
    bindData(data.articles);
}

function bindData(articles){
    const cardsContainer=document.getElementById('cards-container');
    const newsCardTemplate= document.getElementById('template-news-card');

    cardsContainer.innerHTML="";

    articles.forEach(article => {
        if(!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        cardsContainer.appendChild(cardClone);
        
    });
}
function fillDataInCard(cardClone,article){
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');
    
    newsImg.src=article.urlToImage;
    newsTitle.innerHTML=article.title;
    newsDesc.innerHTML=article.description;
   
    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    });

    newsSource.innerHTML= `${article.source.name}.${date}`;

    cardClone.firstElementChild.addEventListener('click',()=>{
        window.open(article.url,"_blank");
    })

    
}
function reload(){
    window.location.reload();
}
let currSelectedNav = null;

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
        const query = searchText.value.trim(); // Trim the query to remove leading/trailing spaces
        if (!query) return;
        fetchNews(query);
        currSelectedNav?.classList.remove('active');
        currSelectedNav = null;
    });})

