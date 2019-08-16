"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactVirtualizedSelect = _interopRequireDefault(require("react-virtualized-select"));

var defaultTheme = _interopRequireWildcard(require("../../style/theme"));

var _utils = require("../../utils");

var _polished = require("polished");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  .Select-control {\n    border-radius: 4px;\n    border: 1px solid ", ";\n    height: auto;\n  }\n\n  .Select.is-focused > .Select-control {\n    border-color: ", ";\n    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),\n      0 0 0 1px rgba(0, 126, 255, 0.1);\n    outline: none;\n  }\n\n  .VirtualizedSelectFocusedOption {\n    background-color: ", ";\n  }\n\n  .Select-menu-outer {\n    margin-top: -2px;\n    border: 1px solid ", ";\n    box-sizing: border-box;\n  }\n\n  .Select--multi .Select-value {\n    color: ", ";\n    background-color: ", ";\n    vertical-align: initial;\n  }\n\n  .Select-clear {\n    line-height: inherit;\n  }\n\n  .Select-clear-zone:hover {\n    color: ", ";\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var SelectContainer = _styledComponents["default"].div(_templateObject(), defaultTheme.gray, function (props) {
  return (0, _utils.mergeTheme)(props.theme, defaultTheme).primary;
}, function (props) {
  return (0, _polished.lighten)(0.3, (0, _utils.mergeTheme)(props.theme, defaultTheme).primary);
}, function (props) {
  return (0, _utils.mergeTheme)(props.theme, defaultTheme).primary;
}, function (props) {
  return (0, _utils.mergeTheme)(props.theme, defaultTheme).primary;
}, defaultTheme.grayLightest, function (props) {
  return (0, _utils.mergeTheme)(props.theme, defaultTheme).danger;
});

function SelectBox(_ref) {
  var options = _ref.options,
      rest = _objectWithoutProperties(_ref, ["options"]);

  return _react["default"].createElement(SelectContainer, {
    className: "sc-select"
  }, _react["default"].createElement(_reactVirtualizedSelect["default"], _extends({
    options: options
  }, rest)));
}

var _default = SelectBox;
exports["default"] = _default;