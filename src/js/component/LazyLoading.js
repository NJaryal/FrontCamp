import { headLines_KEY} from './Variable';
import {api} from './Api'
const headlinesNewsData = () => {
    try {
        return api.get(headLines_KEY);
        throw Errors.getInstance()
    } catch (e) {
        alert("Name  " + e.name);
        alert("Lazy Loading Message  " + e.message);
    } 
}
export default headlinesNewsData;