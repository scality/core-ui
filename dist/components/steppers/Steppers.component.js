"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var defaultTheme = _interopRequireWildcard(require("../../style/theme"));

var _Loader = _interopRequireDefault(require("../loader/Loader.component"));

var _utils = require("../../utils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _templateObject13() {
  var data = _taggedTemplateLiteral(["\n        border-left: 2px solid ", ";\n      "]);

  _templateObject13 = function _templateObject13() {
    return data;
  };

  return data;
}

function _templateObject12() {
  var data = _taggedTemplateLiteral(["\n        border-left: 2px solid ", ";\n      "]);

  _templateObject12 = function _templateObject12() {
    return data;
  };

  return data;
}

function _templateObject11() {
  var data = _taggedTemplateLiteral(["\n  flex-grow: 1;\n  margin: 0;\n  border: none;\n  margin: 2px 14px;\n\n  ", ";\n"]);

  _templateObject11 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10() {
  var data = _taggedTemplateLiteral(["\n  padding: ", ";\n"]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = _taggedTemplateLiteral(["\n  padding: 8px;\n  color: ", ";\n"]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = _taggedTemplateLiteral(["\n        background-color: ", ";\n        color: ", ";\n      "]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteral(["\n        background-color: ", ";\n        color: ", ";\n      "]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n        background-color: ", ";\n        color: ", ";\n        svg {\n          fill: ", ";\n        }\n      "]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n        background-color: ", ";\n        color: ", ";\n      "]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 30px;\n  height: 30px;\n  border-radius: 50%;\n\n  ", ";\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  min-height: 50px;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral([""]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var SteppersContainer = _styledComponents["default"].div(_templateObject());

var StepContainer = _styledComponents["default"].div(_templateObject2());

var Panel = _styledComponents["default"].div(_templateObject3());

var Circle = _styledComponents["default"].div(_templateObject4(), function (props) {
  var _getTheme = (0, _utils.getTheme)(props),
      danger = _getTheme.danger,
      success = _getTheme.success,
      secondary = _getTheme.secondary;

  if (props.error) {
    return (0, _styledComponents.css)(_templateObject5(), danger, defaultTheme.white);
  } else if (props.active) {
    return (0, _styledComponents.css)(_templateObject6(), secondary, defaultTheme.white, defaultTheme.white);
  } else if (props.completed) {
    return (0, _styledComponents.css)(_templateObject7(), success, defaultTheme.white);
  } else {
    return (0, _styledComponents.css)(_templateObject8(), defaultTheme.gray, defaultTheme.white);
  }
});

var StepHeader = _styledComponents["default"].span(_templateObject9(), (0, _utils.getThemePropSelector)("textPrimary"));

var StepContent = _styledComponents["default"].div(_templateObject10(), defaultTheme.padding.small);

var BottomBar = _styledComponents["default"].hr(_templateObject11(), function (props) {
  if (props.completed) {
    return (0, _styledComponents.css)(_templateObject12(), (0, _utils.getTheme)(props).success);
  } else {
    return (0, _styledComponents.css)(_templateObject13(), defaultTheme.gray);
  }
});

function Step(props) {
  var title = props.title,
      content = props.content,
      active = props.active,
      completed = props.completed,
      isLast = props.isLast,
      index = props.index,
      error = props.error,
      inProgress = props.inProgress;
  var circleContent = completed ? _react["default"].createElement("i", {
    className: "fas fa-check"
  }) : index + 1;
  return _react["default"].createElement(StepContainer, null, _react["default"].createElement(Panel, null, _react["default"].createElement(Circle, {
    active: active,
    error: error,
    completed: completed
  }, active && inProgress ? _react["default"].createElement(_Loader["default"], {
    size: "base"
  }) : _react["default"].createElement("span", null, circleContent)), !isLast && _react["default"].createElement(BottomBar, {
    completed: completed
  })), _react["default"].createElement(Panel, null, _react["default"].createElement(StepHeader, {
    completed: completed
  }, title), active && _react["default"].createElement(StepContent, null, content)));
}

function Steppers(_ref) {
  var steps = _ref.steps,
      activeStep = _ref.activeStep,
      rest = _objectWithoutProperties(_ref, ["steps", "activeStep"]);

  return _react["default"].createElement(SteppersContainer, _extends({
    className: "sc-steppers"
  }, rest), steps.map(function (_ref2, index) {
    var title = _ref2.title,
        content = _ref2.content,
        stepRest = _objectWithoutProperties(_ref2, ["title", "content"]);

    return _react["default"].createElement(Step, _extends({
      key: index,
      title: title,
      content: content,
      active: index === activeStep,
      completed: index < activeStep,
      isLast: index === steps.length - 1,
      index: index
    }, stepRest));
  }));
}

var _default = Steppers;
exports["default"] = _default;