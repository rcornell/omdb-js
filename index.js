const config = { apiKey: null };
const axios = require('axios');
const dataUrl = `http://www.omdbapi.com/?apikey=USERAPIKEY`;
const posterUrl = `http://img.omdbapi.com/?apikey=USERAPIKEY`;
const noIdOrTitleObj = { title: 'Please specify an imdbId or title' };

const defaultSearchParams = {
  i: null,
  t: null,
  type: null,
  y: null,
  plot: null,
  r: null,
  callback: null,
  v: null
};
const defaultSpecificMovieParams = {
  t: '',
  type: null,
  y: null,
  r: null,
  page: null,
  callback: null,
  v: null
};
const searchParamKeys = ['i', 't', 'type', 'y', 'plot', 'r', 'callback', 'v'];
const specificMovieParamKeys = ['t', 'type', 'y', 'r', 'page', 'callback', 'v'];
const validConfigKeys = {
  type: true,
  plot: true,
  page: true,
  r: true,
  callback: true,
  v: true
}
let userDataUrl, userPosterUrl, userConfigObj = {};

const buildSpecificMovieUrl = paramObj => {
  return specificMovieParamKeys.reduce((acc, key) => {
    if(paramObj[key]) {
      return `${acc}&${key}=${paramObj[key]}`; 
    }
    if(userConfigObj[key]) {
      return `${acc}&${key}=${paramObj[key]}`; 
    }
    return acc;
  }, '');
}

const buildSearchUrl = paramObj => {
  return searchParamKeys.reduce((acc, key) => {
    if(paramObj[key]) {
      return `${acc}&${key}=${paramObj[key]}`; 
    }
    if(userConfigObj[key]) {
      return `${acc}&${key}=${paramObj[key]}`; 
    }
    return acc;
  }, '');
}

const functions = {
  configure(configObj = {}) {
    Object.keys(configObj).forEach(key => {
      if(!validConfigKeys[key]) {
        throw new Error('Invalid OMDB config key')
      }
    })
    userConfigObj = Object.assign(defaultConfigObj, configObj);
  },
  getSpecificMovie(paramObj) {
    if(!paramObj.i && !paramObj.t) { 
      throw new Error('No imdbId or title specified');
    }

    const requestTerms = buildSpecificMovieUrl(paramObj);
    const requestUrl = `${userDataUrl}${requestTerms}`;

    return axios.post(requestUrl)
      .then(results => results.data);
  },
  searchForMovie(paramObj){
    if(!paramObj.t) {
      throw new Error('No title specified');
    }

    const requestTerms = buildSearchUrl(paramObj);
    const searchUrl = `${userDataUrl}${requestTerms}`;
    
    return axios.post(searchUrl)
      .then((results) => results.data);
  },
}

module.exports = apiKey => {
  if (typeof apiKey !== 'string') {
    throw new Error('Invalid OMDB API Key. Should be a string.');
  }
  config.apiKey = apiKey;
  userDataUrl = dataUrl.replace('USERAPIKEY', apiKey);
  userPosterUrl = posterUrl.replace('USERAPIKEY', apiKey);
  return functions;
};
