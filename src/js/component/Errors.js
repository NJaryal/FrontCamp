import {view} from '../../Views/View';
export class Errors {
  construtor(){
  }

  errorHandler(name, message) {
    view.errorsMsgModal(name, message)
  }
}
export const errorInstance = new Errors()