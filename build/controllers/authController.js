"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

_dotenv["default"].config();
/**
 * Validates user
 * @class ValidUser
 */


var ValidateUser =
/*#__PURE__*/
function () {
  function ValidateUser() {
    _classCallCheck(this, ValidateUser);
  }

  _createClass(ValidateUser, null, [{
    key: "hashPassword",

    /**
       * @static
       * @description this function hashes a password
       * @param {string} password password entered by user
       * @returns the hashed password
       * @memberof ValidateUser
       */
    value: function hashPassword(password) {
      var salt = _bcryptjs["default"].genSaltSync(10);

      var hash = _bcryptjs["default"].hashSync(password, salt);

      return hash;
    }
    /**
       * @static
       * @description this function compares password input to user password
       * @param {string} password password entered by user
       * @param {string} hash hashed user password
       * @returns Boolean value
       * @memberof ValidateUser
       */

  }, {
    key: "comparePassword",
    value: function comparePassword(password, hash) {
      return _bcryptjs["default"].compareSync(password, hash);
    }
    /**
       * @static
       * @description this function generates token for user
       * @param {Number} id user id
       * @returns generated token
       * @memberof ValidateUser
       */

  }, {
    key: "generateToken",
    value: function generateToken(user) {
      var token = _jsonwebtoken["default"].sign({
        user: user
      }, process.env.SECRET, {
        expiresIn: '30d'
      });

      return token;
    }
  }]);

  return ValidateUser;
}();

var _default = ValidateUser;
exports["default"] = _default;