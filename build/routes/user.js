"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _User = _interopRequireDefault(require("../controllers/User"));

var _signUpValidator = _interopRequireDefault(require("../middleware/validators/signUpValidator"));

var _signInValidator = _interopRequireDefault(require("../middleware/validators/signInValidator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var userRouter = _express["default"].Router();

userRouter.post('/signup', _signUpValidator["default"], _User["default"].signUp);
userRouter.post('/signin', _signInValidator["default"], _User["default"].signIn);
var _default = userRouter;
exports["default"] = _default;