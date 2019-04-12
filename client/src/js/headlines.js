export class Headlines {
    constructor(settings){
      this.modalHeadlines = document.querySelector(settings.newsModal)
      this.showheadlinesBtn = document.querySelector(settings.newsHeadlines)    
    }
    async dynamicImport() {
      const module = await import("./lazy-loading.js");
      module.default()
        .then(({ articles }) => {
          articles.map(item => {
            this.modalHeadlines.innerHTML += `<a href="#" class="list-group-item"><strong>${item.title} </strong></li>`;
          });
        });
    }
  }