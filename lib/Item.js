'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Entity2 = require('./Entity');

var _Entity3 = _interopRequireDefault(_Entity2);

var _Data = require('./Data');

var _Data2 = _interopRequireDefault(_Data);

var _Link = require('./Link');

var _Link2 = _interopRequireDefault(_Link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Creates a valid collection+json item object
 *
 * @author S. Fleming <npm@int5.net>
 * @since Tue Jul 25 11:07:32 CEST 2017
 */
var Item = function (_Entity) {
  _inherits(Item, _Entity);

  _createClass(Item, null, [{
    key: 'getByObject',


    /**
     * Get item object by json data object
     *
     * @todo - finish this
     * @param {Object} json The JSON object
     * @return item
     */
    value: function getByObject(json) {
      //check the href
      var hrefString = Item.getObjectValueByKey(json, "href");
      if (hrefString === undefined) {
        throw new CollectionError('item.href String undefined');
      }

      // init the Item object
      var item = new Item(hrefString);

      // check the datas object
      var datasObject = Item.getObjectValueByKey(json, "data");
      if (Item.isArray(datasObject)) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = datasObject[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var dataObject = _step.value;


            // add the data
            try {
              var data = _Data2.default.getByObject(dataObject);
              item.addData(data);
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

      // check the links object
      var linksObject = Item.getObjectValueByKey(json, "links");
      if (Item.isArray(linksObject)) {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = linksObject[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var linkObject = _step2.value;


            // add the link
            try {
              var link = _Link2.default.getByObject(linkObject);
              item.addLink(link);
            } catch (error) {
              // skip this link
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

      return item;
    }

    /**
     * The class constructor
     *
     * @param string href The href uri
     */

  }]);

  function Item(href) {
    _classCallCheck(this, Item);

    var _this = _possibleConstructorReturn(this, (Item.__proto__ || Object.getPrototypeOf(Item)).call(this));

    _this.setHref(href);

    /**
     * The data object
     *
     * @var array
     */
    _this.data = [];

    /**
     * The items data array
     *
     * @var array
     */
    _this.items = [];

    /**
     * The links data array
     *
     * @var array
     */
    _this.links = [];
    return _this;
  }

  /**
   * Get the link string
   *
   * @return string
   */


  _createClass(Item, [{
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
     * Add data object to the collection
     *
     * @param object data The data object
     * @see Data
     * @return Collection
     */

  }, {
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
     * Get compiled json object
     *
     * @return Object
     */

  }, {
    key: 'getJson',
    value: function getJson() {
      var item = {};
      if (this.href) {
        item.href = this.href;
      }

      // push the data
      if (this.getData().length > 0) {
        item.data = [];
        this.getData().forEach(function (data) {
          item.data.push(data.getJson());
        });
      }

      // push the links
      if (this.getLinks().length > 0) {
        item.links = [];
        this.getLinks().forEach(function (link) {
          item.links.push(link.getJson());
        });
      }

      return item;
    }

    /**
     * Get a template object modeled on the data is defined in the object
     *
     * @return Template
     */

  }, {
    key: 'getTemplate',
    value: function getTemplate() {
      var template = new Template();
      template.addData();

      return template;
    }

    /**
     * Get a data value by the name key
     *
     * @param {String} name The name key to search by
     */

  }, {
    key: 'getDataValueByName',
    value: function getDataValueByName(name) {
      var foundData = null;
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this.getData()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var data = _step3.value;

          if (data.getName() === name) {
            foundData = data.getValue();
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

      return foundData;
    }
  }]);

  return Item;
}(_Entity3.default);

exports.default = Item;