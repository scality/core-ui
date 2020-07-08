"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactSelect = _interopRequireDefault(require("react-select"));

var defaultTheme = _interopRequireWildcard(require("../../style/theme"));

var _utils = require("../../utils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  .sc-select__control {\n    background-color: ", ";\n    border-radius: 4px;\n    border: 1px solid ", ";\n    height: auto;\n\n    .sc-select__placeholder,\n    .sc-select__single-value {\n      color: ", ";\n    }\n    &.sc-select__control--is-focused {\n      border-color: ", ";\n      box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),\n        0 0 0 1px rgba(0, 126, 255, 0.1);\n      outline: none;\n    }\n    .sc-select__indicator {\n      color: ", ";\n      &.sc-select__dropdown-indicator:hover {\n        color: ", ";\n      }\n      &.sc-select__clear-indicator:hover {\n        color: ", ";\n      }\n    }\n    .sc-select__multi-value__remove {\n      border-radius: 0;\n      color: ", ";\n      background-color: ", ";\n      &:hover {\n        color: ", ";\n      }\n    }\n    .sc-select__multi-value__label {\n      border-radius: 0;\n      color: ", ";\n      background-color: ", ";\n      vertical-align: initial;\n    }\n  }\n  .sc-select__menu {\n    background-color: ", ";\n    color: ", ";\n    border: 1px solid ", ";\n    box-sizing: border-box;\n    overflow: hidden;\n    z-index: ", ";\n    .sc-select__option {\n      &.sc-select__option--is-focused {\n        background-color: ", ";\n      }\n      &.sc-select__option--is-selected {\n        background-color: ", ";\n        color: ", ";\n        font-weight: ", ";\n      }\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var SelectContainer = _styledComponents["default"].div(_templateObject(), (0, _utils.getThemePropSelector)("primary"), (0, _utils.getThemePropSelector)("border"), (0, _utils.getThemePropSelector)("textSecondary"), (0, _utils.getThemePropSelector)("secondary"), (0, _utils.getThemePropSelector)("textSecondary"), (0, _utils.getThemePropSelector)("secondary"), defaultTheme.gray, (0, _utils.getThemePropSelector)("textSecondary"), (0, _utils.getThemePropSelector)("primaryDark1"), defaultTheme.gray, (0, _utils.getThemePropSelector)("secondary"), (0, _utils.getThemePropSelector)("primaryDark1"), (0, _utils.getThemePropSelector)("primary"), (0, _utils.getThemePropSelector)("textSecondary"), (0, _utils.getThemePropSelector)("secondary"), defaultTheme.zIndex.dropdown, (0, _utils.getThemePropSelector)("primaryDark2"), (0, _utils.getThemePropSelector)("primary"), (0, _utils.getThemePropSelector)("secondary"), defaultTheme.fontWeight.bold);

var defaultFormatOptionLabel = function defaultFormatOptionLabel(_ref) {
  var label = _ref.label,
      rest = _objectWithoutProperties(_ref, ["label"]);

  return _react["default"].createElement("div", _extends({
    className: "sc-select-option-label"
  }, rest), label);
};

function SelectBox(_ref2) {
  var options = _ref2.options,
      formatOptionLabel = _ref2.formatOptionLabel,
      rest = _objectWithoutProperties(_ref2, ["options", "formatOptionLabel"]);

  return _react["default"].createElement(SelectContainer, {
    className: "sc-select-container"
  }, _react["default"].createElement(_reactSelect["default"], _extends({
    className: "sc-select",
    classNamePrefix: "sc-select",
    options: options,
    formatOptionLabel: formatOptionLabel || defaultFormatOptionLabel
  }, rest)));
}

var _default = SelectBox;
exports["default"] = _default;