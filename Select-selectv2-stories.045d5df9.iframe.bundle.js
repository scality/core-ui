"use strict";(globalThis.webpackChunk_scality_core_ui||=[]).push([[37848],{"./src/lib/components/constrainedtext/Constrainedtext.component.tsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{u:()=>ConstrainedText});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/jsx-runtime.js"),react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/index.js"),styled_components__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),_tooltip_Tooltip_component__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/lib/components/tooltip/Tooltip.component.tsx"),_text_Text_component__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/lib/components/text/Text.component.tsx");const ConstrainedTextContainer=styled_components__WEBPACK_IMPORTED_MODULE_2__.Ay.div`
  overflow: hidden;
  text-overflow: ellipsis;
  /* inherit when no align is given: this is a rule on the element, so a
     hard-coded value silently outranks whatever alignment the container set --
     a table cell declaring textAlign: center kept left-aligned text with
     nothing to explain why. */
  text-align: ${props=>props.$align??"inherit"};

  ${props=>props.$lineClamp>1?`\n  display: -webkit-box;\n  -webkit-line-clamp: ${props.$lineClamp};\n  -webkit-box-orient: vertical;\n  overflow-wrap: break-word;\n  word-break: normal;\n  line-height: 1.2;\n  `:"overflow-wrap: break-word;\n      white-space: nowrap;\n      word-break: normal;\n      "};
`,BlockTooltip=styled_components__WEBPACK_IMPORTED_MODULE_2__.Ay.div`
  width: stretch;
  & > .sc-tooltip {
    display: block;
  }
`;function ConstrainedText({text,tooltipStyle,tooltipPlacement,lineClamp=1,align,centered=!1,...textProps}){const[displayToolTip,setDisplayToolTip]=(0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(!1),constrainedTextRef=(0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(element=>{element&&text&&setDisplayToolTip(function isEllipsisActive(element){return element&&(element.offsetWidth<element.scrollWidth||element.offsetHeight<element.scrollHeight)}(element))},[text]),constrainedText=(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_text_Text_component__WEBPACK_IMPORTED_MODULE_4__.EY,{...textProps,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ConstrainedTextContainer,{ref:constrainedTextRef,className:"sc-constrainedtext",$lineClamp:lineClamp,$align:align??(centered?"center":void 0),children:text})});return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(BlockTooltip,{children:displayToolTip?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_tooltip_Tooltip_component__WEBPACK_IMPORTED_MODULE_3__.m_,{overlay:text,overlayStyle:tooltipStyle,placement:tooltipPlacement,children:constrainedText}):constrainedText})}try{ConstrainedText.displayName="ConstrainedText",ConstrainedText.__docgenInfo={description:"",displayName:"ConstrainedText",props:{text:{defaultValue:null,description:"",name:"text",required:!0,type:{name:"string | number | Element | Element[]"}},tooltipStyle:{defaultValue:null,description:"",name:"tooltipStyle",required:!1,type:{name:"CSSProperties"}},tooltipPlacement:{defaultValue:null,description:"",name:"tooltipPlacement",required:!1,type:{name:"enum",value:[{value:'"top"'},{value:'"bottom"'},{value:'"left"'},{value:'"top-start"'},{value:'"top-end"'},{value:'"right"'},{value:'"right-start"'},{value:'"right-end"'},{value:'"bottom-end"'},{value:'"bottom-start"'},{value:'"left-start"'},{value:'"left-end"'}]}},lineClamp:{defaultValue:{value:"1"},description:"",name:"lineClamp",required:!1,type:{name:"number"}},align:{defaultValue:null,description:"",name:"align",required:!1,type:{name:"enum",value:[{value:'"start"'},{value:'"end"'},{value:'"center"'}]}},centered:{defaultValue:{value:"false"},description:'@deprecated use `align="center"` instead.',name:"centered",required:!1,type:{name:"boolean"}},color:{defaultValue:null,description:"",name:"color",required:!1,type:{name:"enum",value:[{value:'"backgroundLevel1"'},{value:'"backgroundLevel2"'},{value:'"backgroundLevel3"'},{value:'"backgroundLevel4"'},{value:'"statusHealthy"'},{value:'"statusHealthyRGB"'},{value:'"statusWarning"'},{value:'"statusWarningRGB"'},{value:'"statusCritical"'},{value:'"statusCriticalRGB"'},{value:'"selectedActive"'},{value:'"highlight"'},{value:'"border"'},{value:'"buttonPrimary"'},{value:'"buttonSecondary"'},{value:'"buttonDelete"'},{value:'"infoPrimary"'},{value:'"infoSecondary"'},{value:'"navbarBackground"'},{value:'"textPrimary"'},{value:'"textSecondary"'},{value:'"textTertiary"'},{value:'"textReverse"'},{value:'"textLink"'}]}},variant:{defaultValue:null,description:"",name:"variant",required:!1,type:{name:"enum",value:[{value:'"ChartTitle"'},{value:'"Basic"'},{value:'"Smaller"'},{value:'"Larger"'},{value:'"Large"'},{value:'"Small"'}]}},isEmphazed:{defaultValue:null,description:"",name:"isEmphazed",required:!1,type:{name:"boolean"}},isGentleEmphazed:{defaultValue:null,description:"",name:"isGentleEmphazed",required:!1,type:{name:"boolean"}},compact:{defaultValue:null,description:"",name:"compact",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/lib/components/constrainedtext/Constrainedtext.component.tsx#ConstrainedText"]={docgenInfo:ConstrainedText.__docgenInfo,name:"ConstrainedText",path:"src/lib/components/constrainedtext/Constrainedtext.component.tsx#ConstrainedText"})}catch(__react_docgen_typescript_loader_error){}},"./src/lib/components/inputv2/inputv2.tsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/jsx-runtime.js"),react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/index.js"),styled_components__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),_spacing__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/lib/spacing.tsx"),_form_Form_component__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/lib/components/form/Form.component.tsx"),_icon_Icon_component__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/lib/components/icon/Icon.component.tsx"),_style_theme__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./src/lib/style/theme.ts");const convertSizeToRem=size=>"2/3"===size?"14rem":"1/3"===size?"6rem":"1/2"===size?"10rem":"20.5rem",StyledInput=styled_components__WEBPACK_IMPORTED_MODULE_2__.Ay.input`
  max-width: ${props=>props.$hasIcon?`calc(100% - 1rem - ${_spacing__WEBPACK_IMPORTED_MODULE_3__.YK.f8})`:"100%"};

  font-family: ${_style_theme__WEBPACK_IMPORTED_MODULE_6__.mw};
  ${props=>props.disabled&&"\n  cursor: not-allowed;\n  "}
  background: ${props=>props.theme.backgroundLevel1};
  font-size: 1rem;
  color: ${props=>props.theme.textPrimary};
  border: 0;
  flex: 1;
  border-radius: ${_spacing__WEBPACK_IMPORTED_MODULE_3__.YK.r4};
  line-height: ${_spacing__WEBPACK_IMPORTED_MODULE_3__.YK.r20};
  &:placeholder-shown {
    font-style: italic;
  }
  &::placeholder {
    color: ${props=>props.theme.textSecondary};
    opacity: 0.5;
  }
  &:focus {
    border: 0;
    outline: none;
  }
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-text-fill-color: ${props=>props.theme.textPrimary};
    -webkit-background-clip: text;
    caret-color: ${props=>props.theme.textPrimary};
  }
