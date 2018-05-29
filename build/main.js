require('source-map-support/register')
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mongoose__);

const Schema = __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.Schema;
const recipesSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  ingredients: [{
    name: String,
    portion: Number,
    protein: Number,
    fat: Number,
    carb: Number
  }],
  steps: [String],
  calories: Number,
  protein: Number,
  fat: Number,
  carb: Number,
  proteinHundred: Number,
  fatHundred: Number,
  carbHundred: Number,
  calHundred: Number,
  tags: []

});
const Recipe = __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.model('recipe', recipesSchema);

/* harmony default export */ __webpack_exports__["a"] = (Recipe);
/* title: this.addCaption,
            description: this.addDescribe,
            image: this.addImage,
            ingredients: this.addIngredients,
            steps:this.addSteps,
            calories: cal,
            protein: +protein.toFixed(2),
            fat: +fat.toFixed(2),
            carb: + carb.toFixed(2),
            proteinHundred,
            fatHundred,
            carbHundred,
            calHundred */

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_body_parser__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_body_parser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_body_parser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_nuxt__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_nuxt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_nuxt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__api__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_mongoose__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_mongoose__);
//const express = require('express')
//const api = require('./api');
//const bodyParser = require('body')
//const { Nuxt, Builder } = require('nuxt')






let db = 'mongodb://localhost/tsd';
__WEBPACK_IMPORTED_MODULE_4_mongoose___default.a.connect(db, err => {
  if (err) {
    console.log(err);
  }
  console.log('connected db');
});

const app = __WEBPACK_IMPORTED_MODULE_0_express___default()();
const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 3000;
app.set('port', port);

app.use(__WEBPACK_IMPORTED_MODULE_1_body_parser___default.a.json());
app.use(__WEBPACK_IMPORTED_MODULE_1_body_parser___default.a.urlencoded({
  extended: true
}));
app.use('/api', __WEBPACK_IMPORTED_MODULE_3__api__["a" /* default */]);

// Import and Set Nuxt.js options
let config = __webpack_require__(12);
config.dev = !("development" === 'production');
async function start() {
  // Init Nuxt.js
  const nuxt = new __WEBPACK_IMPORTED_MODULE_2_nuxt__["Nuxt"](config);

  // Build only in dev mode
  if (config.dev) {
    const builder = new __WEBPACK_IMPORTED_MODULE_2_nuxt__["Builder"](nuxt);
    await builder.build();
  }

  // Give nuxt middleware to express
  app.use(nuxt.render);

  // Listen the server
  app.listen(port, host);
  console.log('Server listening on http://' + host + ':' + port); // eslint-disable-line no-console
}
start();

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("nuxt");

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__add_recipe__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__get_recipes__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__filter_recipes__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__get_recipe__ = __webpack_require__(10);
//const express = require('express')
//const router = express.Router();
//const addRecipe = require('./add-recipe')





//import signIn from './sign-in'
const router = Object(__WEBPACK_IMPORTED_MODULE_0_express__["Router"])();

router.use(__WEBPACK_IMPORTED_MODULE_1__add_recipe__["a" /* default */]);
router.use(__WEBPACK_IMPORTED_MODULE_2__get_recipes__["a" /* default */]);
router.use(__WEBPACK_IMPORTED_MODULE_3__filter_recipes__["a" /* default */]);
router.use(__WEBPACK_IMPORTED_MODULE_4__get_recipe__["a" /* default */]);
//router.use(signIn)

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_recipe__ = __webpack_require__(1);



const router = Object(__WEBPACK_IMPORTED_MODULE_0_express__["Router"])();
router.post('/administration/add', function (req, res, next) {
  __WEBPACK_IMPORTED_MODULE_1__models_recipe__["a" /* default */].create(req.body, function (err) {
    // mongoose.disconnect();
    if (err) return console.log(err);else {
      console.log("Сохранен рецепт");
      res.sendStatus(200);
      //res.status(200).end();
    }
  });
});

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_recipe__ = __webpack_require__(1);



const router = Object(__WEBPACK_IMPORTED_MODULE_0_express__["Router"])();

