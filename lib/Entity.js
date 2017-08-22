"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Entity class. Used as an abstract class with helper methods that all Collection+JSON classes inherit.
 *
 * @author S. Fleming <npm@int5.net>
 * @since Tue Aug  8 15:15:35 CEST 2017
 */
var Entity = function () {
  function Entity() {
    _classCallCheck(this, Entity);
  }

  _createClass(Entity, [{
    key: "toString",


    /**
     * Output the collection to string format
     *
     * @return string
     */
    value: function toString() {
      return JSON.stringify(this.getJson());
    }

    /**
     * Get a link object by the rel name
     *
     * @param {String} name The rel name
     * @return Link
     */

  }, {
    key: "getLinkByRel",
    value: function getLinkByRel(rel) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        var link = null;

        // check the links object
        if (_this.links !== null && _this.links.length > 0) {
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = _this.links[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var _link = _step.value;

              if (_link.getRel() == rel) {
                return resolve(_link);
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

        return reject("No such link found rel: " + rel);
      });
    }

    /**
     * Helper method for getting an object value by key
     *
     * @param Object object the object to check
     * @param String key The key the chec
     * @return mixed
     */

  }], [{
    key: "getObjectValueByKey",
    value: function getObjectValueByKey(object, key) {
      var value = object[key];
      return value;
    }

    /**
     * Helper method to check if a variable is an array
     *
     * @param {array} variable The variable to check
     * @return boolean
     */

  }, {
    key: "isArray",
    value: function isArray(variable) {
      var result = false;
      if (Object.prototype.toString.call(variable) === '[object Array]') {
        result = true;
      }

      return result;
    }
  }]);

  return Entity;
}();

exports.default = Entity;