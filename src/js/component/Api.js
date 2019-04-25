import { BASE_URL,API_KEY} from '../constant/constant';
export class Api {
    constructor(baseUrl, apiKey) {
      this.baseUrl = baseUrl
      this.apiKey = apiKey
    }    

    async request(url, method, body) {
      const generateRequestUrl = (source="CNN") => {
      return `${this.baseUrl}${source}?apiKey=${this.apiKey}`
    }

    /* const generateRequestUrl = (source="CNN") => {
      let url = `${this.baseUrl}${source}?apiKey=${this.apiKey}`
      return new Request(url);
    } */
      const param = {
          method,
          body: JSON.stringify(body)
      }

      try {
        return await fetch(generateRequestUrl(source)+url, param).then(res => res.json())
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

export const api = new Api(BASE_URL,API_KEY)
