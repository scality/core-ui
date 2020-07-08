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

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n      &:before {\n        content: \"\";\n        position: absolute;\n        left: 0;\n        top: 0;\n        width: 18px;\n        height: 18px;\n        border: 2px solid ", ";\n        background: ", ";\n        border-radius: 4px;\n      }\n      i {\n        position: absolute;\n        top: 3px;\n        left: 3px;\n        font-size: 16px;\n        color: ", ";\n      }\n\n      &:hover {\n        &:before {\n          border-color: ", ";\n        }\n      }\n    "]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n          cursor: pointer;\n        "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n          cursor: default;\n          opacity: 0.5;\n        "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  position: relative;\n  display: inline-block;\n  ", "\n\n  ", "\n\n  input {\n    opacity: 0;\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  font-size: ", ";\n  padding-left: ", ";\n  vertical-align: middle;\n  color: ", ";\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function Checkbox(_ref) {
  var disabled = _ref.disabled,
      checked = _ref.checked,
      label = _ref.label,
      value = _ref.value,
      onChange = _ref.onChange,
      rest = _objectWithoutProperties(_ref, ["disabled", "checked", "label", "value", "onChange"]);

  return _react["default"].createElement(StyledCheckbox, {
    checked: checked,
    disabled: disabled,
    className: "sc-checkbox"
  }, _react["default"].createElement("input", _extends({
    type: "checkbox",
    checked: checked,
    disabled: disabled,
    value: value,
    onChange: onChange
  }, rest)), _react["default"].createElement("i", {
    className: "fas fa-check"
  }), label && _react["default"].createElement(StyledCheckboxLabel, {
    className: "text"
  }, label));
}

var _default = Checkbox;
exports["default"] = _default;

var StyledCheckboxLabel = _styledComponents["default"].span(_templateObject(), defaultTheme.fontSize.large, defaultTheme.padding.base, (0, _utils.getThemePropSelector)("textPrimary"));

var StyledCheckbox = _styledComponents["default"].label(_templateObject2(), function (props) {
  return props.disabled ? (0, _styledComponents.css)(_templateObject3()) : (0, _styledComponents.css)(_templateObject4());
}, function (props) {
  var _getTheme = (0, _utils.getTheme)(props),
      primary = _getTheme.primary,
      border = _getTheme.border,
      secondary = _getTheme.secondary;

  var iconCheckedColor = props.checked || props.disabled ? secondary : "transparent";
  var checkBoxColor = props.checked || props.disabled ? secondary : border;
  return (0, _styledComponents.css)(_templateObject5(), checkBoxColor, primary, iconCheckedColor, secondary);
});