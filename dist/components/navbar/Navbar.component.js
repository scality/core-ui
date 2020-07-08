"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _branding = _interopRequireDefault(require("../../icons/branding"));

var _Dropdown = _interopRequireDefault(require("../dropdown/Dropdown.component"));

var _Button = _interopRequireDefault(require("../button/Button.component"));

var defaultTheme = _interopRequireWildcard(require("../../style/theme"));

var _utils = require("../../utils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _templateObject11() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  padding: 0 15px;\n  svg {\n    width: 100px;\n    height: 30px;\n  }\n"]);

  _templateObject11 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10() {
  var data = _taggedTemplateLiteral(["\n  text-transform: uppercase;\n  font-size: ", ";\n  padding: 0 15px;\n"]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  .sc-dropdown {\n    .trigger {\n      background-color: ", ";\n      &:hover {\n        background-color: ", ";\n      }\n      height: ", ";\n      font-size: ", ";\n    }\n  }\n\n  .sc-button {\n    margin: 0;\n    border-radius: 0;\n    height: ", ";\n    font-size: ", ";\n    background-color: ", ";\n    &:hover {\n      background-color: ", ";\n    }\n    width: ", ";\n  }\n"]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = _taggedTemplateLiteral(["\n  a {\n    color: ", ";\n    text-decoration: none;\n  }\n"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteral(["\n      border-bottom: 2px solid ", ";\n      border-top: 4px solid ", ";\n      span {\n        padding-bottom: 2px;\n      }\n    "]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n      color: ", ";\n      &:hover {\n        border-bottom: 2px solid ", ";\n        background-color: ", ";\n        border-top: 4px solid ", ";\n        span {\n          padding-bottom: 2px;\n        }\n        cursor: pointer;\n      }\n    "]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  box-sizing: border-box;\n  height: 100%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  padding: 0 ", ";\n  ", ";\n  ", ";\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  flex: 1;\n  display: flex;\n  justify-content: flex-start;\n  align-items: center;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n    background-color: ", ";\n    color: ", ";\n    .fas,\n    .sc-trigger-text {\n      color: ", ";\n    }\n    border-bottom: 1px solid ", ";\n  "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  height: ", ";\n  display: flex;\n  justify-content: space-between;\n  ", "};\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var NavbarContainer = _styledComponents["default"].div(_templateObject(), defaultTheme.navbarHeight, (0, _styledComponents.css)(_templateObject2(), (0, _utils.getThemePropSelector)("background"), (0, _utils.getThemePropSelector)("textPrimary"), (0, _utils.getThemePropSelector)("textPrimary"), (0, _utils.getThemePropSelector)("primary")));

var NavbarMenu = _styledComponents["default"].div(_templateObject3());

var NavbarTabs = _styledComponents["default"].div(_templateObject4());

var TabItem = _styledComponents["default"].div(_templateObject5(), defaultTheme.padding.base, function (props) {
  var _getTheme = (0, _utils.getTheme)(props),
      textPrimary = _getTheme.textPrimary,
      secondary = _getTheme.secondary,
      backgroundBluer = _getTheme.backgroundBluer;

  return (0, _styledComponents.css)(_templateObject6(), textPrimary, secondary, backgroundBluer, secondary);
}, function (props) {
  return props.selected && (0, _styledComponents.css)(_templateObject7(), (0, _utils.getTheme)(props).primary, (0, _utils.getTheme)(props).primary);
});

var TabLinkItem = (0, _styledComponents["default"])(TabItem)(_templateObject8(), (0, _utils.getThemePropSelector)("textPrimary"));

var NavbarMenuItem = _styledComponents["default"].div(_templateObject9(), (0, _utils.getThemePropSelector)("background"), (0, _utils.getThemePropSelector)("backgroundBluer"), defaultTheme.navbarHeight, defaultTheme.fontSize.base, defaultTheme.navbarHeight, defaultTheme.fontSize.base, (0, _utils.getThemePropSelector)("background"), (0, _utils.getThemePropSelector)("backgroundBluer"), defaultTheme.navbarItemWidth);

var ProductNameSpan = _styledComponents["default"].h1(_templateObject10(), defaultTheme.fontSize.larger);

var LogoContainer = _styledComponents["default"].div(_templateObject11());

var getActionRenderer = function getActionRenderer(_ref, index) {
  var type = _ref.type,
      _ref$items = _ref.items,
      items = _ref$items === void 0 ? null : _ref$items,
      rest = _objectWithoutProperties(_ref, ["type", "items"]);

  if (type === "dropdown") {
    return items ? _react["default"].createElement(_Dropdown["default"], _extends({
      key: "navbar_right_action_".concat(index),
      size: "larger",
      variant: "base",
      items: items,
      caret: false
    }, rest)) : null;
  } else if (type === "button") {
    return _react["default"].createElement(_Button["default"], _extends({
      key: "navbar_right_action_".concat(index),
      size: "larger",
      variant: "base"
    }, rest));
  }

  return null;
};

function NavBar(_ref2) {
  var onToggleClick = _ref2.onToggleClick,
      productName = _ref2.productName,
      logo = _ref2.logo,
      _ref2$tabs = _ref2.tabs,
      tabs = _ref2$tabs === void 0 ? [] : _ref2$tabs,
      _ref2$rightActions = _ref2.rightActions,
      rightActions = _ref2$rightActions === void 0 ? [] : _ref2$rightActions,
      rest = _objectWithoutProperties(_ref2, ["onToggleClick", "productName", "logo", "tabs", "rightActions"]);

  return _react["default"].createElement(NavbarContainer, _extends({
    className: "sc-navbar"
  }, rest), _react["default"].createElement(NavbarMenu, null, onToggleClick && _react["default"].createElement(NavbarMenuItem, {
    onClick: onToggleClick
  }, _react["default"].createElement(_Button["default"], {
    size: "larger",
    variant: "base",
    icon: _react["default"].createElement("i", {
      className: "fas fa-bars"
    }),
    title: "Main Menu"
  })), _react["default"].createElement(NavbarMenuItem, null, _react["default"].createElement(LogoContainer, {
    className: "sc-logo"
  }, logo ? logo : _react["default"].createElement(_branding["default"], null))), productName && _react["default"].createElement(NavbarMenuItem, null, _react["default"].createElement(ProductNameSpan, null, productName))), tabs.length ? _react["default"].createElement(NavbarTabs, null, tabs.map(function (_ref3, index) {
    var link = _ref3.link,
        title = _ref3.title,
        selected = _ref3.selected,
        onClick = _ref3.onClick;
    return link ? _react["default"].createElement(TabLinkItem, {
      selected: selected,
      key: "navbar_tab_link_item_".concat(index)
    }, link) : _react["default"].createElement(TabItem, {
      onClick: onClick,
      selected: selected,
      key: "navbar_tab_item_".concat(index)
    }, _react["default"].createElement("span", null, title));
  })) : null, rightActions.length ? _react["default"].createElement(NavbarMenu, null, _react["default"].createElement(NavbarMenuItem, null, rightActions.map(function (action, index) {
    return getActionRenderer(action, index);
  }))) : null);
}

var _default = NavBar;
exports["default"] = _default;