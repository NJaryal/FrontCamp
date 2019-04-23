import { headLines_KEY} from './Variable';
import {proxiedApi} from './Proxy';
import{Errors} from './Errors'
const headlinesNewsData = () => {
    try {
        return proxiedApi.get(headLines_KEY);
        throw Errors.getInstance()
    } catch (e) {
        Errors.errorHandler(e.name,e.message )
        alert(e.name)
    } 
}
export default headlinesNewsData;