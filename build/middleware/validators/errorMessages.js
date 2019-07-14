"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _check = require("express-validator/check");

/**
 * @description this function displays error messages
 * @param {object} request the request body
 * @param {object} response the response body
 * @param {function} next passes the request to another function to be processed
 * @returns next
 */
var displayErrors = function displayErrors(request, response, next) {
  var messages = [];
  var errors = (0, _check.validationResult)(request);

  if (!errors.isEmpty()) {
    errors.array().forEach(function (err) {
      messages.push(err.msg);
    });
    return response.status(400).json({
      status: 400,
      errors: messages
    });
  }

  return next();
};

var _default = displayErrors;
exports["default"] = _default;