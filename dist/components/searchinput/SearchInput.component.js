"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _color = _interopRequireDefault(require("color"));

var _Input = _interopRequireDefault(require("../input/Input.component"));

var defaultTheme = _interopRequireWildcard(require("../../style/theme"));

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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
  var data = _taggedTemplateLiteral(["\n  position: absolute;\n  border: none;\n  outline: none;\n  top: 1px;\n  padding: 8px 12px;\n  border-radius: 5px;\n  font-size: ", ";\n  color: ", ";\n  background-color: ", ";\n  ", ";\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  position: relative;\n\n  .sc-input {\n    display: block;\n    input[type=\"text\"] {\n      width: ", ";\n      box-sizing: border-box;\n      padding-right: ", ";\n      padding-left: ", ";\n      transition: width 0.2s ease-in-out;\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var SearchInputContainer = _styledComponents.default.div(_templateObject(), function (props) {
  return props.docked ? "40px" : "100%";
}, function (props) {
  return props.docked ? "12px" : "40px";
}, function (props) {
  return props.docked ? "12px" : "40px";
});

var IconButton = _styledComponents.default.button(_templateObject2(), defaultTheme.fontSize.base, function (props) {
  return (0, _utils.mergeTheme)(props.theme, defaultTheme).primary;
}, defaultTheme.white, function (props) {
  return !props.disabled && (0, _styledComponents.css)(_templateObject3(), (0, _color.default)((0, _utils.mergeTheme)(props.theme, defaultTheme).primary).lighten(0.3).hsl().string());
});

var SearchIcon = (0, _styledComponents.default)(IconButton)(_templateObject4());
var ResetIcon = (0, _styledComponents.default)(IconButton)(_templateObject5(), function (props) {
  return props.visible ? "visible" : "hidden";
}, function (props) {
  return props.visible ? 1 : 0;
});

function SearchInput(props) {
  var _useState = (0, _react.useState)(true),
      _useState2 = _slicedToArray(_useState, 2),
      docked = _useState2[0],
      setDocked = _useState2[1];

  var myInputRef = (0, _react.useRef)(null);

  var toggle = function toggle() {
    setDocked(!docked);
    myInputRef.current.focus();
  };

  var reset = function reset() {
    props.onReset();
    setDocked(true);
  };

  return _react.default.createElement(SearchInputContainer, {
    className: "sc-searchinput",
    docked: docked
  }, _react.default.createElement(_Input.default, {
    minLength: 1,
    debounceTimeout: 300,
    type: "text",
    name: "search",
    placeholder: props.placeholder,
    value: props.value,
    onChange: props.onChange,
    inputRef: myInputRef
  }), _react.default.createElement(SearchIcon, {
    onClick: toggle,
    disabled: !docked
  }, _react.default.createElement("i", {
    className: "fas fa-search"
  })), _react.default.createElement(ResetIcon, {
    onClick: reset,
    visible: props.value && !docked
  }, _react.default.createElement("i", {
    className: "fas fa-times-circle"
  })));
}

SearchInput.propTypes = {
  placeholder: _propTypes.default.string,
  value: _propTypes.default.string.isRequired,
  onChange: _propTypes.default.func.isRequired,
  onReset: _propTypes.default.func.isRequired
};
var _default = SearchInput;
exports.default = _default;