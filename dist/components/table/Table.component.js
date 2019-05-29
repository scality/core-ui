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

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

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
  var data = _taggedTemplateLiteral(["\n  .ReactVirtualized__Table__Grid {\n    &:focus {\n      outline: none;\n    }\n\n    .sc-table-noRows {\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      height: 100%;\n      font-size: ", ";\n    }\n  }\n\n  .ReactVirtualized__Table__headerColumn {\n    margin: 0;\n  }\n\n  .ReactVirtualized__Grid__innerScrollContainer {\n    overflow: visible !important;\n    border-right: 1px solid ", ";\n    border-left: 1px solid ", ";\n  }\n\n  .ReactVirtualized__Table__headerRow {\n    border-right: 1px solid ", ";\n    border-left: 1px solid ", ";\n    border-top: 1px solid ", ";\n    border-bottom: 2px solid ", ";\n    background-color: ", ";\n\n    padding-right: 0px !important\n    ", "\n\n    text-transform: none;\n\n    .sc-table-header {\n      &:focus {\n        outline: none;\n      }\n      display: inline-flex;\n      font-size: ", ";\n      font-weight: ", ";\n      padding: ", ";\n    }\n  }\n\n  .ReactVirtualized__Table__row {\n    display: flex;\n    align-items: center;\n    border-bottom: 1px solid ", ";\n    overflow: visible !important;\n\n    &:hover,\n    &:focus {\n      background-color: ", ";\n      outline: none;\n      border-bottom: 1px solid transparent;\n      cursor: pointer;\n    }\n  }\n\n  .ReactVirtualized__Table__headerColumn {\n    margin-right: 0;\n  }\n\n  .sc-table-column {\n    padding: ", ";\n    overflow: visible !important;\n    margin: 0;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var TableContainer = _styledComponents.default.div(_templateObject(), defaultTheme.fontSize.large, defaultTheme.gray, defaultTheme.gray, defaultTheme.gray, defaultTheme.gray, defaultTheme.gray, defaultTheme.gray, defaultTheme.grayLightest, function (props) {
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
      list = _ref.list;

  var _noRowsRenderer = function _noRowsRenderer() {
    return _react.default.createElement("div", {
      className: "sc-table-noRows"
    }, "No rows");
  };

  var _headerRenderer = function _headerRenderer(_ref2) {
    var dataKey = _ref2.dataKey,
        label = _ref2.label,
        sortBy = _ref2.sortBy,
        sortDirection = _ref2.sortDirection,
        disableSort = _ref2.disableSort;
    return _react.default.createElement(HeaderContainer, null, _react.default.createElement("label", null, label), !disableSort && _react.default.createElement(HeaderSortIcon, {
      selected: sortBy === dataKey,
      sortDirection: sortDirection
    }, _react.default.createElement("i", {
      className: "fas fa-sort-up"
    }), _react.default.createElement("i", {
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

  return _react.default.createElement(_reactVirtualized.AutoSizer, {
    className: "sc-table"
  }, function (_ref4) {
    var height = _ref4.height,
        width = _ref4.width;
    return _react.default.createElement(TableContainer, null, _react.default.createElement(_reactVirtualized.Table, {
      disableHeader: disableHeader,
      headerClassName: "sc-table-header",
      headerHeight: headerHeight,
      height: height,
      onHeaderClick: onHeaderClick,
      onRowClick: onRowClick,
      overscanRowCount: overscanRowCount || 5,
      noRowsRenderer: _noRowsRenderer,
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
          return _react.default.createElement(CellContainer, null, _react.default.createElement(CellContent, {
            title: cellData
          }, column.renderer ? column.renderer(cellData, rowData) : cellData), rowData.actions && rowData.actions.length && columnIndex === columns.length - 1 && _react.default.createElement(_Dropdown.default, {
            icon: _react.default.createElement("i", {
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
exports.default = _default;