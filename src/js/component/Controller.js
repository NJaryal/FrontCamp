import "@babel/polyfill";
import "whatwg-fetch";
import "../../styles/style.css";
import { API_KEY, BASE_URL, sources, settings} from '../constant/constant';
import {Model} from './Model';
import "./BootstrapMenu";
import {headline} from './Headlines';
import {view} from '../../Views/View'
import {proxiedApi, authorNames} from './Proxy';
import "./Generators";
import logo from "../../assets/news.png";
import "../../../Data.json"

class Controller {
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
    view.enableSpinner()   
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
      acc[inst] = new Model(source, this);
      return acc
    }, {})
    view.nav.addEventListener('click', this.handleMainClick.bind(this)) 
    view.main.addEventListener('click', this.handleMainClick.bind(this))   
  }
}
const myController = new Controller(sources, settings)
myController.init()
