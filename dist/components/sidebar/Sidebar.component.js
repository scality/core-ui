"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _color = _interopRequireDefault(require("color"));

var defaultTheme = _interopRequireWildcard(require("../../style/theme"));

var _utils = require("../../utils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  var brandLight = (0, _color.default)(brandingTheme.primary).lighten(0.1).hsl().string();
  var brandDark = (0, _color.default)(brandingTheme.primary).darken(0.3).hsl().string();
  return props.active ? (0, _styledComponents.css)(_templateObject6(), brandDark, brandingTheme.secondary, brandingTheme.secondary) : (0, _styledComponents.css)(_templateObject7(), brandLight, brandingTheme.secondary, brandingTheme.primary, brandingTheme.secondary);
});

var MenuItemText = _styledComponents.default.div(_templateObject8(), defaultTheme.padding.large);

var MenuItemIcon = _styledComponents.default.div(_templateObject9(), defaultTheme.navbarItemWidth);

function Sidebar(_ref) {
  var expanded = _ref.expanded,
      actions = _ref.actions;
  return _react.default.createElement(SidebarContainer, {
    expanded: expanded,
    className: "sc-sidebar"
  }, actions.map(function (action, index) {
    return _react.default.createElement(SidebarItem, {
      className: "sc-sidebar-item",
      key: index,
      active: action.active,
      title: action.label,
      onClick: action.onClick,
      expanded: expanded
    }, action.icon && _react.default.createElement(MenuItemIcon, null, action.icon), expanded && _react.default.createElement(MenuItemText, null, action.label));
  }));
}

var _default = Sidebar;
exports.default = _default;