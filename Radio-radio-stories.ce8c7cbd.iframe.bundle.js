"use strict";(self.webpackChunk_scality_core_ui=self.webpackChunk_scality_core_ui||[]).push([[99106],{"./stories/Radio/radio.stories.tsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{AllStates:()=>AllStates,DisabledGroup:()=>DisabledGroup,Playground:()=>Playground,RadioGroup:()=>RadioGroup,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/jsx-runtime.js"),storybook_actions__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("storybook/actions"),react__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/index.js"),_src_lib_components_radio_Radio_component__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/lib/components/radio/Radio.component.tsx"),_src_lib_spacing__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/lib/spacing.tsx");const __WEBPACK_DEFAULT_EXPORT__={title:"Components/Inputs/Radio",component:_src_lib_components_radio_Radio_component__WEBPACK_IMPORTED_MODULE_3__.s,args:{name:"playground",value:"option",label:"Option",onChange:(0,storybook_actions__WEBPACK_IMPORTED_MODULE_1__.action)("Radio changed")}},Playground={},RadioGroup={render:()=>{const[selected,setSelected]=(0,react__WEBPACK_IMPORTED_MODULE_2__.useState)("governance");return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_src_lib_spacing__WEBPACK_IMPORTED_MODULE_4__.BJ,{gap:"r12",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_src_lib_components_radio_Radio_component__WEBPACK_IMPORTED_MODULE_3__.s,{name:"retention-mode",value:"governance",label:"Governance",checked:"governance"===selected,onChange:()=>setSelected("governance")}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_src_lib_components_radio_Radio_component__WEBPACK_IMPORTED_MODULE_3__.s,{name:"retention-mode",value:"compliance",label:"Compliance",checked:"compliance"===selected,onChange:()=>setSelected("compliance")}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_src_lib_components_radio_Radio_component__WEBPACK_IMPORTED_MODULE_3__.s,{name:"retention-mode",value:"none",label:"None",checked:"none"===selected,onChange:()=>setSelected("none")})]})}},AllStates={render:()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div",{style:{display:"flex",gap:"2rem",alignItems:"center"},children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_src_lib_components_radio_Radio_component__WEBPACK_IMPORTED_MODULE_3__.s,{name:"s1",value:"a",label:"Unchecked",checked:!1,onChange:()=>{}}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_src_lib_components_radio_Radio_component__WEBPACK_IMPORTED_MODULE_3__.s,{name:"s2",value:"b",label:"Checked",checked:!0,onChange:()=>{}}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_src_lib_components_radio_Radio_component__WEBPACK_IMPORTED_MODULE_3__.s,{name:"s3",value:"c",label:"Disabled",disabled:!0,checked:!1,onChange:()=>{}}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_src_lib_components_radio_Radio_component__WEBPACK_IMPORTED_MODULE_3__.s,{name:"s4",value:"d",label:"Disabled checked",disabled:!0,checked:!0,onChange:()=>{}})]})},DisabledGroup={render:()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_src_lib_spacing__WEBPACK_IMPORTED_MODULE_4__.BJ,{gap:"r12",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_src_lib_components_radio_Radio_component__WEBPACK_IMPORTED_MODULE_3__.s,{name:"disabled",value:"a",label:"Option A",disabled:!0,checked:!0,onChange:()=>{}}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_src_lib_components_radio_Radio_component__WEBPACK_IMPORTED_MODULE_3__.s,{name:"disabled",value:"b",label:"Option B",disabled:!0,checked:!1,onChange:()=>{}})]})},__namedExportsOrder=["Playground","RadioGroup","AllStates","DisabledGroup"];Playground.parameters={...Playground.parameters,docs:{...Playground.parameters?.docs,source:{originalSource:"{}",...Playground.parameters?.docs?.source}}},RadioGroup.parameters={...RadioGroup.parameters,docs:{...RadioGroup.parameters?.docs,source:{originalSource:'{\n  render: () => {\n    const [selected, setSelected] = useState(\'governance\');\n    return <Stack gap="r12">\n        <Radio name="retention-mode" value="governance" label="Governance" checked={selected === \'governance\'} onChange={() => setSelected(\'governance\')} />\n        <Radio name="retention-mode" value="compliance" label="Compliance" checked={selected === \'compliance\'} onChange={() => setSelected(\'compliance\')} />\n        <Radio name="retention-mode" value="none" label="None" checked={selected === \'none\'} onChange={() => setSelected(\'none\')} />\n      </Stack>;\n  }\n}',...RadioGroup.parameters?.docs?.source}}},AllStates.parameters={...AllStates.parameters,docs:{...AllStates.parameters?.docs,source:{originalSource:'{\n  render: () => <div style={{\n    display: \'flex\',\n    gap: \'2rem\',\n    alignItems: \'center\'\n  }}>\n      <Radio name="s1" value="a" label="Unchecked" checked={false} onChange={() => {}} />\n      <Radio name="s2" value="b" label="Checked" checked={true} onChange={() => {}} />\n      <Radio name="s3" value="c" label="Disabled" disabled checked={false} onChange={() => {}} />\n      <Radio name="s4" value="d" label="Disabled checked" disabled checked={true} onChange={() => {}} />\n    </div>\n}',...AllStates.parameters?.docs?.source}}},DisabledGroup.parameters={...DisabledGroup.parameters,docs:{...DisabledGroup.parameters?.docs,source:{originalSource:'{\n  render: () => <Stack gap="r12">\n      <Radio name="disabled" value="a" label="Option A" disabled checked={true} onChange={() => {}} />\n      <Radio name="disabled" value="b" label="Option B" disabled checked={false} onChange={() => {}} />\n    </Stack>\n}',...DisabledGroup.parameters?.docs?.source}}}},"./src/lib/components/radio/Radio.component.tsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{s:()=>Radio});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/jsx-runtime.js"),react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/index.js"),styled_components__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),_spacing__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/lib/spacing.tsx"),_text_Text_component__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/lib/components/text/Text.component.tsx"),_buttonv2_Buttonv2_component__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/lib/components/buttonv2/Buttonv2.component.tsx");const RadioInput=styled_components__WEBPACK_IMPORTED_MODULE_2__.Ay.input`
  transform: scale(1.5);
`,Radio=(0,react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(({name,value,label,checked,disabled,onChange,...rest},ref)=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(StyledRadio,{disabled,className:"sc-radio",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_spacing__WEBPACK_IMPORTED_MODULE_3__.BJ,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(RadioInput,{type:"radio",name,value,checked,disabled,onChange,ref,...rest}),label&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_text_Text_component__WEBPACK_IMPORTED_MODULE_4__.EY,{children:label})]})})),StyledRadio=styled_components__WEBPACK_IMPORTED_MODULE_2__.Ay.label`
  ${props=>props.disabled?"opacity: 0.5;":""}

  [type='radio'] {
    width: 0.75rem;
    height: 0.75rem;
    color: ${props=>props.theme.textPrimary};
    vertical-align: middle;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: none;
    border: 0;
    outline: 0;
    flex-grow: 0;
    border-radius: 50%;
    background-color: ${props=>props.theme.backgroundLevel1};
    transition: background 300ms;
    cursor: pointer;
  }

  [type='radio']::before {
    content: '';
    color: transparent;
    display: block;
    width: inherit;
    height: inherit;
    border-radius: inherit;
    border: 0;
    background-color: transparent;
    box-shadow: inset 0 0 0 ${_spacing__WEBPACK_IMPORTED_MODULE_3__.YK.r1} ${props=>props.theme.textSecondary};
  }

  [type='radio']:checked {
    background-color: ${props=>props.theme.selectedActive};
  }

  [type='radio']:checked::before {
    box-shadow: none;
    background-image: radial-gradient(
      circle,
      ${props=>props.theme.textPrimary} 35%,
      transparent 35%
    );
  }

  [type='radio']:hover {
    ${props=>!props.disabled&&`background-color: ${props.theme.highlight};`}
  }

  [type='radio']:hover::before {
    ${props=>!props.disabled&&`box-shadow: inset 0 0 0 ${_spacing__WEBPACK_IMPORTED_MODULE_3__.YK.r1} ${props.theme.selectedActive};`}
  }

  [type='radio']:focus-visible:enabled {
    ${_buttonv2_Buttonv2_component__WEBPACK_IMPORTED_MODULE_5__.kD}
  }

  [type='radio']:checked:disabled {
    cursor: not-allowed;
    background-color: ${props=>props.theme.selectedActive};
  }

  [type='radio']:not(:checked):disabled {
    cursor: not-allowed;
  }
`;try{Radio.displayName="Radio",Radio.__docgenInfo={description:"",displayName:"Radio",props:{name:{defaultValue:null,description:"",name:"name",required:!1,type:{name:"string"}},value:{defaultValue:null,description:"",name:"value",required:!1,type:{name:"string | (string & readonly string[])"}},label:{defaultValue:null,description:"",name:"label",required:!1,type:{name:"string"}},checked:{defaultValue:null,description:"",name:"checked",required:!1,type:{name:"boolean"}},disabled:{defaultValue:null,description:"",name:"disabled",required:!1,type:{name:"boolean"}},onChange:{defaultValue:null,description:"",name:"onChange",required:!1,type:{name:"(((e: ChangeEvent<HTMLInputElement>) => void) & ChangeEventHandler<HTMLInputElement>)"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/lib/components/radio/Radio.component.tsx#Radio"]={docgenInfo:Radio.__docgenInfo,name:"Radio",path:"src/lib/components/radio/Radio.component.tsx#Radio"})}catch(__react_docgen_typescript_loader_error){}}}]);
//# sourceMappingURL=Radio-radio-stories.ce8c7cbd.iframe.bundle.js.map