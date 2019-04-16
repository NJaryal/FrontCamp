import { headLines_KEY} from './Variable';
const headlinesNewsData = async headLinesNews => {
    try {
        const resp = await fetch(headLines_KEY);
        return await resp.json();  
    } catch (error) {
        console.log(error);
    } 
}
export default headlinesNewsData;