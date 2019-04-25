import { headLines_KEY} from '../constant/constant';
import {proxiedApi} from './Proxy';
import{Errors} from './Errors'
const headlinesNewsData = () => {
    try {
        return proxiedApi.get("CNN");
    } catch (e) {
        Errors.errorHandler(e.name,e.message )
        alert(e.name)
    } 
}
export default headlinesNewsData;