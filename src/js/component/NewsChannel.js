import {myView} from '../../Views/View';
import {myController} from './Controller'
export class NewsChannel {
    constructor(source) { 
        this.source = source;
    }    
    // Class method to fetch the data and process it to DOM    
    setArticles(articles) {
      this.articles = articles  
      myView.disableSpinner()
      return this.articles
    }
  
    fetchChannel() {
        myController.get(this.source)
        .then(({ articles }) => {
          this.setArticles(articles)
          this.render()
        })
        .catch(error => JSON.stringify(error)); //If promise is rejected then catch        
    }    
}