"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _VegaChartComponent = _interopRequireDefault(require("../vegachart/VegaChart.component.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function StatusBar(_ref) {
  var id = _ref.id,
      _ref$width = _ref.width,
      width = _ref$width === void 0 ? 700 : _ref$width,
      _ref$height = _ref.height,
      height = _ref$height === void 0 ? 25 : _ref$height,
      data = _ref.data,
      title = _ref.title,
      transform = _ref.transform,
      xAxis = _ref.xAxis,
      yAxis = _ref.yAxis,
      color = _ref.color,
      tooltip = _ref.tooltip,
      href = _ref.href,
      text = _ref.text;
  var spec = {
    title: title,
    width: width,
    height: height,
    data: {
      values: data
    },
    layer: [{
      mark: {
        type: "rect",
        tooltip: true,
        cornerRadius: 1
      },
      selection: {
        highlight: {
          type: "single",
          on: "mouseover"
        }
      },
      transform: transform,
      encoding: {
        x: xAxis,
        y: yAxis,
        color: color,
        // Tooltip Channel
        tooltip: tooltip,
        // Hyperlink Channel
        href: href,
        // Highlight the focused time-period
        opacity: {
          condition: {
            selection: "highlight",
            value: 1
          },
          value: 0.6
        }
      }
    }, // Text on the top right
    {
      mark: {
        type: "text",
        dy: -25,
        color: text && text.color
      },
      encoding: {
        x: xAxis,
        text: text
      }
    }]
  };
  return _react["default"].createElement(_VegaChartComponent["default"], {
    className: "sc-statusbar",
    id: id,
    spec: spec
  });
}

var _default = StatusBar;
exports["default"] = _default;