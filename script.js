/* import { API_KEY as key } from './variables.js'; //Import and Rename
console.log(key); */
let spinner = document.querySelector(".spinner"); //Spinner to show when fetching api data
spinner.style.display = 'none';
const createNode = (element) => document.createElement(element); //Creation of an element
const append = (parent, el) => parent.appendChild(el); //Function to append child to parent
const ul = document.getElementById('newsArticlesList'); // Unordered list refrence
const API_KEY = "33c57abfe85847ae9babd0be138a96b8";
const BASE_URL = "https://newsapi.org/v1/articles?source=";
const channelUILists = document.querySelectorAll('.thumbnail');

//Proxy usage to get all the Author names
const authorNames = () => {
    let validator = {
        get(target, key) {
            return key in target ? taget[key] : "No Author"
        }
    }
    let authors = new Proxy({}, validator);
    console.log(authors);
}

const api = (source) => fetch(`${BASE_URL}`+source+`&apiKey=${API_KEY}`); //Fetch api function
// Common reusable class to have common method to fetch news api data
class NewsChannel {
    constructor(source) { 
        this.source = source;
    }    
    // Class method to fetch the data and process it to DOM
    getArticles() {
        channelUILists.forEach(el => el.style.display = 'none'); //Hiding all the news/channel ul elemets                
        spinner.style.display = 'block'; //Spinner
        ul.innerHTML = "";
        api(this.source).then(response => response.json())  //Invoking api function i.e. promise
        .then(({articles}) => {         // Object destructuring   
            return articles.map(news => {
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

                append(li, img);
                append(li, div);
                append(div, h4);
                append(div, strong);
                append(div, p);        
                append(ul , li);
                spinner.style.display = 'none';    
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




