
# generator-jwt-webapp [![NPM version][npm-image]][npm-url]

> React / NextJS frotnend using JWT token authentication via Mongodb backed Node instance.


## Installation

First, install [Yeoman](http://yeoman.io) and generator-jwt-webapp using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-jwt-webapp
```

- Also, make sure to have [MongoDB](https://www.mongodb.com/) installed and run `mongod` or create project using a remote DB Uri.

Next, create root folder where project will live and navigate to it:

- `myDirectory` can be <i>anything</i>

```bash
mkdir myDirectory && cd myDirectory
```

Finally, generate your new project:

```bash
yo jwt-webapp
```

<b>Follow Instructions...</b>

## Running the Webapp

In one terminal tab:

```bash
$ cd api
$ npm run start
```

In another terminal tab:

```bash
$ cd client
$ npm run dev
```

Open browser of choice and launch

```bash
localhost:3000
```

## Getting To Know Yeoman

- Feel free to [learn more about Yeoman](http://yeoman.io/).

## License

Apache-2.0 © [Mike Schmerbeck](https://www.mikeschmerbeck.com/)

[npm-image]: https://badge.fury.io/js/generator-jwt-webapp.svg
[npm-url]: https://npmjs.org/package/generator-jwt-webapp
[travis-image]: https://travis-ci.org/generator-jwt-webapp.svg?branch=master
[travis-url]: https://travis-ci.org/generator-jwt-webapp
[daviddm-image]: https://david-dm.org/generator-jwt-webapp.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/generator-jwt-webapp
[coveralls-image]: https://coveralls.io/repos//generator-jwt-webapp/badge.svg
[coveralls-url]: https://coveralls.io/r//generator-jwt-webapp

<!-- [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url] -->
