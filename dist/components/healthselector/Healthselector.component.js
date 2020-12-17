"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _utils = require("../../utils");

var _Button = require("../button/Button.component");

var defaultTheme = _interopRequireWildcard(require("../../style/theme"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _templateObject19() {
  var data = _taggedTemplateLiteral(["\n    background-color: ", ";\n    color: ", ";\n    &:hover {\n      background-color: ", ";\n    }\n    &:active {\n      background-color: ", ";\n    }\n  "]);

  _templateObject19 = function _templateObject19() {
    return data;
  };

  return data;
}

function _templateObject18() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  align-items: center;\n  white-space: nowrap;\n  cursor: pointer;\n  justify-content: space-around;\n\n  ", ";\n"]);

  _templateObject18 = function _templateObject18() {
    return data;
  };

  return data;
}

function _templateObject17() {
  var data = _taggedTemplateLiteral(["\n        left: 0;\n        top: 100%;\n      "]);

  _templateObject17 = function _templateObject17() {
    return data;
  };

  return data;
}

function _templateObject16() {
  var data = _taggedTemplateLiteral(["\n        left: 0;\n        bottom: ", ";\n      "]);

  _templateObject16 = function _templateObject16() {
    return data;
  };

  return data;
}

function _templateObject15() {
  var data = _taggedTemplateLiteral(["\n        right: 0;\n        top: 100%;\n      "]);

  _templateObject15 = function _templateObject15() {
    return data;
  };

  return data;
}

function _templateObject14() {
  var data = _taggedTemplateLiteral(["\n  box-sizing: border-box;\n  position: absolute;\n  margin: 0;\n  padding: 0;\n  z-index: ", ";\n\n  ", ";\n"]);

  _templateObject14 = function _templateObject14() {
    return data;
  };

  return data;
}

function _templateObject13() {
  var data = _taggedTemplateLiteral(["\n  width: 65%;\n  text-align: left;\n  padding-left: 5%;\n"]);

  _templateObject13 = function _templateObject13() {
    return data;
  };

  return data;
}

function _templateObject12() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  justify-content: flex-end;\n  width: 35%;\n"]);

  _templateObject12 = function _templateObject12() {
    return data;
  };

  return data;
}

