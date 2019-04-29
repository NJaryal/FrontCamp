import { headLines_KEY} from '../constant/constant';
import {proxiedApi} from './Proxy';
import{errorInstance} from './Errors'
const headlinesNewsData = () => {
    try {
        return proxiedApi.get(headLines_KEY);
    } catch (e) {
        errorInstance.errorHandler(e.name,e.message )
    } 
}
export default headlinesNewsData;