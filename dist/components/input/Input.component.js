"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _reactDebounceInput = require("react-debounce-input");

var _Checkbox = _interopRequireDefault(require("../checkbox/Checkbox.component"));

var defaultTheme = _interopRequireWildcard(require("../../style/theme"));

var _utils = require("../../utils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  color: ", ";\n  margin: ", " 0;\n  font-size: ", ";\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  align-self: flex-start;\n  padding: ", ";\n  font-size: ", ";\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n        @keyframes shake {\n          from,\n          to {\n            transform: translate3d(0, 0, 0);\n          }\n\n          10%,\n          30%,\n          50%,\n          70%,\n          90% {\n            transform: translate3d(-5px, 0, 0);\n          }\n\n          20%,\n          40%,\n          60%,\n          80% {\n            transform: translate3d(5px, 0, 0);\n          }\n        }\n        animation-duration: 1s;\n        animation-fill-mode: both;\n        animation-name: shake;\n      "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  display: inline-flex;\n\n  .sc-checkbox {\n    margin: ", " 0;\n  }\n\n  input {\n    padding: 8px ", ";\n    font-size: ", ";\n    display: block;\n    border-radius: 4px;\n    border: 1px solid\n      ", ";\n  }\n\n  input:focus {\n    border-color: ", ";\n    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),\n      0 0 0 1px rgba(0, 126, 255, 0.1);\n    outline: none;\n  }\n\n  ", ";\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var InputContainer = _styledComponents.default.div(_templateObject(), defaultTheme.padding.smaller, defaultTheme.padding.small, defaultTheme.fontSize.base, function (props) {
  return props.error ? (0, _utils.mergeTheme)(props.theme, defaultTheme).danger : defaultTheme.gray;
}, function (props) {
  return (0, _utils.mergeTheme)(props.theme, defaultTheme).primary;
}, function (props) {
  if (props.error) {
    return (0, _styledComponents.css)(_templateObject2());
  }
});

var LabelStyle = _styledComponents.default.label(_templateObject3(), defaultTheme.padding.small, defaultTheme.fontSize.base);

var InputErrorMessage = _styledComponents.default.span(_templateObject4(), function (props) {
  return (0, _utils.mergeTheme)(props.theme, defaultTheme).danger;
}, defaultTheme.padding.smaller, defaultTheme.fontSize.small);

var InputWrapper = _styledComponents.default.div(_templateObject5());

var Input = function Input(_ref) {
  var type = _ref.type,
      id = _ref.id,
      label = _ref.label,
      error = _ref.error,
      value = _ref.value,
      onChange = _ref.onChange,
      checked = _ref.checked,
      rest = _objectWithoutProperties(_ref, ["type", "id", "label", "error", "value", "onChange", "checked"]);

  return _react.default.createElement(InputContainer, {
    className: "sc-input",
    error: error
  }, label && _react.default.createElement(LabelStyle, {
    htmlFor: id,
    className: "sc-input-label"
  }, label), _react.default.createElement(InputWrapper, {
    className: "sc-input-wrapper"
  }, type === "checkbox" ? _react.default.createElement(_Checkbox.default, _extends({
    id: id,
    type: type,
    value: value,
    checked: !!checked,
    onChange: onChange
  }, rest)) : _react.default.createElement(_reactDebounceInput.DebounceInput, _extends({
    minLength: 1,
    debounceTimeout: 300,
    id: id,
    type: type,
    value: value,
    onChange: onChange
  }, rest)), error && _react.default.createElement(InputErrorMessage, {
    className: "sc-input-error"
  }, error)));
};

var _default = Input;
exports.default = _default;