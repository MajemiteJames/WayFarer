"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _db = _interopRequireDefault(require("../models/db"));

var _authController = _interopRequireDefault(require("./authController"));

require("@babel/polyfill");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @description This class handles user requests
 * @class User
 */
var User =
/*#__PURE__*/
function () {
  function User() {
    _classCallCheck(this, User);
  }

  _createClass(User, null, [{
    key: "signUp",

    /**
       * @static
       * @description this function creates a new user
       * @param {object} request the request body
       * @param {object} response the response body
       * @returns response
       * @memberof User
       */
    value: function () {
      var _signUp = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(request, response) {
        var _request$body, firstName, lastName, password, email, hashedPassword, text, values, _ref, rows, token;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _request$body = request.body, firstName = _request$body.firstName, lastName = _request$body.lastName, password = _request$body.password;
                email = request.body.email;
                email = email.toLowerCase();
                hashedPassword = _authController["default"].hashPassword(password);
                text = "INSERT INTO users(firstname, lastname, email, password, is_admin)\n      VALUES($1, $2, $3, $4, $5) returning *;";
                values = [firstName, lastName, email, hashedPassword, false];
                _context.prev = 6;
                _context.next = 9;
                return _db["default"].query(text, values);

              case 9:
                _ref = _context.sent;
                rows = _ref.rows;
                token = _authController["default"].generateToken(rows[0].id);
                return _context.abrupt("return", response.status(201).json({
                  status: 201,
                  data: [{
                    token: token,
                    id: rows[0].id,
                    firstName: rows[0].firstname,
                    lastName: rows[0].lastname,
                    email: rows[0].email,
                    is_admin: rows[0].is_admin
                  }]
                }));

              case 15:
                _context.prev = 15;
                _context.t0 = _context["catch"](6);

                if (!(_context.t0.routine === '_bt_check_unique')) {
                  _context.next = 19;
                  break;
                }

                return _context.abrupt("return", response.status(400).json({
                  status: 400,
                  error: 'User with that email already exists'
                }));

              case 19:
                return _context.abrupt("return", response.status(400).json({
                  status: 400,
                  error: _context.t0.message
                }));

              case 20:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[6, 15]]);
      }));

      function signUp(_x, _x2) {
        return _signUp.apply(this, arguments);
      }

      return signUp;
    }()
    /**
       * @static
       * @description this function signs in a user
       * @param {object} request the request body
       * @param {object} response the response body
       * @returns response
       * @memberof User
       */

  }, {
    key: "signIn",
    value: function () {
      var _signIn = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(request, response) {
        var password, text, passwordText, email, _ref2, rows, hashedPasswordRow, token;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                password = request.body.password;
                text = 'SELECT id, firstname, lastname, email, is_admin FROM users WHERE email = $1;';
                passwordText = 'SELECT password FROM users WHERE email = $1;';
                email = request.body.email;
                email = email.toLowerCase();
                _context2.prev = 5;
                _context2.next = 8;
                return _db["default"].query(text, [email]);

              case 8:
                _ref2 = _context2.sent;
                rows = _ref2.rows;
                _context2.next = 12;
                return _db["default"].query(passwordText, [email]);

              case 12:
                hashedPasswordRow = _context2.sent;
                token = _authController["default"].generateToken(rows[0]);

                if (rows[0]) {
                  _context2.next = 16;
                  break;
                }

                return _context2.abrupt("return", response.status(404).json({
                  status: 404,
                  error: 'User with that email does not exist'
                }));

              case 16:
                if (_authController["default"].comparePassword(password, hashedPasswordRow.rows[0].password)) {
                  _context2.next = 18;
                  break;
                }

                return _context2.abrupt("return", response.status(401).json({
                  status: 401,
                  error: 'Incorrect password'
                }));

              case 18:
                return _context2.abrupt("return", response.status(200).json({
                  status: 200,
                  data: [{
                    token: token,
                    id: rows[0].id,
                    firstName: rows[0].firstname,
                    lastName: rows[0].lastname,
                    email: rows[0].email,
                    avatar: rows[0].avatar
                  }]
                }));

              case 21:
                _context2.prev = 21;
                _context2.t0 = _context2["catch"](5);
                return _context2.abrupt("return", response.status(400).json({
                  status: 400,
                  error: _context2.t0.message
                }));

              case 24:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[5, 21]]);
      }));

      function signIn(_x3, _x4) {
        return _signIn.apply(this, arguments);
      }

      return signIn;
    }()
  }]);

  return User;
}();

var _default = User;
exports["default"] = _default;