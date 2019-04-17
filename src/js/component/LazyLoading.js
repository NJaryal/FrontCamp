import { headLines_KEY} from './Variable';
import {Api} from './Api'
const headlinesNewsData = async headLinesNews => {
    const api = new Api("")
    try {
        const resp = await api.get(headLines_KEY);
        return await resp.json();  
    } catch (error) {
        console.log(error);
    } 
}
export default headlinesNewsData;