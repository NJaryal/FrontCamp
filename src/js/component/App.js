import "@babel/polyfill";
import "whatwg-fetch";
import "../../styles/style.css";
import { API_KEY, BASE_URL, sources, settings, headLines_KEY} from './Variable';
import {proxy} from './Proxy'
import {NewsChannel} from './NewsChannel';
import {spinner} from '../../Views/Spinner';
import "./BootstrapMenu";
import {Headlines} from './Headlines';
import {api} from './Api'
import {view} from '../../Views/View'
import {proxiedApi, authorNames} from './Proxy';
import "./Generators";
import logo from "../../assets/news.png";
import "../../../Data.json"

class App {
  constructor (sources, settings) {
    this.sources = sources
    this.settings = settings
    this.newsHeadings = new Headlines(settings)
    this.main = document.querySelector(settings.gridSection)
    this.nav = document.querySelector(settings.navSection)
    this.ul = document.querySelector(settings.ulSelector)
    this.channelUILists = document.querySelector(settings.channelUIListsSelector)
    this.errorsModal = document.querySelector(settings.errorsModal)  
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
      this.nav.innerHTML += view.navHTML(item)
      this.main.innerHTML += view.mainHTML(item)
    }); 
  }  

  get(source) {
    spinner.enableSpinner()   
    return api.get(`${BASE_URL}${source}&apiKey=${API_KEY}`)
  }   
      
  handleMainClick({ target }) {
      if(target.tagName.toLowerCase() === 'a' && target.dataset.loadChannel) {
        const channelName = target.dataset.loadChannel;
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
    this.newsHeadings.dynamicImport();
  }
}
const app = new App(sources, settings)
app.init()
