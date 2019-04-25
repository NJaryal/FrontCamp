export class Api {
    constructor() {      
    }
       
   async request(url, method, body) {
      const param = {
          method,
          body: JSON.stringify(body)
      }
      try {
        return await fetch(url, param).then(res => res.json())
      } catch (e) {
        const myModule = import(/* webpackPreload: true */ "./Errors.js")
        return await myModule.displayAlerts(e.message)
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
