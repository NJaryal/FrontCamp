import "@babel/polyfill";
import "whatwg-fetch";
import "../../styles/style.css";
import { API_KEY, BASE_URL, sources, settings} from '../constant/constant';
import {NewsChannel} from './NewsChannel';
import {myModel} from './Models'
import "./BootstrapMenu";
import {headline} from './Headlines';
import {myView} from '../../Views/View'
import {proxiedApi, authorNames} from './Proxy';
import "./Generators";
import logo from "../../assets/news.png";
import "../../../Data.json"

class Controller {
  constructor (view, model) {
    this.view = view
    this.model = model
  }

  append(parent, el) {
    return parent.appendChild(el)
  }

  createNode(element) {
    return document.createElement(element)
  }    

  get(source) {
    this.view.enableSpinner()   
    return proxiedApi.get(`${BASE_URL}${source}&apiKey=${API_KEY}`)
  }

  handleMainClick({ target }) {
    if(target.tagName.toLowerCase() === 'a' && target.dataset.loadChannel) {
      const channelName = target.dataset.loadChannel;
      this.model.channels[channelName].fetchChannel()
    }
    this.view.main.style.display = 'none';
  }

  init() {    
    this.model.getChannels()
    this.view.nav.addEventListener('click', this.handleMainClick.bind(this)) 
    this.view.main.addEventListener('click', this.handleMainClick.bind(this))   
  }
}
const myController = new Controller(myView, myModel)
myController.init()

