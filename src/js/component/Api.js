class Api {
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
    return this.request(url, 'POST', body)
   }   
     
   put(url, body) {
    return this.request(url, 'PUT', body)
   }
}
export const api = new Api('');