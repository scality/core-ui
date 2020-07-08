"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.RIGHT = exports.LEFT = exports.BOTTOM = exports.TOP = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var defaultTheme = _interopRequireWildcard(require("../../style/theme"));

var _utils = require("../../utils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n            bottom: calc(100% + 10px);\n            left: 50%;\n            transform: translateX(-50%);\n          "]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n            top: calc(100% + 10px);\n            left: 50%;\n            transform: translateX(-50%);\n          "]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n            left: calc(100% + 10px);\n            top: 50%;\n            transform: translateY(-50%);\n          "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n            right: calc(100% + 10px);\n            top: 50%;\n            transform: translateY(-50%);\n          "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  position: absolute;\n  background-color: ", ";\n  color: ", "\n  z-index: ", ";\n  border-radius: 4px;\n  font-size: ", ";\n  text-align: center;\n  vertical-align: middle;\n  padding: ", ";\n    ", ";\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  position: relative;\n  display: inline-block;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var TOP = "top";
exports.TOP = TOP;
var BOTTOM = "bottom";
exports.BOTTOM = BOTTOM;
var LEFT = "left";
exports.LEFT = LEFT;
var RIGHT = "right";
exports.RIGHT = RIGHT;

var TooltipContainer = _styledComponents["default"].div(_templateObject());

var TooltipOverLayContainer = _styledComponents["default"].div(_templateObject2(), function (props) {
  return props && props.overlaystyle && props.overlaystyle.backgroundColor || (0, _utils.getTheme)(props).primaryDark2;
}, function (props) {
  return props && props.overlaystyle && props.overlaystyle.color || (0, _utils.getTheme)(props).textPrimary;
}, defaultTheme.zIndex.tooltip, function (props) {
  return props && props.overlaystyle && props.overlaystyle.fontSize || defaultTheme.fontSize.small;
}, defaultTheme.padding.smaller, function (props) {
  switch (props.placement) {
    case LEFT:
      return (0, _styledComponents.css)(_templateObject3());

    case RIGHT:
      return (0, _styledComponents.css)(_templateObject4());

    case BOTTOM:
      return (0, _styledComponents.css)(_templateObject5());

    default:
      return (0, _styledComponents.css)(_templateObject6());
  }
});

function Tooltip(_ref) {
  var _ref$placement = _ref.placement,
      placement = _ref$placement === void 0 ? TOP : _ref$placement,
      overlaystyle = _ref.overlaystyle,
      children = _ref.children,
      overlay = _ref.overlay,
      rest = _objectWithoutProperties(_ref, ["placement", "overlaystyle", "children", "overlay"]);

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isTooltipVisible = _useState2[0],
      setIsTooltipVisible = _useState2[1];

  return _react["default"].createElement(TooltipContainer, {
    className: "sc-tooltip",
    onMouseEnter: function onMouseEnter() {
      return setIsTooltipVisible(true);
    },
    onMouseLeave: function onMouseLeave() {
      return setIsTooltipVisible(false);
    }
  }, isTooltipVisible && overlay ? _react["default"].createElement(TooltipOverLayContainer, {
    className: "sc-tooltip-overlay",
    placement: placement,
    overlaystyle: overlaystyle
  }, _react["default"].createElement("div", {
    className: "sc-tooltip-overlay-text"
  }, overlay)) : null, children);
}

var _default = Tooltip;
exports["default"] = _default;