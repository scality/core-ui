"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.ChipsText = exports.ChipsIcon = void 0;

var defaultTheme = _interopRequireWildcard(require("../../style/theme"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _Button = _interopRequireDefault(require("../button/Button.component"));

var _react = _interopRequireDefault(require("react"));

var _polished = require("polished");

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _templateObject11() {
  var data = _taggedTemplateLiteral(["\n  display: inline-flex;\n  justify-content: center;\n  align-items: center;\n  padding: ", ";\n"]);

  _templateObject11 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10() {
  var data = _taggedTemplateLiteral(["\n  display: inline-flex;\n  justify-content: center;\n  align-items: center;\n  background-color: ", ";\n"]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = _taggedTemplateLiteral(["\n          background-color: ", ";\n          font-size: ", ";\n        "]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = _taggedTemplateLiteral(["\n          background-color: ", ";\n          font-size: ", ";\n          &:hover {\n            cursor: pointer;\n            background-color: ", ";\n          }\n          &:active {\n            background-color: ", ";\n          }\n        "]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteral(["\n    ", "\n  "]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n          border-radius: 12px;\n          .sc-chips-icon {\n            border-radius: 12px;\n            padding: 6px;\n          }\n        "]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n          border-radius: 17px;\n          .sc-chips-icon {\n            border-radius: 17px;\n            padding: 7px;\n          }\n        "]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n          border-radius: 14px;\n          .sc-chips-icon {\n            border-radius: 14px;\n            padding: 6px;\n          }\n        "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n          border-radius: 12px;\n          .sc-chips-icon {\n            border-radius: 12px;\n            padding: 6px;\n          }\n        "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n          border-radius: 10px;\n          .sc-chips-icon {\n            border-radius: 10px;\n            padding: 5px;\n          }\n        "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  display: inline-flex;\n  .sc-chips-remove {\n    padding-right: 10px;\n    color: ", ";\n    &:hover {\n      color: ", ";\n    }\n  }\n  ", "\n", "\n\n  ", "\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var ChipsContainer = _styledComponents["default"].div(_templateObject(), defaultTheme.white, defaultTheme.grayLight, function (props) {
  switch (props.size) {
    case "smaller":
      return (0, _styledComponents.css)(_templateObject2());

    case "small":
      return (0, _styledComponents.css)(_templateObject3());

    case "large":
      return (0, _styledComponents.css)(_templateObject4());

    case "larger":
      return (0, _styledComponents.css)(_templateObject5());

    default:
      return (0, _styledComponents.css)(_templateObject6());
  }
}, function (props) {
  return (0, _styledComponents.css)(_templateObject7(), props.variant === "warning" ? "color: ".concat(defaultTheme.blackLight) : "color: ".concat(defaultTheme.white));
}, function (props) {
  var brand = (0, _utils.getTheme)(props);
  var brandLight = (0, _polished.lighten)(0.1, brand[props.variant]).toString();
  return props.onClick ? (0, _styledComponents.css)(_templateObject8(), brand[props.variant], defaultTheme.fontSize[props.size], brandLight, brand[props.variant]) : (0, _styledComponents.css)(_templateObject9(), brand[props.variant], defaultTheme.fontSize[props.size]);
});

var ChipsIcon = _styledComponents["default"].span(_templateObject10(), function (props) {
  return (0, _polished.lighten)(0.15, (0, _utils.getTheme)(props)[props.variant]).toString();
});

exports.ChipsIcon = ChipsIcon;

var ChipsText = _styledComponents["default"].span(_templateObject11(), function (props) {
  return props.icon || props.onRemove ? "5px" : "5px 10px";
});

exports.ChipsText = ChipsText;

var Chips = function Chips(_ref) {
  var _ref$text = _ref.text,
      text = _ref$text === void 0 ? "" : _ref$text,
      _ref$variant = _ref.variant,
      variant = _ref$variant === void 0 ? defaultTheme.brand.primary : _ref$variant,
      _ref$icon = _ref.icon,
      icon = _ref$icon === void 0 ? null : _ref$icon,
      onClick = _ref.onClick,
      onRemove = _ref.onRemove,
      _ref$size = _ref.size,
      size = _ref$size === void 0 ? "base" : _ref$size;
  return _react["default"].createElement(ChipsContainer, {
    className: "sc-chips",
    onClick: onClick,
    variant: variant,
    icon: icon,
    size: size
  }, icon && _react["default"].createElement(ChipsIcon, {
    className: "sc-chips-icon",
    text: text,
    variant: variant,
    size: size
  }, icon), _react["default"].createElement(ChipsText, {
    className: "sc-chips-text",
    icon: icon,
    onRemove: onRemove
  }, text), onRemove && _react["default"].createElement(_Button["default"], {
    className: "sc-chips-remove",
    size: size,
    inverted: true,
    icon: _react["default"].createElement("i", {
      className: "fas fa-times"
    }),
    onClick: onRemove
  }));
};

var _default = Chips;
exports["default"] = _default;