const axios = require('axios');
const dataUrl = `http://www.omdbapi.com/?apikey=USERAPIKEY`;
const posterUrl = `http://img.omdbapi.com/?apikey=USERAPIKEY`;
const searchParamKeys = ['s', 'type', 'y', 'r', 'page', 'callback', 'v'];
const specificMovieParamKeys = ['t', 'i', 'plot', 'type', 'y', 'r', 'page', 'callback', 'v'];
const validConfigKeys = {
  type: true,
  plot: true,
  page: true,
  r: true,
  callback: true,
  v: true
}
let userDataUrl, userPosterUrl, userConfigObj = {};

const buildSearchTerms = paramObj => {
  const validationArray = paramObj.s ? searchParamKeys : specificMovieParamKeys;
  return validationArray.reduce((acc, key) => {
    if(paramObj[key]) {
      return `${acc}&${key}=${paramObj[key]}`; 
    }
    if(userConfigObj[key]) {
      return `${acc}&${key}=${userConfigObj[key]}`; 
    }
    return acc;
  }, '');
}

const functions = {
  configure(configObj = {}) {
    Object.keys(configObj).forEach(key => {
      if(!validConfigKeys[key]) {
        throw new Error(`Invalid OMDB config key: ${key}`)
      }
    });
    userConfigObj = Object.assign(userConfigObj, configObj);
  },
  getSpecificMovie(title, imdbId, paramObj = {}) {
    if(!title && !imdbId) { 
      throw new Error('No imdbId or title specified');
    }
    if (title) paramObj.t = title;
    if (imdbId) paramObj.i = imdbId; // Note that OMDB will prioritize title over id

    const requestTerms = buildSearchTerms(paramObj);
    const requestUrl = `${userDataUrl}${requestTerms}`;
    return axios.post(requestUrl)
      .then(results => results.data);
  },
  searchForMovie(title, paramObj = {}){
    if(!title) {
      throw new Error('No title to search');
    }
    paramObj.s = title;
    const requestTerms = buildSearchTerms(paramObj);
    const searchUrl = `${userDataUrl}${requestTerms}`;
    return axios.post(searchUrl)
      .then((results) => results.data);
  },
  
}

module.exports = apiKey => {
  if (typeof apiKey !== 'string') {
    throw new Error('Invalid OMDB API key. Should be a string.');
  }
  userDataUrl = dataUrl.replace('USERAPIKEY', apiKey);
  userPosterUrl = posterUrl.replace('USERAPIKEY', apiKey);
  return functions;
};