`,InputContainer=styled_components__WEBPACK_IMPORTED_MODULE_2__.Ay.div`
  height: 100%;
  display: flex;
  align-items: center;
  gap: ${_spacing__WEBPACK_IMPORTED_MODULE_3__.YK.f8};
  padding: 0 ${_spacing__WEBPACK_IMPORTED_MODULE_3__.YK.r8} 0 ${_spacing__WEBPACK_IMPORTED_MODULE_3__.YK.r8};
  background: ${props=>props.theme.backgroundLevel1};
  border-radius: ${_spacing__WEBPACK_IMPORTED_MODULE_3__.YK.r4};
  ${props=>props.$disabled?styled_components__WEBPACK_IMPORTED_MODULE_2__.AH`
          opacity: 0.5;
          cursor: not-allowed;
        `:""}
`,InputBorder=styled_components__WEBPACK_IMPORTED_MODULE_2__.Ay.div`
  box-sizing: border-box;
  width: ${props=>props.$width};
  ${props=>props.$fluid&&styled_components__WEBPACK_IMPORTED_MODULE_2__.AH`
      max-width: 100%;
      min-width: 0;
    `}
  height: ${_spacing__WEBPACK_IMPORTED_MODULE_3__.YK.r32};
  border: ${_spacing__WEBPACK_IMPORTED_MODULE_3__.YK.r1} solid
    ${props=>props.$hasError?props.theme.statusCritical:props.theme.border};
  border-radius: ${_spacing__WEBPACK_IMPORTED_MODULE_3__.YK.r4};
  &:hover {
    ${props=>!props.$disabled&&`border: ${_spacing__WEBPACK_IMPORTED_MODULE_3__.YK.r1} solid ${props.theme.infoPrimary};`}
  }
  &:focus-within {
    border: ${_spacing__WEBPACK_IMPORTED_MODULE_3__.YK.r1} solid ${props=>props.theme.infoPrimary};
  }
`,SelfCenterredIcon=(0,styled_components__WEBPACK_IMPORTED_MODULE_2__.Ay)(_icon_Icon_component__WEBPACK_IMPORTED_MODULE_5__.In)`
  align-self: center;
  color: ${props=>props.theme[props.color]};
