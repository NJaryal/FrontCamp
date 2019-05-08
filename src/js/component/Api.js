export class Api {
    constructor(baseUrl, apiKey) {
      this.baseUrl = baseUrl
      this.apiKey = apiKey
    }

  async request(url, method, body) {
    const param = {
        method,
        body: JSON.stringify(body)
    }
    try {
      return await fetch(`${this.baseUrl}${url}&apiKey=${this.apiKey}`, param).then(res => res.json())
    } catch (e) {
      const myModule = import(/* webpackPreload: true */ "./Errors.js")
      return await myModule.errorHandler(e.name,e.message)
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

