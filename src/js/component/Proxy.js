import {Api} from './Api'
import { API_KEY, BASE_URL, headLines_baseUrl} from '../constant/constant';
const apiNews = new Api(BASE_URL,API_KEY)
const apiHeadlines = new Api(headLines_baseUrl,API_KEY)
const proxyHandler = {
    get: function(target, name){
        console.log(name)
        return target[name]
    }
}
export const proxiedNewsApi = new Proxy(apiNews, proxyHandler)
export const proxiedHeadLinesApi = new Proxy(apiHeadlines, proxyHandler)
//Proxy usage to get all the Author names
export const authorNames = () => {
    let validator = {
        get(target, key) {
            return key in target ? taget[key] : "No Author";
        }
      }
    let authors = new Proxy({}, validator);
}
