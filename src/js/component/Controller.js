import "@babel/polyfill";
import "whatwg-fetch";
import "../../styles/style.css";
import { API_KEY, BASE_URL, sources, settings} from '../constant/constant';
import {NewsChannel} from './NewsChannel';
import {Model} from '../../Models/Model'
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

  renderItem(news) {
    let li = this.view.createNode('li'), 
        img = this.view.createNode('img'),
        div = this.view.createNode('div'),
        p = this.view.createNode('p'),
        h4 = this.view.createNode('h4'),
        strong = this.view.createNode('strong'); 

      img.src = news.urlToImage;
      h4.innerHTML = `AUTHOR: ${news.author}`;
      strong.innerHTML = `Title: ${news.title} `;
      p.innerHTML = `Description: ${news.description}`;
          
      this.view.append(li, img);
      this.view.append(li, div);
      this.view.append(div, h4);
      this.view.append(div, strong);
      this.view.append(div, p);        
      this.view.append(this.view.ul , li);       
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
const myModel = new Model(sources)
export const myController = new Controller(myView, myModel)
myController.init()

