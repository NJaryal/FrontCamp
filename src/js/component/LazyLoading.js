import { headLines_KEY} from './Variable';
import {proxiedApi} from './Proxy';
import{error} from './Errors'
const headlinesNewsData = () => {
    try {
        return proxiedApi.get(headLines_KEY);
        throw error.getInstance()
    } catch (e) {
        error.errorHandler(e.name,e.message )
        alert(e.name)
    } 
}
export default headlinesNewsData;