export class NewsChannel {
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