'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Collection = require('./Collection');

var _Collection2 = _interopRequireDefault(_Collection);

var _Entity2 = require('./Entity');

var _Entity3 = _interopRequireDefault(_Entity2);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Creates a valid collection+json link object
 *
 * @author S. Fleming <npm@int5.net>
 * @since Tue Jul 25 11:07:32 CEST 2017
 *
 */
var Link = function (_Entity) {
  _inherits(Link, _Entity);

  /**
   * The class constructor
   *
   * @param string href The link uri
   * @param string rel The relational element
   */
  function Link(href, rel) {
    var render = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    _classCallCheck(this, Link);

    var _this = _possibleConstructorReturn(this, (Link.__proto__ || Object.getPrototypeOf(Link)).call(this));

    _this.setHref(href);
    _this.setRel(rel);
    _this.setRender(render);
    _this.setPrompt('');
    return _this;
  }

  /**
   * Get link object by json data object
   *
   * @todo - finish this
   * @param {Object} json The JSON object
   * @return Link
   */


  _createClass(Link, [{
    key: 'getHref',


    /**
     * Get the link string
     *
     * @return string
     */
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
     * Get the link string
     *
     * @return string
     */

  }, {
    key: 'getPrompt',
    value: function getPrompt() {
      return this.prompt;
    }

    /**
     * Set the link string
     *
     * @param string link The link uri
     * @return Link
     */

  }, {
    key: 'setPrompt',
    value: function setPrompt(prompt) {
      this.prompt = prompt;

      return this;
    }

    /**
     * Get the render string
     *
     * @return string
     */

  }, {
    key: 'getRender',
    value: function getRender() {
      return this.render;
    }

    /**
     * Set the render string
     *
     * @param string render The render type string
     * @return Link
     */

  }, {
    key: 'setRender',
    value: function setRender(render) {
      this.render = render;

      return this;
    }

    /**
     * Follow a link and return the collection object
     *
     * @return Collection
     */

  }, {
    key: 'follow',
    value: function follow() {
      var _this2 = this;

      return new Promise(function (resolve, reject) {

        // get the url
        (0, _request2.default)({
          uri: _this2.getHref(),
          method: "GET",
          timeout: 10000,
          followRedirect: true,
          maxRedirects: 10
        }, function (error, response, body) {
          if (error !== null) {
            return reject(error);
          } else {
            return resolve(_Collection2.default.getByObject(JSON.parse(body)));
          }
        });
      });
    }

    /**
     * Get compiled json object
     *
     * @return Object
     */

  }, {
    key: 'getJson',
    value: function getJson() {
      var link = {};
      if (this.href) {
        link.href = this.getHref();
      }
      if (this.rel) {
        link.rel = this.getRel();
      }
      if (this.render) {
        link.render = this.getRender();
      }
      if (this.prompt) {
        link.prompt = this.getPrompt();
      }

      return link;
    }
  }], [{
    key: 'getByObject',
    value: function getByObject(json) {
      //check the href
      var hrefString = Link.getObjectValueByKey(json, "href");
      if (hrefString === undefined) {
        throw new CollectionError('link.href String undefined');
      }

      //check the rel
      var relString = Link.getObjectValueByKey(json, "rel");
      if (relString === undefined) {
        throw new CollectionError('link.rel String undefined');
      }

      //check the render
      var renderString = Link.getObjectValueByKey(json, "render");

      var link = new Link(hrefString, relString, renderString);

      //check the prompt
      var promptString = Link.getObjectValueByKey(json, "prompt");
      if (promptString !== undefined) {
        link.setPrompt(promptString);
      }

      return link;
    }
  }]);

  return Link;
}(_Entity3.default);

exports.default = Link;