"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _constants = require("../constants");

var _scalityLoading = _interopRequireDefault(require("../../icons/scality-loading"));

var defaultTheme = _interopRequireWildcard(require("../../style/theme"));

var _utils = require("../../utils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-flow: column;\n  align-items: center;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  padding: 10px 0;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n      font-size: ", ";\n      svg {\n        height: ", ";\n        width: ", ";\n        fill: ", ";\n      }\n    "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  ", "\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var LoaderContainer = _styledComponents.default.div(_templateObject(), function (props) {
  var brandingTheme = (0, _utils.mergeTheme)(props.theme, defaultTheme);
  return (0, _styledComponents.css)(_templateObject2(), defaultTheme.fontSize[props.size], defaultTheme.svgSize[props.size], defaultTheme.svgSize[props.size], brandingTheme.primary);
});

var LoaderText = _styledComponents.default.span(_templateObject3());

var LoaderTextDiv = _styledComponents.default.span(_templateObject4());

function Loader(_ref) {
  var children = _ref.children,
      _ref$color = _ref.color,
      color = _ref$color === void 0 ? defaultTheme.gray : _ref$color,
      _ref$size = _ref.size,
      size = _ref$size === void 0 ? _constants.LOADER_SIZE.large : _ref$size;
  return _react.default.createElement(LoaderContainer, {
    size: size,
    color: color,
    className: "sc-loader"
  }, _react.default.createElement(LoaderTextDiv, null, _react.default.createElement(_scalityLoading.default, null), children && _react.default.createElement(LoaderText, null, " ", children)));
}

var _default = Loader;
exports.default = _default;