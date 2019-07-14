"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _user = _interopRequireDefault(require("./user"));

var _trips = _interopRequireDefault(require("./trips"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
router.use('/auth', _user["default"]);
router.use('/trips', _trips["default"]);
var _default = router;
exports["default"] = _default;