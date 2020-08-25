"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _vegaEmbed = _interopRequireDefault(require("vega-embed"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _templateObject() {
  var data = _taggedTemplateLiteral([""]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var VegaChartContainer = _styledComponents["default"].div(_templateObject());

function VegaChart(_ref) {
  var id = _ref.id,
      spec = _ref.spec,
      _ref$theme = _ref.theme,
      theme = _ref$theme === void 0 ? "light" : _ref$theme;
  var themeContext = (0, _react.useContext)(_styledComponents.ThemeContext);
  var currentBackgroundColor = themeContext && themeContext.brand && themeContext.brand.primaryDark1;
  var currentBackgroundColor2 = themeContext && themeContext.brand && themeContext.brand.primaryDark2;
  var brandText = themeContext && themeContext.brand && themeContext.brand.textPrimary;
  var themeConfig = {
    config: {
      background: currentBackgroundColor,
      axis: {
        labelColor: brandText,
        titleColor: brandText,
        grid: false,
        domainColor: currentBackgroundColor2
      },
      title: {
        color: brandText,
        font: "Lato"
      },
      view: {
        stroke: "transparent",
        fill: currentBackgroundColor2
      },
      // the headers provide a title and labels for faceted plots.
      header: {
        labelColor: brandText
      },
      // the label of max/min
      text: {
        color: brandText,
        font: "Lato"
      },
      // the up, bottom trend line and verticle line when hover
      rule: {
        color: brandText
      },
      legend: {
        labelColor: brandText,
        titleColor: brandText
      }
    }
  };

  var themedSpec = _objectSpread({}, spec, {}, themeConfig);

  (0, _react.useEffect)(function () {
    (0, _vegaEmbed["default"])("#".concat(id), themedSpec, {
      renderer: "svg",
      tooltip: {
        theme: theme
      },
      // Determines if action links
      // ("Export as PNG/SVG", "View Source", "View Vega" (only for Vega-Lite), "Open in Vega Editor")
      // are included with the embedded view.
      // If the value is true, all action links will be shown and none if the value is false.
      actions: false
    }).then(function (result) {// Access the Vega view instance (https://vega.github.io/vega/docs/api/view/) as result.view
    })["catch"](console.error);
  }, [id, themedSpec, theme]);
  return _react["default"].createElement(VegaChartContainer, {
    id: id,
    className: "sc-vegachart"
  });
}

var _default = VegaChart;
exports["default"] = _default;