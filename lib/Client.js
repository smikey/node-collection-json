'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Collection = require('./Collection');

var _Collection2 = _interopRequireDefault(_Collection);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class: Client
 *
 * @author S. Fleming <npm@int5.net>
 * @since Mon Aug 14 16:47:09 CEST 2017
 */
var Client = function () {
  _createClass(Client, null, [{
    key: 'API',

    /**
     * The API type
     *
     * @return string
     */
    get: function get() {
      return "api";
    }

    /**
     * The JSON type
     *
     * @return string
     */

  }, {
    key: 'JSON',
    get: function get() {
      return "json";
    }

    /**
     * The class constructor
     *
     * @param {mixed} resource The resource url or collection object
     * @param {String} type The type of resource
     */

  }]);

  function Client(resource) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Client.API;

    _classCallCheck(this, Client);

    /**
     * The main collection object
     */
    this.collection = null;

    /**
     * The resource address
     */
    this.resource = null;

    switch (type) {
      case Client.JSON:
        this.collection = resource;
        this.resource = this.collection.getHref();
        break;
      default:
      case Client.API:
        this.resource = resource;
        break;
    }
  }

  /**
   * Call the API and get collection object
   *
   * @return Promise
   */


  _createClass(Client, [{
    key: 'getCollectionByResource',
    value: function getCollectionByResource(resource) {
      return new Promise(function (resolve, reject) {
        (0, _request2.default)({
          uri: resource,
          method: "GET",
          timeout: 10000,
          followRedirect: true,
          maxRedirects: 10
        }, function (error, response, body) {
          if (error !== null) {
            return reject(error);
          } else {

            // convert string to object and resolve
            return resolve(_Collection2.default.getByObject(JSON.parse(body)));
          }
        });
      });
    }

    /**
     * Get the collection
     *
     * @return Collection
     */

  }, {
    key: 'getCollection',
    value: function getCollection() {
      var _this = this;

      if (this.collection === null) {
        return this.getCollectionByResource(this.resource);
      } else {
        return new Promise(function (resolve, reject) {
          resolve(_this.collection);
        });
      }
    }
  }]);

  return Client;
}();

exports.default = Client;