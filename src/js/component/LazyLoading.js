import { headLines_KEY} from './Variable';
import {api} from './Api'
const headlinesNewsData = async () => {
    try {
        const resp = await api.get(headLines_KEY);
        return await resp.json();  
    } catch (error) {
        console.log(error);
    } 
}
export default headlinesNewsData;