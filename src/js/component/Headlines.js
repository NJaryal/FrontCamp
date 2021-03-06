import {myView} from '../../Views/View'
import { settings} from '../constant/constant'
class Headlines {
    constructor(settings){
      this.modalHeadlines = document.querySelector(settings.newsModal)
      this.newsHeadlines = document.querySelector(settings.newsHeadlines)
    }
    async dynamicImport() {
      const myModule = await import("./LazyLoading.js")
      const { articles } = await myModule.default()
      articles.map(item => {
        this.modalHeadlines.innerHTML += myView.headLinesHTML(item);
      });
      this.newsHeadlines.dataset.target = "#headLinesModal";
    }

    init() {
      this.newsHeadlines.addEventListener('click', this.dynamicImport())
    }
}
export const headline = new Headlines(settings)
headline.init()