router.get('/get-recipes', function (req, res, next) {
  let elemsCount = parseInt(req.query.elems);
  __WEBPACK_IMPORTED_MODULE_1__models_recipe__["a" /* default */].find({}).skip(elemsCount).limit(5).exec((err, recipes) => {
    if (err) return console.log(err);
    res.json(recipes);
  });
});
/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_recipe__ = __webpack_require__(1);



const router = Object(__WEBPACK_IMPORTED_MODULE_0_express__["Router"])();

router.post('/filter-recipes', function (req, res, next) {
  /*let elemsCount = parseInt(req.query.elems);
  Recipe.find({},
    {title:1,description:1,caloriesHundred:1,calHundred:1,proteinHundred:1,fatHundred:1,carbHundred:1,image:1})
  .sort({createdDate:1})
  .skip(elemsCount).limit(5).exec((err,recipes) => res.json(recipes)) */
  //let queryTags = JSON.parse(JSON.stringify(req.query.tags));
  /*let tagsOne = req.body.tagsOne;
  let tagsTwo = req.body.tagsTwo;
  let tagsThree = req.body.tagsThree;
  let tagsFour = req.body.tagsFour; */
  let tags = req.body.tags;
  console.log(tags);
  let elemsCount = parseInt(req.body.elems);
  console.log(elemsCount);
  __WEBPACK_IMPORTED_MODULE_1__models_recipe__["a" /* default */].find({
    "tags.0": { $in: tags[0] },
    "tags.1": { $in: tags[1] },
    "tags.2": { $in: tags[2] },
    "tags.3": { $in: tags[3]
      /*$where:function() {
         for(let i = 0; this.tags.length > i; i++) {
           if(queryTags[i].length === 0) return true;
          if(this.tags[i] === queryTags[i][i] 
            || this.tags[i] === queryTags[i][i+1] 
            || this.tags[i] === queryTags[i][i+2] 
            || this.tags[i] === queryTags[i][i+3]) {
              return true};
         }
      }*/

    } }).skip(elemsCount).limit(5).exec((err, recipes) => res.json(recipes));
});
/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_recipe__ = __webpack_require__(1);



const router = Object(__WEBPACK_IMPORTED_MODULE_0_express__["Router"])();

router.get('/get-recipe/:id', function (req, res, next) {
    let id = req.params.id;
    __WEBPACK_IMPORTED_MODULE_1__models_recipe__["a" /* default */].findById(id).exec().then(doc => {
        res.status(200).json(doc);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    });
});

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 11 */,
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

const pkg = __webpack_require__(13);

const nodeExternals = __webpack_require__(14);

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }, { hid: 'description', name: 'description', content: pkg.description }],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }, { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#FFFFFF' },

  /*
  ** Global CSS
  */
  css: ['vuetify/src/stylus/main.styl', '~assets/stylus/main.styl'],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: ['@/plugins/vuetify', '@/plugins/ChartPfc'],

  /*
  ** Nuxt.js modules
  */
  modules: [
  // Doc: https://github.com/nuxt-community/axios-module#usage
  '@nuxtjs/axios'],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */

    extend(config, ctx) {

      if (ctx.isServer) {
        config.externals = [nodeExternals({
          whitelist: [/^vuetify/]
        })];
      }
    }
  }
};

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = {"name":"tsd","version":"1.0.0","description":"My funkadelic Nuxt.js project","author":"ILYA TERESHCHENKO","private":true,"scripts":{"dev":"backpack dev","build":"nuxt build && backpack build","start":"cross-env NODE_ENV=production node build/main.js","generate":"nuxt generate"},"dependencies":{"@nuxtjs/axios":"^5.0.0","body-parser":"^1.18.2","chart.js":"^2.7.2","express":"^4.15.3","express-session":"^1.15.6","mongoose":"^5.0.17","nuxt":"^1.0.0","vue-chartjs":"^3.3.1","vuetify":"^1.0.18"},"devDependencies":{"babel-eslint":"^8.2.3","backpack-core":"^0.7.0","cross-env":"^5.0.1","eslint":"^4.19.1","eslint-plugin-import":"^2.11.0","nodemon":"^1.11.0","stylus":"^0.54.5","stylus-loader":"^3.0.1"}}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var utils = __webpack_require__(15);

