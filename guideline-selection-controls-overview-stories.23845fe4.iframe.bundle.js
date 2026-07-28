"use strict";(self.webpackChunk_scality_core_ui=self.webpackChunk_scality_core_ui||[]).push([[71595],{"./stories/guideline/selection-controls-overview.stories.tsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Overview:()=>Overview,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/jsx-runtime.js"),react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/index.js"),_src_lib_components_checkbox_Checkbox_component__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/lib/components/checkbox/Checkbox.component.tsx"),_src_lib_components_toggle_Toggle_component__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/lib/components/toggle/Toggle.component.tsx"),_src_lib_components_radio_RadioGroup_component__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/lib/components/radio/RadioGroup.component.tsx"),_src_lib_components_selectv2_Selectv2_component__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/lib/components/selectv2/Selectv2.component.tsx");const __WEBPACK_DEFAULT_EXPORT__={title:"Guidelines/SelectionControlsOverview",tags:["!dev","!autodocs"]},Overview={render:()=>{const[checked,setChecked]=(0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(!0),[toggle,setToggle]=(0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(!1),[radio,setRadio]=(0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("governance"),[select,setSelect]=(0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(void 0),labelStyle={fontSize:"0.75rem",textTransform:"uppercase",letterSpacing:"0.05em",opacity:.5,marginBottom:"0.75rem"};return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div",{style:{display:"flex",gap:"3rem",alignItems:"flex-start",paddingTop:"1.5rem",minHeight:"220px"},children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div",{style:labelStyle,children:"Checkbox"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"0.5rem"},children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span",{children:"Enable versioning"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_src_lib_components_checkbox_Checkbox_component__WEBPACK_IMPORTED_MODULE_2__.S,{checked,onChange:e=>setChecked(e.target.checked)})]})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div",{style:labelStyle,children:"Toggle"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_src_lib_components_toggle_Toggle_component__WEBPACK_IMPORTED_MODULE_3__.l,{name:"overview-toggle",toggle,label:"List versions",onChange:()=>setToggle(!toggle)})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div",{style:labelStyle,children:"Radio"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_src_lib_components_radio_RadioGroup_component__WEBPACK_IMPORTED_MODULE_4__.z,{name:"overview-radio","aria-label":"Radio",value:radio,onChange:setRadio,options:[{value:"governance",label:"Governance"},{value:"compliance",label:"Compliance"}]})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div",{style:labelStyle,children:"Select"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_src_lib_components_selectv2_Selectv2_component__WEBPACK_IMPORTED_MODULE_5__.l,{id:"overview-select",placeholder:"Select an option",value:select,onChange:v=>setSelect(v),children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_src_lib_components_selectv2_Selectv2_component__WEBPACK_IMPORTED_MODULE_5__.l.Option,{value:"a",children:"Option A"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_src_lib_components_selectv2_Selectv2_component__WEBPACK_IMPORTED_MODULE_5__.l.Option,{value:"b",children:"Option B"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_src_lib_components_selectv2_Selectv2_component__WEBPACK_IMPORTED_MODULE_5__.l.Option,{value:"c",children:"Option C"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_src_lib_components_selectv2_Selectv2_component__WEBPACK_IMPORTED_MODULE_5__.l.Option,{value:"d",children:"Option D"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_src_lib_components_selectv2_Selectv2_component__WEBPACK_IMPORTED_MODULE_5__.l.Option,{value:"e",children:"Option E"})]})]})]})}},__namedExportsOrder=["Overview"];Overview.parameters={...Overview.parameters,docs:{...Overview.parameters?.docs,source:{originalSource:"{\n  render: () => {\n    const [checked, setChecked] = useState(true);\n    const [toggle, setToggle] = useState(false);\n    const [radio, setRadio] = useState('governance');\n    const [select, setSelect] = useState<string | undefined>(undefined);\n    const labelStyle: React.CSSProperties = {\n      fontSize: '0.75rem',\n      textTransform: 'uppercase',\n      letterSpacing: '0.05em',\n      opacity: 0.5,\n      marginBottom: '0.75rem'\n    };\n    return <div style={{\n      display: 'flex',\n      gap: '3rem',\n      alignItems: 'flex-start',\n      paddingTop: '1.5rem',\n      minHeight: '220px'\n    }}>\n        <div>\n          <div style={labelStyle}>Checkbox</div>\n          <div style={{\n          display: 'flex',\n          alignItems: 'center',\n          gap: '0.5rem'\n        }}>\n            <span>Enable versioning</span>\n            <Checkbox checked={checked} onChange={e => setChecked(e.target.checked)} />\n          </div>\n        </div>\n        <div>\n          <div style={labelStyle}>Toggle</div>\n          <Toggle name=\"overview-toggle\" toggle={toggle} label=\"List versions\" onChange={() => setToggle(!toggle)} />\n        </div>\n        <div>\n          <div style={labelStyle}>Radio</div>\n          <RadioGroup name=\"overview-radio\" aria-label=\"Radio\" value={radio} onChange={setRadio} options={[{\n          value: 'governance',\n          label: 'Governance'\n        }, {\n          value: 'compliance',\n          label: 'Compliance'\n        }]} />\n        </div>\n        <div>\n          <div style={labelStyle}>Select</div>\n          <Select id=\"overview-select\" placeholder=\"Select an option\" value={select} onChange={v => setSelect(v as string)}>\n            <Select.Option value=\"a\">Option A</Select.Option>\n            <Select.Option value=\"b\">Option B</Select.Option>\n            <Select.Option value=\"c\">Option C</Select.Option>\n            <Select.Option value=\"d\">Option D</Select.Option>\n            <Select.Option value=\"e\">Option E</Select.Option>\n          </Select>\n        </div>\n      </div>;\n  }\n}",...Overview.parameters?.docs?.source}}}},"./src/lib/components/checkbox/Checkbox.component.tsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{S:()=>Checkbox});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/jsx-runtime.js"),react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/index.js"),styled_components__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),_spacing__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/lib/spacing.tsx"),_text_Text_component__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/lib/components/text/Text.component.tsx"),_buttonv2_Buttonv2_component__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/lib/components/buttonv2/Buttonv2.component.tsx");const CheckboxInput=styled_components__WEBPACK_IMPORTED_MODULE_2__.Ay.input`
	transform: scale(1.5);`,Checkbox=(0,react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(({disabled,checked,label,value,onChange,...rest},ref)=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(StyledCheckbox,{$disabled:disabled,className:"sc-checkbox",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_spacing__WEBPACK_IMPORTED_MODULE_3__.BJ,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(CheckboxInput,{type:"checkbox",checked,disabled,value,onChange,ref,...rest}),label&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_text_Text_component__WEBPACK_IMPORTED_MODULE_4__.EY,{children:label})]})})),StyledCheckbox=styled_components__WEBPACK_IMPORTED_MODULE_2__.Ay.label`
  ${props=>props.$disabled?"opacity: 0.5;":""}
  /* Basic styling */

  [type='checkbox'] {
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
    border-radius: ${_spacing__WEBPACK_IMPORTED_MODULE_3__.YK.r2};
    background-color: ${props=>props.theme.backgroundLevel1};
    transition: background 300ms;
    cursor: pointer;
  }

  /* Pseudo element for check styling */

  [type='checkbox']::before {
    content: '';
    color: transparent;
    display: block;
    width: inherit;
    height: inherit;
    border-radius: inherit;
    border: 0;
    background-color: transparent;
    background-size: contain;
    box-shadow: inset 0 0 0 ${_spacing__WEBPACK_IMPORTED_MODULE_3__.YK.r1} ${props=>props.theme.textSecondary};
  }

  /* Checked */

  [type='checkbox']:checked {
    background-color: ${props=>props.theme.selectedActive};
  }

  [type='checkbox']:checked::before {
    box-shadow: none;
    background-image: ${props=>`url('data:image/svg+xml,%3Csvg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg"%3E %3Cpath d="M3 6.68646L5.0671 9L9 3" stroke="${props.theme.textPrimary.replace("#","%23")}" stroke-width="1.5"/%3E %3C/svg%3E')`};
    background-repeat: no-repeat;
    background-position: center;
  }

  /* Indeterminate */

  [type='checkbox']:indeterminate::before {
    box-shadow: inset 0 0 0 ${_spacing__WEBPACK_IMPORTED_MODULE_3__.YK.r1} ${props=>props.theme.selectedActive};
    background-color: ${props=>props.theme.highlight};
    background-image: ${props=>`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E %3Cline x1='6' y1='12' x2='20' y2='12' style='stroke:${props.theme.textPrimary.replace("#","%23")};stroke-width:4'/%3E %3C/svg%3E")`};
  }

  /* Hover & focus */
  [type='checkbox']:hover {
    ${props=>!props.$disabled&&`background-color: ${props.theme.highlight};`}
  }

  [type='checkbox']:hover::before {
    ${props=>!props.$disabled&&`box-shadow: inset 0 0 0 ${_spacing__WEBPACK_IMPORTED_MODULE_3__.YK.r1} ${props.theme.selectedActive};`}
  }

  [type='checkbox']:focus-visible:enabled {
    ${_buttonv2_Buttonv2_component__WEBPACK_IMPORTED_MODULE_5__.kD}
  }

  /* Disabled */

  [type='checkbox']:checked:disabled {
    cursor: not-allowed;
    background-color: ${props=>props.theme.selectedActive};
  }

  [type='checkbox']:not(:checked):disabled {
    cursor: not-allowed;
    background-color: ${props=>props.theme.textSecondary};
  }
