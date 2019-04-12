import { headLines_KEY} from './variable';
const headlinesNewsData = async headLinesNews => {
    try {
        const resp = await fetch(headLines_KEY);
        return await resp.json();  
        console.log("Api Response");  
        
    } catch (error) {
        console.log(error);
    } 
}
export default headlinesNewsData;
