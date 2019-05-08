import "@babel/polyfill";
import "whatwg-fetch";
import "../../styles/style.css";
import { sources, settings} from '../constant/constant';
import {NewsChannel} from './NewsChannel';
import {Model} from '../../Models/Model'
import "./BootstrapMenu";
import {headline} from './Headlines';
import {myView} from '../../Views/View'
import {proxiedNewsApi, authorNames} from './Proxy';
import "./Generators";
import logo from "../../assets/news.png";
import "../../../Data.json"

class Controller {
  constructor (view, model) {
    this.view = view
    this.model = model
    this.channels = {}
    this.articles = []
  }

  setArticles(articles) {
    this.articles = articles  
    this.view.disableSpinner()
    return this.articles
  }

  get(source) {
    this.view.enableSpinner()   
    return proxiedNewsApi.get(source)
  }  

  render() {
    this.view.ul.innerHTML = ''
    this.articles.map(item => this.view.renderItem(item))
  }
  
  fetchChannel(source) {
   return this.get(source)
    .then(({ articles }) => {
      this.setArticles(articles)
      this.render()
    })
    .catch(error => JSON.stringify(error)); //If promise is rejected then catch        
  } 

  /* getChannels() {        
    this.channels = this.sources.reduce((acc, { source, inst }) => {
        acc[inst] = new NewsChannel(source);
        return acc
      }, {})
  } */

  handleMainClick({ target }) {
    if(target.tagName.toLowerCase() === 'a' && target.dataset.loadChannel) {
      const channelName = target.dataset.loadChannel;
      this.fetchChannel(this.channels[channelName])
    }
    this.view.main.style.display = 'none';
  }

  init() {
    this.view.initialContent();
    this.model.getChannels()
    this.view.nav.addEventListener('click', this.handleMainClick.bind(this)) 
    this.view.main.addEventListener('click', this.handleMainClick.bind(this))   
  }
}
const myModel = new Model(sources)
export const myController = new Controller(myView, myModel)
myController.init()

