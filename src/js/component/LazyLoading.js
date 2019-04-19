import { headLines_KEY} from './Variable';
import {api} from './Api'
const headlinesNewsData = async () => {
    try {
        const resp = await api.get(headLines_KEY);
        return await resp.json();  
        throw new CustomError('Lazy Loading Message');
    } catch (e) {
        alert("Name  " + e.name);
        alert("Lazy Loading Message  " + e.message);
    } 
}
export default headlinesNewsData;