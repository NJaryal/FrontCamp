import {Errors} from './Errors';
import {view} from '../../Views/View'
import{error} from './Errors'
export class Api {
    constructor(BASE_URL) {
      this.BASE_URL = BASE_URL
    }
       
   async request(url, method, body) {
      const param = {
          method,
          body: JSON.stringify(body)
      }
      try {
        return await fetch(this.BASE_URL + url , param).then(res => {
          console.log(`Status: ${res.status} Url:${res.url}`)
         return res.json()})
        throw error.getInstance()
      } catch (e) {
        error.errorHandler(e.name, e.message)
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
