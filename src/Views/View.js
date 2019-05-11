import {sources,settings} from "../js/constant/constant";
import "../js/component/BootstrapMenu";
class View {
  constructor(sources, settings) {
    this.sources = sources;
    this.settings = settings;
    this.main = document.querySelector(settings.gridSection)
    this.nav = document.querySelector(settings.navSection)
    this.ul = document.querySelector(settings.ulSelector)
    this.channelUILists = document.querySelector(settings.channelUIListsSelector)
    this.errorsModal = document.querySelector(settings.errorsModal)
    this.spinner = document.querySelector(settings.spinnerSelector)
    this.spinner.style.display = 'none';
  }

  navHTML(item) {
    return (this.nav.innerHTML = `<li><a data-load-channel="${item.inst}">${
      item.source
    }</a></li>`);
  }

  mainHTML(item) {
    return (this.main.innerHTML = `<div class="thumbnail">
      <div class="caption">
      <h3>${item.label}</h3>
      <p><a href="#" class="btn btn-primary" data-load-channel="${
        item.inst
      }" role="button">${item.source}</a></p>
      </div>
    </div>`);
  }

  initialContent() {
    this.sources.forEach(item => {
      this.nav.innerHTML += this.navHTML(item);
      this.main.innerHTML += this.mainHTML(item);
    });
  }

  enableSpinner() {
    this.spinner.style.display = 'block';
  }

  disableSpinner() {
    this.spinner.style.display = 'none';
  }

  append(parent, el) {
    return parent.appendChild(el)
  }

  createNode(element) {
    return document.createElement(element)
  }  

  renderItem(news) {
    let li = this.createNode('li'), 
        img = this.createNode('img'),
        div = this.createNode('div'),
        p = this.createNode('p'),
        h4 = this.createNode('h4'),
        strong = this.createNode('strong'); 

      img.src = news.urlToImage;
      h4.innerHTML = `AUTHOR: ${news.author}`;
      strong.innerHTML = `Title: ${news.title} `;
      p.innerHTML = `Description: ${news.description}`;
          
      this.append(li, img);
      this.append(li, div);
      this.append(div, h4);
      this.append(div, strong);
      this.append(div, p);        
      this.append(this.ul , li);       
    } 
  
  headLinesHTML(item) {
    return `<a href="#" class="list-group-item"><strong>${
      item.title
    } </strong></a>`;
  }

  errorsMsgModal(name, message) {
    return this.errorsModal.innerHTML += `<div class="modal fade" id="errorsModal" tabindex="-1" role="dialog" aria-labelledby="errorsModal" aria-hidden="true">
              <div class="modal-dialog" role="document">
                  <div class="modal-content">
                      <div class="modal-header">
                          <h2 class="modal-title" id="ModalLabel">Error Name: ${name}</h2>
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div class="modal-body errorsModalContent">
                  Error Message: ${message}
                </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>`;
  }
}
export const myView = new View(sources, settings);

