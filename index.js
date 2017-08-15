const config = { apiKey: null };
const axios = require('axios');
const dataUrl = `http://www.omdbapi.com/?apikey=APIKEY&`;
const posterUrl = `http://img.omdbapi.com/?apikey=APIKEY&`;
const noIdOrTitleObj = { title: 'Please specify an imdbId or title' };
const defaultConfigObj = {
  i: null,
  t: null,
  type: null,
  y: null,
  plot: null,
  r: null,
  callback: null,
  v: null
}
let userDataUrl, userPosterUrl, userConfigObj;

const buildSpecificMovieUrl = paramObj => {
  
}

const functions = {
  configure(configObj = defaultConfigObj) {
    userConfigObj = Object.assign(defaultConfigObj, configObj);
  },
  getSpecificMovie(paramObj) {
    if(!paramObj.imdbId && !paramObj.title) return noIdOrTitleObj;

    const urlSuffix = paramObj.imdbId ? `i=${paramObj.imdbId}` : `t=${paramObj.title}`;
    const requestUrl = userDataUrl + urlSuffix;

    axios.post(requestUrl)
      .then(results => results.data);
  },
  searchForMovie(title = ''){
    const searchUrl = `${userDataUrl}s=${title}`;
    axios.post(searchUrl)
      .then((results) => result.data);
  },
}

module.exports = apiKey => {
  config.apiKey = apikey;
  userDataUrl = dataUrl.replace('APIKEY', keyString);
  userPosterUrl = posterUrl.replace('APIKEY', keyString);
  return functions;
};
