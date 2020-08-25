"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BackgroundCircle = exports.ProgressCircle = exports.Title = exports.CircularProgressBarContainer = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var defaultTheme = _interopRequireWildcard(require("../../style/theme"));

var _utils = require("../../utils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  fill: none;\n  stroke: ", ";\n  stroke-width: ", ";\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  stroke-dasharray: ", ";\n  stroke-dashoffset: ", ";\n  stroke: ", ";\n  stroke-width: ", ";\n  stroke-linecap: round;\n  fill: none;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  padding: ", "\n  font-size: ", ";\n  font-weight: ", ";\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  display: inline-block;\n  color: ", ";\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var CircularProgressBarContainer = _styledComponents["default"].div(_templateObject(), (0, _utils.getThemePropSelector)("textPrimary"));

exports.CircularProgressBarContainer = CircularProgressBarContainer;

var Title = _styledComponents["default"].span(_templateObject2(), defaultTheme.padding.small, defaultTheme.fontSize.large, defaultTheme.fontWeight.bold);

exports.Title = Title;

var ProgressCircle = _styledComponents["default"].circle(_templateObject3(), function (_ref) {
  var circumference = _ref.circumference;
  return circumference;
}, function (_ref2) {
  var percent = _ref2.percent,
      circumference = _ref2.circumference;
  return (100 - percent) / 100 * circumference;
}, function (props) {
  return props.color || (0, _utils.getTheme)(props).healthyLight;
}, function (props) {
  return props.strokeWidth;
});

exports.ProgressCircle = ProgressCircle;

var BackgroundCircle = _styledComponents["default"].circle(_templateObject4(), function (props) {
  return props.backgroundColor || (0, _utils.getTheme)(props).primaryDark2;
}, function (props) {
  return props.strokeWidth;
});

exports.BackgroundCircle = BackgroundCircle;