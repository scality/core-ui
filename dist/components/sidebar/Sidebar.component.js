"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var defaultTheme = _interopRequireWildcard(require("../../style/theme"));

var _utils = require("../../utils");

var _Button = _interopRequireDefault(require("../button/Button.component"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _templateObject10() {
  var data = _taggedTemplateLiteral(["\n  width: ", ";\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: ", ";\n"]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = _taggedTemplateLiteral(["\n  position: absolute;\n  width: 5px;\n  height: 100%;\n  right: 0;\n  background-color: ", ";\n"]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = _taggedTemplateLiteral(["\n  margin-right: ", ";\n"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteral(["\n          &:hover {\n            background-color: ", ";\n            color: ", ";\n          }\n          &:active {\n            background-color: ", ";\n            color: ", ";\n          }\n        "]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n          background-color: ", ";\n          color: ", ";\n          cursor: default;\n        "]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  position: relative;\n  display: flex;\n  align-items: center;\n  cursor: pointer;\n  justify-content: flex-start;\n  .fas {\n    font-size: ", ";\n  }\n\n  ", "\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n      width: ", ";\n    "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n        width: auto;\n      "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n      background-color: ", ";\n      color: ", ";\n      .fas {\n        color: ", ";\n      }\n    "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  ", "\n\n  ", "\n\n  .sc-button {\n    border-radius: 0;\n    background-color: ", ";\n    &:hover {\n      background-color: ", ";\n    }\n    height: ", ";\n    width: ", ";\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var SidebarContainer = _styledComponents["default"].div(_templateObject(), function (props) {
  var _getTheme = (0, _utils.getTheme)(props),
      background = _getTheme.background,
      textPrimary = _getTheme.textPrimary;

  return (0, _styledComponents.css)(_templateObject2(), background, textPrimary, textPrimary);
}, function (props) {
  if (props.expanded) {
    return (0, _styledComponents.css)(_templateObject3());
  }

  return (0, _styledComponents.css)(_templateObject4(), defaultTheme.sidebarWidth);
}, (0, _utils.getThemePropSelector)("primary"), (0, _utils.getThemePropSelector)("backgroundBluer"), defaultTheme.sidebarItemHeight, defaultTheme.sidebarWidth);

var SidebarItem = _styledComponents["default"].div(_templateObject5(), defaultTheme.fontSize.large, function (props) {
  var _getTheme2 = (0, _utils.getTheme)(props),
      textPrimary = _getTheme2.textPrimary,
      backgroundBluer = _getTheme2.backgroundBluer;

  return props.active ? (0, _styledComponents.css)(_templateObject6(), backgroundBluer, textPrimary) : (0, _styledComponents.css)(_templateObject7(), backgroundBluer, textPrimary, backgroundBluer, textPrimary);
});

var MenuItemText = _styledComponents["default"].div(_templateObject8(), defaultTheme.padding.large);

var MenuItemSelected = _styledComponents["default"].div(_templateObject9(), (0, _utils.getThemePropSelector)("secondary"));

var MenuItemIcon = _styledComponents["default"].div(_templateObject10(), defaultTheme.sidebarWidth, defaultTheme.sidebarItemHeight);

function Sidebar(_ref) {
  var expanded = _ref.expanded,
      actions = _ref.actions,
      onToggleClick = _ref.onToggleClick,
      rest = _objectWithoutProperties(_ref, ["expanded", "actions", "onToggleClick"]);

  return _react["default"].createElement(SidebarContainer, _extends({
    expanded: expanded,
    className: "sc-sidebar"
  }, rest), onToggleClick && expanded && _react["default"].createElement(MenuItemIcon, null, _react["default"].createElement(_Button["default"], {
    size: "larger",
    variant: "base",
    icon: _react["default"].createElement("i", {
      className: "fas fa-chevron-left"
    }),
    onClick: function onClick() {
      return onToggleClick();
    }
  })), onToggleClick && !expanded && _react["default"].createElement(_Button["default"], {
    size: "larger",
    variant: "base",
    icon: _react["default"].createElement("i", {
      className: "fas fa-chevron-right"
    }),
    onClick: function onClick() {
      return onToggleClick();
    }
  }), actions.map(function (_ref2, index) {
    var active = _ref2.active,
        label = _ref2.label,
        onClick = _ref2.onClick,
        _ref2$icon = _ref2.icon,
        icon = _ref2$icon === void 0 ? null : _ref2$icon,
        actionRest = _objectWithoutProperties(_ref2, ["active", "label", "onClick", "icon"]);

    return _react["default"].createElement(SidebarItem, _extends({
      className: "sc-sidebar-item",
      key: index,
      active: active,
      title: label,
      onClick: onClick,
      expanded: expanded
    }, actionRest), !!icon && _react["default"].createElement(MenuItemIcon, null, icon), expanded && _react["default"].createElement(MenuItemText, null, label), active && expanded && _react["default"].createElement(MenuItemSelected, null));
  }));
}

var _default = Sidebar;
exports["default"] = _default;