"use strict";(self.webpackChunk_scality_core_ui=self.webpackChunk_scality_core_ui||[]).push([[48683],{"./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function _objectWithoutPropertiesLoose(r,e){if(null==r)return{};var t={};for(var n in r)if({}.hasOwnProperty.call(r,n)){if(e.includes(n))continue;t[n]=r[n]}return t}__webpack_require__.d(__webpack_exports__,{A:()=>_objectWithoutPropertiesLoose})},"./stories/select.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{MultiSelect:()=>MultiSelect,Playground:()=>Playground,WithCustomLabel:()=>WithCustomLabel,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/jsx-runtime.js"),_src_lib_components_select_Select_component__WEBPACK_IMPORTED_MODULE_2__=(__webpack_require__("./node_modules/react/index.js"),__webpack_require__("./src/lib/components/select/Select.component.tsx"));const options=Array.from(new Array(100),((_,index)=>({label:`Item ${index}`,value:index,title:`Item ${index}`,"data-cy":`Item_${index}`}))),__WEBPACK_DEFAULT_EXPORT__={title:"Components/Deprecated/Selector/Select",component:_src_lib_components_select_Select_component__WEBPACK_IMPORTED_MODULE_2__.l,argTypes:{options:{description:"Array of objects with label, title and value properties",control:!1},isMulti:{control:{type:"boolean"}}}},Playground={args:{options}},WithCustomLabel={args:{options,formatOptionLabel:({value,label,...rest})=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div",{className:"sc-select-option-custom-label",...rest,children:[label," ",value%2==0?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("i",{className:"fas fa-flag-usa"}):null]})}},MultiSelect={args:{options,isMulti:!0,value:[options[0],options[1]]}},__namedExportsOrder=["Playground","WithCustomLabel","MultiSelect"];Playground.parameters={...Playground.parameters,docs:{...Playground.parameters?.docs,source:{originalSource:"{\n  args: {\n    options\n  }\n}",...Playground.parameters?.docs?.source}}},WithCustomLabel.parameters={...WithCustomLabel.parameters,docs:{...WithCustomLabel.parameters?.docs,source:{originalSource:"{\n  args: {\n    options,\n    formatOptionLabel: customFormatOptionLabel\n  }\n}",...WithCustomLabel.parameters?.docs?.source}}},MultiSelect.parameters={...MultiSelect.parameters,docs:{...MultiSelect.parameters?.docs,source:{originalSource:"{\n  args: {\n    options,\n    isMulti: true,\n    value: [options[0], options[1]]\n  }\n}",...MultiSelect.parameters?.docs?.source}}}},"./node_modules/memoize-one/dist/memoize-one.esm.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var safeIsNaN=Number.isNaN||function ponyfill(value){return"number"==typeof value&&value!=value};function areInputsEqual(newInputs,lastInputs){if(newInputs.length!==lastInputs.length)return!1;for(var i=0;i<newInputs.length;i++)if(first=newInputs[i],second=lastInputs[i],!(first===second||safeIsNaN(first)&&safeIsNaN(second)))return!1;var first,second;return!0}const __WEBPACK_DEFAULT_EXPORT__=function memoizeOne(resultFn,isEqual){var lastThis;void 0===isEqual&&(isEqual=areInputsEqual);var lastResult,lastArgs=[],calledOnce=!1;return function memoized(){for(var newArgs=[],_i=0;_i<arguments.length;_i++)newArgs[_i]=arguments[_i];return calledOnce&&lastThis===this&&isEqual(newArgs,lastArgs)||(lastResult=resultFn.apply(this,newArgs),calledOnce=!0,lastThis=this,lastArgs=newArgs),lastResult}}},"./src/lib/components/select/Select.component.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{l:()=>Select});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/jsx-runtime.js"),react_select__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/react-select/dist/react-select.esm.js"),styled_components__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),_style_theme__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/lib/style/theme.ts"),_utils__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/lib/utils.ts");const SelectContainer=styled_components__WEBPACK_IMPORTED_MODULE_1__.Ay.div`
  font-size: ${_style_theme__WEBPACK_IMPORTED_MODULE_2__.J.base};
  .sc-select__control {
    background-color: ${(0,_utils__WEBPACK_IMPORTED_MODULE_3__.sP)("backgroundLevel1")};
    border-radius: 4px;
    border: 1px solid ${(0,_utils__WEBPACK_IMPORTED_MODULE_3__.sP)("border")};
    height: auto;

    .sc-select__placeholder,
    .sc-select__single-value {
      color: ${(0,_utils__WEBPACK_IMPORTED_MODULE_3__.sP)("textSecondary")};
    }
    &.sc-select__control--is-focused {
      border-color: ${(0,_utils__WEBPACK_IMPORTED_MODULE_3__.sP)("selectedActive")};
      box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
        0 0 0 1px rgba(0, 126, 255, 0.1);
      outline: none;
    }
    .sc-select__indicator {
      color: ${(0,_utils__WEBPACK_IMPORTED_MODULE_3__.sP)("textSecondary")};
      &.sc-select__dropdown-indicator:hover {
        color: ${(0,_utils__WEBPACK_IMPORTED_MODULE_3__.sP)("selectedActive")};
      }
      &.sc-select__clear-indicator:hover {
        color: ${_style_theme__WEBPACK_IMPORTED_MODULE_2__.wm};
      }
    }
    .sc-select__multi-value__remove {
      border-radius: 0;
      color: ${(0,_utils__WEBPACK_IMPORTED_MODULE_3__.sP)("textSecondary")};
      background-color: ${(0,_utils__WEBPACK_IMPORTED_MODULE_3__.sP)("backgroundLevel4")};
      &:hover {
        color: ${_style_theme__WEBPACK_IMPORTED_MODULE_2__.wm};
      }
    }
    .sc-select__multi-value__label {
      border-radius: 0;
      color: ${(0,_utils__WEBPACK_IMPORTED_MODULE_3__.sP)("selectedActive")};
      background-color: ${(0,_utils__WEBPACK_IMPORTED_MODULE_3__.sP)("backgroundLevel4")};
      vertical-align: initial;
    }
  }
  .sc-select__menu {
    background-color: ${(0,_utils__WEBPACK_IMPORTED_MODULE_3__.sP)("backgroundLevel1")};
    color: ${(0,_utils__WEBPACK_IMPORTED_MODULE_3__.sP)("textSecondary")};
    border: 1px solid ${(0,_utils__WEBPACK_IMPORTED_MODULE_3__.sP)("selectedActive")};
    box-sizing: border-box;
    overflow: hidden;
    z-index: ${_style_theme__WEBPACK_IMPORTED_MODULE_2__.fE.dropdown};
    .sc-select__option {
      &.sc-select__option--is-focused {
        background-color: ${(0,_utils__WEBPACK_IMPORTED_MODULE_3__.sP)("backgroundLevel1")};
      }
      &.sc-select__option--is-selected {
        background-color: ${(0,_utils__WEBPACK_IMPORTED_MODULE_3__.sP)("backgroundLevel1")};
        color: ${(0,_utils__WEBPACK_IMPORTED_MODULE_3__.sP)("selectedActive")};
        font-weight: ${_style_theme__WEBPACK_IMPORTED_MODULE_2__.Wy.bold};
      }
    }
  }
`,defaultFormatOptionLabel=({label,...rest})=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div",{className:"sc-select-option-label",...rest,children:label});const Select=function SelectBox({options,formatOptionLabel,...rest}){return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(SelectContainer,{className:"sc-select-container",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_select__WEBPACK_IMPORTED_MODULE_4__.Ay,{className:"sc-select",classNamePrefix:"sc-select",options,formatOptionLabel:formatOptionLabel||defaultFormatOptionLabel,...rest})})};try{Select.displayName="Select",Select.__docgenInfo={description:"",displayName:"Select",props:{id:{defaultValue:null,description:"",name:"id",required:!1,type:{name:"any"}},options:{defaultValue:null,description:"",name:"options",required:!0,type:{name:"Items"}},formatOptionLabel:{defaultValue:null,description:"",name:"formatOptionLabel",required:!1,type:{name:"((arg0: any) => Element)"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/lib/components/select/Select.component.tsx#Select"]={docgenInfo:Select.__docgenInfo,name:"Select",path:"src/lib/components/select/Select.component.tsx#Select"})}catch(__react_docgen_typescript_loader_error){}}}]);
//# sourceMappingURL=select-stories.b07f5fce.iframe.bundle.js.map