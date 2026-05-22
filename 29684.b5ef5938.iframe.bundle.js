"use strict";(self.webpackChunk_scality_core_ui=self.webpackChunk_scality_core_ui||[]).push([[29684],{"./src/lib/components/form/Form.component.tsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Ag:()=>LABEL_PREFIX,_1:()=>DESCRIPTION_PREFIX,fY:()=>useFieldContext,gE:()=>FormGroup,lV:()=>Form,y9:()=>FormSection});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/jsx-runtime.js"),react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/index.js"),styled_components__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),_spacing__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/lib/spacing.tsx"),_utils__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/lib/utils.ts"),_box_Box__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/lib/components/box/Box.ts"),_icon_Icon_component__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./src/lib/components/icon/Icon.component.tsx"),_iconhelper_IconHelper__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./src/lib/components/iconhelper/IconHelper.tsx"),_scrollbarwrapper_ScrollbarWrapper_component__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("./src/lib/components/scrollbarwrapper/ScrollbarWrapper.component.tsx"),_text_Text_component__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("./src/lib/components/text/Text.component.tsx");const DESCRIPTION_PREFIX="describe-",LABEL_PREFIX="label-",maxWidthTooltip={maxWidth:"20rem"},StyledForm=styled_components__WEBPACK_IMPORTED_MODULE_2__.Ay.form`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  height: 100%;
  background-color: ${props=>"page"===props.layout.kind&&props.theme.backgroundLevel4};
`,BasicPageLayout=styled_components__WEBPACK_IMPORTED_MODULE_2__.Ay.div`
  margin: 0 auto;
  ${props=>"page"===props.layoutKind?`\n  width: 45rem;\n  padding-right: ${_spacing__WEBPACK_IMPORTED_MODULE_3__.YK.f16};\n  `:`\n  width: 100%;\n  padding-bottom: ${_spacing__WEBPACK_IMPORTED_MODULE_3__.YK.r24};`}
`,FixedHeader=(0,styled_components__WEBPACK_IMPORTED_MODULE_2__.Ay)(BasicPageLayout)`
  ${props=>"page"===props.layoutKind?`\n  border-bottom: 1px solid ${props.theme.border};\n  `:""}
`,FixedFooter=(0,styled_components__WEBPACK_IMPORTED_MODULE_2__.Ay)(BasicPageLayout)`
  border-top: 1px solid ${props=>props.theme.border};
`,PaddedContent=styled_components__WEBPACK_IMPORTED_MODULE_2__.Ay.div`
  padding: ${_spacing__WEBPACK_IMPORTED_MODULE_3__.YK.f16} 0 ${_spacing__WEBPACK_IMPORTED_MODULE_3__.YK.f16} ${_spacing__WEBPACK_IMPORTED_MODULE_3__.YK.f16};
`,PaddedForHeaderAndFooterContent=styled_components__WEBPACK_IMPORTED_MODULE_2__.Ay.div`
  padding: ${_spacing__WEBPACK_IMPORTED_MODULE_3__.YK.f16};
`,ScrollArea=(0,styled_components__WEBPACK_IMPORTED_MODULE_2__.Ay)(BasicPageLayout)`
  flex-grow: 1;
  align-self: stretch;
  overflow-y: auto;
`,LabelContext=(0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(null),RequireModeContext=(0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)("partial"),FormGroup=({direction="horizontal",label,id,labelHelpTooltip,content,help,error,required,helpErrorPosition="right",disabled})=>{const ctxt=(0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(LabelContext);if(!ctxt)throw new Error("FormGroup cannot be used outside of FormSection");const{maxLabelWidth,setMaxLabelWidth}=ctxt,requireMode=(0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(RequireModeContext),labelRef=(0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);(0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{if(labelRef.current){const width=labelRef.current.getBoundingClientRect().width;setMaxLabelWidth(currentMaxLabelWidth=>{const additionalWdth=labelHelpTooltip?(0,_utils__WEBPACK_IMPORTED_MODULE_4__.mO)(2):0;return width+additionalWdth>currentMaxLabelWidth?width+additionalWdth:currentMaxLabelWidth})}},[labelRef,labelHelpTooltip,setMaxLabelWidth]);const value={disabled:disabled||!1,error:error||void 0};return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(FieldContext.Provider,{value,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_box_Box__WEBPACK_IMPORTED_MODULE_5__.a,{display:"flex",flexDirection:"horizontal"===direction?"row":"column",alignItems:"baseline",gap:"horizontal"===direction?_spacing__WEBPACK_IMPORTED_MODULE_3__.YK.r32:_spacing__WEBPACK_IMPORTED_MODULE_3__.YK.r4,children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div",{style:{width:0===maxLabelWidth?"max-content":`${maxLabelWidth}px`,flex:"none"},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label",{htmlFor:id,id:`${LABEL_PREFIX}${id}`,ref:labelRef,style:{opacity:disabled?.5:1},children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_text_Text_component__WEBPACK_IMPORTED_MODULE_9__.EY,{children:[label,"all"!==requireMode&&required&&" *","all"===requireMode&&!required&&" (optional)"]}),labelHelpTooltip&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_box_Box__WEBPACK_IMPORTED_MODULE_5__.a,{display:"inline-block",marginLeft:_spacing__WEBPACK_IMPORTED_MODULE_3__.YK.r8,style:{whiteSpace:"nowrap"},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_iconhelper_IconHelper__WEBPACK_IMPORTED_MODULE_7__.L,{tooltipMessage:labelHelpTooltip,overlayStyle:maxWidthTooltip})})]})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_spacing__WEBPACK_IMPORTED_MODULE_3__.BJ,{direction:"right"===helpErrorPosition?"horizontal":"vertical",gap:"right"===helpErrorPosition?"r8":"r4",children:[content,error?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_text_Text_component__WEBPACK_IMPORTED_MODULE_9__.EE,{color:"statusCritical",id:`${DESCRIPTION_PREFIX}${id}`,children:error}):help?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div",{style:{opacity:disabled?.5:1},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_text_Text_component__WEBPACK_IMPORTED_MODULE_9__.EE,{color:"textSecondary",id:`${DESCRIPTION_PREFIX}${id}`,children:help})}):(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_text_Text_component__WEBPACK_IMPORTED_MODULE_9__.EE,{children:" "})]})]})})},FormSection=({children,title,forceLabelWidth,rightActions})=>{const[maxLabelWidth,setMaxLabelWidth]=(0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(forceLabelWidth||0),groupNotOptional=react__WEBPACK_IMPORTED_MODULE_1__.Children.toArray(children).find(child=>!!(0,react__WEBPACK_IMPORTED_MODULE_1__.isValidElement)(child)&&!0===child.props.required);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(LabelContext.Provider,{value:{maxLabelWidth,setMaxLabelWidth},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_spacing__WEBPACK_IMPORTED_MODULE_3__.BJ,{direction:"vertical",gap:"r12",children:[title&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_spacing__WEBPACK_IMPORTED_MODULE_3__.B_,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_spacing__WEBPACK_IMPORTED_MODULE_3__.BJ,{direction:"horizontal",gap:"r8",children:[title.icon&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_icon_Icon_component__WEBPACK_IMPORTED_MODULE_6__.In,{name:title.icon,color:"textPrimary"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_text_Text_component__WEBPACK_IMPORTED_MODULE_9__.EY,{isEmphazed:!0,children:groupNotOptional?`${title.name}`:`${title.name} (optional)`}),title.helpTooltip&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_iconhelper_IconHelper__WEBPACK_IMPORTED_MODULE_7__.L,{tooltipMessage:title.helpTooltip,overlayStyle:maxWidthTooltip})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div",{children:rightActions})]}),children]})})},PageForm=(0,react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(({layout,leftActions,rightActions,children,banner,...formProps},ref)=>{const requireMode=(0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(RequireModeContext);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_scrollbarwrapper_ScrollbarWrapper_component__WEBPACK_IMPORTED_MODULE_8__.K,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(StyledForm,{...formProps,noValidate:!0,ref,layout,children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(FixedHeader,{layoutKind:"page",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(PaddedForHeaderAndFooterContent,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_spacing__WEBPACK_IMPORTED_MODULE_3__.B_,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_spacing__WEBPACK_IMPORTED_MODULE_3__.BJ,{direction:"vertical",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_text_Text_component__WEBPACK_IMPORTED_MODULE_9__.EY,{variant:"Larger",children:[layout.icon&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_icon_Icon_component__WEBPACK_IMPORTED_MODULE_6__.In,{name:layout.icon,color:"textSecondary"})," ",layout.title]}),layout.subTitle&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_text_Text_component__WEBPACK_IMPORTED_MODULE_9__.EY,{variant:"Large",isEmphazed:!0,children:layout.subTitle})]}),"partial"===requireMode&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_text_Text_component__WEBPACK_IMPORTED_MODULE_9__.EY,{color:"textSecondary",variant:"Smaller",style:{alignSelf:"flex-end"},isGentleEmphazed:!0,children:"* are required fields"})]})})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ScrollArea,{layoutKind:"page",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(PaddedContent,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div",{style:{paddingBottom:`${_spacing__WEBPACK_IMPORTED_MODULE_3__.YK.r16}`},children:banner}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_spacing__WEBPACK_IMPORTED_MODULE_3__.BJ,{direction:"vertical",withSeparators:!0,gap:"r24",children:react__WEBPACK_IMPORTED_MODULE_1__.Children.toArray(children)})]})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(FixedFooter,{layoutKind:"page",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(PaddedForHeaderAndFooterContent,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_spacing__WEBPACK_IMPORTED_MODULE_3__.B_,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div",{children:leftActions}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div",{children:rightActions})]})})})]})})}),TabForm=(0,react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(({leftActions,rightActions,children,banner,...formProps},ref)=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_scrollbarwrapper_ScrollbarWrapper_component__WEBPACK_IMPORTED_MODULE_8__.K,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(StyledForm,{...formProps,noValidate:!0,ref,children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(FixedHeader,{layoutKind:"tab",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_spacing__WEBPACK_IMPORTED_MODULE_3__.B_,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div",{children:leftActions}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div",{children:rightActions})]})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ScrollArea,{layoutKind:"tab",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_spacing__WEBPACK_IMPORTED_MODULE_3__.BJ,{direction:"vertical",gap:"r24",children:[banner,(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_spacing__WEBPACK_IMPORTED_MODULE_3__.BJ,{direction:"vertical",withSeparators:!0,gap:"r24",children:react__WEBPACK_IMPORTED_MODULE_1__.Children.toArray(children)})]})})]})})),Form=(0,react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(({layout,requireMode,...formProps},ref)=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(RequireModeContext.Provider,{value:requireMode||"partial",children:"page"===layout.kind?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(PageForm,{layout,...formProps,ref}):(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(TabForm,{layout,...formProps,ref})})),FieldContext=(0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(null),useFieldContext=()=>{const fieldContext=(0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(FieldContext);return fieldContext?{...fieldContext,isContextAvailable:!0}:{isContextAvailable:!1}};try{Form.displayName="Form",Form.__docgenInfo={description:"",displayName:"Form",props:{layout:{defaultValue:null,description:"",name:"layout",required:!0,type:{name:'{ kind: "tab"; } | { kind: "page"; title: string; subTitle?: string | undefined; icon?: string | undefined; }'}},requireMode:{defaultValue:null,description:"",name:"requireMode",required:!1,type:{name:"enum",value:[{value:'"all"'},{value:'"partial"'}]}},leftActions:{defaultValue:null,description:"",name:"leftActions",required:!1,type:{name:"ReactNode"}},rightActions:{defaultValue:null,description:"",name:"rightActions",required:!1,type:{name:"ReactNode"}},banner:{defaultValue:null,description:"",name:"banner",required:!1,type:{name:"ReactNode"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/lib/components/form/Form.component.tsx#Form"]={docgenInfo:Form.__docgenInfo,name:"Form",path:"src/lib/components/form/Form.component.tsx#Form"})}catch(__react_docgen_typescript_loader_error){}try{FormSection.displayName="FormSection",FormSection.__docgenInfo={description:"",displayName:"FormSection",props:{title:{defaultValue:null,description:"",name:"title",required:!1,type:{name:"{ name: string; icon?: string; helpTooltip?: string; } | undefined"}},forceLabelWidth:{defaultValue:null,description:"",name:"forceLabelWidth",required:!1,type:{name:"number"}},rightActions:{defaultValue:null,description:"",name:"rightActions",required:!1,type:{name:"ReactNode"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/lib/components/form/Form.component.tsx#FormSection"]={docgenInfo:FormSection.__docgenInfo,name:"FormSection",path:"src/lib/components/form/Form.component.tsx#FormSection"})}catch(__react_docgen_typescript_loader_error){}try{FormGroup.displayName="FormGroup",FormGroup.__docgenInfo={description:"",displayName:"FormGroup",props:{label:{defaultValue:null,description:"",name:"label",required:!0,type:{name:"string"}},id:{defaultValue:null,description:"",name:"id",required:!0,type:{name:"string"}},content:{defaultValue:null,description:"",name:"content",required:!0,type:{name:"ReactElement<ContentProps, string | JSXElementConstructor<any>>"}},direction:{defaultValue:{value:"horizontal"},description:"",name:"direction",required:!1,type:{name:"enum",value:[{value:'"horizontal"'},{value:'"vertical"'}]}},labelHelpTooltip:{defaultValue:null,description:"",name:"labelHelpTooltip",required:!1,type:{name:"ReactNode"}},help:{defaultValue:null,description:"",name:"help",required:!1,type:{name:"string"}},error:{defaultValue:null,description:"",name:"error",required:!1,type:{name:"string"}},required:{defaultValue:null,description:"",name:"required",required:!1,type:{name:"boolean"}},helpErrorPosition:{defaultValue:{value:"right"},description:"",name:"helpErrorPosition",required:!1,type:{name:"enum",value:[{value:'"bottom"'},{value:'"right"'}]}},disabled:{defaultValue:null,description:"",name:"disabled",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/lib/components/form/Form.component.tsx#FormGroup"]={docgenInfo:FormGroup.__docgenInfo,name:"FormGroup",path:"src/lib/components/form/Form.component.tsx#FormGroup"})}catch(__react_docgen_typescript_loader_error){}},"./src/lib/components/iconhelper/IconHelper.tsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{L:()=>IconHelp});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/jsx-runtime.js"),styled_components__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),_icon_Icon_component__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/lib/components/icon/Icon.component.tsx"),_tooltip_Tooltip_component__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/lib/components/tooltip/Tooltip.component.tsx");const HelpButton=styled_components__WEBPACK_IMPORTED_MODULE_1__.Ay.button`
  display: inline-flex;
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  color: inherit;
  font: inherit;              /* Inherit font sizing */
  vertical-align: text-bottom;     /* Align with text */
  line-height: 1;
  cursor: default;
  &:focus-visible {
    outline: 2px dashed ${props=>props.theme.selectedActive};
    outline-offset: 2px;
    border-radius: 2px;
  }
`,IconHelp=({tooltipMessage,overlayStyle,placement="right","aria-label":ariaLabel,title})=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_tooltip_Tooltip_component__WEBPACK_IMPORTED_MODULE_3__.m_,{overlay:tooltipMessage,placement,overlayStyle,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(HelpButton,{type:"button","aria-label":ariaLabel||title||"More information",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_icon_Icon_component__WEBPACK_IMPORTED_MODULE_2__.In,{name:"Info",color:"buttonSecondary"})})});try{IconHelp.displayName="IconHelp",IconHelp.__docgenInfo={description:"",displayName:"IconHelp",props:{tooltipMessage:{defaultValue:null,description:"",name:"tooltipMessage",required:!0,type:{name:"ReactNode"}},placement:{defaultValue:{value:"right"},description:"",name:"placement",required:!1,type:{name:"enum",value:[{value:'"top"'},{value:'"bottom"'},{value:'"left"'},{value:'"top-start"'},{value:'"top-end"'},{value:'"right"'},{value:'"right-start"'},{value:'"right-end"'},{value:'"bottom-end"'},{value:'"bottom-start"'},{value:'"left-start"'},{value:'"left-end"'}]}},overlayStyle:{defaultValue:null,description:"",name:"overlayStyle",required:!1,type:{name:"CSSProperties"}},"aria-label":{defaultValue:null,description:'Accessible label for the help button.\nShould describe what information the tooltip provides.\nExample: "More info about Veeam application"',name:"aria-label",required:!1,type:{name:"string"}},title:{defaultValue:null,description:"@deprecated Use aria-label instead",name:"title",required:!1,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/lib/components/iconhelper/IconHelper.tsx#IconHelp"]={docgenInfo:IconHelp.__docgenInfo,name:"IconHelp",path:"src/lib/components/iconhelper/IconHelper.tsx#IconHelp"})}catch(__react_docgen_typescript_loader_error){}},"./src/lib/components/scrollbarwrapper/ScrollbarWrapper.component.tsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{K:()=>ScrollbarWrapper});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/jsx-runtime.js"),styled_components__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const GlobalStyle=styled_components__WEBPACK_IMPORTED_MODULE_1__.DU`
  /**
   * scroll-fade utility
   *
   * Add class="scroll-fade" to any overflow-y: auto/scroll element to get a
   * bottom fade that auto-hides when the user reaches the end of the list.
   *
   * How the property cascade works:
   *   • 0rem  — initial-value; used when timeline is inactive (no overflow)
   *   • 2.5rem — fill-mode:both holds this from scroll-top until near-bottom
   *   • 0rem  — fill-mode:both holds this once fully scrolled to the bottom
   *
   * animation-duration: 1ms
   *   Gecko quirk: Firefox requires a non-zero time duration to initialise
   *   the animation sampling loop, even for scroll-driven animations where
   *   time is irrelevant. Harmless on Blink/WebKit. Can be removed once
   *   Firefox 151+ (targeting stable ~May 2026, Interop 2026 focus area)
   *   removes this requirement.
   *
   * @supports guard: mask-image creates a CSS stacking context, which
   * resets the containing block of position:fixed descendants. Limiting
   * the rule to browsers that understand animation-timeline means
   * Firefox/Safari stable never receive mask-image.
   *
   * Individual animation-* longhand properties are used (not the shorthand)
   * so that component-level animation declarations on more-specific selectors
   * are never overridden.
   */
  @property --scroll-fade-bottom {
    syntax: '<length>';
    inherits: false;
    initial-value: 0rem;
  }

  @keyframes scroll-fade-out {
    from { --scroll-fade-bottom: 2.5rem; }
    to   { --scroll-fade-bottom: 0rem; }
  }

  @supports (animation-timeline: scroll()) {
    .scroll-fade {
      animation-name: scroll-fade-out;
      animation-duration: 1ms; /* Firefox activation quirk — see note above */
      animation-timing-function: linear;
      animation-fill-mode: both;
      animation-timeline: scroll(self);
      animation-range: calc(100% - 2.5rem) 100%;
      mask-image:
        linear-gradient(to top, black 1px, transparent 1px),
        linear-gradient(to right, black 1px, transparent 1px),
        linear-gradient(to left, black 9px, transparent 9px),
        linear-gradient(
          to bottom,
          black calc(100% - var(--scroll-fade-bottom)),
          transparent 100%
        );
      mask-composite: add, add, add, add;
      -webkit-mask-image:
        linear-gradient(to top, black 1px, transparent 1px),
        linear-gradient(to right, black 1px, transparent 1px),
        linear-gradient(to left, black 9px, transparent 9px),
        linear-gradient(
          to bottom,
          black calc(100% - var(--scroll-fade-bottom)),
          transparent 100%
        );
      -webkit-mask-composite: source-over, source-over, source-over, source-over;
    }
  }

${props=>{const brand=props.theme;return styled_components__WEBPACK_IMPORTED_MODULE_1__.AH`
    // Custom scrollbar
    * {
      // Chrome / Safari / Edge
      ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }

      ::-webkit-scrollbar-track {
        background: ${brand.backgroundLevel3};
      }

      ::-webkit-scrollbar-thumb {
        width: 4px;
        height: 4px;
        min-height: 20px;
        background: ${brand.border}; // fallback for gradient themes
        background: ${brand.buttonSecondary};
        border-radius: 4px;
        -webkit-border-radius: 4px;
        background-clip: padding-box;
        border: 2px solid rgba(0, 0, 0, 0);
      }

      ::-webkit-scrollbar-thumb:vertical:hover,
      ::-webkit-scrollbar-thumb:horizontal:hover {
        background-color: rgba(89, 90, 120, 0.5);
      }

      ::-webkit-scrollbar-button {
        width: 0;
        height: 0;
        display: none;
      }
      ::-webkit-scrollbar-corner {
        background-color: transparent;
      }

      // Firefox
      scrollbar-color: ${brand.border} ${brand.backgroundLevel3}; // fallback for gradient themes
      scrollbar-color: ${brand.buttonSecondary} ${brand.backgroundLevel3};
      scrollbar-width: thin;
    }
  `}}
`;function ScrollbarWrapper({children}){return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(GlobalStyle,{}),children]})}try{ScrollbarWrapper.displayName="ScrollbarWrapper",ScrollbarWrapper.__docgenInfo={description:"",displayName:"ScrollbarWrapper",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/lib/components/scrollbarwrapper/ScrollbarWrapper.component.tsx#ScrollbarWrapper"]={docgenInfo:ScrollbarWrapper.__docgenInfo,name:"ScrollbarWrapper",path:"src/lib/components/scrollbarwrapper/ScrollbarWrapper.component.tsx#ScrollbarWrapper"})}catch(__react_docgen_typescript_loader_error){}}}]);
//# sourceMappingURL=29684.b5ef5938.iframe.bundle.js.map