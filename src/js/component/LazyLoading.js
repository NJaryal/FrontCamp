import { headLines_KEY} from './Variable';
import {Api} from './Api';
const headlinesNewsData = () => {
    let api = new Api('')
    try {
        return api.get(headLines_KEY);
        throw Errors.getInstance()
    } catch (e) {
        alert("Name  " + e.name);
        alert("Lazy Loading Message  " + e.message);
    } 
}
headlinesNewsData()
export default headlinesNewsData;