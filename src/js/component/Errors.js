import {myView} from '../../Views/View';
export class Errors {
  construtor(){
  }

  errorHandler(name, message) {
    myView.errorsMsgModal(name, message)
  }
}
export const errorInstance = new Errors()