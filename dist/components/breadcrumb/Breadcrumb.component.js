"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _polished = require("polished");

var defaultTheme = _interopRequireWildcard(require("../../style/theme"));

var _utils = require("../../utils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  padding: ", " ", ";\n  color: ", ";\n  display: flex;\n  align-items: center;\n  font-size: ", ";\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n      &:hover {\n        a {\n          color: ", ";\n        }\n        color: ", ";\n        border-bottom: 2px solid ", ";\n      }\n    "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n        font-weight: ", ";\n        a {\n          color: ", ";\n        }\n        color: ", ";\n        border-bottom: 2px solid ", ";\n      "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  padding: ", " ", ";\n  box-sizing: border-box;\n  height: 100%;\n  font-size: ", ";\n  ", "\n\n  a {\n    color: ", ";\n    text-decoration: none;\n  }\n\n  ", "\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  list-style-type: none;\n  padding: ", ";\n  margin: 0;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var BreadcrumbContainer = _styledComponents.default.ol(_templateObject(), defaultTheme.padding.base);

var BreadcrumbItem = _styledComponents.default.li(_templateObject2(), defaultTheme.padding.smaller, defaultTheme.padding.base, defaultTheme.fontSize.larger, (0, _polished.ellipsis)("250px"), defaultTheme.textColor, function (props) {
  var brandingTheme = (0, _utils.mergeTheme)(props.theme, defaultTheme);

  if (props.active) {
    var activeColor = props.activeColor || brandingTheme.primary;
    return (0, _styledComponents.css)(_templateObject3(), defaultTheme.fontWeight.bold, activeColor, activeColor, activeColor);
  }

  var hoverColor = props.hoverColor || brandingTheme.primary;
  return (0, _styledComponents.css)(_templateObject4(), hoverColor, hoverColor, hoverColor);
});

var BreadcrumbSeparator = _styledComponents.default.li(_templateObject5(), defaultTheme.padding.smaller, defaultTheme.padding.base, defaultTheme.grayLight, defaultTheme.fontSize.small);

var withBreadcrumbSeparator = function withBreadcrumbSeparator(lastIndex) {
  return function (acc, item, index) {
    var notLast = index < lastIndex;
    return notLast ? [].concat(_toConsumableArray(acc), [item, _react.default.createElement(BreadcrumbSeparator, {
      key: "sc-breadcrumb_separator_".concat(index),
      className: "sc-breadcrumb_separator"
    }, _react.default.createElement("i", {
      className: "fas fa-chevron-right"
    }))]) : [].concat(_toConsumableArray(acc), [item]);
  };
};

var Breadcrumb = function Breadcrumb(_ref) {
  var _ref$paths = _ref.paths,
      paths = _ref$paths === void 0 ? [] : _ref$paths,
      _ref$hoverColor = _ref.hoverColor,
      hoverColor = _ref$hoverColor === void 0 ? "" : _ref$hoverColor,
      _ref$activeColor = _ref.activeColor,
      activeColor = _ref$activeColor === void 0 ? "" : _ref$activeColor,
      rest = _objectWithoutProperties(_ref, ["paths", "hoverColor", "activeColor"]);

  var lastIndex = paths.length - 1;
  var breadcrumbItems = paths.map(function (item, index) {
    return _react.default.createElement(BreadcrumbItem, {
      key: "sc-breadcrumb_item_".concat(index),
      className: "sc-breadcrumb_item",
      active: index === lastIndex,
      hoverColor: hoverColor,
      activeColor: activeColor
    }, item);
  }).reduce(withBreadcrumbSeparator(lastIndex), []);
  return _react.default.createElement(BreadcrumbContainer, _extends({
    className: "sc-breadcrumb"
  }, rest), breadcrumbItems);
};

var _default = Breadcrumb;
exports.default = _default;