"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var defaultTheme = _interopRequireWildcard(require("../../style/theme"));

var _utils = require("../../utils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n  padding: ", ";\n  color: ", ";\n  background-color: ", ";\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  cursor: pointer;\n  padding: ", ";\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n  border-radius: 4px;\n  background-color: ", ";\n  color: ", ";\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  font-size: ", ";\n  margin: 0 ", ";\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  margin-right: ", ";\n  display: flex;\n  flex-grow: 1;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  align-items: center;\n  flex-grow: 1;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var ARROW = {
  colapsed: "fas fa-angle-down",
  expanded: "fas fa-angle-up"
};

var HeaderText = _styledComponents["default"].div(_templateObject());

var HeaderItem = _styledComponents["default"].div(_templateObject2(), defaultTheme.padding.base);

var HeaderIcon = _styledComponents["default"].div(_templateObject3(), defaultTheme.fontSize.larger, defaultTheme.padding.base);

var CollapsiblePanelContainer = _styledComponents["default"].div(_templateObject4(), function (props) {
  return (0, _utils.mergeTheme)(props.theme, defaultTheme).primaryDark2;
}, function (props) {
  return (0, _utils.mergeTheme)(props.theme, defaultTheme).textPrimary;
});

var HeaderContainer = _styledComponents["default"].div(_templateObject5(), defaultTheme.padding.base);

var ExpandedContainer = _styledComponents["default"].div(_templateObject6(), defaultTheme.padding.base, function (props) {
  return (0, _utils.mergeTheme)(props.theme, defaultTheme).textPrimary;
}, function (props) {
  return (0, _utils.mergeTheme)(props.theme, defaultTheme).primaryDark2;
});

function CollapsiblePanel(_ref) {
  var _ref$expanded = _ref.expanded,
      expanded = _ref$expanded === void 0 ? false : _ref$expanded,
      onHeaderClick = _ref.onHeaderClick,
      children = _ref.children,
      _ref$headerItems = _ref.headerItems,
      headerItems = _ref$headerItems === void 0 ? [] : _ref$headerItems;
  return _react["default"].createElement(CollapsiblePanelContainer, {
    className: "sc-collapsiblepanel"
  }, _react["default"].createElement(HeaderContainer, {
    onClick: onHeaderClick,
    className: "sc-collapsiblepanel-header"
  }, _react["default"].createElement(HeaderText, null, headerItems.map(function (item, index) {
    return _react["default"].createElement(HeaderItem, {
      key: index
    }, item);
  })), _react["default"].createElement(HeaderIcon, null, _react["default"].createElement("i", {
    className: expanded ? ARROW.expanded : ARROW.colapsed
  }))), expanded && _react["default"].createElement(ExpandedContainer, {
    className: "sc-collapsiblepanel-content"
  }, children));
}

var _default = CollapsiblePanel;
exports["default"] = _default;