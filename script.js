/* import { apikey as key } from './variables.js'; //Import and Rename
console.log(key); */
const createNode = (element) => document.createElement(element); //Creation of element
const append = (parent, el) => parent.appendChild(el); //Function to append child to parent
const ul = document.getElementById('newsArticlesList'); // Unordered list refrence
const apiKey = "33c57abfe85847ae9babd0be138a96b8";

const channelUILists = document.querySelectorAll('.thumbnail'); //

// Common reusable class to have common method to fetch news api data
class NewsChannel {
    constructor(source) { //Source will be different for the channels
        this.source = source;
    }
    // Class method to fetch the data and process it to DOM
    getArticles() {
        //String Literals -- Passing Source as variable in the params of url
        const url = `https://newsapi.org/v1/articles?source=${this.source}&apiKey=${apiKey}`;
        console.log(url);
        fetch(url)
        .then(response => response.json()) //When Promise is resolved 
        .then(data => {
            let newsData = data.articles; //Storing Data using let newsData
            return newsData.map(news => {
                //Creation of list of Elements displaying repective Data by just using single let
                let li = createNode('li'), 
                img = createNode('img'),
                div = createNode('div'),
                p = createNode('p'),
                h4 = createNode('h4'),
                strong = createNode('strong');
                img.src = news.urlToImage;
                h4.innerHTML = `AUTHOR: ${news.author}`;
                strong.innerHTML = `Title: ${news.title} `;
                p.innerHTML = `Description: ${news.description}`;
                channelUILists.forEach(el => el.style.display = 'none'); //Hiding all the news/channel ul elemets
                //Condition Based ??// Separate Functions to display Data //
                append(li, img);
                append(li, div);
                append(div, h4);
                append(div, strong);
                append(div, p);        
                append(ul , li);
            });
        })
        .catch(error => JSON.stringify(error)); //If promise is rejected then catch
    }
}

//Creation of Instances of NewsChannel class + getArticles() method in the html file with onclick event
const cnbcNews = new NewsChannel('CNBC'); 
const timeNews = new NewsChannel('Time');
const usaNews = new NewsChannel('usa-today');
const theNewYorkTimes = new NewsChannel('the-new-york-times');
const cnnNews = new NewsChannel('cnn');
const associatedNews = new NewsChannel('associated-press');






       


       