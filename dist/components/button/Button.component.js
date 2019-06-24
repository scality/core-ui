"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ButtonContent = exports.ButtonText = exports.ButtonIcon = exports.ButtonStyled = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _color = _interopRequireDefault(require("color"));

var _utils = require("../../utils");

var defaultTheme = _interopRequireWildcard(require("../../style/theme"));

var _Loader = _interopRequireDefault(require("../loader/Loader.component"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _templateObject13() {
  var data = _taggedTemplateLiteral(["\n  position: relative;\n"]);

  _templateObject13 = function _templateObject13() {
    return data;
  };

  return data;
}

function _templateObject12() {
  var data = _taggedTemplateLiteral(["\n  display: inline-flex;\n  justify-content: center;\n  align-items: center;\n"]);

  _templateObject12 = function _templateObject12() {
    return data;
  };

  return data;
}

function _templateObject11() {
  var data = _taggedTemplateLiteral(["\n      padding-right: ", ";\n      display: inline-flex;\n      justify-content: center;\n      align-items: center;\n    "]);

  _templateObject11 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10() {
  var data = _taggedTemplateLiteral(["\n  ", "\n"]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = _taggedTemplateLiteral(["\n    ", "\n  "]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = _taggedTemplateLiteral(["\n    ", "\n  "]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteral(["\n      ", "\n    "]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n          padding: 9px 18px;\n          font-size: ", ";\n          border-radius: 6px;\n          height: 37px;\n        "]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n          padding: 11px 22px;\n          font-size: ", ";\n          border-radius: 8px;\n          height: 48px;\n        "]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n          padding: 10px 20px;\n          font-size: ", ";\n          border-radius: 7px;\n          height: 40px;\n        "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n          padding: 8px 16px;\n          font-size: ", ";\n          border-radius: 5px;\n          height: 30px;\n        "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n          padding: 7px 14px;\n          font-size: ", ";\n          border-radius: 4px;\n          height: 27px;\n        "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  cursor: pointer;\n  position: relative;\n  display: inline-flex;\n  user-select: none;\n  vertical-align: middle;\n  align-items: center;\n  justify-content: center;\n  box-sizing: border-box;\n  text-decoration: none;\n  border: none;\n  text-decoration: none;\n  font-weight: ", ";\n\n  &:hover,\n  &:focus,\n  &:active {\n    outline: none;\n  }\n\n  ", "\n\n  ", "\n\n\n", "\n\n", "\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var defaultProps = {
  size: "base",
  variant: "primary",
  outlined: false,
  disabled: false,
  icon: null,
  href: "",
  text: "",
  title: "",
  type: "button",
  isLoading: false
};

var ButtonStyled = _styledComponents.default.button(_templateObject(), defaultTheme.fontWeight.base, function (props) {
  switch (props.size) {
    case "smaller":
      return (0, _styledComponents.css)(_templateObject2(), defaultTheme.fontSize.smaller);

    case "small":
      return (0, _styledComponents.css)(_templateObject3(), defaultTheme.fontSize.small);

    case "large":
      return (0, _styledComponents.css)(_templateObject4(), defaultTheme.fontSize.large);

    case "larger":
      return (0, _styledComponents.css)(_templateObject5(), defaultTheme.fontSize.larger);

    default:
      return (0, _styledComponents.css)(_templateObject6(), defaultTheme.fontSize.base);
  }
}, function (props) {
  var brandingTheme = (0, _utils.mergeTheme)(props.theme, defaultTheme);
  var brandLighter = (0, _color.default)(brandingTheme[props.variant]).lighten(0.5).hsl().string();
  var brandLight = (0, _color.default)(brandingTheme[props.variant]).lighten(0.3).hsl().string();
  return (0, _styledComponents.css)(_templateObject7(), props.outlined ? "\n        border-width: 1px;\n        border-style: solid;\n        border-color: ".concat(brandingTheme[props.variant], ";\n        background-color: ").concat(defaultTheme.white, ";\n        color: ").concat(brandingTheme[props.variant], ";\n        \n        &:hover{      \n          border-color: ").concat(brandingTheme[props.variant], ";\n          background-color: ").concat(brandLight, ";\n          color: ").concat(defaultTheme.white, ";\n        }\n\n        &:active {      \n          border-color: ").concat(brandingTheme[props.variant], ";\n          background-color: ").concat(brandLighter, ";\n          color: ").concat(defaultTheme.white, ";\n        }\n        ") : "          \n        background-color: ".concat(brandingTheme[props.variant], ";\n        color: ").concat(defaultTheme.white, ";\n  \n        &:hover {\n          background-color: ").concat(brandLight, ";\n          color: ").concat(defaultTheme.white, ";\n        }\n        \n        &:active {      \n          background-color: ").concat(brandingTheme[props.variant], ";\n          color: ").concat(defaultTheme.white, ";\n        }\n      "));
}, function (props) {
  var brandingTheme = (0, _utils.mergeTheme)(props.theme, defaultTheme);
  var brandLighter = (0, _color.default)(brandingTheme[props.variant]).lighten(0.5).hsl().string();
  return (0, _styledComponents.css)(_templateObject8(), props.disabled ? "\n          box-shadow: none;\n          pointer-events: none;\n          &,\n          &:hover,\n          &:focus,\n          &:active {\n            cursor: default;\n            background-color: ".concat(brandLighter, ";\n            border-color: ").concat(brandLighter, ";\n            color: ").concat(defaultTheme.white, ";\n            box-shadow: none;\n          };\n        ") : null);
}, function (props) {
  return (0, _styledComponents.css)(_templateObject9(), props.isLoading ? "\n          .sc-button-text {\n            visibility: hidden;\n          }\n          .sc-loader {\n            svg {\n              fill: ".concat(defaultTheme.white, ";\n            }\n            > span {\n              position: absolute;\n              right: 0;\n              left: 0;\n            }\n          }\n        ") : null);
});

exports.ButtonStyled = ButtonStyled;

var ButtonIcon = _styledComponents.default.span(_templateObject10(), function (props) {
  return props.text && (0, _styledComponents.css)(_templateObject11(), defaultTheme.padding.smaller);
});

exports.ButtonIcon = ButtonIcon;

var ButtonText = _styledComponents.default.span(_templateObject12());

exports.ButtonText = ButtonText;

var ButtonContent = _styledComponents.default.span(_templateObject13());

exports.ButtonContent = ButtonContent;
var Anchor = ButtonStyled.withComponent("a");

function Button(_ref) {
  var text = _ref.text,
      href = _ref.href,
      icon = _ref.icon,
      size = _ref.size,
      variant = _ref.variant,
      outlined = _ref.outlined,
      disabled = _ref.disabled,
      onClick = _ref.onClick,
      title = _ref.title,
      isLoading = _ref.isLoading,
      type = _ref.type,
      rest = _objectWithoutProperties(_ref, ["text", "href", "icon", "size", "variant", "outlined", "disabled", "onClick", "title", "isLoading", "type"]);

  return href && href.length ? _react.default.createElement(Anchor, _extends({
    className: "sc-button",
    href: href,
    variant: variant,
    outlined: outlined,
    disabled: disabled,
    size: size,
    title: title
  }, rest), icon && _react.default.createElement(ButtonIcon, {
    text: text,
    size: size
  }, icon), _react.default.createElement(ButtonText, null, text)) : _react.default.createElement(ButtonStyled, _extends({
    className: "sc-button",
    variant: variant,
    outlined: outlined,
    disabled: disabled || isLoading,
    size: size,
    onClick: onClick,
    title: title,
    isLoading: isLoading,
    type: type
  }, rest), _react.default.createElement(ButtonContent, null, isLoading && _react.default.createElement(_Loader.default, {
    size: size
  }), _react.default.createElement("span", {
    className: "sc-button-text"
  }, icon && _react.default.createElement(ButtonIcon, {
    text: text,
    size: size
  }, icon), _react.default.createElement(ButtonText, null, text))));
}

Button.defaultProps = defaultProps;
var _default = Button;
exports.default = _default;