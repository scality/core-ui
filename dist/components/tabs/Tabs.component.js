"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Tab;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var defaultTheme = _interopRequireWildcard(require("../../style/theme"));

var _utils = require("../../utils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _templateObject8() {
  var data = _taggedTemplateLiteral(["\n  margin: 0;\n  padding: ", ";\n"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteral(["\n          color: ", ";\n        "]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n          color: ", ";\n          background-color: ", ";\n        "]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  margin: 0;\n  font-size: ", ";\n  padding: ", " 0 16.5px;\n  ", "\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n        &:hover {\n          cursor: pointer;\n          background-color: ", ";\n        }\n      "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  flex-basis: 15%;\n  flex-shrink: 1;\n  text-align: center;\n  ", "\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  position: relative;\n  height: 50px;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  margin: ", " 0;\n  * {\n    box-sizing: border-box;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var TabsContainer = _styledComponents["default"].div(_templateObject(), defaultTheme.padding.base);

var TabBar = _styledComponents["default"].div(_templateObject2());

var TabItem = _styledComponents["default"].div(_templateObject3(), function (props) {
  return !props.selected && (0, _styledComponents.css)(_templateObject4(), (0, _utils.getTheme)(props).primary);
});

var TabItemTitle = _styledComponents["default"].p(_templateObject5(), defaultTheme.fontSize.large, defaultTheme.padding.base, function (props) {
  var _getTheme = (0, _utils.getTheme)(props),
      textPrimary = _getTheme.textPrimary;

  return props.selected ? (0, _styledComponents.css)(_templateObject6(), textPrimary, (0, _utils.getTheme)(props).primary) : (0, _styledComponents.css)(_templateObject7(), textPrimary);
});

var TabContent = _styledComponents["default"].div(_templateObject8(), defaultTheme.padding.larger);

function Tab(_ref) {
  var items = _ref.items,
      children = _ref.children,
      rest = _objectWithoutProperties(_ref, ["items", "children"]);

  return _react["default"].createElement(TabsContainer, _extends({
    className: "sc-tabs"
  }, rest), _react["default"].createElement(TabBar, {
    className: "sc-tabs-bar"
  }, items.map(function (_ref2, index) {
    var onClick = _ref2.onClick,
        selected = _ref2.selected,
        title = _ref2.title,
        itemRest = _objectWithoutProperties(_ref2, ["onClick", "selected", "title"]);

    return _react["default"].createElement(TabItem, _extends({
      className: "sc-tabs-item",
      key: index,
      onClick: selected ? function () {} : onClick,
      selected: selected
    }, itemRest), _react["default"].createElement(TabItemTitle, {
      className: "sc-tabs-item-title",
      selected: selected
    }, title));
  })), _react["default"].createElement(TabContent, {
    className: "sc-tabs-item-content"
  }, children));
}