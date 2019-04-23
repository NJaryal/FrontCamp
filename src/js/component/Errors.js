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

  errorHandler() {
    view.errorsModal(e.name, e.message)
  }
}