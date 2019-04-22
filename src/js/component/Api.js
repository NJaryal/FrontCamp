class Api {
    constructor(path) {
      this.path = path
    }
   
   async request(url, method, body) {
      const param = {
          method,
          body: JSON.stringify(body)
      }
      console.log(`Api call with ${method} method of url= ${url}`)
      return await fetch(this.path + url, param).then(res => res.json())
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