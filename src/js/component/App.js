import "@babel/polyfill";
import "whatwg-fetch";
import "../../styles/style.css";
import { API_KEY, BASE_URL, sources, settings} from './Variable';
import {NewsChannel} from './NewsChannel';
import {view} from '../../Views/View'
import {spinner} from '../../Views/Spinner';
import "./BootstrapMenu";
import {Headlines} from './Headlines';
import {proxiedApi, authorNames} from './Proxy';
import "./Generators";
import logo from "../../assets/news.png";
import "../../../Data.json"

class App {
  constructor (sources, settings) {
    this.sources = sources
    this.settings = settings   
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

  get(source) {
    spinner.enableSpinner()   
    return proxiedApi.get(`${BASE_URL}${source}&apiKey=${API_KEY}`)
  }

  handleMainClick({ target }) {
    if(target.tagName.toLowerCase() === 'a' && target.dataset.loadChannel) {
      const channelName = target.dataset.loadChannel;
      this.channels[channelName].fetchChannel()
    }
    view.main.style.display = 'none';
  }

  init() {  
    this.channels = this.sources.reduce((acc, { source, inst }) => {
      acc[inst] = new NewsChannel(source, this);
      return acc
    }, {})
    view.nav.addEventListener('click', this.handleMainClick.bind(this)) 
    view.main.addEventListener('click', this.handleMainClick.bind(this))
  }
}
const app = new App(sources, settings)
app.init()
