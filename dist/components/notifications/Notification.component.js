"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _polished = require("polished");

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

function _templateObject7() {
  var data = _taggedTemplateLiteral(["\n  position: absolute;\n  top: 15px;\n  right: 15px;\n  cursor: pointer;\n  &:hover {\n    color: ", ";\n  }\n"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n      background-color: ", ";\n      width: ", "%;\n      transition: width 1s;\n      transition-timing-function: linear;\n    "]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  height: 5px;\n  border-radius: 5px;\n  ", ";\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  padding: 0 ", " ", " 0;\n  font-weight: ", ";\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n          background-color: ", ";\n          color: ", ";\n        "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n          background-color: ", ";\n          color: ", ";\n        "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  position: relative;\n  padding: ", ";\n  margin-top: ", ";\n  border-radius: 5px;\n  box-shadow: 5px 5px 15px ", ";\n\n  ", "\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var NotificationContainer = _styledComponents["default"].div(_templateObject(), defaultTheme.padding.base, defaultTheme.padding.base, defaultTheme.gray, function (props) {
  switch (props.variant) {
    case "warning":
      return (0, _styledComponents.css)(_templateObject2(), (0, _utils.getTheme)(props)[props.variant || "primary"], defaultTheme.black);

    default:
      return (0, _styledComponents.css)(_templateObject3(), (0, _utils.getTheme)(props)[props.variant || "primary"], defaultTheme.white);
  }
});

var NotificationTitle = _styledComponents["default"].div(_templateObject4(), defaultTheme.padding.base, defaultTheme.padding.smaller, defaultTheme.fontWeight.bold);

var NotificationDismissProgress = _styledComponents["default"].div(_templateObject5(), function (props) {
  var brandDark = (0, _polished.darken)(0.1, (0, _utils.getTheme)(props)[props.variant || "primary"]);
  return (0, _styledComponents.css)(_templateObject6(), brandDark, props.value / props.max * 100);
});

var NotificationClose = _styledComponents["default"].div(_templateObject7(), defaultTheme.grayLightest);

function Notification(_ref) {
  var uid = _ref.uid,
      title = _ref.title,
      message = _ref.message,
      variant = _ref.variant,
      dismissAfter = _ref.dismissAfter,
      onDismiss = _ref.onDismiss,
      rest = _objectWithoutProperties(_ref, ["uid", "title", "message", "variant", "dismissAfter", "onDismiss"]);

  var _useState = (0, _react.useState)(0),
      _useState2 = _slicedToArray(_useState, 2),
      dismissProgress = _useState2[0],
      setDismissProgress = _useState2[1];

  var _useState3 = (0, _react.useState)(null),
      _useState4 = _slicedToArray(_useState3, 2),
      timerId = _useState4[0],
      setTimerId = _useState4[1];

  var dismissProgressRef = (0, _react.useRef)(dismissProgress);
  dismissProgressRef.current = dismissProgress;
  (0, _react.useEffect)(function () {
    resumeTimer();
  });

  var clearTimer = function clearTimer() {
    if (dismissAfter) {
      setTimerId(null);
      clearTimeout(timerId);
    }
  };

  var resumeTimer = function resumeTimer() {
    if (dismissAfter) {
      if (dismissProgressRef.current === dismissAfter) {
        dismiss();
      } else if (!timerId) {
        setTimerId(setTimeout(function () {
          setDismissProgress(dismissProgressRef.current + 1000);
          resumeTimer();
        }, 1000));
      }
    }
  };

  var dismiss = function dismiss() {
    if (timerId) {
      clearTimer();
    }

    onDismiss && onDismiss(uid);
  };

  return _react["default"].createElement(NotificationContainer, _extends({
    className: "sc-notification",
    variant: variant,
    onMouseEnter: clearTimer,
    onMouseLeave: resumeTimer
  }, rest), _react["default"].createElement(NotificationTitle, null, title), _react["default"].createElement("div", null, message), !!dismissAfter && _react["default"].createElement(NotificationDismissProgress, {
    value: dismissProgress,
    max: dismissAfter,
    variant: variant
  }), _react["default"].createElement(NotificationClose, {
    onClick: dismiss
  }, _react["default"].createElement("i", {
    className: "fas fa-times"
  })));
}

var _default = Notification;
exports["default"] = _default;