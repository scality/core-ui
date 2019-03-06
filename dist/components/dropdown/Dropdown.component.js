"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _Button = require("../button/Button.component");

var _color = _interopRequireDefault(require("color"));

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _templateObject9() {
  var data = _taggedTemplateLiteral(["\n  margin-left: ", ";\n"]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = _taggedTemplateLiteral(["\n      background-color: ", ";\n      color: ", ";\n      &:hover {\n        background-color: ", ";\n        color: ", ";\n      }\n      &:active {\n        background-color: ", ";\n        color: ", ";\n      }\n    "]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  align-items: center;\n  padding: ", ";\n  white-space: nowrap;\n  cursor: pointer;\n  font-size: ", ";\n\n  ", ";\n"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n        left: 0;\n        top: 100%;\n      "]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n        left: 0;\n        bottom: ", ";\n      "]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n        right: 0;\n        top: 100%;\n      "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  position: absolute;\n  margin: 0;\n  padding: 0;\n  box-shadow: 0 1px 3px 0 ", ";\n  z-index: ", ";\n  max-height: 200px;\n  min-width: 100%;\n  overflow: auto;\n\n  ", ";\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n            background-color: ", ";\n            color: ", ";\n\n            &:hover {\n              background-color: ", ";\n              color: ", ";\n            }\n          "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  position: relative;\n  user-select: none;\n  .trigger {\n    margin: 0;\n    border-radius: 0;\n    ", "\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var DropdownStyled = _styledComponents.default.div(_templateObject(), function (props) {
  var brandingTheme = (0, _utils.mergeTheme)(props.theme, defaultTheme);
  var brandDark = (0, _color.default)(brandingTheme[props.variant]).darken(0.1).hsl().string();
  return props.active ? (0, _styledComponents.css)(_templateObject2(), brandDark, defaultTheme.white, brandDark, defaultTheme.white) : null;
});

var DropdownMenuStyled = _styledComponents.default.ul(_templateObject3(), defaultTheme.gray, defaultTheme.zIndex.dropdown, function (props) {
  if (props.size && props.triggerSize && props.triggerSize.x + props.size.width > window.innerWidth) {
    return (0, _styledComponents.css)(_templateObject4());
  } else if (props.size && props.triggerSize && props.triggerSize.y + props.size.height > window.innerHeight) {
    return (0, _styledComponents.css)(_templateObject5(), props.triggerSize.height + "px");
  } else {
    return (0, _styledComponents.css)(_templateObject6());
  }
});

var DropdownMenuItemStyled = _styledComponents.default.li(_templateObject7(), defaultTheme.padding.base, defaultTheme.fontSize.base, function (props) {
  var brandingTheme = (0, _utils.mergeTheme)(props.theme, defaultTheme);
  var brandLight = (0, _color.default)(brandingTheme[props.variant]).lighten(0.1).hsl().string();
  return (0, _styledComponents.css)(_templateObject8(), brandingTheme[props.variant], defaultTheme.white, brandLight, defaultTheme.white, brandingTheme[props.variant], defaultTheme.white);
});

var Caret = _styledComponents.default.span(_templateObject9(), defaultTheme.padding.base);

var TriggerStyled = _Button.ButtonStyled.withComponent("div");

var Dropdown =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Dropdown, _React$Component);

  function Dropdown() {
    var _this;

    _classCallCheck(this, Dropdown);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Dropdown).call(this));

    _defineProperty(_assertThisInitialized(_this), "refMenuCallback", function (element) {
      if (element) {
        _this.setState({
          menuSize: element.getBoundingClientRect()
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "refTriggerCallback", function (element) {
      if (element) {
        _this.setState({
          triggerSize: element.getBoundingClientRect()
        });
      }
    });

    _this.state = {
      open: false,
      menuSize: null,
      triggerSize: null
    };
    return _this;
  }

  _createClass(Dropdown, [{
    key: "handleOpenCloseDropdown",
    value: function handleOpenCloseDropdown() {
      this.setState({
        open: !this.state.open
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state = this.state,
          open = _this$state.open,
          menuSize = _this$state.menuSize,
          triggerSize = _this$state.triggerSize;
      var _this$props = this.props,
          items = _this$props.items,
          text = _this$props.text,
          icon = _this$props.icon,
          _this$props$size = _this$props.size,
          size = _this$props$size === void 0 ? "base" : _this$props$size,
          _this$props$variant = _this$props.variant,
          variant = _this$props$variant === void 0 ? "primary" : _this$props$variant,
          title = _this$props.title,
          _this$props$caret = _this$props.caret,
          caret = _this$props$caret === void 0 ? true : _this$props$caret;
      return _react.default.createElement(DropdownStyled, {
        active: open,
        variant: variant,
        className: "sc-dropdown"
      }, _react.default.createElement(TriggerStyled, {
        variant: variant,
        size: size,
        className: "trigger",
        onBlur: function onBlur() {
          return _this2.handleOpenCloseDropdown();
        },
        onFocus: function onFocus() {
          return _this2.handleOpenCloseDropdown();
        },
        tabIndex: "0",
        title: title,
        ref: this.refTriggerCallback
      }, icon && _react.default.createElement(_Button.ButtonIcon, {
        text: text,
        size: size
      }, icon), text && _react.default.createElement(_Button.ButtonText, null, text), caret && _react.default.createElement(Caret, null, _react.default.createElement("i", {
        className: "fas fa-caret-down"
      })), open && _react.default.createElement(DropdownMenuStyled, {
        className: "menu-item",
        postion: "right",
        ref: this.refMenuCallback,
        size: menuSize,
        triggerSize: triggerSize
      }, items.map(function (item) {
        var label = item.label,
            onClick = item.onClick;
        return _react.default.createElement(DropdownMenuItemStyled, {
          key: label,
          onClick: onClick,
          variant: variant
        }, label);
      }))));
    }
  }]);

  return Dropdown;
}(_react.default.Component);

Dropdown.propTypes = {
  size: _propTypes.default.oneOf(["smaller", "small", "base", "large", "larger"]),
  variant: _propTypes.default.oneOf(["primary", "secondary", "danger", "success", "warning", "info", "base"]),
  icon: _propTypes.default.oneOfType([_propTypes.default.element, _propTypes.default.func]),
  text: _propTypes.default.string,
  items: _propTypes.default.array,
  caret: _propTypes.default.bool
};
var _default = Dropdown;
exports.default = _default;