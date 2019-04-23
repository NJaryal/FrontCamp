import {view} from '../../Views/View';
export class Errors {
  construtor(){
    if(!Errors.instance) {
      Errors.instance = new Error()
    }
  }

  getInstance() {
    return Errors.instance
  }

  errorHandler(name, message) {
    view.errorsMsgModal(name, message)
  }

  displayAlerts(msg) {
    alert(msg)
  }
}
