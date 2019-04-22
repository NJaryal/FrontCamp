class Views {
  constructor(item, name, message) {
    this.item = item;
    this.name = name;
    this.message = message;
  }

  navHTML(item){
    return `<li><a data-load-channel="${item.inst}">${item.source}</a></li>`
  }

  mainHTML(item) {
    return `<div class="thumbnail">
      <div class="caption">
      <h3>${item.label}</h3>
      <p><a href="#" class="btn btn-primary" data-load-channel="${item.inst}" role="button">${item.source}</a></p>
      </div>
    </div>`
  }

  headLinesHTML(item) {
    return `<a href="#" class="list-group-item"><strong>${item.title} </strong></a>`
  }

  errorsModal(name, message) {
    return `<div class="modal fade" id="errorsModal" tabindex="-1" role="dialog" aria-labelledby="errorsModal" aria-hidden="true">
              <div class="modal-dialog" role="document">
                  <div class="modal-content">
                      <div class="modal-header">
                          <h2 class="modal-title" id="ModalLabel">Message: ${name}</h2>
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div class="modal-body errorsModalContent">
                Message: ${message}
                </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>`
  }

} 
export const view = new Views()
 
 
 
 

         