var scopedModuleRegex = new RegExp('@[a-zA-Z0-9][\\w-.]+\/[a-zA-Z0-9][\\w-.]+([a-zA-Z0-9.\/]+)?', 'g');

function getModuleName(request, includeAbsolutePaths) {
    var req = request;
    var delimiter = '/';

    if (includeAbsolutePaths) {
        req = req.replace(/^.*?\/node_modules\//, '');
    }
    // check if scoped module
    if (scopedModuleRegex.test(req)) {
        // reset regexp
        scopedModuleRegex.lastIndex = 0;
        return req.split(delimiter, 2).join(delimiter);
    }
    return req.split(delimiter)[0];
}

module.exports = function nodeExternals(options) {
    options = options || {};
    var whitelist = [].concat(options.whitelist || []);
    var binaryDirs = [].concat(options.binaryDirs || ['.bin']);
    var importType = options.importType || 'commonjs';
    var modulesDir = options.modulesDir || 'node_modules';
    var modulesFromFile = !!options.modulesFromFile;
    var includeAbsolutePaths = !!options.includeAbsolutePaths;

    // helper function
    function isNotBinary(x) {
        return !utils.contains(binaryDirs, x);
    }

    // create the node modules list
    var nodeModules = modulesFromFile ? utils.readFromPackageJson(options.modulesFromFile) : utils.readDir(modulesDir).filter(isNotBinary);

    // return an externals function
    return function(context, request, callback){
        var moduleName = getModuleName(request, includeAbsolutePaths);
        if (utils.contains(nodeModules, moduleName) && !utils.containsPattern(whitelist, request)) {
            if (typeof importType === 'function') {
                return callback(null, importType(request));
            }
            // mark this module as external
            // https://webpack.js.org/configuration/externals/
            return callback(null, importType + " " + request);
        };
        callback();
    }
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var fs = __webpack_require__(16);
var path = __webpack_require__(17);

exports.contains = function contains(arr, val) {
    return arr && arr.indexOf(val) !== -1;
}

var atPrefix = new RegExp('^@', 'g');
exports.readDir = function readDir(dirName) {
    if (!fs.existsSync(dirName)) {
        return [];
    }

    try {
        return fs.readdirSync(dirName).map(function(module) {
            if (atPrefix.test(module)) {
                // reset regexp
                atPrefix.lastIndex = 0;
                try {
                    return fs.readdirSync(path.join(dirName, module)).map(function(scopedMod) {
                        return module + '/' + scopedMod;
                    });
                } catch (e) {
                    return [module];
                }
            }
            return module
        }).reduce(function(prev, next) {
            return prev.concat(next);
        }, []);
    } catch (e) {
        return [];
    }
}

exports.readFromPackageJson = function readFromPackageJson(options) {
    if(typeof options !== 'object') {
        options = {};
    }
    // read the file
    var packageJson;
    try {
        var fileName = options.fileName || 'package.json';
        var packageJsonString = fs.readFileSync(path.join(process.cwd(), './' + fileName), 'utf8');
        packageJson = JSON.parse(packageJsonString);
    } catch (e){
        return [];
    }
    // sections to search in package.json
    var sections = ['dependencies', 'devDependencies', 'peerDependencies', 'optionalDependencies'];
    if(options.include) {
        sections = [].concat(options.include);
    }
    if(options.exclude) {
        sections = sections.filter(function(section){
            return [].concat(options.exclude).indexOf(section) === -1;
        });
    }
    // collect dependencies
    var deps = {};
    sections.forEach(function(section){
        Object.keys(packageJson[section] || {}).forEach(function(dep){
            deps[dep] = true;
        });
    });
    return Object.keys(deps);
}

exports.containsPattern = function containsPattern(arr, val) {
    return arr && arr.some(function(pattern){
        if(pattern instanceof RegExp){
            return pattern.test(val);
        } else if (typeof pattern === 'function') {
            return pattern(val);
        } else {
            return pattern == val;
        }
    });
}

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ })
/******/ ]);
//# sourceMappingURL=main.map