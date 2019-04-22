export class Errors {
  construtor(){
    if(!Errors.instance) {
      Errors.instance = new Error()
    }
  }

  getInstance() {
    return Errors.instance
  }
}