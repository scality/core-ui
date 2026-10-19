"use strict";(globalThis.webpackChunk_scality_core_ui||=[]).push([[45358],{"./stories/content.stories.tsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__);var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/jsx-runtime.js"),react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/index.js"),_src_lib_components_modal_Modal_component__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/lib/components/modal/Modal.component.tsx"),_src_lib_components_buttonv2_Buttonv2_component__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/lib/components/buttonv2/Buttonv2.component.tsx"),_src_lib_components_icon_Icon_component__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/lib/components/icon/Icon.component.tsx"),_src_lib_components_form_Form_component__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/lib/components/form/Form.component.tsx"),_src_lib_components_inputv2_inputv2__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./src/lib/components/inputv2/inputv2.tsx");const ConfirmationModal={render:()=>{const[isOpen,setIsOpen]=(0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(!1);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_src_lib_components_buttonv2_Buttonv2_component__WEBPACK_IMPORTED_MODULE_3__.$n,{variant:"secondary",icon:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_src_lib_components_icon_Icon_component__WEBPACK_IMPORTED_MODULE_4__.In,{name:"Download"}),label:"Download connection details",onClick:()=>setIsOpen(!0)}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_src_lib_components_modal_Modal_component__WEBPACK_IMPORTED_MODULE_2__.a,{isOpen,title:'Download new connection details for "prod-paris"?',close:()=>setIsOpen(!1),actions:{cancel:{onClick:()=>setIsOpen(!1)},confirm:{label:"Download",variant:"primary",onClick:()=>setIsOpen(!1)}},children:"The connection details downloaded before will stop working."})]})}},ValidationMessages={render:()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_src_lib_components_form_Form_component__WEBPACK_IMPORTED_MODULE_5__.y9,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_src_lib_components_form_Form_component__WEBPACK_IMPORTED_MODULE_5__.gE,{direction:"vertical",label:"Rule name",id:"rule-name",required:!0,content:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_src_lib_components_inputv2_inputv2__WEBPACK_IMPORTED_MODULE_6__.p,{id:"rule-name",value:"",onChange:()=>{}}),error:"Enter a rule name.",helpErrorPosition:"bottom"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_src_lib_components_form_Form_component__WEBPACK_IMPORTED_MODULE_5__.gE,{direction:"vertical",label:"Days",id:"days",required:!0,content:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_src_lib_components_inputv2_inputv2__WEBPACK_IMPORTED_MODULE_6__.p,{id:"days",type:"number",value:"0",onChange:()=>{}}),error:"The number of days must be at least 1.",helpErrorPosition:"bottom"})]})};ConfirmationModal.parameters={...ConfirmationModal.parameters,docs:{...ConfirmationModal.parameters?.docs,source:{originalSource:'{\n  render: () => {\n    const [isOpen, setIsOpen] = useState(false);\n    return <>\n        <Button variant="secondary" icon={<Icon name="Download" />} label="Download connection details" onClick={() => setIsOpen(true)} />\n        <Modal isOpen={isOpen} title=\'Download new connection details for "prod-paris"?\' close={() => setIsOpen(false)} actions={{\n        cancel: {\n          onClick: () => setIsOpen(false)\n        },\n        confirm: {\n          label: \'Download\',\n          variant: \'primary\',\n          onClick: () => setIsOpen(false)\n        }\n      }}>\n          The connection details downloaded before will stop working.\n        </Modal>\n      </>;\n  }\n}',...ConfirmationModal.parameters?.docs?.source}}},ValidationMessages.parameters={...ValidationMessages.parameters,docs:{...ValidationMessages.parameters?.docs,source:{originalSource:'{\n  render: () => <FormSection>\n      <FormGroup direction="vertical" label="Rule name" id="rule-name" required content={<Input id="rule-name" value="" onChange={() => {}} />} error="Enter a rule name." helpErrorPosition="bottom" />\n      <FormGroup direction="vertical" label="Days" id="days" required content={<Input id="days" type="number" value="0" onChange={() => {}} />} error="The number of days must be at least 1." helpErrorPosition="bottom" />\n    </FormSection>\n}',...ValidationMessages.parameters?.docs?.source}}},__webpack_require__.d(__webpack_exports__,["ConfirmationModal",0,ConfirmationModal,"ValidationMessages",0,ValidationMessages,"__namedExportsOrder",0,["ConfirmationModal","ValidationMessages"],"default",0,{title:"Style/ContentExamples",tags:["!dev","!autodocs"]}])},"./src/lib/components/inputv2/inputv2.tsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/jsx-runtime.js"),react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/index.js"),styled_components__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),_spacing__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/lib/spacing.tsx"),_form_Form_component__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/lib/components/form/Form.component.tsx"),_icon_Icon_component__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/lib/components/icon/Icon.component.tsx"),_style_theme__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./src/lib/style/theme.ts");const convertSizeToRem=size=>"2/3"===size?"14rem":"1/3"===size?"6rem":"1/2"===size?"10rem":"20.5rem",StyledInput=styled_components__WEBPACK_IMPORTED_MODULE_2__.Ay.input`
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
`,Input=(0,react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(({error,disabled,id,leftIcon,leftIconColor="textSecondary",rightIcon,rightIconColor="textSecondary",placeholder,size,noPlaceholderPrefix,fluid,...inputProps},ref)=>{const{isContextAvailable,disabled:disabledFromFieldContext,error:errorFromFieldContext,responsive:responsiveFromFieldContext}=(0,_form_Form_component__WEBPACK_IMPORTED_MODULE_4__.fY)(),isFluid=!(!fluid&&!responsiveFromFieldContext);return placeholder=placeholder?noPlaceholderPrefix?placeholder:`Example: ${placeholder}`:void 0,(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(InputBorder,{$disabled:!(!disabled&&!disabledFromFieldContext),$hasError:!(!error&&!errorFromFieldContext),$width:convertSizeToRem(size),$fluid:isFluid,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(InputContainer,{$isContextAvailable:isContextAvailable,$disabled:!(!disabled&&!disabledFromFieldContext),$hasError:!(!error&&!errorFromFieldContext),children:[leftIcon&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(SelfCenterredIcon,{name:leftIcon,color:leftIconColor}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(StyledInput,{ref,disabled:disabled||disabledFromFieldContext,"aria-invalid":!(!error&&!errorFromFieldContext),"aria-describedby":`${_form_Form_component__WEBPACK_IMPORTED_MODULE_4__._1}${id}`,$hasIcon:!(!leftIcon&&!rightIcon),id,...inputProps,placeholder}),rightIcon&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(SelfCenterredIcon,{name:rightIcon,color:rightIconColor})]})})});try{convertSizeToRem.displayName="convertSizeToRem",convertSizeToRem.__docgenInfo={description:"",displayName:"convertSizeToRem",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/lib/components/inputv2/inputv2.tsx#convertSizeToRem"]={docgenInfo:convertSizeToRem.__docgenInfo,name:"convertSizeToRem",path:"src/lib/components/inputv2/inputv2.tsx#convertSizeToRem"})}catch(__react_docgen_typescript_loader_error){}try{Input.displayName="Input",Input.__docgenInfo={description:"",displayName:"Input",props:{error:{defaultValue:null,description:"",name:"error",required:!1,type:{name:"string"}},id:{defaultValue:null,description:"",name:"id",required:!1,type:{name:"string"}},leftIcon:{defaultValue:null,description:"",name:"leftIcon",required:!1,type:{name:"string"}},leftIconColor:{defaultValue:{value:"textSecondary"},description:"",name:"leftIconColor",required:!1,type:{name:"enum",value:[{value:'"backgroundLevel1"'},{value:'"backgroundLevel2"'},{value:'"backgroundLevel3"'},{value:'"backgroundLevel4"'},{value:'"statusHealthy"'},{value:'"statusHealthyRGB"'},{value:'"statusWarning"'},{value:'"statusWarningRGB"'},{value:'"statusCritical"'},{value:'"statusCriticalRGB"'},{value:'"selectedActive"'},{value:'"highlight"'},{value:'"border"'},{value:'"buttonPrimary"'},{value:'"buttonSecondary"'},{value:'"buttonDelete"'},{value:'"infoPrimary"'},{value:'"infoSecondary"'},{value:'"navbarBackground"'},{value:'"textPrimary"'},{value:'"textSecondary"'},{value:'"textTertiary"'},{value:'"textReverse"'},{value:'"textLink"'}]}},rightIcon:{defaultValue:null,description:"",name:"rightIcon",required:!1,type:{name:"string"}},rightIconColor:{defaultValue:{value:"textSecondary"},description:"",name:"rightIconColor",required:!1,type:{name:"enum",value:[{value:'"backgroundLevel1"'},{value:'"backgroundLevel2"'},{value:'"backgroundLevel3"'},{value:'"backgroundLevel4"'},{value:'"statusHealthy"'},{value:'"statusHealthyRGB"'},{value:'"statusWarning"'},{value:'"statusWarningRGB"'},{value:'"statusCritical"'},{value:'"statusCriticalRGB"'},{value:'"selectedActive"'},{value:'"highlight"'},{value:'"border"'},{value:'"buttonPrimary"'},{value:'"buttonSecondary"'},{value:'"buttonDelete"'},{value:'"infoPrimary"'},{value:'"infoSecondary"'},{value:'"navbarBackground"'},{value:'"textPrimary"'},{value:'"textSecondary"'},{value:'"textTertiary"'},{value:'"textReverse"'},{value:'"textLink"'}]}},size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"1"'},{value:'"2/3"'},{value:'"1/2"'},{value:'"1/3"'}]}},noPlaceholderPrefix:{defaultValue:null,description:"",name:"noPlaceholderPrefix",required:!1,type:{name:"boolean"}},fluid:{defaultValue:null,description:"",name:"fluid",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/lib/components/inputv2/inputv2.tsx#Input"]={docgenInfo:Input.__docgenInfo,name:"Input",path:"src/lib/components/inputv2/inputv2.tsx#Input"})}catch(__react_docgen_typescript_loader_error){}__webpack_require__.d(__webpack_exports__,["c",0,convertSizeToRem,"p",0,Input])},"./src/lib/components/modal/Modal.component.tsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/jsx-runtime.js"),react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/index.js"),react_dom__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react-dom/index.js"),styled_components__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),_spacing__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/lib/spacing.tsx"),_style_theme__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/lib/style/theme.ts"),_utils__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./src/lib/utils.ts"),_buttonv2_Buttonv2_component__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./src/lib/components/buttonv2/Buttonv2.component.tsx"),_icon_Icon_component__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("./src/lib/components/icon/Icon.component.tsx"),_text_Text_component__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("./src/lib/components/text/Text.component.tsx");const ModalContainer=styled_components__WEBPACK_IMPORTED_MODULE_3__.Ay.div.withConfig({componentId:"sc-modal"})`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: ${_style_theme__WEBPACK_IMPORTED_MODULE_5__.fE.modal};
`,ModalContent=styled_components__WEBPACK_IMPORTED_MODULE_3__.Ay.div`
  display: flex;
  flex-direction: column;
  background-color: ${(0,_utils__WEBPACK_IMPORTED_MODULE_6__.sP)("backgroundLevel1")};
  color: ${(0,_utils__WEBPACK_IMPORTED_MODULE_6__.sP)("textPrimary")};
  border-radius: 5px;
  overflow: hidden;
  min-height: 150px;
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
  max-height: calc(100vh - ${_spacing__WEBPACK_IMPORTED_MODULE_4__.YK.r24} - ${_spacing__WEBPACK_IMPORTED_MODULE_4__.YK.r24});
  max-width: 90vw;
