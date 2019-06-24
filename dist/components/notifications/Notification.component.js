"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _polished = require("polished");

var _Button = _interopRequireDefault(require("../button/Button.component"));

var defaultTheme = _interopRequireWildcard(require("../../style/theme"));

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n  position: absolute;\n  top: 15px;\n  right: 15px;\n  cursor: pointer;\n  &:hover {\n    color: ", ";\n  }\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n      background-color: ", ";\n      width: ", "%;\n      transition: width 1s;\n      transition-timing-function: linear;\n    "]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  height: 5px;\n  border-radius: 5px;\n  ", ";\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  padding: 0 ", " ", " 0;\n  font-weight: ", ";\n"]);

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
  var data = _taggedTemplateLiteral(["\n  position: relative;\n  padding: ", ";\n  margin-top: ", ";\n  border-radius: 5px;\n  box-shadow: 5px 5px 15px ", ";\n\n  ", ";\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var NotificationContainer = _styledComponents.default.div(_templateObject(), defaultTheme.padding.base, defaultTheme.padding.base, defaultTheme.gray, function (props) {
  var brandingTheme = (0, _utils.mergeTheme)(props.theme, defaultTheme);
  return (0, _styledComponents.css)(_templateObject2(), brandingTheme[props.variant || "primary"], defaultTheme.white);
});

var NotificationTitle = _styledComponents.default.div(_templateObject3(), defaultTheme.padding.base, defaultTheme.padding.smaller, defaultTheme.fontWeight.bold);

var NotificationDismissProgress = _styledComponents.default.div(_templateObject4(), function (props) {
  var brandingTheme = (0, _utils.mergeTheme)(props.theme, defaultTheme);
  var brandDark = (0, _polished.darken)(0.1, brandingTheme[props.variant || "primary"]);
  return (0, _styledComponents.css)(_templateObject5(), brandDark, props.value / props.max * 100);
});

var NotificationClose = _styledComponents.default.div(_templateObject6(), defaultTheme.grayLightest);

function Notification(props) {
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
  }, [dismissProgress]);

  var clearTimer = function clearTimer() {
    if (props.dismissAfter) {
      setTimerId(null);
      clearInterval(timerId);
    }
  };

  var resumeTimer = function resumeTimer() {
    if (props.dismissAfter) {
      if (dismissProgressRef.current === props.dismissAfter) {
        dismiss();
      } else if (!timerId) {
        setTimerId(setInterval(function () {
          setDismissProgress(dismissProgressRef.current + 1000);
        }, 1000));
      }
    }
  };

  var dismiss = function dismiss() {
    if (timerId) {
      clearTimer();
    }

    props.onDismiss && props.onDismiss(props.uid);
  };

  return _react.default.createElement(NotificationContainer, {
    className: "sc-notification",
    variant: props.variant,
    onMouseEnter: clearTimer,
    onMouseLeave: resumeTimer
  }, _react.default.createElement(NotificationTitle, null, props.title), _react.default.createElement("div", null, props.message), !!props.dismissAfter && _react.default.createElement(NotificationDismissProgress, {
    value: dismissProgress,
    max: props.dismissAfter,
    variant: props.variant
  }), _react.default.createElement(NotificationClose, {
    onClick: dismiss
  }, _react.default.createElement("i", {
    className: "fas fa-times"
  })));
}

var _default = Notification;
exports.default = _default;