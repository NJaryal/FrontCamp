import {view} from '../../Views/View'
import{headlinesNewsData} from './LazyLoading'
import {settings} from './Variable';
export class Headlines {
    constructor(settings){
      this.modalHeadlines = document.querySelector(settings.newsModal)
    }
    async dynamicImport() {
      return await import(/* webpackPreload: true */ "./LazyLoading.js")
      .then(({ articles }) => {
          articles.map(item => {
            this.modalHeadlines.innerHTML += view.headLinesHTML(item);
          });
        });
    }
}
const newsHeadings = new Headlines(settings)
newsHeadings.dynamicImport()
