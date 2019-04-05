//Proxy usage to get all the Author names
export const authorNames = () => {
    let validator = {
        get(target, key) {
            return key in target ? taget[key] : "No Author";
        }
      }
    let authors = new Proxy({}, validator);
}