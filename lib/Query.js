'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Entity2 = require('./Entity');

var _Entity3 = _interopRequireDefault(_Entity2);

var _Data = require('./Data');

var _Data2 = _interopRequireDefault(_Data);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Creates a valid collection+json query object
 *
 * @author S. Fleming <npm@int5.net>
 * @since Tue Jul 25 11:07:32 CEST 2017
 */
var Query = function (_Entity) {
  _inherits(Query, _Entity);

  _createClass(Query, null, [{
    key: 'getByObject',

    /**
     * Get query object by json data object
     *
     * @todo - finish this
     * @param {Object} json The JSON object
     * @return query
     */
    value: function getByObject(json) {
      //check the href
      var hrefString = Query.getObjectValueByKey(json, "href");
      if (hrefString === undefined) {
        throw new CollectionError('query.href String undefined');
      }

      //check the rel
      var relString = Query.getObjectValueByKey(json, "rel");
      if (relString === undefined) {
        throw new CollectionError('query.rel String undefined');
      }

      //check the prompt
      var promptString = Query.getObjectValueByKey(json, "prompt");

      // init the object
      var query = new Query(hrefString, relString, promptString);

      // check the data object
      var datasObject = Query.getObjectValueByKey(json, "data");
      if (Query.isArray(datasObject)) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = datasObject[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var dataObject = _step.value;


            // add the data
            try {
              var data = _Data2.default.getByObject(dataObject);
              query.addData(data);
            } catch (error) {
              // skip this data
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

      return query;
    }
    /**
     * The class constructor
     *
     */

  }]);

  function Query(href, rel) {
    var prompt = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    _classCallCheck(this, Query);

    var _this = _possibleConstructorReturn(this, (Query.__proto__ || Object.getPrototypeOf(Query)).call(this));

    _this.setHref(href);
    _this.setRel(rel);
    _this.setPrompt(prompt);

    /**
     * The data object
     *
     * @var array
     */
    _this.data = [];
    return _this;
  }

  /**
   * Add data object to the collection
   *
   * @param object data The data object
   * @see Data
   * @return Collection
   */


  _createClass(Query, [{
    key: 'addData',
    value: function addData(data) {
      this.data.push(data);

      return this;
    }

    /**
     * Get array of data strings
     *
     * @return array
     */

  }, {
    key: 'getData',
    value: function getData() {
      return this.data;
    }

    /**
     * Get the link string
     *
     * @return string
     */

  }, {
    key: 'getHref',
    value: function getHref() {
      return this.href;
    }

    /**
     * Set the link string
     *
     * @param string link The link uri
     * @return Link
     */

  }, {
    key: 'setHref',
    value: function setHref(href) {
      this.href = href;

      return this;
    }

    /**
     * Get the rel string
     *
     * @return string
     */

  }, {
    key: 'getRel',
    value: function getRel() {
      return this.rel;
    }

    /**
     * Set the rel string
     *
     * @param string rel The rel element
     * @return rel
     */

  }, {
    key: 'setRel',
    value: function setRel(rel) {
      this.rel = rel;

      return this;
    }

    /**
     * Get the prompt string
     *
     * @return string
     */

  }, {
    key: 'getPrompt',
    value: function getPrompt() {
      return this.prompt;
    }

    /**
     * Set the prompt string
     *
     * @param string prompt The prompt string
     * @return data
     */

  }, {
    key: 'setPrompt',
    value: function setPrompt(prompt) {
      this.prompt = prompt;

      return this;
    }

    /**
     * Get compiled json object
     *
     * @return Object
     */

  }, {
    key: 'getJson',
    value: function getJson() {
      // push the data
      var query = {};
      if (this.href) {
        query.href = this.getHref();
      }
      if (this.rel) {
        query.rel = this.getRel();
      }
      if (this.prompt) {
        query.prompt = this.getPrompt();
      }

      if (this.getData().length > 0) {
        query.data = [];
        this.getData().forEach(function (data) {
          query.data.push(data.getJson());
        });
      }

      return query;
    }
  }]);

  return Query;
}(_Entity3.default);

exports.default = Query;