"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _Trips = _interopRequireDefault(require("../controllers/Trips"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import CreateTripMiddleware from '../middleware/validators/CreateTripMiddleware';
var tripsRouter = _express["default"].Router();

tripsRouter.get('/', _Trips["default"].getTrips);
tripsRouter.post('/', _Trips["default"].createTrips);
var _default = tripsRouter;
exports["default"] = _default;