`,Input=(0,react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(({error,disabled,id,leftIcon,leftIconColor="textSecondary",rightIcon,rightIconColor="textSecondary",placeholder,size,noPlaceholderPrefix,fluid,...inputProps},ref)=>{const{isContextAvailable,disabled:disabledFromFieldContext,error:errorFromFieldContext,responsive:responsiveFromFieldContext}=(0,_form_Form_component__WEBPACK_IMPORTED_MODULE_4__.fY)(),isFluid=!(!fluid&&!responsiveFromFieldContext);return placeholder=placeholder?noPlaceholderPrefix?placeholder:`Example: ${placeholder}`:void 0,(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(InputBorder,{$disabled:!(!disabled&&!disabledFromFieldContext),$hasError:!(!error&&!errorFromFieldContext),$width:convertSizeToRem(size),$fluid:isFluid,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(InputContainer,{$isContextAvailable:isContextAvailable,$disabled:!(!disabled&&!disabledFromFieldContext),$hasError:!(!error&&!errorFromFieldContext),children:[leftIcon&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(SelfCenterredIcon,{name:leftIcon,color:leftIconColor}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(StyledInput,{ref,disabled:disabled||disabledFromFieldContext,"aria-invalid":!(!error&&!errorFromFieldContext),"aria-describedby":`${_form_Form_component__WEBPACK_IMPORTED_MODULE_4__._1}${id}`,$hasIcon:!(!leftIcon&&!rightIcon),id,...inputProps,placeholder}),rightIcon&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(SelfCenterredIcon,{name:rightIcon,color:rightIconColor})]})})});try{convertSizeToRem.displayName="convertSizeToRem",convertSizeToRem.__docgenInfo={description:"",displayName:"convertSizeToRem",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/lib/components/inputv2/inputv2.tsx#convertSizeToRem"]={docgenInfo:convertSizeToRem.__docgenInfo,name:"convertSizeToRem",path:"src/lib/components/inputv2/inputv2.tsx#convertSizeToRem"})}catch(__react_docgen_typescript_loader_error){}try{Input.displayName="Input",Input.__docgenInfo={description:"",displayName:"Input",props:{error:{defaultValue:null,description:"",name:"error",required:!1,type:{name:"string"}},id:{defaultValue:null,description:"",name:"id",required:!1,type:{name:"string"}},leftIcon:{defaultValue:null,description:"",name:"leftIcon",required:!1,type:{name:"string"}},leftIconColor:{defaultValue:{value:"textSecondary"},description:"",name:"leftIconColor",required:!1,type:{name:"enum",value:[{value:'"backgroundLevel1"'},{value:'"backgroundLevel2"'},{value:'"backgroundLevel3"'},{value:'"backgroundLevel4"'},{value:'"statusHealthy"'},{value:'"statusHealthyRGB"'},{value:'"statusWarning"'},{value:'"statusWarningRGB"'},{value:'"statusCritical"'},{value:'"statusCriticalRGB"'},{value:'"selectedActive"'},{value:'"highlight"'},{value:'"border"'},{value:'"buttonPrimary"'},{value:'"buttonSecondary"'},{value:'"buttonDelete"'},{value:'"infoPrimary"'},{value:'"infoSecondary"'},{value:'"navbarBackground"'},{value:'"textPrimary"'},{value:'"textSecondary"'},{value:'"textTertiary"'},{value:'"textReverse"'},{value:'"textLink"'}]}},rightIcon:{defaultValue:null,description:"",name:"rightIcon",required:!1,type:{name:"string"}},rightIconColor:{defaultValue:{value:"textSecondary"},description:"",name:"rightIconColor",required:!1,type:{name:"enum",value:[{value:'"backgroundLevel1"'},{value:'"backgroundLevel2"'},{value:'"backgroundLevel3"'},{value:'"backgroundLevel4"'},{value:'"statusHealthy"'},{value:'"statusHealthyRGB"'},{value:'"statusWarning"'},{value:'"statusWarningRGB"'},{value:'"statusCritical"'},{value:'"statusCriticalRGB"'},{value:'"selectedActive"'},{value:'"highlight"'},{value:'"border"'},{value:'"buttonPrimary"'},{value:'"buttonSecondary"'},{value:'"buttonDelete"'},{value:'"infoPrimary"'},{value:'"infoSecondary"'},{value:'"navbarBackground"'},{value:'"textPrimary"'},{value:'"textSecondary"'},{value:'"textTertiary"'},{value:'"textReverse"'},{value:'"textLink"'}]}},size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"1"'},{value:'"2/3"'},{value:'"1/2"'},{value:'"1/3"'}]}},noPlaceholderPrefix:{defaultValue:null,description:"",name:"noPlaceholderPrefix",required:!1,type:{name:"boolean"}},fluid:{defaultValue:null,description:"",name:"fluid",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/lib/components/inputv2/inputv2.tsx#Input"]={docgenInfo:Input.__docgenInfo,name:"Input",path:"src/lib/components/inputv2/inputv2.tsx#Input"})}catch(__react_docgen_typescript_loader_error){}__webpack_require__.d(__webpack_exports__,["c",0,convertSizeToRem,"p",0,Input])}}]);
//# sourceMappingURL=Select-selectv2-stories.045d5df9.iframe.bundle.js.map