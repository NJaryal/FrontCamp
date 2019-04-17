export class Api {
    constructor(path) {
      this.path = path
    }
   
   request(url, method, body) {
       const param = {
           method,
           body: JSON.stringify(body)
       }
     return fetch(this.path + url, param)
   }
     
   get(url) {
     return this.request(url, 'GET')
   }  
     
   post(url, body) {
    // code here
   }   
     
   put(url, body) {
     // code here
   }
}

