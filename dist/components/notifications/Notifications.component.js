"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.BOTTOM_RIGHT = exports.BOTTOM_LEFT = exports.TOP_RIGHT = exports.TOP_LEFT = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var defaultTheme = _interopRequireWildcard(require("../../style/theme"));

var _Notification = _interopRequireDefault(require("./Notification.component"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n          top: 0;\n          right: 0;\n        "]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n          bottom: 0;\n          left: 0;\n        "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n          bottom: 0;\n          right: 0;\n        "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n          top: 0;\n          left: 0;\n        "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  position: fixed;\n  z-index: ", ";\n  margin: ", ";\n  ", ";\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var TOP_LEFT = "tl";
exports.TOP_LEFT = TOP_LEFT;
var TOP_RIGHT = "tr";
exports.TOP_RIGHT = TOP_RIGHT;
var BOTTOM_LEFT = "bl";
exports.BOTTOM_LEFT = BOTTOM_LEFT;
var BOTTOM_RIGHT = "br";
exports.BOTTOM_RIGHT = BOTTOM_RIGHT;

var NotificationsContainer = _styledComponents["default"].div(_templateObject(), defaultTheme.zIndex.notification, defaultTheme.padding.larger, function (props) {
  switch (props.position) {
    case TOP_LEFT:
      return (0, _styledComponents.css)(_templateObject2());

    case BOTTOM_RIGHT:
      return (0, _styledComponents.css)(_templateObject3());

    case BOTTOM_LEFT:
      return (0, _styledComponents.css)(_templateObject4());

    default:
      return (0, _styledComponents.css)(_templateObject5());
  }
});

function Notifications(_ref) {
  var position = _ref.position,
      notifications = _ref.notifications,
      onDismiss = _ref.onDismiss,
      rest = _objectWithoutProperties(_ref, ["position", "notifications", "onDismiss"]);

  return _react["default"].createElement(NotificationsContainer, _extends({
    className: "sc-notifications",
    position: position
  }, rest), notifications.map(function (notification) {
    return _react["default"].createElement(_Notification["default"], _extends({
      key: notification.uid
    }, notification, {
      onDismiss: onDismiss
    }));
  }));
}

var _default = Notifications;
exports["default"] = _default;