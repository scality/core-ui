"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var defaultTheme = _interopRequireWildcard(require("../../style/theme"));

var _utils = require("../../utils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject12() {
  var data = _taggedTemplateLiteral(["\n        border-left: 2px solid ", ";\n      "]);

  _templateObject12 = function _templateObject12() {
    return data;
  };

  return data;
}

function _templateObject11() {
  var data = _taggedTemplateLiteral(["\n        border-left: 2px solid ", ";\n      "]);

  _templateObject11 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10() {
  var data = _taggedTemplateLiteral(["\n  flex-grow: 1;\n  margin: 0;\n  border: none;\n  margin: 2px 14px;\n\n  ", ";\n"]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = _taggedTemplateLiteral(["\n  padding: ", ";\n"]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = _taggedTemplateLiteral(["\n  padding: 8px;\n"]);

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
  var data = _taggedTemplateLiteral(["\n        background-color: ", ";\n        color: ", ";\n      "]);

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

var SteppersContainer = _styledComponents.default.div(_templateObject());

var StepContainer = _styledComponents.default.div(_templateObject2());

var Panel = _styledComponents.default.div(_templateObject3());

var Circle = _styledComponents.default.div(_templateObject4(), function (props) {
  var brandingTheme = (0, _utils.mergeTheme)(props.theme, defaultTheme);

  if (props.active) {
    return (0, _styledComponents.css)(_templateObject5(), brandingTheme.primary, defaultTheme.white);
  } else if (props.completed) {
    return (0, _styledComponents.css)(_templateObject6(), brandingTheme.success, defaultTheme.white);
  } else {
    return (0, _styledComponents.css)(_templateObject7(), defaultTheme.gray, defaultTheme.white);
  }
});

var StepHeader = _styledComponents.default.span(_templateObject8());

var StepContent = _styledComponents.default.div(_templateObject9(), defaultTheme.padding.small);

var BottomBar = _styledComponents.default.hr(_templateObject10(), function (props) {
  var brandingTheme = (0, _utils.mergeTheme)(props.theme, defaultTheme);

  if (props.completed) {
    return (0, _styledComponents.css)(_templateObject11(), brandingTheme.success);
  } else {
    return (0, _styledComponents.css)(_templateObject12(), defaultTheme.gray);
  }
});

function Step(props) {
  var title = props.title,
      content = props.content,
      active = props.active,
      completed = props.completed,
      isLast = props.isLast,
      index = props.index;
  var circleContent = completed ? _react.default.createElement("i", {
    className: "fas fa-check"
  }) : index + 1;
  return _react.default.createElement(StepContainer, null, _react.default.createElement(Panel, null, _react.default.createElement(Circle, {
    active: active,
    completed: completed
  }, _react.default.createElement("span", null, circleContent)), !isLast && _react.default.createElement(BottomBar, {
    completed: completed
  })), _react.default.createElement(Panel, null, _react.default.createElement(StepHeader, {
    completed: completed
  }, title), active && _react.default.createElement(StepContent, null, content)));
}

function Steppers(props) {
  var steps = props.steps,
      activeStep = props.activeStep;
  return _react.default.createElement(SteppersContainer, {
    className: "sc-steppers"
  }, steps.map(function (step, index) {
    return _react.default.createElement(Step, {
      key: index,
      title: step.title,
      content: step.content,
      active: index === activeStep,
      completed: index < activeStep,
      isLast: index === steps.length - 1,
      index: index
    });
  }));
}

var _default = Steppers;
exports.default = _default;