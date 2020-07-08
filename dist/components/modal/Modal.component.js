"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var defaultTheme = _interopRequireWildcard(require("../../style/theme"));

var _utils = require("../../utils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _templateObject7() {
  var data = _taggedTemplateLiteral(["\n  font-size: ", ";\n  cursor: pointer;\n  &:hover {\n    color: ", ";\n  }\n"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n  padding: ", " ", ";\n  background-color: ", ";\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  padding: 0 ", ";\n  flex-grow: 1;\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  font-size: ", ";\n  font-weight: ", ";\n  flex-grow: 1;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  padding: ", " ", ";\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n  background-color: ", ";\n  color: ", ";\n  border-radius: 5px;\n  overflow: hidden;\n  min-width: 250px;\n  min-height: 150px;\n  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  position: fixed;\n  top: 0;\n  left: 0;\n  display: flex;\n  height: 100%;\n  width: 100%;\n  justify-content: center;\n  align-items: center;\n  background-color: rgba(0, 0, 0, 0.5);\n  z-index: ", ";\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var ModalContainer = _styledComponents["default"].div(_templateObject(), defaultTheme.zIndex.modal);

var ModalContent = _styledComponents["default"].div(_templateObject2(), (0, _utils.getThemePropSelector)("primary"), (0, _utils.getThemePropSelector)("textPrimary"));

var ModalHeader = _styledComponents["default"].div(_templateObject3(), defaultTheme.padding.base, defaultTheme.padding.larger);

var ModalHeaderTitle = _styledComponents["default"].span(_templateObject4(), defaultTheme.fontSize.large, defaultTheme.fontWeight.semibold);

var ModalBody = _styledComponents["default"].div(_templateObject5(), defaultTheme.padding.larger);

var ModalFooter = _styledComponents["default"].div(_templateObject6(), defaultTheme.padding.base, defaultTheme.padding.larger, (0, _utils.getThemePropSelector)("primaryDark1"));

var ModalClose = _styledComponents["default"].div(_templateObject7(), defaultTheme.fontSize.large, defaultTheme.grayLight);

var Modal = function Modal(_ref) {
  var isOpen = _ref.isOpen,
      close = _ref.close,
      title = _ref.title,
      children = _ref.children,
      footer = _ref.footer,
      rest = _objectWithoutProperties(_ref, ["isOpen", "close", "title", "children", "footer"]);

  return isOpen ? _react["default"].createElement(ModalContainer, _extends({
    className: "sc-modal"
  }, rest), _react["default"].createElement(ModalContent, {
    className: "sc-modal-content"
  }, _react["default"].createElement(ModalHeader, {
    className: "sc-modal-header"
  }, _react["default"].createElement(ModalHeaderTitle, null, title), _react["default"].createElement(ModalClose, {
    onClick: close
  }, _react["default"].createElement("i", {
    className: "fas fa-times"
  }))), _react["default"].createElement(ModalBody, {
    className: "sc-modal-body"
  }, children), footer && _react["default"].createElement(ModalFooter, {
    className: "sc-modal-footer"
  }, footer))) : null;
};

var _default = Modal;
exports["default"] = _default;