`,ModalHeader=styled_components__WEBPACK_IMPORTED_MODULE_3__.Ay.div`
  display: flex;
  padding: ${_spacing__WEBPACK_IMPORTED_MODULE_4__.YK.r16} ${_spacing__WEBPACK_IMPORTED_MODULE_4__.YK.r16} ${_spacing__WEBPACK_IMPORTED_MODULE_4__.YK.r16} ${_spacing__WEBPACK_IMPORTED_MODULE_4__.YK.r32};
  background-color: ${props=>props.theme.backgroundLevel3};
`,ModalBody=styled_components__WEBPACK_IMPORTED_MODULE_3__.Ay.div`
  padding: ${_spacing__WEBPACK_IMPORTED_MODULE_4__.YK.r32};
  flex-grow: 1;
  box-sizing: border-box;
  background-color: ${props=>props.theme.backgroundLevel4};
  overflow-y: auto;
  ${({$wide})=>$wide?styled_components__WEBPACK_IMPORTED_MODULE_3__.AH`
          min-width: min(480px, 90vw);
          overflow-x: auto;
        `:styled_components__WEBPACK_IMPORTED_MODULE_3__.AH`
          width: min(480px, 90vw);
          max-width: 100%;
        `}
`,ModalFooter=styled_components__WEBPACK_IMPORTED_MODULE_3__.Ay.div`
  padding: ${_spacing__WEBPACK_IMPORTED_MODULE_4__.YK.r16};
  background-color: ${props=>props.theme.backgroundLevel3};
