import {NewsChannel} from '../js/component/NewsChannel';
export class Model{
    constructor(sources) {
        this.sources = sources
        this.channels = {}
    }
    getChannels() {        
        this.channels = this.sources.reduce((acc, { source, inst }) => {
            acc[inst] = new NewsChannel(source, this.something);
            return acc
          }, {})
    }

}

