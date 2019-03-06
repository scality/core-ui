"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _theme = require("../../style/theme");

var _Navbar = _interopRequireDefault(require("../navbar/Navbar.component"));

var _Sidebar = _interopRequireDefault(require("../sidebar/Sidebar.component"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  flex-grow: 1;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: row;\n  height: calc(100vh - ", ");\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n  height: 100vh;\n  width: 100vw;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var LayoutContainer = _styledComponents.default.div(_templateObject());

var ContentContainer = _styledComponents.default.div(_templateObject2(), _theme.navbarHeight);

var MainContent = _styledComponents.default.div(_templateObject3());

function Layout(_ref) {
  var children = _ref.children,
      sidebar = _ref.sidebar,
      navbar = _ref.navbar;
  return _react.default.createElement(LayoutContainer, {
    className: "sc-layout"
  }, _react.default.createElement(_Navbar.default, navbar), _react.default.createElement(ContentContainer, null, _react.default.createElement(_Sidebar.default, sidebar), _react.default.createElement(MainContent, {
    className: "main"
  }, children)));
}

var _default = Layout;
exports.default = _default;