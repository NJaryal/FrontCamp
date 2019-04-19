import {api} from './Api'
//Proxy usage to get all the Author names
export const authorNames = () => {
    let validator = {
        get(target, key) {
            return key in target ? taget[key] : "No Author";
        }
      }
    let authors = new Proxy({}, validator);
}

export class Proxy {
    constructor() {
    }

    getLogger(url) {
        return api.get(url)
        console.log(response.status)
        console.log(response.statusText)
        console.log(response.url)
    }
}
export const proxy = new Proxy()