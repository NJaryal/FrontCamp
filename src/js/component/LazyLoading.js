import {proxiedHeadLinesApi} from './Proxy';
import{errorInstance} from './Errors'

const headlinesNewsData = (country="us") => {
    try {
        return proxiedHeadLinesApi.get(country);
    } catch (e) {
        errorInstance.errorHandler(e.name,e.message )
    } 
}
export default headlinesNewsData;