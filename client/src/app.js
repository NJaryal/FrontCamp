const API_KEY = "33c57abfe85847ae9babd0be138a96b8";
const BASE_URL = "https://newsapi.org/v1/articles?source=";
//Proxy usage to get all the Author names
const authorNames = () => {
    let validator = {
        get(target, key) {
            return key in target ? taget[key] : "No Author";
        }
    }
    let authors = new Proxy({}, validator);
}

const settings = {
  spinnerSelector: '.spinner',
  ulSelector: '#newsArticlesList',
  gridSection: '.newsSection',
  channelUIListsSelector: '.thumbnail',
  BASE_URL,
  API_KEY
}

const sources = [
  {
    source: 'CNBC',
    label: 'CNBC News',
    inst: 'cnbc'
  },
  {
    source: 'Time',
    label: 'Time News',
    inst: 'time'
  },
  {
    source: 'usa-today',
    label: 'Usa Today News',
    inst: 'usaToday'
  },
  {
    source: 'the-new-york-times',
    label: 'The New York Times News',
    inst: 'newYourkTimes'
  },
  {
    source: 'cnn',
    label: 'CNN News',
    inst: 'cnn'
  },

  {
    source: 'associated-press',
    label: 'Associated Press News',
    inst: 'associatedPress'
  }
]

class Spinner {
  constructor(selector) {
    this.spinner = document.querySelector(selector)
    this.spinner.style.display = 'none';
  }

  enableSpinner() {
    this.spinner.style.display = 'block';
  }

  disableSpinner() {
    this.spinner.style.display = 'none';
  }

}

class App {
  constructor (sources, settings) {
    this.sources = sources
    this.settings = settings
    this.spinner = new Spinner(settings.spinnerSelector)
    this.main = document.querySelector(settings.gridSection)
    this.ul = document.querySelector(settings.ulSelector)
    this.channelUILists = document.querySelector(settings.channelUIListsSelector)
    //this.anchor = document.querySelector(settings.buttonSelector)
    this.channels = {}
  }

  append(parent, el) {
    return parent.appendChild(el)
  }

  createNode(element) {
    return document.createElement(element)
  }

  initialContent() {
    this.sources.forEach((item)=>{
      this.main.innerHTML +=
        `<div class="thumbnail">
          <div class="caption">
          <h3>${item.label}</h3>
          <p><a href="#" class="btn btn-primary" data-load-channel="${item.inst}" role="button">${item.source}</a></p>
          </div>
        </div>`
    }); 
  }  

  async get(source) {
    this.spinner.enableSpinner()    
      try {
        const response = await fetch(`${BASE_URL}${source}&apiKey=${API_KEY}`);
        return await response.json();
      } catch (error) {
        console.log(error);
      }    
    }   
    
  handleMainClick({ target }) {
      if(target.tagName.toLowerCase() === 'a' && target.dataset.loadChannel) {
        const channelName = target.dataset.loadChannel;
        console.log(channelName);
        this.channels[channelName].fetchChannel()
      }
      this.main.style.display = 'none';
    }

  init() {  
    this.channels = this.sources.reduce((acc, { source, inst }) => {
      acc[inst] = new NewsChannel(source, this);
      return acc
    }, {})
    
    this.main.addEventListener('click', this.handleMainClick.bind(this))    
    this.initialContent();
  }
}

class NewsChannel {
    constructor(source, app) { 
        this.source = source;
        this.articles = []
        this.app = app
    }    
    // Class method to fetch the data and process it to DOM
    
    setArticles(articles) {
      this.articles = articles
  
      this.app.spinner.disableSpinner()
      return this.articles
    }
  
    fetchChannel() {
      return this.app
        .get(this.source)
        .then(({ articles }) => {
          this.setArticles(articles)
          this.render()
        })
        .catch(error => JSON.stringify(error)); //If promise is rejected then catch        
    }

    renderItem(news) {
    //Creation of list of Elements displaying repective Data by just using single let
    let li = this.app.createNode('li'), 
        img = this.app.createNode('img'),
        div = this.app.createNode('div'),
        p = this.app.createNode('p'),
        h4 = this.app.createNode('h4'),
        strong = this.app.createNode('strong');
 

      img.src = news.urlToImage;
      h4.innerHTML = `AUTHOR: ${news.author}`;
      strong.innerHTML = `Title: ${news.title} `;
      p.innerHTML = `Description: ${news.description}`;      
      
      this.app.append(li, img);
      this.app.append(li, div);
      this.app.append(div, h4);
      this.app.append(div, strong);
      this.app.append(div, p);        
      this.app.append(this.app.ul , li);   
    }   

    render() {
      this.app.ul.innerHTML = ''
      this.articles.map(item => this.renderItem(item))
    }
}

const app = new App(sources, settings)
app.init()




//Iterators Example - When Done is True - Stopping the Sum
let arrayItems = new Set([1, 2, 3, 4]);
let iterateExample = arrayItems[Symbol.iterator]();
const iteratorFn = () => {    
    for(let item of arrayItems) {        
        if(iterateExample.next().done == false ) { //Condition to check if Done id false 
            setTimeout(()=> {                
                item++;
                console.log("Value of an Iterable array", item);                
            }, 1000);
        }    
    }    
}
iteratorFn();

//Generator Example 1
function* generator() {
    yield* [1,2,3,4];
}
let generatorExample = generator();
console.log(generatorExample.next());

//Generator Example 2
var iteration = {
    *[Symbol.iterator]() {
        yield 1;
        yield 2;
        yield 3;
        yield 4;
    }
}

for (let value of iteration) { 
    console.log(value); 
}


//Bootstrap Active Class + Hamburger menu functionality
$(document).ready(function () {
    $(".nav a").on("click", function(){
        $(".nav").find(".active").removeClass("active");
        $(this).parent().addClass("active");
     });
     $(document).on('click','.navbar-collapse.in',function(e) {
        if( $(e.target).is('a') ) {
            $(this).collapse('hide');
        }
    });
});