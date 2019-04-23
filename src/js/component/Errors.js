import {view} from '../../Views/View';
class Errors {
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
}
export const error = new Errors()