`,ActionsLayout=styled_components__WEBPACK_IMPORTED_MODULE_3__.Ay.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${_spacing__WEBPACK_IMPORTED_MODULE_4__.YK.r8};
`,ActionButton=({action,variant})=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_buttonv2_Buttonv2_component__WEBPACK_IMPORTED_MODULE_7__.$n,{label:action.label,variant,icon:action.icon?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_icon_Icon_component__WEBPACK_IMPORTED_MODULE_8__.In,{name:action.icon}):void 0,disabled:action.disabled,tooltip:action.tooltip,onClick:action.onClick}),Modal=({isOpen,close,title,children,footer,actions,subTitle,wide,role="dialog",...rest})=>{const modalContainer=(0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(document.createElement("div")),labelId=(0,react__WEBPACK_IMPORTED_MODULE_1__.useId)(),descId=(0,react__WEBPACK_IMPORTED_MODULE_1__.useId)();return(0,react__WEBPACK_IMPORTED_MODULE_1__.useLayoutEffect)(()=>{if(!isOpen)return;const host=modalContainer.current;return document.body?.append(host),()=>{host.remove()}},[isOpen]),(0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{isOpen&&(modalContainer.current.setAttribute("tabindex","0"),modalContainer.current.focus())},[isOpen]),(0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{if(!isOpen)return;const handleEsc=event=>{"Escape"===event.key&&close?.()};return document.addEventListener("keydown",handleEsc),()=>{document.removeEventListener("keydown",handleEsc)}},[isOpen,close]),isOpen?(0,react_dom__WEBPACK_IMPORTED_MODULE_2__.createPortal)((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ModalContainer,{role,"aria-modal":"true","aria-labelledby":labelId,"aria-describedby":descId,...rest,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(ModalContent,{className:"sc-modal-content",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ModalHeader,{className:"sc-modal-header",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_spacing__WEBPACK_IMPORTED_MODULE_4__.B_,{style:{flex:1},children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_text_Text_component__WEBPACK_IMPORTED_MODULE_9__.EY,{variant:"Larger",id:labelId,children:title}),close?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_buttonv2_Buttonv2_component__WEBPACK_IMPORTED_MODULE_7__.$n,{icon:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_icon_Icon_component__WEBPACK_IMPORTED_MODULE_8__.In,{name:"Close"}),onClick:close,tooltip:{overlay:"Close modal"}}):(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment,{children:subTitle})]})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ModalBody,{className:"sc-modal-body",id:descId,$wide:wide,children}),(actions||footer)&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ModalFooter,{className:"sc-modal-footer",children:actions?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(ActionsLayout,{children:[actions.extra&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ActionButton,{action:actions.extra,variant:"secondary"}),actions.cancel&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ActionButton,{action:{...actions.cancel,label:actions.cancel.label??"Cancel"},variant:"outline"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ActionButton,{action:actions.confirm,variant:actions.confirm.variant??"primary"})]}):footer})]})}),modalContainer.current):null};try{Modal.displayName="Modal",Modal.__docgenInfo={description:"",displayName:"Modal",props:{isOpen:{defaultValue:null,description:"",name:"isOpen",required:!0,type:{name:"boolean"}},title:{defaultValue:null,description:'Modal title — always a short text string that mirrors the verb of the\naction that opened the modal (a "Delete node" button opens a modal\ntitled "Delete node?"). The string is used as the accessible name\n(`aria-labelledby`); non-string content breaks screen-reader\nannouncement.',name:"title",required:!0,type:{name:"string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined"}},subTitle:{defaultValue:null,description:"",name:"subTitle",required:!1,type:{name:"ReactNode"}},wide:{defaultValue:null,description:"When true, the modal sizes to its content (up to 90vw) instead of\ncapping body content at 480px. Use for tables, complex forms, or any\ncontent that needs more horizontal space.",name:"wide",required:!1,type:{name:"boolean"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},footer:{defaultValue:null,description:"Free-form footer content. Required on this branch — a modal must expose a\nfooter, so callers not using `actions` have to provide one here.\n@deprecated Use `actions` instead. `footer` accepts arbitrary content\nand bypasses the documented stack/alignment guideline; it will be\nremoved in a future major release.",name:"footer",required:!1,type:{name:"ReactNode"}},actions:{defaultValue:null,description:"Structured footer actions (preferred over `footer`).",name:"actions",required:!1,type:{name:"ModalActions"}},role:{defaultValue:{value:"dialog"},description:"",name:"role",required:!1,type:{name:"enum",value:[{value:'"alertdialog"'},{value:'"dialog"'}]}},close:{defaultValue:null,description:"",name:"close",required:!1,type:{name:"(() => void)"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/lib/components/modal/Modal.component.tsx#Modal"]={docgenInfo:Modal.__docgenInfo,name:"Modal",path:"src/lib/components/modal/Modal.component.tsx#Modal"})}catch(__react_docgen_typescript_loader_error){}__webpack_require__.d(__webpack_exports__,["a",0,Modal])}}]);
//# sourceMappingURL=content-stories.28c85864.iframe.bundle.js.map