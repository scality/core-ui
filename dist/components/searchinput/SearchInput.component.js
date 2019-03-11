"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _color = _interopRequireDefault(require("color"));

var _reactDebounceInput = require("react-debounce-input");

var defaultTheme = _interopRequireWildcard(require("../../style/theme"));

var _utils = require("../../utils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  right: 1px;\n  visibility: ", ";\n  opacity: ", ";\n  transition: opacity 0.5s ease-in-out;\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  left: 1px;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n        cursor: pointer;\n        &:hover {\n          color: ", ";\n        }\n      "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  position: absolute;\n  border: none;\n  outline: none;\n  top: 1px;\n  padding: 6px 10px 4px 10px;\n  border-radius: 5px;\n  font-size: ", ";\n  color: ", ";\n  background-color: ", ";\n  ", ";\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  position: relative;\n  input[type=\"text\"] {\n    outline: none;\n    width: ", ";\n    box-sizing: border-box;\n    border: 1px solid ", ";\n    border-radius: 5px;\n    font-size: ", ";\n    padding: ", ";\n    transition: width 0.2s ease-in-out;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var SearchInputContainer = _styledComponents.default.div(_templateObject(), function (props) {
  return props.docked ? "36px" : "100%";
}, function (props) {
  return (0, _utils.mergeTheme)(props.theme, defaultTheme).primary;
}, defaultTheme.fontSize.base, function (props) {
  return props.docked ? "5px 10px" : "5px 34px";
});

var IconButton = _styledComponents.default.button(_templateObject2(), defaultTheme.fontSize.base, function (props) {
  return (0, _utils.mergeTheme)(props.theme, defaultTheme).primary;
}, defaultTheme.white, function (props) {
  return !props.disabled && (0, _styledComponents.css)(_templateObject3(), (0, _color.default)((0, _utils.mergeTheme)(props.theme, defaultTheme).primary).lighten(0.3).hsl().string());
});

var SearchIcon = (0, _styledComponents.default)(IconButton)(_templateObject4());
var ResetIcon = (0, _styledComponents.default)(IconButton)(_templateObject5(), function (props) {
  return props.visible ? "visible" : "hidden";
}, function (props) {
  return props.visible ? 1 : 0;
});

var SearchInput =
/*#__PURE__*/
function (_React$Component) {
  _inherits(SearchInput, _React$Component);

  function SearchInput(props) {
    var _this;

    _classCallCheck(this, SearchInput);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SearchInput).call(this, props));
    _this.toggle = _this.toggle.bind(_assertThisInitialized(_this));
    _this.reset = _this.reset.bind(_assertThisInitialized(_this));
    _this.state = {
      docked: true
    };
    _this.myInputRef = _react.default.createRef();
    return _this;
  }

  _createClass(SearchInput, [{
    key: "toggle",
    value: function toggle() {
      this.setState({
        docked: !this.state.docked
      });
      this.myInputRef.current.focus();
    }
  }, {
    key: "reset",
    value: function reset() {
      this.props.onReset();
      this.setState({
        docked: true
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react.default.createElement(SearchInputContainer, {
        className: "sc-searchinput",
        docked: this.state.docked
      }, _react.default.createElement(_reactDebounceInput.DebounceInput, {
        minLength: 1,
        debounceTimeout: 300,
        type: "text",
        name: "search",
        placeholder: this.props.placeholder,
        value: this.props.value,
        onChange: function onChange(event) {
          return _this2.props.onChange(event.target.value);
        },
        inputRef: this.myInputRef
      }), _react.default.createElement(SearchIcon, {
        onClick: this.toggle,
        disabled: !this.state.docked
      }, _react.default.createElement("i", {
        className: "fas fa-search"
      })), _react.default.createElement(ResetIcon, {
        onClick: this.reset,
        visible: this.props.value && !this.state.docked
      }, _react.default.createElement("i", {
        className: "fas fa-times-circle"
      })));
    }
  }]);

  return SearchInput;
}(_react.default.Component);

SearchInput.propTypes = {
  placeholder: _propTypes.default.string,
  value: _propTypes.default.string.isRequired,
  onChange: _propTypes.default.func.isRequired,
  onReset: _propTypes.default.func
};
var _default = SearchInput;
exports.default = _default;