"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

require("react-virtualized/styles.css");

var _polished = require("polished");

var defaultTheme = _interopRequireWildcard(require("../../style/theme"));

var _utils = require("../../utils");

var _Dropdown = _interopRequireDefault(require("../dropdown/Dropdown.component"));

var _reactVirtualized = require("react-virtualized");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _templateObject7() {
  var data = _taggedTemplateLiteral(["\n          color: ", ";\n        "]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n          color: ", ";\n        "]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  position: relative;\n  padding-left: ", ";\n\n  .fa-sort-up {\n    position: absolute;\n    color: ", ";\n    ", "\n  }\n\n  .fa-sort-down {\n    color: ", ";\n    ", "\n  }\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  ", "\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n\n  .sc-dropdown .trigger {\n    background-color: transparent;\n    color: ", ";\n    padding: ", " ", ";\n    &:hover {\n      color: ", ";\n    }\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  .ReactVirtualized__Table__Grid {\n    color: ", ";\n    &:focus {\n      outline: none;\n    }\n\n    .sc-table-noRows {\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      height: 100%;\n      font-size: ", ";\n    }\n  }\n\n  .ReactVirtualized__Table__headerColumn {\n    margin: 0;\n  }\n\n  .ReactVirtualized__Grid__innerScrollContainer {\n    overflow: visible !important;\n  }\n\n  .ReactVirtualized__Table__headerRow {\n    background-color: ", ";\n    border-bottom: 2px solid ", ";\n    color: ", ";\n\n    text-transform: none;\n\n    .sc-table-header {\n      &:focus {\n        outline: none;\n      }\n      display: inline-flex;\n      font-size: ", ";\n      font-weight: ", ";\n      padding: ", ";\n    }\n  }\n\n  .ReactVirtualized__Table__row {\n    display: flex;\n    align-items: center;\n    overflow: visible !important;\n    color: ", ";\n    background-color: ", ";\n    border-top: 1px solid ", ";\n    border-bottom: 1px solid ", ";\n    box-sizing: border-box;\n    &:hover,\n    &:focus {\n      background-color: ", ";\n      border-top: 1px solid ", ";\n      border-bottom: 1px solid ", ";\n      outline: none;\n      cursor: pointer;\n    }\n  }\n\n  .ReactVirtualized__Table__headerColumn {\n    margin-right: 0;\n  }\n\n  .sc-table-column {\n    padding: ", ";\n    overflow: visible !important;\n    margin: 0;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var TableContainer = _styledComponents["default"].div(_templateObject(), (0, _utils.getThemePropSelector)("textPrimary"), defaultTheme.fontSize.large, (0, _utils.getThemePropSelector)("primary"), (0, _utils.getThemePropSelector)("borderLight"), (0, _utils.getThemePropSelector)("textPrimary"), defaultTheme.fontSize.large, defaultTheme.fontWeight.semibold, defaultTheme.padding.small, (0, _utils.getThemePropSelector)("textPrimary"), (0, _utils.getThemePropSelector)("primary"), (0, _utils.getThemePropSelector)("borderLight"), (0, _utils.getThemePropSelector)("borderLight"), (0, _utils.getThemePropSelector)("backgroundBluer"), (0, _utils.getThemePropSelector)("secondary"), (0, _utils.getThemePropSelector)("secondary"), defaultTheme.padding.small);

var CellContainer = _styledComponents["default"].div(_templateObject2(), (0, _utils.getThemePropSelector)("textPrimary"), defaultTheme.padding.smaller, defaultTheme.padding.small, function (props) {
  return (0, _polished.lighten)(0.3, (0, _utils.getTheme)(props).primary).toString();
});

var CellContent = _styledComponents["default"].span(_templateObject3(), (0, _polished.ellipsis)());

var HeaderContainer = _styledComponents["default"].div(_templateObject4());

var HeaderSortIcon = _styledComponents["default"].div(_templateObject5(), defaultTheme.padding.small, defaultTheme.gray, function (props) {
  if (props.selected && props.sortDirection === "ASC") {
    return (0, _styledComponents.css)(_templateObject6(), (0, _utils.getTheme)(props).primary);
  }
}, defaultTheme.gray, function (props) {
  if (props.selected && props.sortDirection === "DESC") {
    return (0, _styledComponents.css)(_templateObject7(), (0, _utils.getTheme)(props).primary);
  }
});

function Table(_ref) {
  var columns = _ref.columns,
      disableHeader = _ref.disableHeader,
      headerHeight = _ref.headerHeight,
      onHeaderClick = _ref.onHeaderClick,
      onRowClick = _ref.onRowClick,
      overscanRowCount = _ref.overscanRowCount,
      rowHeight = _ref.rowHeight,
      onSort = _ref.onSort,
      sortBy = _ref.sortBy,
      sortDirection = _ref.sortDirection,
      list = _ref.list,
      noRowsRenderer = _ref.noRowsRenderer;

  var _defaultNoRowsRenderer = function _defaultNoRowsRenderer() {
    return _react["default"].createElement("div", {
      className: "sc-table-noRows"
    }, "No rows");
  };

  var _headerRenderer = function _headerRenderer(_ref2) {
    var dataKey = _ref2.dataKey,
        label = _ref2.label,
        sortBy = _ref2.sortBy,
        sortDirection = _ref2.sortDirection,
        disableSort = _ref2.disableSort;
    return _react["default"].createElement(HeaderContainer, null, _react["default"].createElement("label", null, label), !disableSort && _react["default"].createElement(HeaderSortIcon, {
      selected: sortBy === dataKey,
      sortDirection: sortDirection
    }, _react["default"].createElement("i", {
      className: "fas fa-sort-up"
    }), _react["default"].createElement("i", {
      className: "fas fa-sort-down"
    })));
  };

  var _decorateDropdownActions = function _decorateDropdownActions(actions, rowData) {
    return actions.map(function (action) {
      return _objectSpread({}, action, {
        onClick: function onClick() {
          return action.onClick(rowData);
        }
      });
    });
  };

  var rowGetter = function rowGetter(_ref3) {
    var index = _ref3.index;
    return list[index];
  };

  return _react["default"].createElement(_reactVirtualized.AutoSizer, {
    className: "sc-table",
    style: {
      height: "auto",
      width: "auto"
    }
  }, function (_ref4) {
    var height = _ref4.height,
        width = _ref4.width;
    return _react["default"].createElement(TableContainer, null, _react["default"].createElement(_reactVirtualized.Table, {
      disableHeader: disableHeader,
      headerClassName: "sc-table-header",
      headerHeight: headerHeight,
      height: height,
      onHeaderClick: onHeaderClick,
      onRowClick: onRowClick,
      overscanRowCount: overscanRowCount || 5,
      noRowsRenderer: noRowsRenderer || _defaultNoRowsRenderer,
      rowClassName: "sc-table-row",
      rowHeight: rowHeight,
      rowGetter: rowGetter,
      rowCount: list.length,
      sort: onSort,
      sortBy: sortBy,
      sortDirection: sortDirection,
      width: width
    }, columns.map(function (column) {
      return _react["default"].createElement(_reactVirtualized.Column, {
        key: column.dataKey,
        width: column.width || 200,
        flexGrow: column.flexGrow || 0,
        flexShrink: column.flexShrink || 1,
        disableSort: column.disableSort,
        label: column.label,
        dataKey: column.dataKey,
        className: "sc-table-column",
        cellRenderer: function cellRenderer(_ref5) {
          var cellData = _ref5.cellData,
              columnIndex = _ref5.columnIndex,
              rowData = _ref5.rowData;
          return _react["default"].createElement(CellContainer, {
            className: "sc-table-column-cell-container-".concat(column.dataKey)
          }, _react["default"].createElement(CellContent, {
            className: "sc-table-column-cell-".concat(column.dataKey),
            title: cellData
          }, column.renderer ? column.renderer(cellData, rowData) : cellData), rowData.actions && rowData.actions.length && columnIndex === columns.length - 1 && _react["default"].createElement(_Dropdown["default"], {
            icon: _react["default"].createElement("i", {
              className: "fas fa-ellipsis-v"
            }),
            items: _decorateDropdownActions(rowData.actions, rowData),
            caret: false
          }));
        },
        headerRenderer: _headerRenderer
      });
    })));
  });
}

var _default = Table;
exports["default"] = _default;