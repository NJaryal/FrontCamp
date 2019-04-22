class Views {
  constructor(item) {
    this.item = item
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
} 
export const view = new Views()
 
 
 
 

         