`;try{Checkbox.displayName="Checkbox",Checkbox.__docgenInfo={description:"",displayName:"Checkbox",props:{label:{defaultValue:null,description:"Label displayed next to the checkbox.\nUse only for standalone checkboxes (not inside a FormGroup).\nWhen inside a FormGroup, set the label on FormGroup's `label` prop instead.",name:"label",required:!1,type:{name:"string"}},value:{defaultValue:null,description:"",name:"value",required:!1,type:{name:"string | (string & readonly string[])"}},checked:{defaultValue:null,description:"",name:"checked",required:!1,type:{name:"boolean"}},disabled:{defaultValue:null,description:"",name:"disabled",required:!1,type:{name:"boolean"}},onChange:{defaultValue:null,description:"",name:"onChange",required:!1,type:{name:"(((e: ChangeEvent<HTMLInputElement>) => void) & ChangeEventHandler<HTMLInputElement>)"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/lib/components/checkbox/Checkbox.component.tsx#Checkbox"]={docgenInfo:Checkbox.__docgenInfo,name:"Checkbox",path:"src/lib/components/checkbox/Checkbox.component.tsx#Checkbox"})}catch(__react_docgen_typescript_loader_error){}},"./src/lib/components/radio/RadioGroup.component.tsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{z:()=>RadioGroup});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/jsx-runtime.js"),styled_components__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),_spacing__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/lib/spacing.tsx"),_text_Text_component__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/lib/components/text/Text.component.tsx"),_tooltip_Tooltip_component__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/lib/components/tooltip/Tooltip.component.tsx"),_buttonv2_Buttonv2_component__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/lib/components/buttonv2/Buttonv2.component.tsx");const Fieldset=styled_components__WEBPACK_IMPORTED_MODULE_1__.Ay.fieldset`
  border: 0;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: ${({$direction})=>"horizontal"===$direction?"row":"column"};
  gap: ${({$direction})=>"horizontal"===$direction?_spacing__WEBPACK_IMPORTED_MODULE_2__.YK.r16:_spacing__WEBPACK_IMPORTED_MODULE_2__.YK.r12};
