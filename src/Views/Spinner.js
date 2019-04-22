import { settings} from '../js/component/Variable';
export class Spinner {
    constructor(settings) {
      this.spinner = document.querySelector(settings.spinnerSelector)
      this.spinner.style.display = 'none';
    }
  
    enableSpinner() {
      this.spinner.style.display = 'block';
    }
  
    disableSpinner() {
      this.spinner.style.display = 'none';
    }  
  }

  export const spinner = new Spinner(settings)