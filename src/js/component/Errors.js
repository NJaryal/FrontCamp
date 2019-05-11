import {myView} from '../../Views/View';
let instance = null;
export class Errors {
  construtor(){
    if(!instance) {
      instance = this;
      } else {
       return instance;
      }      
  }

  errorHandler(name, message) {
    myView.errorsMsgModal(name, message)
  }
}
export const errorInstance = new Errors()