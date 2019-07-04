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

function _templateObject9() {
  var data = _taggedTemplateLiteral(["\n  width: ", ";\n  display: flex;\n  justify-content: center;\n  align-items: end;\n"]);

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
  var data = _taggedTemplateLiteral(["\n          background-color: ", ";\n          color: ", ";\n          cursor: default;\n          border-right: solid 5px ", ";\n        "]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  align-items: center;\n  padding: ", " 0;\n  cursor: pointer;\n  justify-content: flex-start;\n\n  .fas {\n    font-size: ", ";\n  }\n\n  ", "\n"]);

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
  var data = _taggedTemplateLiteral(["\n      background-color: ", ";\n      color: ", ";\n    "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  ", "\n\n  ", "\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var SidebarContainer = _styledComponents.default.div(_templateObject(), function (props) {
  var brandingTheme = (0, _utils.mergeTheme)(props.theme, defaultTheme);
  return (0, _styledComponents.css)(_templateObject2(), brandingTheme.primary, brandingTheme.secondary);
}, function (props) {
  if (props.expanded) {
    return (0, _styledComponents.css)(_templateObject3());
  }

  return (0, _styledComponents.css)(_templateObject4(), defaultTheme.navbarItemWidth);
});

var SidebarItem = _styledComponents.default.div(_templateObject5(), defaultTheme.padding.base, defaultTheme.fontSize.large, function (props) {
  var brandingTheme = (0, _utils.mergeTheme)(props.theme, defaultTheme);
  var brandLight = (0, _polished.lighten)(0.1, brandingTheme.primary);
  var brandDark = (0, _polished.darken)(0.1, brandingTheme.primary);
  return props.active ? (0, _styledComponents.css)(_templateObject6(), brandDark, brandingTheme.secondary, brandingTheme.secondary) : (0, _styledComponents.css)(_templateObject7(), brandLight, brandingTheme.secondary, brandingTheme.primary, brandingTheme.secondary);
});

var MenuItemText = _styledComponents.default.div(_templateObject8(), defaultTheme.padding.large);

var MenuItemIcon = _styledComponents.default.div(_templateObject9(), defaultTheme.navbarItemWidth);

function Sidebar(_ref) {
  var expanded = _ref.expanded,
      actions = _ref.actions,
      rest = _objectWithoutProperties(_ref, ["expanded", "actions"]);

  return _react.default.createElement(SidebarContainer, _extends({
    expanded: expanded,
    className: "sc-sidebar"
  }, rest), actions.map(function (_ref2, index) {
    var active = _ref2.active,
        label = _ref2.label,
        onClick = _ref2.onClick,
        _ref2$icon = _ref2.icon,
        icon = _ref2$icon === void 0 ? null : _ref2$icon,
        actionRest = _objectWithoutProperties(_ref2, ["active", "label", "onClick", "icon"]);

    return _react.default.createElement(SidebarItem, _extends({
      className: "sc-sidebar-item",
      key: index,
      active: active,
      title: label,
      onClick: onClick,
      expanded: expanded
    }, actionRest), !!icon && _react.default.createElement(MenuItemIcon, null, icon), expanded && _react.default.createElement(MenuItemText, null, label));
  }));
}

var _default = Sidebar;
exports.default = _default;