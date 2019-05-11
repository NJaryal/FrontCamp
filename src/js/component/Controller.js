import "@babel/polyfill";
import "whatwg-fetch";
import "../../styles/style.css";
import { sources, settings} from '../constant/constant';
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
  }

  render() {
    this.view.ul.innerHTML = ''
    this.model.articles.map(item => this.view.renderItem(item))
  }
  
  fetchChannel(source) {
    this.view.enableSpinner()   
    return proxiedNewsApi.get(source)
    .then(({ articles }) => {
      this.view.disableSpinner()
      this.model.setArticles(articles)
      this.render()
    })
    .catch(error => JSON.stringify(error));      
  }

  handleMainClick({ target }) {
    if(target.tagName.toLowerCase() === 'a' && target.dataset.loadChannel) {
      const channelName = target.dataset.loadChannel;
      this.fetchChannel(this.model.channels[channelName])
    }
    this.view.main.style.display = 'none';
  }

  init() {
    this.view.initialContent();
    this.model.setChannels()
    this.view.nav.addEventListener('click', this.handleMainClick.bind(this)) 
    this.view.main.addEventListener('click', this.handleMainClick.bind(this))   
  }
}
const myModel = new Model(sources)
export const myController = new Controller(myView, myModel)
myController.init()