function _templateObject11() {
  var data = _taggedTemplateLiteral(["\n          ", " {\n            width: 11px;\n            height: 11px;\n          }\n\n          padding: ", ";\n          width: 150px;\n          ul {\n            width: 150px;\n            li {\n              padding: ", ";\n            }\n          }\n        "]);

  _templateObject11 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10() {
  var data = _taggedTemplateLiteral(["\n          ", " {\n            width: 15px;\n            height: 15px;\n          }\n\n          padding: ", ";\n          width: 200px;\n          ul {\n            width: 200px;\n            li {\n              padding: ", ";\n            }\n          }\n        "]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = _taggedTemplateLiteral(["\n          ", " {\n            width: 12px;\n            height: 12px;\n          }\n\n          padding: ", ";\n          width: 160px;\n          ul {\n            width: 160px;\n            li {\n              padding: ", ";\n            }\n          }\n        "]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = _taggedTemplateLiteral(["\n          ", " {\n            width: 10px;\n            height: 10px;\n          }\n\n          padding: ", ";\n          width: 110px;\n          ul {\n            width: 110px;\n            li {\n              padding: ", ";\n            }\n          }\n        "]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteral(["\n          ", " {\n            width: 8px;\n            height: 8px;\n          }\n\n          padding: ", ";\n          width: 100px;\n          ul {\n            width: 100px;\n            li {\n              padding: ", ";\n            }\n          }\n        "]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n        border-bottom-left-radius: 0px;\n        border-bottom-right-radius: 0px;\n\n        ul li:last-child {\n          border-bottom-left-radius: 4px;\n          border-bottom-right-radius: 4px;\n        }\n      "]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  box-sizing: border-box;\n  background-color: ", ";\n  color: ", ";\n  &:hover {\n    background-color: ", ";\n  }\n  &:active {\n    background-color: ", ";\n  }\n  border-radius: 4px;\n\n  ", "\n\n  ", "\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  width: 100%;\n  justify-content: center;\n  ", ":first-child {\n    margin-right: -7%;\n  }\n  ", ":last-child {\n    margin-left: -7%;\n  }\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  width: 100%;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  background-color: ", ";\n  border-radius: 50%;\n  display: inline-block;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  position: relative;\n  user-select: none;\n  cursor: pointer;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var HealthselectorContainer = _styledComponents["default"].div(_templateObject());

var CSSCircle = _styledComponents["default"].span(_templateObject2(), function (props) {
  return defaultTheme.brand[props.variant];
});

var CircleWrapper = _styledComponents["default"].span(_templateObject3());

var ThreeCirclesWrapper = _styledComponents["default"].span(_templateObject4(), CSSCircle, CSSCircle);

var TriggerStyled = (0, _styledComponents["default"])(_Button.ButtonStyled)(_templateObject5(), (0, _utils.getThemePropSelector)('primary'), (0, _utils.getThemePropSelector)('textPrimary'), (0, _utils.getThemePropSelector)('primaryDark2'), (0, _utils.getThemePropSelector)('primaryDark2'), function (props) {
  if (props.opened) return (0, _styledComponents.css)(_templateObject6());
}, function (props) {
  switch (props.size) {
    case 'smaller':
      return (0, _styledComponents.css)(_templateObject7(), CSSCircle, defaultTheme.padding.smaller, defaultTheme.padding.smaller);

    case 'small':
      return (0, _styledComponents.css)(_templateObject8(), CSSCircle, defaultTheme.padding.small, defaultTheme.padding.small);

    case 'large':
      return (0, _styledComponents.css)(_templateObject9(), CSSCircle, defaultTheme.padding.large, defaultTheme.padding.large);

    case 'larger':
      return (0, _styledComponents.css)(_templateObject10(), CSSCircle, defaultTheme.padding.larger, defaultTheme.padding.larger);

    default:
      return (0, _styledComponents.css)(_templateObject11(), CSSCircle, defaultTheme.padding.base, defaultTheme.padding.base);
  }
});

var LeftRowWrapper = _styledComponents["default"].div(_templateObject12());

var RightRowWrapper = _styledComponents["default"].div(_templateObject13());

var HealthSelectorMenu = _styledComponents["default"].ul(_templateObject14(), defaultTheme.zIndex.dropdown, function (props) {
  if (props.size && props.triggerSize && props.triggerSize.x + props.size.width > window.innerWidth) {
    return (0, _styledComponents.css)(_templateObject15());
  } else if (props.size && props.triggerSize && props.triggerSize.y + props.size.height > window.innerHeight) {
    return (0, _styledComponents.css)(_templateObject16(), props.triggerSize.height + 'px');
  } else {
    return (0, _styledComponents.css)(_templateObject17());
  }
});

var HealthSelectorMenuItem = _styledComponents["default"].li(_templateObject18(), (0, _styledComponents.css)(_templateObject19(), (0, _utils.getThemePropSelector)('primary'), (0, _utils.getThemePropSelector)('textPrimary'), (0, _utils.getThemePropSelector)('primaryDark2'), (0, _utils.getThemePropSelector)('primaryDark2')));

function Healthselector(props) {
  var size = props.size,
      items = props.items;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      open = _useState2[0],
      setOpen = _useState2[1];

  var _useState3 = (0, _react.useState)(),
      _useState4 = _slicedToArray(_useState3, 2),
      menuSize = _useState4[0],
      setMenuSize = _useState4[1];

  var _useState5 = (0, _react.useState)(),
      _useState6 = _slicedToArray(_useState5, 2),
      triggerSize = _useState6[0],
      setTriggerSize = _useState6[1];

  var selected = items.find(function (item) {
    return item.selected;
  });
  var selectedIndex = items.indexOf(selected) >= 0 ? items.indexOf(selected) : 0;
  var refMenuCallback = (0, _react.useCallback)(function (node) {
    if (node !== null) {
      setMenuSize(node.getBoundingClientRect());
    }
  }, []);
  var refTriggerCallback = (0, _react.useCallback)(function (node) {
    if (node !== null) {
      setTriggerSize(node.getBoundingClientRect());
    }
  }, []);
  var icons = [_react["default"].createElement(ThreeCirclesWrapper, null, _react["default"].createElement(CSSCircle, {
    variant: "healthy"
  }), _react["default"].createElement(CSSCircle, {
    variant: "warning"
  }), _react["default"].createElement(CSSCircle, {
    variant: "danger"
  })), _react["default"].createElement(CircleWrapper, null, _react["default"].createElement(CSSCircle, {
    variant: "healthy"
  })), _react["default"].createElement(CircleWrapper, null, _react["default"].createElement(CSSCircle, {
    variant: "warning"
  })), _react["default"].createElement(CircleWrapper, null, _react["default"].createElement(CSSCircle, {
    variant: "danger"
  }))];
  return _react["default"].createElement(HealthselectorContainer, {
    className: "sc-healthselector"
  }, _react["default"].createElement(TriggerStyled, {
    variant: 'base',
    size: size || 'base',
    className: "trigger",
    ref: refTriggerCallback,
    onBlur: function onBlur() {
      return setOpen(false);
    },
    onClick: function onClick(e) {
      e.stopPropagation();
      setOpen(!open);
    },
    opened: open
  }, _react["default"].createElement(LeftRowWrapper, null, icons[selectedIndex]), _react["default"].createElement(RightRowWrapper, null, selected && selected.label || ''), _react["default"].createElement("i", {
    className: "fas fa-caret-down"
  }), open && _react["default"].createElement(HealthSelectorMenu, {
    ref: refMenuCallback,
    size: menuSize,
    triggerSize: triggerSize
  }, !items[0].selected && _react["default"].createElement(HealthSelectorMenuItem, {
    onClick: items[0].onClick
  }, _react["default"].createElement(LeftRowWrapper, null, icons[0]), _react["default"].createElement(RightRowWrapper, null, items[0].label || 'All')), !items[1].selected && _react["default"].createElement(HealthSelectorMenuItem, {
    onClick: items[1].onClick
  }, _react["default"].createElement(LeftRowWrapper, null, icons[1]), _react["default"].createElement(RightRowWrapper, null, items[1].label || 'Ok')), !items[2].selected && _react["default"].createElement(HealthSelectorMenuItem, {
    onClick: items[2].onClick
  }, _react["default"].createElement(LeftRowWrapper, null, icons[2]), _react["default"].createElement(RightRowWrapper, null, items[2].label || 'Warning')), !items[3].selected && _react["default"].createElement(HealthSelectorMenuItem, {
    onClick: items[3].onClick
  }, _react["default"].createElement(LeftRowWrapper, null, icons[3]), _react["default"].createElement(RightRowWrapper, null, items[3].label || 'Critical')))));
}

var _default = Healthselector;
exports["default"] = _default;