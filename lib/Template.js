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
 * Creates a valid collection+json template object
 *
 * @author S. Fleming <npm@int5.net>
 * @since Tue Jul 25 11:07:32 CEST 2017
 */
var Template = function (_Entity) {
  _inherits(Template, _Entity);

  _createClass(Template, null, [{
    key: 'getByObject',

    /**
     * Get template object by json data object
     *
     * @param {Object} json The JSON object
     * @return template
     */
    value: function getByObject(json) {
      // init the template object
      var template = new Template();

      // check the datas object
      var datasObject = Template.getObjectValueByKey(json, "data");
      if (Template.isArray(datasObject)) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = datasObject[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var dataObject = _step.value;


            // add the data
            try {
              var data = _Data2.default.getByObject(dataObject);
              template.addData(data);
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

      return template;
    }

    /**
     * The class constructor
     *
     */

  }]);

  function Template() {
    _classCallCheck(this, Template);

    /**
     * The data object
     *
     * @var array
     */
    var _this = _possibleConstructorReturn(this, (Template.__proto__ || Object.getPrototypeOf(Template)).call(this));

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


  _createClass(Template, [{
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
     * Get compiled json object
     *
     * @return Object
     */

  }, {
    key: 'getJson',
    value: function getJson() {
      // push the data
      var template = {};
      template.data = [];
      this.getData().forEach(function (data) {
        template.data.push(data.getJson());
      });

      return template;
    }

    /**
     * Get database friendly Object
     *
     * @return Object
     */

  }, {
    key: 'getDatabaseObject',
    value: function getDatabaseObject() {
      var dbObject = {};
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.getData()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var data = _step2.value;

          dbObject[data.getName()] = data.getValue();
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

      return dbObject;
    }
  }]);

  return Template;
}(_Entity3.default);

exports.default = Template;