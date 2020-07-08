"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDebounceInput = require("react-debounce-input");

var _Checkbox = _interopRequireDefault(require("../checkbox/Checkbox.component"));

var _Select = _interopRequireDefault(require("../select/Select.component"));

var _TextArea = _interopRequireDefault(require("../textarea/TextArea.component"));

var _InputComponent = require("./Input.component.style");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var InputRenderer = function InputRenderer(_ref) {
  var type = _ref.type,
      id = _ref.id,
      value = _ref.value,
      checked = _ref.checked,
      onChange = _ref.onChange,
      _ref$options = _ref.options,
      options = _ref$options === void 0 ? [] : _ref$options,
      rest = _objectWithoutProperties(_ref, ["type", "id", "value", "checked", "onChange", "options"]);

  var input = {
    select: _react["default"].createElement(_Select["default"], _extends({
      id: id,
      value: value,
      onChange: onChange,
      options: options
    }, rest)),
    checkbox: _react["default"].createElement(_Checkbox["default"], _extends({
      id: id,
      value: value,
      checked: !!checked,
      onChange: onChange
    }, rest)),
    textarea: _react["default"].createElement(_TextArea["default"], _extends({
      id: id,
      value: value,
      onChange: onChange
    }, rest)),
    text: _react["default"].createElement(_reactDebounceInput.DebounceInput, _extends({
      className: "sc-input-type",
      minLength: 1,
      debounceTimeout: 300,
      id: id,
      value: value,
      onChange: onChange,
      autoComplete: "off"
    }, rest))
  };
  return input[type] || input.text;
};

var Input = function Input(_ref2) {
  var label = _ref2.label,
      id = _ref2.id,
      error = _ref2.error,
      rest = _objectWithoutProperties(_ref2, ["label", "id", "error"]);

  return _react["default"].createElement(_InputComponent.InputContainer, {
    className: "sc-input",
    error: error
  }, label && _react["default"].createElement(_InputComponent.LabelStyle, {
    htmlFor: id,
    className: "sc-input-label"
  }, label), _react["default"].createElement(_InputComponent.InputWrapper, {
    className: "sc-input-wrapper"
  }, _react["default"].createElement(InputRenderer, _extends({
    id: id
  }, rest)), error && _react["default"].createElement(_InputComponent.InputErrorMessage, {
    className: "sc-input-error"
  }, error)));
};

var _default = Input;
exports["default"] = _default;