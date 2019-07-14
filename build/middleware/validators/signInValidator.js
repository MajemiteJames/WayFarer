"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _check = require("express-validator/check");

var _errorMessages = _interopRequireDefault(require("./errorMessages"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var userInput = [(0, _check.check)('email').isEmail().trim().withMessage('Input a valid email address'), (0, _check.check)('email').not().isEmpty().withMessage('Email cannot be empty'), (0, _check.check)('password').not().isEmpty().withMessage('Password cannot be empty'), _errorMessages["default"]];
var _default = userInput;
exports["default"] = _default;