import {view} from '../../Views/View'
export class Headlines {
    constructor(settings){
      this.modalHeadlines = document.querySelector(settings.newsModal)
      this.showheadlinesBtn = document.querySelector(settings.newsHeadlines)
    }
    async dynamicImport() {
      const module = await import("./LazyLoading.js");
      module.default()
        .then(({ articles }) => {
          articles.map(item => {
            this.modalHeadlines.innerHTML += view.headLinesHTML(item);
          });
        });
    }
}
