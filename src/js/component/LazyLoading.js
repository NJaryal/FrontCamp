import { headLines_KEY} from '../constant/constant';
import {proxiedApi} from './Proxy';
import{Errors} from './Errors'
const headlinesNewsData = () => {
    try {
        return proxiedApi.get(headLines_KEY);
    } catch (e) {
        Errors.errorHandler(e.name,e.message )
    } 
}
export default headlinesNewsData;