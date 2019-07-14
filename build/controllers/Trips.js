"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _db = _interopRequireDefault(require("../models/db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Displays, creates, updates or deletes an trip
 * @class Trips
 */
var Trips =
/*#__PURE__*/
function () {
  function Trips() {
    _classCallCheck(this, Trips);
  }

  _createClass(Trips, null, [{
    key: "getTrips",

    /**
     * @static
     * @description this function displays all bank accounts
     * @param {object} request
     * @param {object} response the response body
     * @returns response
     * @memberof Accounts
     */
    value: function () {
      var _getTrips = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(request, response) {
        var _ref, rows;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _db["default"].query('SELECT * FROM trips;');

              case 3:
                _ref = _context.sent;
                rows = _ref.rows;
                return _context.abrupt("return", response.status(200).json({
                  status: 200,
                  data: rows
                }));

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", response.status(400).json({
                  status: 400,
                  error: _context.t0.message
                }));

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 8]]);
      }));

      function getTrips(_x, _x2) {
        return _getTrips.apply(this, arguments);
      }

      return getTrips;
    }()
    /**
       * @static
       * @description this function creates a new trips
       * @param {object} request the request body
       * @param {object} response the response body
       * @returns response
       * @memberof Trips
       */

  }, {
    key: "createTrips",
    value: function () {
      var _createTrips = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(request, response) {
        var _request$body, bus_id, origin, destination, trip_date, fare, text, values, _ref2, rows;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _request$body = request.body, bus_id = _request$body.bus_id, origin = _request$body.origin, destination = _request$body.destination, trip_date = _request$body.trip_date, fare = _request$body.fare;
                text = "INSERT INTO trips( busId, origin, destination, trip_date, fare,)\n    VALUES($1, $2, $3, $4) returning *;";
                values = [bus_id, origin, destination, trip_date, fare];
                _context2.prev = 3;
                _context2.next = 6;
                return _db["default"].query(text, values);

              case 6:
                _ref2 = _context2.sent;
                rows = _ref2.rows;
                return _context2.abrupt("return", response.status(201).json({
                  status: 201,
                  data: [{
                    id: rows[0].id,
                    bus_id: bus_id,
                    origin: origin,
                    destination: destination,
                    trip_date: trip_date,
                    fare: fare
                  }]
                }));

              case 11:
                _context2.prev = 11;
                _context2.t0 = _context2["catch"](3);
                return _context2.abrupt("return", response.status(400).json({
                  status: 400,
                  error: _context2.t0.message
                }));

              case 14:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[3, 11]]);
      }));

      function createTrips(_x3, _x4) {
        return _createTrips.apply(this, arguments);
      }

      return createTrips;
    }()
  }]);

  return Trips;
}();

var _default = Trips;
exports["default"] = _default;