`,Group=styled_components__WEBPACK_IMPORTED_MODULE_1__.Ay.div`
  display: flex;
  flex-direction: ${({$direction})=>"horizontal"===$direction?"row":"column"};
  gap: ${({$direction})=>"horizontal"===$direction?_spacing__WEBPACK_IMPORTED_MODULE_2__.YK.r16:_spacing__WEBPACK_IMPORTED_MODULE_2__.YK.r12};
`,Legend=styled_components__WEBPACK_IMPORTED_MODULE_1__.Ay.legend`
  padding: 0;
  margin-bottom: ${_spacing__WEBPACK_IMPORTED_MODULE_2__.YK.r8};
  color: ${({theme})=>theme.textPrimary};
`,RadioInput=styled_components__WEBPACK_IMPORTED_MODULE_1__.Ay.input`
  transform: scale(1.5);
`,RadioLabel=styled_components__WEBPACK_IMPORTED_MODULE_1__.Ay.label`
  ${props=>props.$disabled?"opacity: 0.5;":""}

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
    box-shadow: inset 0 0 0 ${_spacing__WEBPACK_IMPORTED_MODULE_2__.YK.r1} ${props=>props.theme.textSecondary};
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
    ${props=>!props.$disabled&&`background-color: ${props.theme.highlight};`}
  }

  [type='radio']:hover::before {
    ${props=>!props.$disabled&&`box-shadow: inset 0 0 0 ${_spacing__WEBPACK_IMPORTED_MODULE_2__.YK.r1} ${props.theme.selectedActive};`}
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
`,RadioOptionItem=({name,option,checked,groupDisabled,onChange})=>{const isDisabled=groupDisabled||option.disabled,input=(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(RadioLabel,{$disabled:isDisabled,className:"sc-radio",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_spacing__WEBPACK_IMPORTED_MODULE_2__.BJ,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(RadioInput,{type:"radio",name,value:option.value,checked,disabled:isDisabled,onChange:e=>{e.target.checked&&onChange(option.value)}}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_text_Text_component__WEBPACK_IMPORTED_MODULE_3__.EY,{children:option.label})]})});return isDisabled&&option.disabledReason?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_tooltip_Tooltip_component__WEBPACK_IMPORTED_MODULE_4__.m_,{overlay:option.disabledReason,placement:"right",overlayStyle:{marginLeft:"0.5rem",maxWidth:"15rem"},children:input}):input},RadioGroup=props=>{const{name,value,onChange,options,disabled,direction="vertical"}=props,items=options.map(option=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(RadioOptionItem,{name,option,checked:value===option.value,groupDisabled:disabled,onChange},option.value));if("label"in props&&props.label)return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(Fieldset,{$direction:direction,role:"radiogroup",className:"sc-radiogroup",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Legend,{children:props.label}),items]});const ariaLabel=props["aria-label"],ariaLabelledBy=props["aria-labelledby"];return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Group,{$direction:direction,role:"radiogroup","aria-label":ariaLabel,"aria-labelledby":ariaLabelledBy,className:"sc-radiogroup",children:items})};try{RadioGroup.displayName="RadioGroup",RadioGroup.__docgenInfo={description:"",displayName:"RadioGroup",props:{name:{defaultValue:null,description:"",name:"name",required:!0,type:{name:"string"}},value:{defaultValue:null,description:"",name:"value",required:!0,type:{name:"string"}},onChange:{defaultValue:null,description:"",name:"onChange",required:!0,type:{name:"(value: string) => void"}},options:{defaultValue:null,description:"",name:"options",required:!0,type:{name:"RadioOption[]"}},disabled:{defaultValue:null,description:"",name:"disabled",required:!1,type:{name:"boolean"}},direction:{defaultValue:null,description:"",name:"direction",required:!1,type:{name:"enum",value:[{value:'"horizontal"'},{value:'"vertical"'}]}},label:{defaultValue:null,description:"",name:"label",required:!1,type:{name:"string"}},"aria-label":{defaultValue:null,description:"",name:"aria-label",required:!1,type:{name:"string"}},"aria-labelledby":{defaultValue:null,description:"",name:"aria-labelledby",required:!1,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/lib/components/radio/RadioGroup.component.tsx#RadioGroup"]={docgenInfo:RadioGroup.__docgenInfo,name:"RadioGroup",path:"src/lib/components/radio/RadioGroup.component.tsx#RadioGroup"})}catch(__react_docgen_typescript_loader_error){}},"./src/lib/components/toggle/Toggle.component.tsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{l:()=>Toggle});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/jsx-runtime.js"),react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/index.js"),styled_components__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),_form_Form_component__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/lib/components/form/Form.component.tsx"),_spacing__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/lib/spacing.tsx"),_text_Text_component__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/lib/components/text/Text.component.tsx");const ToggleContainer=styled_components__WEBPACK_IMPORTED_MODULE_2__.Ay.span`
  display: inline-flex;
  align-items: center;
  position: relative;
  opacity: ${props=>props.$disabled?.5:1};
`,Switch=styled_components__WEBPACK_IMPORTED_MODULE_2__.Ay.label`
  position: relative;
  width: ${_spacing__WEBPACK_IMPORTED_MODULE_4__.YK.r24};
  align-self: center;
  ${props=>styled_components__WEBPACK_IMPORTED_MODULE_2__.AH`
      ${props.$disabled?"\n          cursor: not-allowed;\n        ":"\n          cursor: pointer;\n        "}
    `}
`,Slider=styled_components__WEBPACK_IMPORTED_MODULE_2__.Ay.div`
  width: 100%;
  height: 1rem;
  background-color: ${props=>props.theme.backgroundLevel1};
  border: ${_spacing__WEBPACK_IMPORTED_MODULE_4__.YK.r1} solid
    ${props=>props.theme[props.$toggle?"selectedActive":"infoPrimary"]};
  border-radius: ${_spacing__WEBPACK_IMPORTED_MODULE_4__.YK.r8};
  transition: 0.4s;

  &:before {
    border-radius: 100%;
    position: absolute;
    content: '';
    height: ${_spacing__WEBPACK_IMPORTED_MODULE_4__.YK.r10};
    width: ${_spacing__WEBPACK_IMPORTED_MODULE_4__.YK.r10};
    left: 3px;
    top: 3.5px;
    background-color: ${props=>props.theme[props.$toggle?"textSecondary":"textPrimary"]};
    transition: 0.4s;
  }
`,ToggleInput=styled_components__WEBPACK_IMPORTED_MODULE_2__.Ay.input`
  &:checked + ${Slider} {
    background-color: ${props=>props.theme.selectedActive};
  }
  &:checked + ${Slider}:before {
    transform: translateX(${_spacing__WEBPACK_IMPORTED_MODULE_4__.YK.r10});
  }
  display: none;
`,StyledSwitchLabel=styled_components__WEBPACK_IMPORTED_MODULE_2__.Ay.label`
  color: ${props=>props.theme.textPrimary};
`;const Toggle=function ToggleSwitch({toggle,label,onChange,disabled,...rest}){const{isContextAvailable}=(0,_form_Form_component__WEBPACK_IMPORTED_MODULE_3__.fY)(),checkboxRef=(0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(StyledSwitchLabel,{className:"text",id:`${rest.id}-label`,htmlFor:rest.id,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ToggleContainer,{className:"sc-toggle",$disabled:disabled,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_spacing__WEBPACK_IMPORTED_MODULE_4__.BJ,{gap:"r8",style:{alignItems:"baseline"},children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(Switch,{htmlFor:rest.id,role:"checkbox","aria-checked":toggle,tabIndex:disabled?-1:0,"aria-disabled":disabled,$disabled:disabled,onKeyDown:e=>{"Space"!==e.code&&"Enter"!==e.code||(e.preventDefault(),e.stopPropagation(),checkboxRef.current&&checkboxRef.current.click())},"aria-labelledby":label?`${rest.id}-label`:isContextAvailable?`${_form_Form_component__WEBPACK_IMPORTED_MODULE_3__.Ag}${rest.id}`:void 0,children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ToggleInput,{type:"checkbox",checked:toggle,onChange,disabled,ref:checkboxRef,...rest}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Slider,{className:"sc-slider",$toggle:toggle})]}),label&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_text_Text_component__WEBPACK_IMPORTED_MODULE_5__.EY,{children:label})]})})})};try{Toggle.displayName="Toggle",Toggle.__docgenInfo={description:"",displayName:"Toggle",props:{toggle:{defaultValue:null,description:"",name:"toggle",required:!0,type:{name:"boolean"}},label:{defaultValue:null,description:"",name:"label",required:!1,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/lib/components/toggle/Toggle.component.tsx#Toggle"]={docgenInfo:Toggle.__docgenInfo,name:"Toggle",path:"src/lib/components/toggle/Toggle.component.tsx#Toggle"})}catch(__react_docgen_typescript_loader_error){}}}]);
//# sourceMappingURL=guideline-selection-controls-overview-stories.23845fe4.iframe.bundle.js.map