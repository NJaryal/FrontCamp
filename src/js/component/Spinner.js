export class Spinner {
    constructor(selector) {
      this.spinner = document.querySelector(selector)
      this.spinner.style.display = 'none';
    }
  
    enableSpinner() {
      this.spinner.style.display = 'block';
    }
  
    disableSpinner() {
      this.spinner.style.display = 'none';
    }
  
  }