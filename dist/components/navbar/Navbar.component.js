"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _branding = _interopRequireDefault(require("../../icons/branding"));

var _Dropdown = _interopRequireDefault(require("../dropdown/Dropdown.component"));

var _Button = _interopRequireDefault(require("../button/Button.component"));

var defaultTheme = _interopRequireWildcard(require("../../style/theme"));

var _utils = require("../../utils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _templateObject8() {
  var data = _taggedTemplateLiteral(["\n  margin-right: 6px;\n"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  padding: 0 15px;\n  svg {\n    width: 100px;\n    height: 30px;\n  }\n"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n  text-transform: uppercase;\n  font-size: ", ";\n  padding: 0 15px;\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n      .fas {\n        background-color: ", ";\n        color: ", ";\n      }\n    "]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n\n  ", "\n\n  button {\n    margin: 0;\n    border-radius: 0;\n    height: ", ";\n    width: ", ";\n  }\n  .trigger {\n    height: ", ";\n    font-size: ", ";\n  }\n"]);

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
  var data = _taggedTemplateLiteral(["\n      background-color: ", ";\n      color: ", ";\n    "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  height: ", ";\n  display: flex;\n  justify-content: space-between;\n  ", ";\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var NavbarContainer = _styledComponents.default.div(_templateObject(), defaultTheme.navbarHeight, function (props) {
  var brandingTheme = (0, _utils.mergeTheme)(props.theme, defaultTheme);
  return (0, _styledComponents.css)(_templateObject2(), brandingTheme.primary, brandingTheme.secondary);
});

var NavbarMenu = _styledComponents.default.div(_templateObject3());

var NavbarMenuItem = _styledComponents.default.div(_templateObject4(), function (props) {
  var brandingTheme = (0, _utils.mergeTheme)(props.theme, defaultTheme);
  return (0, _styledComponents.css)(_templateObject5(), brandingTheme.primary, brandingTheme.secondary);
}, defaultTheme.navbarHeight, defaultTheme.navbarItemWidth, defaultTheme.navbarHeight, defaultTheme.fontSize.base);

var ProductNameSpan = _styledComponents.default.h1(_templateObject6(), defaultTheme.fontSize.larger);

var LogoContainer = _styledComponents.default.div(_templateObject7());

var IconContainer = _styledComponents.default.i(_templateObject8());

function NavBar(_ref) {
  var onToggleClick = _ref.onToggleClick,
      toggleVisible = _ref.toggleVisible,
      productName = _ref.productName,
      applications = _ref.applications,
      help = _ref.help,
      user = _ref.user,
      logo = _ref.logo,
      _ref$languages = _ref.languages,
      languages = _ref$languages === void 0 ? [] : _ref$languages,
      currentLanguage = _ref.currentLanguage,
      rest = _objectWithoutProperties(_ref, ["onToggleClick", "toggleVisible", "productName", "applications", "help", "user", "logo", "languages", "currentLanguage"]);

  var filterLanguage = languages.filter(function (language) {
    return language.name !== currentLanguage;
  });
  return _react.default.createElement(NavbarContainer, _extends({
    className: "sc-navbar"
  }, rest), _react.default.createElement(NavbarMenu, null, toggleVisible && _react.default.createElement(NavbarMenuItem, {
    onClick: onToggleClick
  }, _react.default.createElement(_Button.default, {
    size: "larger",
    icon: _react.default.createElement("i", {
      className: "fas fa-bars"
    }),
    title: "Main Menu"
  })), _react.default.createElement(NavbarMenuItem, null, _react.default.createElement(LogoContainer, {
    className: "sc-logo"
  }, logo ? logo : _react.default.createElement(_branding.default, null))), _react.default.createElement(NavbarMenuItem, null, _react.default.createElement(ProductNameSpan, null, productName))), _react.default.createElement(NavbarMenu, null, languages.length > 0 && _react.default.createElement(NavbarMenuItem, null, _react.default.createElement(_Dropdown.default, {
    size: "larger",
    items: filterLanguage,
    icon: _react.default.createElement("div", null, _react.default.createElement(IconContainer, {
      className: "fas fa-globe"
    }), currentLanguage),
    caret: false
  })), applications && _react.default.createElement(NavbarMenuItem, null, _react.default.createElement(_Dropdown.default, {
    size: "larger",
    items: applications,
    icon: _react.default.createElement("i", {
      className: "fas fa-th"
    }),
    title: "Scality Apps",
    caret: false
  })), help && _react.default.createElement(NavbarMenuItem, null, _react.default.createElement(_Dropdown.default, {
    size: "larger",
    items: help,
    icon: _react.default.createElement("i", {
      className: "fas fa-question-circle"
    }),
    title: "Help",
    caret: false
  })), user && _react.default.createElement(NavbarMenuItem, null, _react.default.createElement(_Dropdown.default, {
    items: user.actions,
    icon: _react.default.createElement("i", {
      className: "fas fa-user"
    }),
    title: user.name,
    text: user.name,
    size: "larger",
    caret: false
  }))));
}

var _default = NavBar;
exports.default = _default;