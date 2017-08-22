'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _CollectionError = require('./CollectionError');

var _CollectionError2 = _interopRequireDefault(_CollectionError);

var _Entity2 = require('./Entity');

var _Entity3 = _interopRequireDefault(_Entity2);

var _Error = require('./Error');

var _Error2 = _interopRequireDefault(_Error);

var _Item = require('./Item');

var _Item2 = _interopRequireDefault(_Item);

var _Link = require('./Link');

var _Link2 = _interopRequireDefault(_Link);

var _Query = require('./Query');

var _Query2 = _interopRequireDefault(_Query);

var _Template = require('./Template');

var _Template2 = _interopRequireDefault(_Template);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Creates and validates collection+json object
 *
 * @author S. Fleming <npm@int5.net>
 * @since Tue Jul 25 11:07:32 CEST 2017
 */
var Collection = function (_Entity) {
  _inherits(Collection, _Entity);

  _createClass(Collection, null, [{
    key: 'parseTemplate',


    /**
     * parse data request in template form into a database friendly json object
     *
     * @param {Object} json The JSON object to parse (should be in Collection+JSON Template form)
     * @return Object
     */
    value: function parseTemplate(json) {
      var dbObject = {};

      //check the template object
      var templateObject = Collection.getObjectValueByKey(json, "template");
      if (templateObject !== undefined) {
        var template = _Template2.default.getByObject(templateObject);
        dbObject = template.getDatabaseObject();
      }
      return dbObject;
    }

    /**
     * Import a collection string and transform into a collection object
     *
     * @param String collection - The string to import
     * @return Collection
     */

  }, {
    key: 'getByObject',
    value: function getByObject(json) {
      //check the collection object
      var collectionObject = Collection.getObjectValueByKey(json, "collection");
      if (collectionObject === undefined) {}
      //throw new CollectionError('collection Object undefined');


      //check the version
      var versionString = Collection.getObjectValueByKey(collectionObject, "version");
      if (versionString === undefined) {}
      //throw new CollectionError('collection.version String undefined');


      //check the href
      var hrefString = Collection.getObjectValueByKey(collectionObject, "href");
      if (hrefString === undefined) {}
      //throw new CollectionError('collection.href String undefined');


      // create the collection object
      var collection = new Collection(hrefString);

      // check the links object
      var linksObject = Collection.getObjectValueByKey(collectionObject, "links");
      if (Collection.isArray(linksObject)) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = linksObject[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var linkObject = _step.value;


            // add the link
            try {
              var link = _Link2.default.getByObject(linkObject);
              collection.addLink(link);
            } catch (error) {
              // skip this link
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }

      // check the items object
      var itemsObject = Collection.getObjectValueByKey(collectionObject, "items");
      if (Collection.isArray(itemsObject)) {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = itemsObject[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var itemObject = _step2.value;


            // add the item
            try {
              var item = _Item2.default.getByObject(itemObject);
              collection.addItem(item);
            } catch (error) {
              // skip this item
            }
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }

      // check the querys object
      var queriesObject = Collection.getObjectValueByKey(collectionObject, "queries");
      if (Collection.isArray(queriesObject)) {
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = queriesObject[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var queryObject = _step3.value;


            // add the query
            try {
              var query = _Query2.default.getByObject(queryObject);
              collection.addQuery(query);
            } catch (error) {
              console.log(error.message);
            }
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }
      }

      //check the template object
      var templateObject = Collection.getObjectValueByKey(collectionObject, "template");
      if (templateObject !== undefined) {

        // add the template
        try {
          var template = _Template2.default.getByObject(templateObject);
          collection.setTemplate(template);
        } catch (error) {
          console.log(error.message);
        }
      }

      //check the error object
      var errorObject = Collection.getObjectValueByKey(collectionObject, "error");
      if (errorObject !== undefined) {

        // add the error
        try {
          var error = _Error2.default.getByObject(errorObject);
          collection.setError(error);
        } catch (error) {
          console.log(error.message);
        }
      }

      return collection;
    }

    /**
     * The class constructor
     *
     * @param string url The api root uri
     */

  }, {
    key: 'VERSION',

    /**
     * Get the collection version
     *
     * @return string
     */
    get: function get() {
      return "1.0";
    }
  }]);

  function Collection(uri) {
    _classCallCheck(this, Collection);

    /**
     * The api root uri
     *
     * @var string
     */
    var _this = _possibleConstructorReturn(this, (Collection.__proto__ || Object.getPrototypeOf(Collection)).call(this));

    _this.href = uri;

    /**
     * The api links array
     *
     * @var array
     */
    _this.links = [];

    /**
     * The items data array
     *
     * @var array
     */
    _this.items = [];

    /**
     * The query method data definition array
     *
     * @var array
     */
    _this.queries = [];

    /**
     * The data template definition
     *
     * @var object
     */
    _this.template = {};

    /**
     * The error object
     *
     * @var object
     */
    _this.error = {};
    return _this;
  }

  /**
   * Get the API uri definition
   *
   * @return string
   */


  _createClass(Collection, [{
    key: 'getHref',
    value: function getHref() {
      return this.href;
    }

    /**
     * Get the colleciton version number
     *
     * @return String
     */

  }, {
    key: 'getVersion',
    value: function getVersion() {
      return Collection.VERSION;
    }

    /**
     * Add link object to the collection
     *
     * @param object link The link object
     * @see Link
     * @return Collection
     */

  }, {
    key: 'addLink',
    value: function addLink(link) {
      this.links.push(link);

      return this;
    }

    /**
     * Get array of link strings
     *
     * @return array
     */

  }, {
    key: 'getLinks',
    value: function getLinks() {
      return this.links;
    }

    /**
     * Add item object to the collection
     *
     * @param object item The item object
     * @see Item
     * @return Collection
     */

  }, {
    key: 'addItem',
    value: function addItem(item) {
      this.items.push(item);

      return this;
    }

    /**
     * Get an item instance
     *
     * @param String url - The item url
     * @return Item
     */

  }, {
    key: 'getItem',
    value: function getItem(url) {
      return new _Item2.default(url);
    }

    /**
     * Get array of item strings
     *
     * @return array
     */

  }, {
    key: 'getItems',
    value: function getItems() {
      return this.items;
    }

    /**
     * Add query object to the collection
     *
     * @param object query The query object
     * @see Query
     * @return Collection
     */

  }, {
    key: 'addQuery',
    value: function addQuery(query) {
      this.queries.push(query);

      return this;
    }

    /**
     * Get an query instance
     *
     * @param String url - The item url
     * @return Query
     */

  }, {
    key: 'getQuery',
    value: function getQuery() {
      return new _Query2.default();
    }

    /**
     * Get array of query objects
     *
     * @return array
     */

  }, {
    key: 'getQueries',
    value: function getQueries() {
      return this.queries;
    }

    /**
     * Set the template object
     *
     * @param Template template The template object
     * @see Template
     * @return Collection
     */

  }, {
    key: 'setTemplate',
    value: function setTemplate(template) {
      this.template = template;
    }

    /**
     * Get the template object
     *
     * @return Template
     */

  }, {
    key: 'getTemplate',
    value: function getTemplate() {
      return this.template;
    }

    /**
     * Set the error object
     *
     * @param Error error The error object
     * @see error
     * @return Collection
     */

  }, {
    key: 'setError',
    value: function setError(error) {
      this.error = error;
    }

    /**
     * Get the error object
     *
     * @return error
     */

  }, {
    key: 'getError',
    value: function getError() {
      return this.error;
    }

    /**
     * Get compiled json object
     *
     * @return Object
     */

  }, {
    key: 'getJson',
    value: function getJson() {
      // create the collection
      var collection = {};
      collection.version = Collection.VERSION;
      collection.href = this.href;

      // add the links
      if (this.getLinks().length > 0) {
        collection.links = [];
        this.getLinks().forEach(function (link) {
          collection.links.push(link.getJson());
        });
      }

      // add the items
      if (this.getItems().length > 0) {
        collection.items = [];
        this.getItems().forEach(function (item) {
          collection.items.push(item.getJson());
        });
      }

      // add the querys
      if (this.getQueries().length > 0) {
        collection.queries = [];
        this.getQueries().forEach(function (query) {
          collection.queries.push(query.getJson());
        });
      }

      // add template
      if (Object.keys(this.getTemplate()).length > 0) {
        collection.template = this.getTemplate().getJson();
      }

      // add error
      if (Object.keys(this.getError()).length > 0) {
        collection.error = this.getError().getJson();
      }

      return { collection: collection };
    }

    /**
     * Post template contents to the server
     *
     * @return Promise
     */

  }, {
    key: 'post',
    value: function post() {
      return this.dispatch('post');
    }

    /**
     * Put template contents to the server
     *
     * @return Promise
     */

  }, {
    key: 'put',
    value: function put() {
      return this.dispatch('put');
    }

    /**
     * Send template contents to the server and get new collection
     *
     * @return Promise
     */

  }, {
    key: 'dispatch',
    value: function dispatch(method) {
      var _this2 = this;

      // create the template string
      var templateData = {};
      templateData.template = this.getTemplate().getJson();
      var templateString = JSON.stringify(templateData);

      // dispatch
      switch (method) {
        case 'put':
        case 'post':
          return new Promise(function (resolve, reject) {
            (0, _axios2.default)({
              method: method,
              url: _this2.getHref(),
              headers: { 'Content-Type': 'application/vnd.collection+json' },
              data: templateString
            }).then(function (response) {
              return resolve(Collection.getByObject(response.data));
            }).catch(function (error) {
              return reject(error);
            });
          });
          break;
        default:
          throw new _Error2.default("Method type: " + method + " not found");
      }
    }
  }]);

  return Collection;
}(_Entity3.default);

exports.default = Collection;