import {sources, settings} from "../constant/constant";
import {NewsChannel} from './NewsChannel';
class Model{
    construtor(sources) {
        this.sources = sources
        this.channels = {}
    }
    getChannels() {
        this.channels = this.sources.reduce((acc, { source, inst }) => {
            acc[inst] = new NewsChannel(source, this);
            return acc
          }, {})
    }

}

export const myModel = new Model(sources)
myModel.getChannels()