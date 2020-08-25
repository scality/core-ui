"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputWrapper = exports.InputErrorMessage = exports.LabelStyle = exports.InputContainer = void 0;

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var defaultTheme = _interopRequireWildcard(require("../../style/theme"));

var _utils = require("../../utils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  color: ", ";\n  margin: ", " 0;\n  font-size: ", ";\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  align-self: flex-start;\n  padding: ", ";\n  font-size: ", ";\n  color: ", ";\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n        @keyframes shake {\n          from,\n          to {\n            transform: translate3d(0, 0, 0);\n          }\n\n          10%,\n          30%,\n          50%,\n          70%,\n          90% {\n            transform: translate3d(-5px, 0, 0);\n          }\n\n          20%,\n          40%,\n          60%,\n          80% {\n            transform: translate3d(5px, 0, 0);\n          }\n        }\n        animation-duration: 1s;\n        animation-fill-mode: both;\n        animation-name: shake;\n      "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n        background-color: ", ";\n        color: ", ";\n        border: 1px solid ", ";\n      "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  display: inline-flex;\n  .sc-checkbox {\n    margin: ", " 0;\n  }\n\n  .sc-select {\n    width: 200px;\n  }\n\n  input.sc-input-type {\n    ", ";\n    padding: 8px ", ";\n    font-size: ", ";\n    display: block;\n    border-radius: 4px;\n  }\n\n  input.sc-input-type:focus {\n    border-color: ", ";\n    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),\n      0 0 0 1px rgba(0, 126, 255, 0.1);\n    outline: none;\n  }\n\n  ", ";\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var InputContainer = _styledComponents["default"].div(_templateObject(), defaultTheme.padding.smaller, function (props) {
  var _getTheme = (0, _utils.getTheme)(props),
      primary = _getTheme.primary,
      danger = _getTheme.danger,
      textSecondary = _getTheme.textSecondary,
      border = _getTheme.border;

  return (0, _styledComponents.css)(_templateObject2(), primary, textSecondary, props.error ? danger : border);
}, defaultTheme.padding.small, defaultTheme.fontSize.base, (0, _utils.getThemePropSelector)("secondary"), function (props) {
  if (props.error) {
    return (0, _styledComponents.css)(_templateObject3());
  }
});

exports.InputContainer = InputContainer;

var LabelStyle = _styledComponents["default"].label(_templateObject4(), defaultTheme.padding.small, defaultTheme.fontSize.base, (0, _utils.getThemePropSelector)("textPrimary"));

exports.LabelStyle = LabelStyle;

var InputErrorMessage = _styledComponents["default"].span(_templateObject5(), (0, _utils.getThemePropSelector)("danger"), defaultTheme.padding.smaller, defaultTheme.fontSize.small);

exports.InputErrorMessage = InputErrorMessage;

var InputWrapper = _styledComponents["default"].div(_templateObject6());

exports.InputWrapper = InputWrapper;