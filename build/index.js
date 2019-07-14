"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _index = _interopRequireDefault(require("./routes/index"));

require("@babel/polyfill");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])(); // Parse incoming requests data

app.use((0, _cors["default"])());
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
app.use('/api/v1/', _index["default"]);
var PORT = process.env.PORT || 5000;
app.get('/', function (req, res) {
  return res.status(200).json({
    status: 200,
    message: 'Welcome to WayFarer App!'
  });
});
app.all('*', function (req, res) {
  return res.status(404).json({
    status: 404,
    error: 'Endpoint does not exist'
  });
});
app.listen(PORT, function () {
  return console.log("Server running on port ".concat(PORT));
});
var _default = app;
exports["default"] = _default;