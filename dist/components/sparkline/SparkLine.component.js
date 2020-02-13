"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _VegaChartComponent = _interopRequireDefault(require("../vegachart/VegaChart.component.js"));

var defaultTheme = _interopRequireWildcard(require("../../style/theme"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function SparkLine(_ref) {
  var id = _ref.id,
      title = _ref.title,
      _ref$width = _ref.width,
      width = _ref$width === void 0 ? 300 : _ref$width,
      _ref$height = _ref.height,
      height = _ref$height === void 0 ? 80 : _ref$height,
      data = _ref.data,
      xAxis = _ref.xAxis,
      yAxis = _ref.yAxis,
      row = _ref.row,
      lineConfig = _ref.lineConfig,
      sparkLineColor = _ref.sparkLineColor,
      _ref$upTrendColor = _ref.upTrendColor,
      upTrendColor = _ref$upTrendColor === void 0 ? defaultTheme.yellowOrange : _ref$upTrendColor,
      _ref$bottomTrendColor = _ref.bottomTrendColor,
      bottomTrendColor = _ref$bottomTrendColor === void 0 ? defaultTheme.green : _ref$bottomTrendColor;
  var spec = {
    title: {
      text: title
    },
    data: {
      values: data
    },
    facet: {
      row: row
    },
    spec: {
      width: width,
      height: height,
      layer: [// display the sparkline chart
      {
        mark: _objectSpread({
          type: "line"
        }, lineConfig),
        encoding: {
          x: xAxis,
          y: yAxis,
          color: {
            value: sparkLineColor
          }
        }
      }, // display the label to specify the max/min data
      {
        mark: {
          type: "text",
          style: "labelMin",
          align: "bottom",
          dy: height / 2,
          dx: width / 2 + 10
        },
        encoding: {
          text: {
            aggregate: "min",
            field: "y",
            type: "quantitative"
          }
        }
      }, {
        mark: {
          type: "text",
          style: "labelMax",
          align: "top",
          dy: -(height / 2),
          dx: width / 2 + 10
        },
        encoding: {
          text: {
            aggregate: "max",
            field: "y",
            type: "quantitative"
          }
        }
      }, // display the up and bottom trend line
      {
        mark: {
          type: "rule",
          style: "ruleMaxEnd",
          color: upTrendColor
        },
        encoding: {
          y: {
            aggregate: "max",
            field: "y",
            type: "quantitative"
          },
          x: {
            value: width - 15
          },
          x2: {
            value: width
          }
        }
      }, {
        mark: {
          type: "rule",
          style: "ruleMaxStart",
          color: upTrendColor,
          opacity: 0.1
        },
        encoding: {
          y: {
            aggregate: "max",
            field: "y",
            type: "quantitative"
          },
          x: {
            value: 0
          },
          x2: {
            value: width - 15
          }
        }
      }, {
        mark: {
          type: "rule",
          style: "ruleMinEnd",
          color: bottomTrendColor
        },
        encoding: {
          y: {
            value: height
          },
          x: {
            value: width - 15
          },
          x2: {
            value: width
          }
        }
      }, {
        mark: {
          type: "rule",
          style: "ruleMinStart",
          color: bottomTrendColor,
          opacity: 0.1
        },
        encoding: {
          y: {
            value: height
          },
          x: {
            value: 0
          },
          x2: {
            value: width - 15
          }
        }
      }]
    }
  };
  return _react["default"].createElement(_VegaChartComponent["default"], {
    className: "sc-sparkline",
    id: id,
    spec: spec
  });
}

var _default = SparkLine;
exports["default"] = _default;