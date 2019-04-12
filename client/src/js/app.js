import "@babel/polyfill";
import "whatwg-fetch";
import "../styles/style.css";
import { API_KEY, BASE_URL, sources, settings, headLines_KEY} from './variable';
import {NewsChannel} from './fetchChannel';
import {Spinner} from './spinner';
import "../js/bootstrapMenu";
import {Headlines} from './headlines';
import authorNames from './proxy';
import "../js/generators";
import logo from "../assets/news.png";

class App {
  constructor (sources, settings) {
    this.sources = sources
    this.settings = settings
    this.spinner = new Spinner(settings.spinnerSelector)
    this.main = document.querySelector(settings.gridSection)
    this.nav = document.querySelector(settings.navSection)
    this.ul = document.querySelector(settings.ulSelector)
    this.channelUILists = document.querySelector(settings.channelUIListsSelector)    
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
      this.nav.innerHTML +=
        `<li><a data-load-channel="${item.inst}">${item.source}</a></li>`

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
    this.nav.addEventListener('click', this.handleMainClick.bind(this)) 
    this.main.addEventListener('click', this.handleMainClick.bind(this))      
    this.initialContent();
  }
}
const app = new App(sources, settings)
app.init()
const newsHeadings = new Headlines(settings)
newsHeadings.dynamicImport()