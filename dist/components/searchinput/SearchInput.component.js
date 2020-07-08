"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _Input = _interopRequireDefault(require("../input/Input.component"));

var defaultTheme = _interopRequireWildcard(require("../../style/theme"));

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  right: 1px;\n  visibility: ", ";\n  opacity: ", ";\n  transition: opacity 0.5s ease-in-out;\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  left: 1px;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n        cursor: pointer;\n        &:hover {\n          color: ", ";\n        }\n      "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  position: absolute;\n  border: none;\n  outline: none;\n  top: 1px;\n  padding: 8px 12px;\n  border-radius: 5px;\n  font-size: ", ";\n  color: ", ";\n  background-color: transparent;\n  ", ";\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  position: relative;\n\n  .sc-input {\n    display: block;\n    input[type=\"text\"] {\n      width: ", ";\n      box-sizing: border-box;\n      padding-left: ", ";\n      transition: width 0.2s ease-in-out;\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var SearchInputContainer = _styledComponents["default"].div(_templateObject(), function (props) {
  return props.docked ? "40px" : "100%";
}, function (props) {
  return props.docked ? "28px" : "40px";
});

var IconButton = _styledComponents["default"].button(_templateObject2(), defaultTheme.fontSize.base, (0, _utils.getThemePropSelector)("textSecondary"), function (props) {
  return !props.disabled && (0, _styledComponents.css)(_templateObject3(), (0, _utils.getThemePropSelector)("secondary"));
});

var SearchIcon = (0, _styledComponents["default"])(IconButton)(_templateObject4());
var ResetIcon = (0, _styledComponents["default"])(IconButton)(_templateObject5(), function (props) {
  return props.visible ? "visible" : "hidden";
}, function (props) {
  return props.visible ? 1 : 0;
});

function SearchInput(_ref) {
  var disableToggle = _ref.disableToggle,
      placeholder = _ref.placeholder,
      value = _ref.value,
      onChange = _ref.onChange,
      onReset = _ref.onReset,
      rest = _objectWithoutProperties(_ref, ["disableToggle", "placeholder", "value", "onChange", "onReset"]);

  var _useState = (0, _react.useState)(!disableToggle),
      _useState2 = _slicedToArray(_useState, 2),
      docked = _useState2[0],
      setDocked = _useState2[1];

  var myInputRef = (0, _react.useRef)(null);

  var toggle = function toggle() {
    if (!disableToggle) {
      setDocked(!docked); //$FlowFixMe

      myInputRef.current.focus();
    }
  };

  var reset = function reset() {
    if (onReset) {
      onReset();
    }

    if (!disableToggle) {
      setDocked(true);
    }
  };

  return _react["default"].createElement(SearchInputContainer, _extends({
    className: "sc-searchinput",
    docked: docked
  }, rest), _react["default"].createElement(_Input["default"], {
    minLength: 1,
    debounceTimeout: 300,
    type: "text",
    name: "search",
    placeholder: placeholder,
    value: value,
    onChange: onChange,
    inputRef: myInputRef
  }), _react["default"].createElement(SearchIcon, {
    onClick: toggle,
    disabled: !docked
  }, _react["default"].createElement("i", {
    className: "fas fa-search"
  })), _react["default"].createElement(ResetIcon, {
    onClick: reset,
    visible: value && !docked && onReset
  }, _react["default"].createElement("i", {
    className: "fas fa-times-circle"
  })));
}

var _default = SearchInput;
exports["default"] = _default;