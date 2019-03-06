"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _color = _interopRequireDefault(require("color"));

var defaultTheme = _interopRequireWildcard(require("../../style/theme"));

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n      &:before {\n        content: \"\";\n        position: absolute;\n        left: 0;\n        top: 0;\n        width: 18px;\n        height: 18px;\n        border: 2px solid ", ";\n        background: ", ";\n        border-radius: 4px;\n      }\n      i {\n        position: absolute;\n        top: 3px;\n        left: 3px;\n        font-size: 16px;\n        color: ", ";\n      }\n\n      &:hover {\n        &:before {\n          border-color: ", ";\n        }\n      }\n    "]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  position: relative;\n  width: 22px;\n  height: 22px;\n  padding-right: ", ";\n\n  ", "\n\n  input {\n    opacity: 0;\n  }\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  font-size: ", ";\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n          cursor: pointer;\n        "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n          cursor: default;\n          opacity: 0.5;\n        "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  align-items: center;\n  ", "\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Checkbox =
/*#__PURE__*/
function (_Component) {
  _inherits(Checkbox, _Component);

  function Checkbox() {
    var _this;

    _classCallCheck(this, Checkbox);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Checkbox).call(this));
    _this.handleOnClick = _this.handleOnClick.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Checkbox, [{
    key: "handleOnClick",
    value: function handleOnClick(event) {
      if (!this.props.disabled) {
        this.props.onChange(!this.props.checked);
      } else {
        event.stopPropagation();
      }
    }
  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement(StyledCheckboxContainer, {
        onClick: this.handleOnClick,
        className: "sc-checkbox",
        disabled: this.props.disabled
      }, _react.default.createElement(StyledCheckbox, {
        className: "checkbox",
        checked: this.props.checked,
        disabled: this.props.disabled
      }, _react.default.createElement("input", {
        type: "checkbox",
        checked: this.props.checked,
        disabled: this.props.disabled
      }), _react.default.createElement("i", {
        className: "fas fa-check"
      })), _react.default.createElement(StyledCheckboxLabel, {
        className: "text"
      }, this.props.label));
    }
  }]);

  return Checkbox;
}(_react.Component);

Checkbox.propTypes = {
  checked: _propTypes.default.bool,
  disabled: _propTypes.default.bool,
  onChange: _propTypes.default.func,
  label: _propTypes.default.string
};
var _default = Checkbox;
exports.default = _default;

var StyledCheckboxContainer = _styledComponents.default.div(_templateObject(), function (props) {
  return props.disabled ? (0, _styledComponents.css)(_templateObject2()) : (0, _styledComponents.css)(_templateObject3());
});

var StyledCheckboxLabel = _styledComponents.default.span(_templateObject4(), defaultTheme.fontSize.large);

var StyledCheckbox = _styledComponents.default.div(_templateObject5(), defaultTheme.padding.small, function (props) {
  var brandingTheme = (0, _utils.mergeTheme)(props.theme, defaultTheme);
  var brandDark = (0, _color.default)(brandingTheme.primary).darken(0.1).hsl().string();
  var iconCheckedColor = props.checked || props.disabled ? brandingTheme.primary : "transparent";
  var checkBoxColor = props.checked || props.disabled ? brandingTheme.primary : defaultTheme.grayLight;
  return (0, _styledComponents.css)(_templateObject6(), checkBoxColor, defaultTheme.white, iconCheckedColor, brandDark);
});