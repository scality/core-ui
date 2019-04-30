"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

require("react-virtualized/styles.css");

var _color = _interopRequireDefault(require("color"));

var defaultTheme = _interopRequireWildcard(require("../../style/theme"));

var _utils = require("../../utils");

var _Dropdown = _interopRequireDefault(require("../dropdown/Dropdown.component"));

var _reactVirtualized = require("react-virtualized");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _templateObject8() {
  var data = _taggedTemplateLiteral(["\n          color: ", ";\n        "]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteral(["\n          color: ", ";\n        "]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n  position: relative;\n  padding-left: ", ";\n\n  .fa-sort-up {\n    position: absolute;\n    color: ", ";\n    ", "\n  }\n\n  .fa-sort-down {\n    color: ", ";\n    ", "\n  }\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n\n  .sc-dropdown .trigger {\n    background-color: transparent;\n    color: ", ";\n    padding: ", " ", ";\n    &:hover {\n      color: ", ";\n    }\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n        color: ", ";\n      "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  .ReactVirtualized__Table__Grid {\n    &:focus {\n      outline: none;\n    }\n    .sc-table-noRows {\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      height: 100%;\n      font-size: ", ";\n    }\n  }\n\n  .ReactVirtualized__Grid__innerScrollContainer {\n    overflow: visible !important;\n  }\n\n  .ReactVirtualized__Table__headerRow {\n    border-bottom: 2px solid ", ";\n    background-color: ", ";\n    ", "\n\n    .sc-table-header {\n      &:focus {\n        outline: none;\n      }\n      display: inline-flex;\n      font-size: ", ";\n      font-weight: ", ";\n      padding: ", ";\n    }\n  }\n\n  .ReactVirtualized__Table__row {\n    display: flex;\n    align-items: center;\n    border-bottom: 1px solid ", ";\n    overflow: visible !important;\n\n    &:hover,\n    &:focus {\n      background-color: ", ";\n      outline: none;\n      border-bottom: 1px solid transparent;\n      cursor: pointer;\n    }\n  }\n\n  .sc-table-column {\n    padding: ", ";\n    overflow: visible !important;\n    margin: 0;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var TableContainer = _styledComponents.default.div(_templateObject(), defaultTheme.fontSize.large, defaultTheme.gray, defaultTheme.grayLightest, function (props) {
  var brandingTheme = (0, _utils.mergeTheme)(props.theme, defaultTheme);
  return (0, _styledComponents.css)(_templateObject2(), brandingTheme.primary);
}, defaultTheme.fontSize.large, defaultTheme.fontWeight.semibold, defaultTheme.padding.small, defaultTheme.gray, defaultTheme.grayLightest, defaultTheme.padding.small);

var CellContainer = _styledComponents.default.div(_templateObject3(), function (props) {
  return (0, _utils.mergeTheme)(props.theme, defaultTheme).primary;
}, defaultTheme.padding.smaller, defaultTheme.padding.small, function (props) {
  return (0, _color.default)((0, _utils.mergeTheme)(props.theme, defaultTheme).primary).lighten(0.3).hsl().string();
});

var CellContent = _styledComponents.default.span(_templateObject4());

var HeaderContainer = _styledComponents.default.div(_templateObject5());

var HeaderSortIcon = _styledComponents.default.div(_templateObject6(), defaultTheme.padding.small, defaultTheme.gray, function (props) {
  var brandingTheme = (0, _utils.mergeTheme)(props.theme, defaultTheme);

  if (props.selected && props.sortDirection === "ASC") {
    return (0, _styledComponents.css)(_templateObject7(), brandingTheme.primary);
  }
}, defaultTheme.gray, function (props) {
  var brandingTheme = (0, _utils.mergeTheme)(props.theme, defaultTheme);

  if (props.selected && props.sortDirection === "DESC") {
    return (0, _styledComponents.css)(_templateObject8(), brandingTheme.primary);
  }
});

var Table =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Table, _React$Component);

  function Table(props) {
    var _this;

    _classCallCheck(this, Table);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Table).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "_noRowsRenderer", void 0);

    _defineProperty(_assertThisInitialized(_this), "_headerRenderer", void 0);

    _this._noRowsRenderer = _this._noRowsRenderer.bind(_assertThisInitialized(_this));
    _this._headerRenderer = _this._headerRenderer.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Table, [{
    key: "_noRowsRenderer",
    value: function _noRowsRenderer() {
      return _react.default.createElement("div", {
        className: "sc-table-noRows"
      }, "No rows");
    }
  }, {
    key: "_headerRenderer",
    value: function _headerRenderer(_ref) {
      var dataKey = _ref.dataKey,
          label = _ref.label,
          sortBy = _ref.sortBy,
          sortDirection = _ref.sortDirection,
          disableSort = _ref.disableSort;
      return _react.default.createElement(HeaderContainer, null, _react.default.createElement("label", null, label), !disableSort && _react.default.createElement(HeaderSortIcon, {
        selected: sortBy === dataKey,
        sortDirection: sortDirection
      }, _react.default.createElement("i", {
        className: "fas fa-sort-up"
      }), _react.default.createElement("i", {
        className: "fas fa-sort-down"
      })));
    } //$FlowFixMe

  }, {
    key: "_decorateDropdownActions",
    value: function _decorateDropdownActions(actions, rowData) {
      return actions.map(function (action) {
        return _objectSpread({}, action, {
          onClick: function onClick() {
            return action.onClick(rowData);
          }
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          columns = _this$props.columns,
          disableHeader = _this$props.disableHeader,
          headerHeight = _this$props.headerHeight,
          onHeaderClick = _this$props.onHeaderClick,
          onRowClick = _this$props.onRowClick,
          overscanRowCount = _this$props.overscanRowCount,
          rowHeight = _this$props.rowHeight,
          onSort = _this$props.onSort,
          sortBy = _this$props.sortBy,
          sortDirection = _this$props.sortDirection,
          list = _this$props.list;

      var rowGetter = function rowGetter(_ref2) {
        var index = _ref2.index;
        return list[index];
      };

      return _react.default.createElement(_reactVirtualized.AutoSizer, {
        className: "sc-table"
      }, function (_ref3) {
        var height = _ref3.height,
            width = _ref3.width;
        return _react.default.createElement(TableContainer, null, _react.default.createElement(_reactVirtualized.Table, {
          disableHeader: disableHeader,
          headerClassName: "sc-table-header",
          headerHeight: headerHeight,
          height: height,
          onHeaderClick: onHeaderClick,
          onRowClick: onRowClick,
          overscanRowCount: overscanRowCount || 5,
          noRowsRenderer: _this2._noRowsRenderer,
          rowClassName: "sc-table-row",
          rowHeight: rowHeight,
          rowGetter: rowGetter,
          rowCount: list.length,
          sort: onSort,
          sortBy: sortBy,
          sortDirection: sortDirection,
          width: width
        }, columns.map(function (column) {
          return _react.default.createElement(_reactVirtualized.Column, {
            key: column.dataKey,
            width: 200,
            disableSort: column.disableSort,
            label: column.label,
            dataKey: column.dataKey,
            className: "sc-table-column",
            cellRenderer: function cellRenderer(_ref4) {
              var cellData = _ref4.cellData,
                  columnIndex = _ref4.columnIndex,
                  rowData = _ref4.rowData;
              return _react.default.createElement(CellContainer, null, _react.default.createElement(CellContent, {
                title: cellData
              }, column.renderer ? column.renderer(cellData) : cellData), rowData.actions && rowData.actions.length && columnIndex === columns.length - 1 && _react.default.createElement(_Dropdown.default, {
                icon: _react.default.createElement("i", {
                  className: "fas fa-ellipsis-v"
                }),
                items: _this2._decorateDropdownActions(rowData.actions, rowData),
                caret: false
              }));
            },
            flexGrow: 1,
            headerRenderer: _this2._headerRenderer
          });
        })));
      });
    }
  }]);

  return Table;
}(_react.default.Component);

var _default = Table;
exports.default = _default;