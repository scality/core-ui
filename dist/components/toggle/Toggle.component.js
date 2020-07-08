"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var defaultTheme = _interopRequireWildcard(require("../../style/theme"));

var _utils = require("../../utils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  font-size: ", ";\n  color: ", ";\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n      .sc-slider {\n        position: absolute;\n        cursor: pointer;\n        top: 10px;\n        left: 0;\n        right: 0;\n        background-color: ", ";\n        transition: 0.5s;\n        height: 4px;\n        border-radius: 4px;\n\n        &:hover {\n          &:before {\n            box-shadow: 0 0 3px ", ";\n          }\n        }\n      }\n\n      .sc-slider:before {\n        position: absolute;\n        content: \"\";\n        height: 24px;\n        width: 24px;\n        top: -10px;\n        background-color: ", ";\n        transition: 0.5s;\n        border-radius: 50%;\n      }\n\n      input:checked + .sc-slider {\n        background-color: ", ";\n        &:hover {\n          &:before {\n            box-shadow: 0 0 3px ", ";\n          }\n        }\n      }\n\n      input:checked + .sc-slider:before {\n        transform: translateX(26px);\n        background-color: ", ";\n      }\n    "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  position: relative;\n  display: inline-block;\n  width: 50px;\n  height: 24px;\n  margin-right: ", ";\n\n  input {\n    opacity: 0;\n    width: 0;\n    height: 0;\n  }\n\n  ", "\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  align-items: center;\n  position: relative;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var ToggleContainer = _styledComponents["default"].div(_templateObject());

var Switch = _styledComponents["default"].label(_templateObject2(), defaultTheme.padding.small, function (props) {
  var _getTheme = (0, _utils.getTheme)(props),
      secondary = _getTheme.secondary;

  return (0, _styledComponents.css)(_templateObject3(), defaultTheme.grayLight, defaultTheme.grayLight, defaultTheme.grayLight, secondary, secondary, secondary);
});

var StyledSwitchLabel = _styledComponents["default"].span(_templateObject4(), defaultTheme.fontSize.large, (0, _utils.getThemePropSelector)("textPrimary"));

function ToggleSwitch(_ref) {
  var toggle = _ref.toggle,
      label = _ref.label,
      onChange = _ref.onChange,
      rest = _objectWithoutProperties(_ref, ["toggle", "label", "onChange"]);

  return _react["default"].createElement(ToggleContainer, {
    className: "sc-toggle"
  }, _react["default"].createElement(Switch, null, _react["default"].createElement("input", _extends({
    type: "checkbox",
    checked: toggle,
    onChange: onChange
  }, rest)), _react["default"].createElement("span", {
    className: "sc-slider"
  })), _react["default"].createElement(StyledSwitchLabel, {
    className: "text"
  }, label));
}

var _default = ToggleSwitch;
exports["default"] = _default;