"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var defaultTheme = _interopRequireWildcard(require("../../style/theme"));

var _Checkbox = _interopRequireDefault(require("./../checkbox/Checkbox.component"));

var _Button = _interopRequireDefault(require("./../button/Button.component"));

var _Select = _interopRequireDefault(require("./../select/Select.component"));

var _utils = require("../../utils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _templateObject9() {
  var data = _taggedTemplateLiteral([""]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = _taggedTemplateLiteral(["\n  font-size: ", ";\n"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteral(["\n  padding: 0 ", ";\n"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-grow: 1;\n  align-items: center;\n  justify-content: space-between;\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  .sc-checkbox,\n  .sc-button {\n    margin: 0 ", ";\n  }\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  .sc-select-container {\n    width: 100%;\n  }\n  .sc-button {\n    margin: 0 ", ";\n  }\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  margin: ", " 0;\n  padding: ", " 0;\n  display: flex;\n  align-items: center;\n  border-bottom: 1px solid gray;\n  &:last-child {\n    border: none;\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  padding: ", " 0;\n  margin: 0;\n  font-weight: ", ";\n  font-size: ", ";\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  color: ", ";\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var MultiSelectContainer = _styledComponents["default"].div(_templateObject(), (0, _utils.getThemePropSelector)("textPrimary"));

var MultiSelectTitle = _styledComponents["default"].h3(_templateObject2(), defaultTheme.padding.base, defaultTheme.fontWeight.bold, defaultTheme.fontSize.large);

var MultiSelectItemContainer = _styledComponents["default"].div(_templateObject3(), defaultTheme.padding.smaller, defaultTheme.padding.small);

var MultiSelectSearchContainer = _styledComponents["default"].div(_templateObject4(), defaultTheme.padding.small);

var MultiSelectItemLeft = _styledComponents["default"].div(_templateObject5(), defaultTheme.padding.small);

var MultiSelectItemCenter = _styledComponents["default"].div(_templateObject6());

var MultiSelectItemRight = _styledComponents["default"].div(_templateObject7(), defaultTheme.padding.base);

var MultiSelectItemLabel = _styledComponents["default"].span(_templateObject8(), defaultTheme.fontSize.large);

var MultiSelectItemDescription = _styledComponents["default"].span(_templateObject9());

function MultiSelectItem(props) {
  var selected = props.selected,
      label = props.label,
      description = props.description,
      onItemRemove = props.onItemRemove,
      onSelect = props.onSelect,
      isFavorite = props.isFavorite,
      onFavoriteClick = props.onFavoriteClick;
  return _react["default"].createElement(MultiSelectItemContainer, {
    className: "sc-multi-select-item"
  }, _react["default"].createElement(MultiSelectItemLeft, {
    className: "sc-multi-select-item-left"
  }, typeof selected === "boolean" && onSelect && _react["default"].createElement(_Checkbox["default"], {
    checked: selected,
    onChange: function onChange(event) {
      return onSelect(label, event);
    }
  }), typeof isFavorite === "boolean" && onFavoriteClick && _react["default"].createElement(_Button["default"], {
    inverted: true,
    icon: _react["default"].createElement("i", {
      className: "".concat(isFavorite ? "fas" : "far", " fa-star")
    }),
    onClick: function onClick(event) {
      return onFavoriteClick(label, event);
    }
  })), _react["default"].createElement(MultiSelectItemCenter, {
    className: "sc-multi-select-item-center"
  }, _react["default"].createElement(MultiSelectItemLabel, {
    className: "sc-multi-select-item-label"
  }, label), description && _react["default"].createElement(MultiSelectItemDescription, {
    className: "sc-multi-select-item-description"
  }, description)), _react["default"].createElement(MultiSelectItemRight, {
    className: "sc-multi-select-item-right"
  }, onItemRemove && _react["default"].createElement(_Button["default"], {
    inverted: true,
    variant: "danger",
    onClick: function onClick(event) {
      return onItemRemove(label, event);
    },
    icon: _react["default"].createElement("i", {
      className: "fas fa-trash"
    })
  })));
}

function MultiSelectSearch(props) {
  var selectedOption = props.selectedOption,
      options = props.options,
      placeholder = props.placeholder,
      onSelect = props.onSelect,
      onAdd = props.onAdd,
      rest = _objectWithoutProperties(props, ["selectedOption", "options", "placeholder", "onSelect", "onAdd"]);

  return _react["default"].createElement(MultiSelectSearchContainer, {
    className: "sc-multi-select-list-search"
  }, _react["default"].createElement(_Select["default"], _extends({
    options: options,
    onChange: onSelect,
    placeholder: placeholder,
    value: selectedOption
  }, rest)), onAdd && _react["default"].createElement(_Button["default"], {
    onClick: onAdd,
    icon: _react["default"].createElement("i", {
      className: "fas fa-plus"
    })
  }));
}

function MultiSelectList(_ref) {
  var _ref$title = _ref.title,
      title = _ref$title === void 0 ? "" : _ref$title,
      _ref$items = _ref.items,
      items = _ref$items === void 0 ? [] : _ref$items,
      search = _ref.search,
      onItemRemove = _ref.onItemRemove;
  return _react["default"].createElement(MultiSelectContainer, {
    className: "sc-multi-select-list"
  }, title && _react["default"].createElement(MultiSelectTitle, null, title), search && _react["default"].createElement(MultiSelectSearch, search), items.map(function (item, index) {
    return _react["default"].createElement(MultiSelectItem, _extends({
      key: "sc-multi-select-item-".concat(index),
      onItemRemove: onItemRemove
    }, item));
  }));
}

var _default = MultiSelectList;
exports["default"] = _default;