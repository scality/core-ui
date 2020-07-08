"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _VegaChartComponent = _interopRequireDefault(require("../vegachart/VegaChart.component.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function BarChart(_ref) {
  var id = _ref.id,
      data = _ref.data,
      xAxis = _ref.xAxis,
      yAxis = _ref.yAxis,
      color = _ref.color,
      width = _ref.width,
      barConfig = _ref.barConfig;
  var spec = {
    mark: _objectSpread({
      type: "bar"
    }, barConfig),
    width: width,
    data: {
      values: data
    },
    encoding: {
      x: xAxis,
      y: yAxis,
      color: color
    }
  };
  return _react["default"].createElement(_VegaChartComponent["default"], {
    id: id,
    spec: spec
  });
}

var _default = BarChart;
exports["default"] = _default;