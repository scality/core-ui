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

function _templateObject14() {
  var data = _taggedTemplateLiteral(["\n      @keyframes widthAnimation {\n        from {\n          width: 0%;\n        }\n        to {\n          width: ", " + \"%\";\n        }\n      }\n      animation-duration: 1s;\n      animation-fill-mode: both;\n      animation-name: widthAnimation;\n\n      background-color: ", "\n      width: ", "%;\n    "]);

  _templateObject14 = function _templateObject14() {
    return data;
  };

  return data;
}

function _templateObject13() {
  var data = _taggedTemplateLiteral(["\n  border-radius: 12px;\n  height: 100%;\n  ", "\n"]);

  _templateObject13 = function _templateObject13() {
    return data;
  };

  return data;
}

function _templateObject12() {
  var data = _taggedTemplateLiteral(["\n  margin: ", " 0 0 0;\n"]);

  _templateObject12 = function _templateObject12() {
    return data;
  };

  return data;
}

function _templateObject11() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin: 0 0 ", " 0;\n"]);

  _templateObject11 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10() {
  var data = _taggedTemplateLiteral(["\n  color: ", "};\n  display: inline-block;\n"]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = _taggedTemplateLiteral(["\n  display: inline-block;\n  color: ", ";\n  font-size: ", ";\n"]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = _taggedTemplateLiteral(["\n  font-size: ", ";\n  display: inline-block;\n  font-weight: ", ";\n  color: ", "};\n"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteral(["\n          height: 10px;\n        "]);

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
  var data = _taggedTemplateLiteral(["\n          height: 15px;\n        "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n          height: 10px;\n        "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  background: ", ";\n  border-radius: 12px;\n\n  ", "\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  margin: ", ";\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Container = _styledComponents["default"].div(_templateObject(), defaultTheme.padding.small);

var ProgressBarContainer = _styledComponents["default"].div(_templateObject2(), defaultTheme.grayLight, function (props) {
  switch (props.size) {
    case "smaller":
      return (0, _styledComponents.css)(_templateObject3());

    case "small":
      return (0, _styledComponents.css)(_templateObject4());

    case "large":
      return (0, _styledComponents.css)(_templateObject5());

    case "larger":
      return (0, _styledComponents.css)(_templateObject6());

    default:
      return (0, _styledComponents.css)(_templateObject7());
  }
});

var TopLeftLabel = _styledComponents["default"].span(_templateObject8(), defaultTheme.fontSize.large, defaultTheme.fontWeight.bold, (0, _utils.getThemePropSelector)("text"));

var TopRightLabel = _styledComponents["default"].span(_templateObject9(), defaultTheme.gray, defaultTheme.fontSize.small);

var BottomLabel = _styledComponents["default"].span(_templateObject10(), (0, _utils.getThemePropSelector)("text"));

var TopLabelsContainer = _styledComponents["default"].div(_templateObject11(), defaultTheme.padding.smaller);

var BottomLabelsContainer = (0, _styledComponents["default"])(TopLabelsContainer)(_templateObject12(), defaultTheme.padding.smaller);

var FilledAreaContainer = _styledComponents["default"].div(_templateObject13(), function (props) {
  return (0, _styledComponents.css)(_templateObject14(), props.width, props.color || (0, _utils.getTheme)(props).secondary, props.width);
});

function ProgressBar(_ref) {
  var _ref$percentage = _ref.percentage,
      percentage = _ref$percentage === void 0 ? 50 : _ref$percentage,
      _ref$size = _ref.size,
      size = _ref$size === void 0 ? "base" : _ref$size,
      color = _ref.color,
      _ref$topLeftLabel = _ref.topLeftLabel,
      topLeftLabel = _ref$topLeftLabel === void 0 ? "" : _ref$topLeftLabel,
      _ref$topRightLabel = _ref.topRightLabel,
      topRightLabel = _ref$topRightLabel === void 0 ? "" : _ref$topRightLabel,
      _ref$bottomLeftLabel = _ref.bottomLeftLabel,
      bottomLeftLabel = _ref$bottomLeftLabel === void 0 ? "" : _ref$bottomLeftLabel,
      _ref$bottomRightLabel = _ref.bottomRightLabel,
      bottomRightLabel = _ref$bottomRightLabel === void 0 ? "" : _ref$bottomRightLabel;
  return _react["default"].createElement(Container, {
    className: "sc-progressbar"
  }, (topLeftLabel || topRightLabel) && _react["default"].createElement(TopLabelsContainer, null, topLeftLabel && _react["default"].createElement(TopLeftLabel, {
    className: "sc-progressbar-topLeftLabel"
  }, topLeftLabel), topRightLabel && _react["default"].createElement(TopRightLabel, {
    className: "sc-progressbar-toprightlabel"
  }, topRightLabel)), _react["default"].createElement(ProgressBarContainer, {
    size: size
  }, _react["default"].createElement(FilledAreaContainer, {
    color: color,
    width: percentage
  })), (bottomLeftLabel || bottomRightLabel) && _react["default"].createElement(BottomLabelsContainer, null, bottomLeftLabel && _react["default"].createElement(BottomLabel, {
    className: "sc-progressbar-bottomleftlabel"
  }, bottomLeftLabel), bottomRightLabel && _react["default"].createElement(BottomLabel, {
    className: "sc-progressbar-bottomrightlabel"
  }, bottomRightLabel)));
}

var _default = ProgressBar;
exports["default"] = _default;