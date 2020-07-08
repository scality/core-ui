"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var defaultTheme = _interopRequireWildcard(require("../../style/theme"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n      animation-duration: 1s;\n      animation-fill-mode: both;\n      animation-name: ", ";\n      position: absolute;\n      top: 0;\n      left: 0;\n      width: 100%;\n      overflow: hidden;\n    "]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  ", "\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n      text-align: center;\n      position: relative;\n    "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  ", "\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    from {\n      height:100%\n    } \n    to {\n      height:", "%\n    }"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var keyFrameCloud = function keyFrameCloud(props) {
  return (0, _styledComponents.keyframes)(_templateObject(), 100 - props.percentage);
};

var Container = _styledComponents["default"].div(_templateObject2(), function (props) {
  return (0, _styledComponents.css)(_templateObject3());
});

var ContainerProgress = _styledComponents["default"].div(_templateObject4(), function (props) {
  return (0, _styledComponents.css)(_templateObject5(), keyFrameCloud);
});

var Cloud = function Cloud(_ref) {
  var strokeColor = _ref.strokeColor,
      borderSize = _ref.borderSize;
  return _react["default"].createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 15 72 42",
    enableBackground: "new 0 0 72 72"
  }, _react["default"].createElement("g", null, _react["default"].createElement("path", {
    fill: "none",
    stroke: strokeColor,
    strokeWidth: borderSize,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeMiterlimit: "10",
    d: "M15.9,30.3c0,0.4-0.4,0.8-0.8,0.8C10,31.6,6,36.7,6,42.9c0,6.6,4.5,11.9,10.2,11.9h38.7C61,54.8,66,49.1,66,42.2c0-6.6-4.6-12.1-10.4-12.5c-0.4,0-0.8-0.3-0.9-0.8c-1.3-6.7-7.3-11.7-14.3-11.7c-4.6,0-8.7,2.1-11.3,5.4C28.8,23,28.3,23.1,28,23c-1-0.4-2.1-0.6-3.3-0.6C20.1,22.3,16.3,25.8,15.9,30.3z"
  })));
};

var CloudProgress = function CloudProgress(_ref2) {
  var strokeColor = _ref2.strokeColor,
      percentage = _ref2.percentage,
      borderSize = _ref2.borderSize;
  return _react["default"].createElement(ContainerProgress, {
    percentage: percentage
  }, _react["default"].createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 15 72 42",
    enableBackground: "new 0 0 72 72"
  }, _react["default"].createElement("g", null, _react["default"].createElement("path", {
    fill: "none",
    stroke: strokeColor,
    strokeWidth: borderSize,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeMiterlimit: "10",
    d: "M15.9,30.3c0,0.4-0.4,0.8-0.8,0.8C10,31.6,6,36.7,6,42.9c0,6.6,4.5,11.9,10.2,11.9h38.7C61,54.8,66,49.1,66,42.2c0-6.6-4.6-12.1-10.4-12.5c-0.4,0-0.8-0.3-0.9-0.8c-1.3-6.7-7.3-11.7-14.3-11.7c-4.6,0-8.7,2.1-11.3,5.4C28.8,23,28.3,23.1,28,23c-1-0.4-2.1-0.6-3.3-0.6C20.1,22.3,16.3,25.8,15.9,30.3z"
  }))));
};

var CloudProgressBar = function CloudProgressBar(_ref3) {
  var _ref3$percentage = _ref3.percentage,
      percentage = _ref3$percentage === void 0 ? 0 : _ref3$percentage,
      _ref3$borderSize = _ref3.borderSize,
      borderSize = _ref3$borderSize === void 0 ? "2px" : _ref3$borderSize,
      _ref3$cloudColor = _ref3.cloudColor,
      cloudColor = _ref3$cloudColor === void 0 ? defaultTheme.brand.healthyLight : _ref3$cloudColor,
      _ref3$progressCloudCo = _ref3.progressCloudColor,
      progressCloudColor = _ref3$progressCloudCo === void 0 ? defaultTheme.brand.primaryDark2 : _ref3$progressCloudCo,
      children = _ref3.children;
  return _react["default"].createElement(Container, {
    className: "sc-cloudprogressbar"
  }, _react["default"].createElement(Cloud, {
    strokeColor: progressCloudColor,
    borderSize: borderSize
  }), _react["default"].createElement(CloudProgress, {
    strokeColor: cloudColor,
    percentage: percentage,
    borderSize: borderSize
  }), children);
};

var _default = CloudProgressBar;
exports["default"] = _default;