"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _CircularProgressBarComponent = require("./CircularProgressBar.component.style");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function CircularProgressBar(_ref) {
  var percent = _ref.percent,
      radius = _ref.radius,
      _ref$strokeWidth = _ref.strokeWidth,
      strokeWidth = _ref$strokeWidth === void 0 ? 10 : _ref$strokeWidth,
      title = _ref.title,
      color = _ref.color,
      backgroundColor = _ref.backgroundColor,
      children = _ref.children,
      rest = _objectWithoutProperties(_ref, ["percent", "radius", "strokeWidth", "title", "color", "backgroundColor", "children"]);

  var centerPointCoordinate = strokeWidth / 2 + radius;
  var svgSize = centerPointCoordinate * 2;
  var CIRCUMFERENCE = Math.PI * (radius * 2);
  return _react["default"].createElement(_CircularProgressBarComponent.CircularProgressBarContainer, _extends({
    className: "sc-circularprogressbar"
  }, rest), title && _react["default"].createElement(_CircularProgressBarComponent.Title, null, title), _react["default"].createElement("svg", {
    width: svgSize,
    height: svgSize
  }, _react["default"].createElement(_CircularProgressBarComponent.BackgroundCircle, {
    cx: centerPointCoordinate,
    cy: centerPointCoordinate,
    backgroundColor: backgroundColor,
    r: radius,
    strokeWidth: strokeWidth
  }), _react["default"].createElement(_CircularProgressBarComponent.ProgressCircle, {
    percent: percent,
    color: color,
    circumference: CIRCUMFERENCE,
    cx: centerPointCoordinate,
    cy: centerPointCoordinate,
    r: radius,
    strokeWidth: strokeWidth,
    transform: "rotate(-90 ".concat(centerPointCoordinate, "  ").concat(centerPointCoordinate, ")") // To start at 0 o'clock

  }), children));
}

var _default = CircularProgressBar;
exports["default"] = _default;