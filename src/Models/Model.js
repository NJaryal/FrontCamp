import {myView} from '../Views/View'
export class Model{
    constructor(sources) {
        this.sources = sources
        //this.source = source
        this.channels = {}
        this.articles = []
    }

    setArticles(articles) {
        this.articles = articles  
        return this.articles
    }

    setChannels() {      
        this.channels = this.sources.reduce((acc, { source, inst }) => {
            acc[inst] = source
            return acc
        }, {})
    }

}
