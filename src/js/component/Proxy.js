import {api} from './Api'
const proxyHandler = {
  get: function(target, name){
        return target[name]
    }
}
const proxiedApi = new Proxy(api, proxyHandler)
proxiedApi.request()
proxiedApi.get()

//Proxy usage to get all the Author names
export const authorNames = () => {
    let validator = {
        get(target, key) {
            return key in target ? taget[key] : "No Author";
        }
      }
    let authors = new Proxy({}, validator);
}
