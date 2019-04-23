import { headLines_KEY} from './Variable';
import {Api} from './Api';
import {proxiedApi} from './Proxy';
const headlinesNewsData = () => {
    /* let api = new Api('') */
    try {
        return proxiedApi.get(headLines_KEY);
        throw Errors.getInstance()
    } catch (e) {
        alert("Name  " + e.name);
        alert("Lazy Loading Message  " + e.message);
    } 
}
headlinesNewsData()
export default headlinesNewsData;