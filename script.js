const API_KEY = "2054ec7c0cb44f33b0cc127159cddd1f";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load',() => fetchNews("India")); // Jese Hi wesite ko load krenge to ye code fetchNews Wale Func ko Call kr dega

function reload() {
    window.location.reload(); // reload the page When Click On Logo (HOME PAGE)
}

async function fetchNews(query) { // es query k andr jo bhi daloge us query ki news leke aa jayega
//const res = await fetch('${url}${query}&apiKey=${API_KEY}');
  const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
  const data = await res.json();
//   console.log(data);
bindData(data.articles);
}

function bindData(articles){
    const cardContainer = document.getElementById('cards_container_id');
    const newsCardTemplate = document.getElementById('template_news_card')

    cardContainer.innerHTML ="";

    articles.forEach((article) => { 
        if(!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        cardContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone,article){
    const newsImg = cardClone.querySelector('#news_img');
    const newsTitle = cardClone.querySelector('#news_title');
    const newsSource = cardClone.querySelector('#news_source');
    const newsDesc = cardClone.querySelector('#news_desc');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US",{timeZone: "Asia/Jakarta"});

    newsSource.innerHTML =  `${article.source.name} • ${date}`;

    cardClone.firstElementChild.addEventListener("click",()=>{
        window.open(article.url,"_blank");
    });
}

let curSelectedNav = null;

function onNavItemClick(myid) {
    fetchNews(myid);
    const navItem = document.getElementById(myid);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

// Searching Functionaliyy

const searchButton = document.getElementById('search_button');
const searchText = document.getElementById('search-text');

searchButton.addEventListener('click',()=> {  // Jab bhi button pe click ho to ye wala Funcyion Jo esme Callback Ki amdad Se Diya he Wo Chal jana Chahiye

    const query = searchText.value;
    if( !query ){
        return;
    }
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});