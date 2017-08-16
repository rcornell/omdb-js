## omdb-js
  
####  omdb-js is a wrapper for the popular OMDB API. 

# Table of Contents

1. [Why](#why)
1. [Features](#team)
1. [Installing](#installing)
1. [Configuration](#configuration)
1. [Usage](#usage)
1. [Contributing](#contributing)

# Why

  I used OMDB API for a recent [application](https://github.com/binary100/fliq) and found it to be a handy little API. There were no wrappers for it, so I made one! 

# Features

- [*searchForMovie*](#searchformovie-info): Using a fuzzy search, get an array of movie objects that best match the title you enter into the method.

- [*getSpecificMovie*](#getspecificmovie-info): Ask OMDB API for a single movie result. If you pass a title into the method (instead of an imdbId), the returned movie will be the movie with the closest matching title. 

- [*configure*](#configure-info): Configure omdb-js to run with specified settings at each call. More details on these parameters can be found here: http://www.omdbapi.com/.

# Installing

In terminal, within your project's directory tree run the following command:

```npm install --save omdb-js```


# Configuration

To use omdb-js, you will need to pass your OMDB API key (string) into it when it is require'd into your project.


```
const omdb = require('omdb-js')(OMDB_API_KEY);
```


# API

## searchForMovie(title, options)

#### Purpose
Utilize OMDB API's native fuzzy searches to find a number of movies whose titles resemble that of the string passed to the method. This will return an array of potentially matching movie objects.

#### Arguments
  1. title (**required**)
    - type: string
    - info: the name of the movie you are searching for.
  2. options:
    - type: object
    - info: An options object that will temporarily override any options set through the configure method.
    - properties: 
      - type: (string)
        - valid options: "movie", "episode", "series"
        - info: The kind of IMDB entry you are searching for.
      - y: (string)
        - info: The year of the item you are searching for
      - r: (string) The response type
        - valid options: 'json', 'xml'
        - default: 'json'
      - page: (number 1-100)
        - info: the page number of search results you want
        - default: 1
      - callback: (string)
        - info: A jsonp callback function name
### Example:

```
omdb.searchForMovie('Star Wars', {
  type: 'movie',
  y: '1977',
  r: 'json',
  page: 1
}).then(results => {
  // results is an array of movie objects
})

```

## getSpecificMovie(title, imdbId, options)

#### Purpose
Find the closest matching movie for the title passed to the method. This will return a single movie object.

#### Arguments
  1. title (**this OR imdbId required**)
    - type: string
    - info: the name of the item you are searching for.
  2. imdbId (**this OR title required**)
  - type: string
  - info: the imdbId of the item you are searching for.
  3. options:
    - type: object
    - info: An options object that will temporarily override any options set through the configure method.
    - properties:
      - plot: (string)
        - valid options: "full", "short"
        - default: "full"
      - type: (string)
        - valid options: "movie", "episode", "series"
        - info: The kind of IMDB entry you are searching for.
      - y: (string)
        - info: The year of the item you are searching for
      - r: (string) The response type
      - page: (number 1-100)
        - info: the page number of search results you want
        - default: 1
      - callback: (string)
        - info: A jsonp callback function name
### Example

```
omdb.getSpecificMovie('Mad Max Fury Road', {
  plot: 'short',
  type: 'movie',
  y: '2015',
  r: 'json',
  page: 1
}).then(result => {
  // result is a single OMDB API json object json matching the year and title, with "short" plot summary
})

```


## configure(options)

#### Purpose
Configure all future omdb-js requests to use the options specified. Some options do not apply to certain searches, e.g. there is no "plot" option in the base searchForMovie method, since that method returns small movie objects by default.

#### Arguments
  1. options (**required**)
    - type: object
    - properties:
      - plot: (string)
        - valid options: "full", "short"
        - default: "full"
      - type: (string)
        - valid options: "movie", "episode", "series"
        - info: The kind of IMDB entry you are searching for.
      - r: (string) The response type
      - page: (number 1-100) The page number of search results you want
      - callback: (string)
        -info: A jsonp callback function name
### Example

```
omdb.configure({
  plot: 'short',
  r: 'xml',
  page: 2,
  type: 'episode'
});

Future omdb function invocations will return xml,
page 2, and search for episodes from IMDB rather than movies. 

In searches that return full movie objects, e.g. getSpecificMovie,
the plot descriptions will be short.

```

## Built With

* [Axios](https://github.com/mzabriskie/axios) - A powerful, easy-to-use handler for http requests.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on the code of conduct and the process for submitting pull requests.

[Contributors](https://github.com/rcornell/omdb-js/contributors) are welcome and will be clearly acknowledged.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details