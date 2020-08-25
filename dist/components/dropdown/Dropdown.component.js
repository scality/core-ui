"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _Button = require("../button/Button.component");

var defaultTheme = _interopRequireWildcard(require("../../style/theme"));

var _utils = require("../../utils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _templateObject8() {
  var data = _taggedTemplateLiteral(["\n  margin-left: ", ";\n"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteral(["\n    background-color: ", ";\n    color: ", ";\n    &:hover {\n      background-color: ", ";\n    }\n    &:active {\n      background-color: ", ";\n    }\n  "]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  align-items: center;\n  padding: ", ";\n  white-space: nowrap;\n  cursor: pointer;\n  font-size: ", ";\n\n  ", ";\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n        left: 0;\n        top: 100%;\n      "]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n        left: 0;\n        bottom: ", ";\n      "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n        right: 0;\n        top: 100%;\n      "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  position: absolute;\n  margin: 0;\n  padding: 0;\n  border: 1px solid ", ";\n  z-index: ", ";\n  max-height: 200px;\n  min-width: 100%;\n  overflow: auto;\n\n  ", ";\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  position: relative;\n  user-select: none;\n  cursor: pointer;\n  .trigger {\n    margin: 0;\n    border-radius: 0;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var DropdownStyled = _styledComponents["default"].div(_templateObject());

var DropdownMenuStyled = _styledComponents["default"].ul(_templateObject2(), (0, _utils.getThemePropSelector)("primary"), defaultTheme.zIndex.dropdown, function (props) {
  if (props.size && props.triggerSize && props.triggerSize.x + props.size.width > window.innerWidth) {
    return (0, _styledComponents.css)(_templateObject3());
  } else if (props.size && props.triggerSize && props.triggerSize.y + props.size.height > window.innerHeight) {
    return (0, _styledComponents.css)(_templateObject4(), props.triggerSize.height + "px");
  } else {
    return (0, _styledComponents.css)(_templateObject5());
  }
});

var DropdownMenuItemStyled = _styledComponents["default"].li(_templateObject6(), defaultTheme.padding.base, defaultTheme.fontSize.base, (0, _styledComponents.css)(_templateObject7(), (0, _utils.getThemePropSelector)("primary"), (0, _utils.getThemePropSelector)("textPrimary"), (0, _utils.getThemePropSelector)("primaryDark2"), (0, _utils.getThemePropSelector)("primaryDark2")));

var Caret = _styledComponents["default"].span(_templateObject8(), defaultTheme.padding.base);

var TriggerStyled = _Button.ButtonStyled.withComponent("div");

function Dropdown(_ref) {
  var items = _ref.items,
      text = _ref.text,
      icon = _ref.icon,
      _ref$size = _ref.size,
      size = _ref$size === void 0 ? "base" : _ref$size,
      _ref$variant = _ref.variant,
      variant = _ref$variant === void 0 ? "base" : _ref$variant,
      title = _ref.title,
      _ref$caret = _ref.caret,
      caret = _ref$caret === void 0 ? true : _ref$caret,
      rest = _objectWithoutProperties(_ref, ["items", "text", "icon", "size", "variant", "title", "caret"]);

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

  var refMenuCallback = (0, _react.useCallback)(function (node) {
    if (node && node.getBoundingClientRect) {
      setMenuSize(node.getBoundingClientRect());
    }
  }, []);
  var refTriggerCallback = (0, _react.useCallback)(function (node) {
    if (node && node.getBoundingClientRect) {
      setTriggerSize(node.getBoundingClientRect());
    }
  }, []);
  return _react["default"].createElement(DropdownStyled, _extends({
    active: open,
    variant: variant,
    className: "sc-dropdown"
  }, rest), _react["default"].createElement(TriggerStyled, {
    variant: variant,
    size: size,
    className: "trigger",
    onBlur: function onBlur() {
      return setOpen(!open);
    },
    onFocus: function onFocus() {
      return setOpen(!open);
    },
    onClick: function onClick(event) {
      return event.stopPropagation();
    },
    tabIndex: "0",
    title: title,
    ref: refTriggerCallback
  }, icon && _react["default"].createElement(_Button.ButtonIcon, {
    text: text,
    size: size
  }, icon), text && _react["default"].createElement(_Button.ButtonText, {
    className: "sc-trigger-text"
  }, text), caret && _react["default"].createElement(Caret, null, _react["default"].createElement("i", {
    className: "fas fa-caret-down"
  })), open && _react["default"].createElement(DropdownMenuStyled, {
    className: "menu-item",
    postion: "right",
    ref: refMenuCallback,
    size: menuSize,
    triggerSize: triggerSize
  }, items.map(function (_ref2) {
    var label = _ref2.label,
        onClick = _ref2.onClick,
        itemRest = _objectWithoutProperties(_ref2, ["label", "onClick"]);

    return _react["default"].createElement(DropdownMenuItemStyled, _extends({
      className: "menu-item-label",
      key: label,
      onClick: onClick,
      variant: variant
    }, itemRest), label);
  }))));
}

var _default = Dropdown;
exports["default"] = _default;