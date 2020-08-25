"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _VegaChartComponent = _interopRequireDefault(require("../vegachart/VegaChart.component.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function LineChart(_ref) {
  var id = _ref.id,
      data = _ref.data,
      xAxis = _ref.xAxis,
      yAxis = _ref.yAxis,
      color = _ref.color,
      _ref$tooltip = _ref.tooltip,
      tooltip = _ref$tooltip === void 0 ? false : _ref$tooltip,
      lineConfig = _ref.lineConfig,
      _ref$height = _ref.height,
      height = _ref$height === void 0 ? 300 : _ref$height,
      _ref$width = _ref.width,
      width = _ref$width === void 0 ? 1000 : _ref$width,
      _ref$displayTrendLine = _ref.displayTrendLine,
      displayTrendLine = _ref$displayTrendLine === void 0 ? false : _ref$displayTrendLine,
      rest = _objectWithoutProperties(_ref, ["id", "data", "xAxis", "yAxis", "color", "tooltip", "lineConfig", "height", "width", "displayTrendLine"]);

  // hardcode the trendline configuration for tooltip
  var trendline = {
    mark: "rule",
    selection: {
      index: {
        type: "single",
        on: "mousemove",
        encodings: ["x"],
        nearest: true
      }
    },
    encoding: {
      color: {
        condition: {
          selection: {
            not: "index"
          },
          value: "transparent"
        }
      }
    }
  };
  var lines = yAxis.map(function (y) {
    return {
      mark: _objectSpread({
        type: "line"
      }, lineConfig),
      encoding: {
        y: y
      }
    };
  });
  var currentTimeTrendline = {
    mark: {
      type: "rule",
      style: "ruleCurrentTime",
      color: "white",
      opacity: 0.2
    },
    encoding: {
      x: {
        value: width / 2
      },
      y: {
        value: height
      },
      y2: {
        value: 0
      }
    }
  };
  var topTrendline = {
    mark: {
      type: "rule",
      style: "ruleTop",
      color: "orange",
      opacity: 0.2
    },
    encoding: {
      y: {
        aggregate: "max",
        field: "capacity",
        type: "quantitative"
      },
      x: {
        value: 0
      },
      x2: {
        value: width
      }
    }
  };

  var spec = _objectSpread({
    data: {
      values: data
    },
    encoding: {
      x: xAxis,
      color: color,
      // To disable tooltips for a particular single view specification, you can set the "tooltip" property of a mark definition block to null.
      tooltip: tooltip ? [xAxis].concat(_toConsumableArray(yAxis)) : null
    },
    height: height,
    width: width,
    layer: _toConsumableArray(lines)
  }, rest);

  if (tooltip) {
    spec.layer.push(trendline);
  }

  if (displayTrendLine) {
    spec.layer.push(currentTimeTrendline);
    spec.layer.push(topTrendline);
  }

  return _react["default"].createElement(_VegaChartComponent["default"], {
    id: id,
    spec: spec
  });
}

var _default = LineChart;
exports["default"] = _default;