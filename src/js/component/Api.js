import {Errors} from './Errors';
import {view} from '../../Views/View'
import { settings} from './Variable';
class Api {
    constructor(path, settings) {
      this.path = path 
      this.settings = settings
      this.errorsModal = document.querySelector(settings.errorsModal)  
    }
   
   async request(url, method, body) {
      const param = {
          method,
          body: JSON.stringify(body)
      }
      try {
        console.log(`Api call with ${method} method of url= ${url}`)
        return await fetch(this.path + url, param).then(res => res.json())
        throw Errors.getInstance()
      } catch (e) {
        this.errorsModal.innerHTML = view.errorsModal(e.name, e.message) //Popup Error
        $("#errorsModal").modal('show');
      }
   }
     
   get(url) {
     return this.request(url, 'GET')
   }  
     
   post(url, body) {
    return this.request(url, 'POST', body)
   }   
     
   put(url, body) {
    return this.request(url, 'PUT', body)
   }
}
export const api = new Api('', settings);