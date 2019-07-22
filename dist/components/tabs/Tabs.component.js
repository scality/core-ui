"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Tab;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var defaultTheme = _interopRequireWildcard(require("../../style/theme"));

var _utils = require("../../utils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _templateObject7() {
  var data = _taggedTemplateLiteral(["\n  margin: 0;\n  padding: ", ";\n"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n        color: ", ";\n        border-bottom: 2px solid ", ";\n        font-weight: ", ";\n      "]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  margin: 0;\n  color: ", ";\n  padding: ", " 0 14px;\n  ", "\n  font-size: ", ";\n"]);

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
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  border-bottom: 2px solid ", ";\n  position: relative;\n  height: 50px;\n"]);

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

var TabsContainer = _styledComponents.default.div(_templateObject(), defaultTheme.padding.base);

var TabBar = _styledComponents.default.div(_templateObject2(), defaultTheme.grayLight);

var TabItem = _styledComponents.default.div(_templateObject3(), function (props) {
  return !props.selected && (0, _styledComponents.css)(_templateObject4(), defaultTheme.grayLightest);
});

var TabItemTitle = _styledComponents.default.p(_templateObject5(), defaultTheme.textColor, defaultTheme.padding.base, function (props) {
  var brandingTheme = (0, _utils.mergeTheme)(props.theme, defaultTheme);
  var activeColor = props.activeColor || brandingTheme.primary;
  return props.selected && (0, _styledComponents.css)(_templateObject6(), activeColor, activeColor, defaultTheme.fontWeight.bold);
}, defaultTheme.fontSize.large);

var TabContent = _styledComponents.default.div(_templateObject7(), defaultTheme.padding.larger);

function Tab(_ref) {
  var items = _ref.items,
      children = _ref.children,
      activeColor = _ref.activeColor,
      rest = _objectWithoutProperties(_ref, ["items", "children", "activeColor"]);

  return _react.default.createElement(TabsContainer, _extends({
    className: "sc-tabs"
  }, rest), _react.default.createElement(TabBar, {
    className: "sc-tabs-bar"
  }, items.map(function (_ref2, index) {
    var onClick = _ref2.onClick,
        selected = _ref2.selected,
        title = _ref2.title,
        itemRest = _objectWithoutProperties(_ref2, ["onClick", "selected", "title"]);

    return _react.default.createElement(TabItem, _extends({
      className: "sc-tabs-item",
      key: index,
      onClick: selected ? function () {} : onClick,
      selected: selected
    }, itemRest), _react.default.createElement(TabItemTitle, {
      className: "sc-tabs-item-title",
      selected: selected,
      activeColor: activeColor
    }, title));
  })), _react.default.createElement(TabContent, {
    className: "sc-tabs-item-content"
  }, children));
}