import {API_KEY,BASE_URL,sources,settings,headLines_KEY} from "../js/component/Variable";
import "../js/component/BootstrapMenu";
class Views {
  constructor(sources, settings) {
    this.sources = sources;
    this.settings = settings;
    this.errorsModal = document.querySelector(settings.errorsModal);
    this.main = document.querySelector(settings.gridSection);
    this.nav = document.querySelector(settings.navSection);
    this.errorsModal = document.querySelector(settings.errorsModal);
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
export const view = new Views(sources, settings);
view.initialContent();
