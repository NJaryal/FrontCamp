export const API_KEY = "33c57abfe85847ae9babd0be138a96b8";
export const BASE_URL = "https://newsapi.org/v1/articles?source=";
export const sources = [
    {
      source: 'CNBC',
      label: 'CNBC News',
      inst: 'cnbc'
    },
    {
      source: 'Time',
      label: 'Time News',
      inst: 'time'
    },
    {
      source: 'usa-today',
      label: 'Usa Today News',
      inst: 'usaToday'
    },
    {
      source: 'the-new-york-times',
      label: 'The New York Times News',
      inst: 'newYourkTimes'
    },
    {
      source: 'cnn',
      label: 'CNN News',
      inst: 'cnn'
    },
  
    {
      source: 'associated-press',
      label: 'Associated Press News',
      inst: 'associatedPress'
    }
  ]

  export const settings = {
    spinnerSelector: '.spinner',
    ulSelector: '#newsArticlesList',
    gridSection: '.newsSection',
    navSection: '.primary_navigation',
    channelUIListsSelector: '.thumbnail',
    newsHeadlines: '#headLines',
    newsModal : '.headlinesContent',
    BASE_URL,
    API_KEY
  }

export const headLines_KEY = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;
