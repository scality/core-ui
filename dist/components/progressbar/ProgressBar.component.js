"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _utils = require("../../utils");

var defaultTheme = _interopRequireWildcard(require("../../style/theme"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject17() {
  var data = _taggedTemplateLiteral(["\n  color: ", "};\n  padding-right:5px;\n"]);

  _templateObject17 = function _templateObject17() {
    return data;
  };

  return data;
}

function _templateObject16() {
  var data = _taggedTemplateLiteral(["\n        background-color: ", ";\n        width: ", "%;\n      "]);

  _templateObject16 = function _templateObject16() {
    return data;
  };

  return data;
}

function _templateObject15() {
  var data = _taggedTemplateLiteral(["\n      @keyframes widthAnimation {\n        from {\n          width: 0%;\n        }\n        to {\n          width: ", " + \"%\";\n        }\n      }\n      animation-duration: 1s;\n      animation-fill-mode: both;\n      animation-name: widthAnimation;\n\n      background-color: ", "\n      width: ", "%;\n    "]);

  _templateObject15 = function _templateObject15() {
    return data;
  };

  return data;
}

function _templateObject14() {
  var data = _taggedTemplateLiteral(["\n  border-radius: 12px;\n  height: 100%;\n  ", "\n"]);

  _templateObject14 = function _templateObject14() {
    return data;
  };

  return data;
}

function _templateObject13() {
  var data = _taggedTemplateLiteral(["\n  margin: ", " 0 0 0;\n  font-size: ", ";\n"]);

  _templateObject13 = function _templateObject13() {
    return data;
  };

  return data;
}

function _templateObject12() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin: 0 0 ", " 0;\n"]);

  _templateObject12 = function _templateObject12() {
    return data;
  };

  return data;
}

function _templateObject11() {
  var data = _taggedTemplateLiteral(["\n  display: inline-block; \n  color: ", "};\n"]);

  _templateObject11 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10() {
  var data = _taggedTemplateLiteral(["\n  display: inline-block;\n  font-size: ", ";\n  color: ", "};\n"]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = _taggedTemplateLiteral(["\n  display: inline-block;\n  font-size: ", ";\n  font-weight: ", ";\n  color: ", "};\n"]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = _taggedTemplateLiteral(["     \n     border: 1px solid;\n     border-color: ", "};"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteral(["\n          height: 12px;\n          font-size: ", ";\n        "]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n          height: 20px;\n        "]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n          height: 15px;\n        "]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n          height: 12px;\n          font-size: ", ";\n        "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n          height: 10px;\n          font-size: ", ";\n        "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  border-radius: 12px;\n  justify-content: space-between;\n  align-items: center;\n\n  ", ";\n\n  background-color: ", ";\n  /* Add the border for the progress bar when there is label inside.*/\n  ", ";\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  /* margin: ", "; */\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Container = _styledComponents["default"].div(_templateObject(), defaultTheme.padding.small);

var ProgressBarContainer = _styledComponents["default"].div(_templateObject2(), function (props) {
  switch (props.size) {
    case "smaller":
      return (0, _styledComponents.css)(_templateObject3(), defaultTheme.fontSize.smaller);

    case "base":
      return (0, _styledComponents.css)(_templateObject4(), defaultTheme.fontSize.base);

    case "large":
      return (0, _styledComponents.css)(_templateObject5());

    case "larger":
      return (0, _styledComponents.css)(_templateObject6());

    default:
      return (0, _styledComponents.css)(_templateObject7(), defaultTheme.fontSize.base);
  }
}, function (props) {
  return props.backgroundColor;
}, function (props) {
  if (props.buildinLabel) {
    return (0, _styledComponents.css)(_templateObject8(), (0, _utils.getThemePropSelector)("border"));
  }
});

var TopLeftLabel = _styledComponents["default"].span(_templateObject9(), defaultTheme.fontSize.large, defaultTheme.fontWeight.bold, (0, _utils.getThemePropSelector)("textPrimary"));

var TopRightLabel = _styledComponents["default"].span(_templateObject10(), defaultTheme.fontSize.small, (0, _utils.getThemePropSelector)("textPrimary"));

var BottomLabel = _styledComponents["default"].span(_templateObject11(), (0, _utils.getThemePropSelector)("textSecondary"));

var TopLabelsContainer = _styledComponents["default"].div(_templateObject12(), defaultTheme.padding.smaller);

var BottomLabelsContainer = (0, _styledComponents["default"])(TopLabelsContainer)(_templateObject13(), defaultTheme.padding.smaller, defaultTheme.fontSize.smaller);

var FilledAreaContainer = _styledComponents["default"].div(_templateObject14(), function (props) {
  if (props.isAnimation) {
    return (0, _styledComponents.css)(_templateObject15(), props.width, props.color || (0, _utils.getTheme)(props).secondary, props.width);
  } else {
    return (0, _styledComponents.css)(_templateObject16(), props.color || (0, _utils.getTheme)(props).secondary, props.width);
  }
});

var BuildinLabel = _styledComponents["default"].span(_templateObject17(), (0, _utils.getThemePropSelector)("textPrimary"));

function ProgressBar(_ref) {
  var _ref$percentage = _ref.percentage,
      percentage = _ref$percentage === void 0 ? 50 : _ref$percentage,
      _ref$size = _ref.size,
      size = _ref$size === void 0 ? "base" : _ref$size,
      color = _ref.color,
      _ref$backgroundColor = _ref.backgroundColor,
      backgroundColor = _ref$backgroundColor === void 0 ? "#332C2C" : _ref$backgroundColor,
      topLeftLabel = _ref.topLeftLabel,
      topRightLabel = _ref.topRightLabel,
      bottomLeftLabel = _ref.bottomLeftLabel,
      bottomRightLabel = _ref.bottomRightLabel,
      buildinLabel = _ref.buildinLabel,
      _ref$isAnimation = _ref.isAnimation,
      isAnimation = _ref$isAnimation === void 0 ? false : _ref$isAnimation;
  return _react["default"].createElement(Container, {
    className: "sc-progressbar"
  }, (topLeftLabel || topRightLabel) && _react["default"].createElement(TopLabelsContainer, null, topLeftLabel && _react["default"].createElement(TopLeftLabel, {
    className: "sc-progressbar-topLeftLabel"
  }, topLeftLabel), topRightLabel && _react["default"].createElement(TopRightLabel, {
    className: "sc-progressbar-toprightlabel"
  }, topRightLabel)), _react["default"].createElement(ProgressBarContainer, {
    className: "sc-progressbarcontainer",
    size: size,
    buildinLabel: buildinLabel,
    backgroundColor: backgroundColor
  }, _react["default"].createElement(FilledAreaContainer, {
    color: color,
    width: percentage,
    isAnimation: isAnimation
  }), _react["default"].createElement(BuildinLabel, null, buildinLabel)), (bottomLeftLabel || bottomRightLabel) && _react["default"].createElement(BottomLabelsContainer, null, bottomLeftLabel && _react["default"].createElement(BottomLabel, {
    className: "sc-progressbar-bottomleftlabel"
  }, bottomLeftLabel), bottomRightLabel && _react["default"].createElement(BottomLabel, {
    className: "sc-progressbar-bottomrightlabel"
  }, bottomRightLabel)));
}

var _default = ProgressBar;
exports["default"] = _default;