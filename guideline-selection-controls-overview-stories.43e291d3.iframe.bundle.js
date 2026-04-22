"use strict";(self.webpackChunk_scality_core_ui=self.webpackChunk_scality_core_ui||[]).push([[37848,71595],{"./stories/guideline/selection-controls-overview.stories.tsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Overview:()=>Overview,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/jsx-runtime.js"),react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/index.js"),_src_lib_components_checkbox_Checkbox_component__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/lib/components/checkbox/Checkbox.component.tsx"),_src_lib_components_toggle_Toggle_component__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/lib/components/toggle/Toggle.component.tsx"),_src_lib_components_radio_Radio_component__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/lib/components/radio/Radio.component.tsx"),_src_lib_components_selectv2_Selectv2_component__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/lib/components/selectv2/Selectv2.component.tsx");const __WEBPACK_DEFAULT_EXPORT__={parameters:{storySource:{source:'import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";\nimport React, { useState } from \'react\';\nimport { Checkbox } from \'../../src/lib/components/checkbox/Checkbox.component\';\nimport { Toggle } from \'../../src/lib/components/toggle/Toggle.component\';\nimport { Radio } from \'../../src/lib/components/radio/Radio.component\';\nimport { Select } from \'../../src/lib/components/selectv2/Selectv2.component\';\nexport default {\n    title: \'Guidelines/SelectionControlsOverview\',\n    tags: [\n        \'!dev\',\n        \'!autodocs\'\n    ]\n};\nexport const Overview = {\n    render: ()=>{\n        const [checked, setChecked] = useState(true);\n        const [toggle, setToggle] = useState(false);\n        const [radio, setRadio] = useState(\'governance\');\n        const [select, setSelect] = useState(undefined);\n        const labelStyle = {\n            fontSize: \'0.75rem\',\n            textTransform: \'uppercase\',\n            letterSpacing: \'0.05em\',\n            opacity: 0.5,\n            marginBottom: \'0.75rem\'\n        };\n        return /*#__PURE__*/ _jsxs("div", {\n            style: {\n                display: \'flex\',\n                gap: \'3rem\',\n                alignItems: \'flex-start\',\n                paddingTop: \'1.5rem\',\n                minHeight: \'220px\'\n            },\n            children: [\n                /*#__PURE__*/ _jsxs("div", {\n                    children: [\n                        /*#__PURE__*/ _jsx("div", {\n                            style: labelStyle,\n                            children: "Checkbox"\n                        }),\n                        /*#__PURE__*/ _jsxs("div", {\n                            style: {\n                                display: \'flex\',\n                                alignItems: \'center\',\n                                gap: \'0.5rem\'\n                            },\n                            children: [\n                                /*#__PURE__*/ _jsx("span", {\n                                    children: "Enable versioning"\n                                }),\n                                /*#__PURE__*/ _jsx(Checkbox, {\n                                    checked: checked,\n                                    onChange: (e)=>setChecked(e.target.checked)\n                                })\n                            ]\n                        })\n                    ]\n                }),\n                /*#__PURE__*/ _jsxs("div", {\n                    children: [\n                        /*#__PURE__*/ _jsx("div", {\n                            style: labelStyle,\n                            children: "Toggle"\n                        }),\n                        /*#__PURE__*/ _jsx(Toggle, {\n                            name: "overview-toggle",\n                            toggle: toggle,\n                            label: "List versions",\n                            onChange: ()=>setToggle(!toggle)\n                        })\n                    ]\n                }),\n                /*#__PURE__*/ _jsxs("div", {\n                    children: [\n                        /*#__PURE__*/ _jsx("div", {\n                            style: labelStyle,\n                            children: "Radio"\n                        }),\n                        /*#__PURE__*/ _jsxs("div", {\n                            style: {\n                                display: \'flex\',\n                                flexDirection: \'column\',\n                                gap: \'0.5rem\'\n                            },\n                            children: [\n                                /*#__PURE__*/ _jsx(Radio, {\n                                    name: "overview-radio",\n                                    value: "governance",\n                                    label: "Governance",\n                                    checked: radio === \'governance\',\n                                    onChange: ()=>setRadio(\'governance\')\n                                }),\n                                /*#__PURE__*/ _jsx(Radio, {\n                                    name: "overview-radio",\n                                    value: "compliance",\n                                    label: "Compliance",\n                                    checked: radio === \'compliance\',\n                                    onChange: ()=>setRadio(\'compliance\')\n                                })\n                            ]\n                        })\n                    ]\n                }),\n                /*#__PURE__*/ _jsxs("div", {\n                    children: [\n                        /*#__PURE__*/ _jsx("div", {\n                            style: labelStyle,\n                            children: "Select"\n                        }),\n                        /*#__PURE__*/ _jsxs(Select, {\n                            placeholder: "Select an option",\n                            value: select,\n                            onChange: (v)=>setSelect(v),\n                            children: [\n                                /*#__PURE__*/ _jsx(Select.Option, {\n                                    value: "a",\n                                    children: "Option A"\n                                }),\n                                /*#__PURE__*/ _jsx(Select.Option, {\n                                    value: "b",\n                                    children: "Option B"\n                                }),\n                                /*#__PURE__*/ _jsx(Select.Option, {\n                                    value: "c",\n                                    children: "Option C"\n                                }),\n                                /*#__PURE__*/ _jsx(Select.Option, {\n                                    value: "d",\n                                    children: "Option D"\n                                }),\n                                /*#__PURE__*/ _jsx(Select.Option, {\n                                    value: "e",\n                                    children: "Option E"\n                                })\n                            ]\n                        })\n                    ]\n                })\n            ]\n        });\n    }\n};\n',locationsMap:{overview:{startLoc:{col:24,line:14},endLoc:{col:1,line:143},startBody:{col:24,line:14},endBody:{col:1,line:143}}}}},title:"Guidelines/SelectionControlsOverview",tags:["!dev","!autodocs"]},Overview={render:()=>{const[checked,setChecked]=(0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(!0),[toggle,setToggle]=(0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(!1),[radio,setRadio]=(0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("governance"),[select,setSelect]=(0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(void 0),labelStyle={fontSize:"0.75rem",textTransform:"uppercase",letterSpacing:"0.05em",opacity:.5,marginBottom:"0.75rem"};return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div",{style:{display:"flex",gap:"3rem",alignItems:"flex-start",paddingTop:"1.5rem",minHeight:"220px"},children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div",{style:labelStyle,children:"Checkbox"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"0.5rem"},children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span",{children:"Enable versioning"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_src_lib_components_checkbox_Checkbox_component__WEBPACK_IMPORTED_MODULE_2__.S,{checked,onChange:e=>setChecked(e.target.checked)})]})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div",{style:labelStyle,children:"Toggle"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_src_lib_components_toggle_Toggle_component__WEBPACK_IMPORTED_MODULE_3__.l,{name:"overview-toggle",toggle,label:"List versions",onChange:()=>setToggle(!toggle)})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div",{style:labelStyle,children:"Radio"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:"0.5rem"},children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_src_lib_components_radio_Radio_component__WEBPACK_IMPORTED_MODULE_4__.s,{name:"overview-radio",value:"governance",label:"Governance",checked:"governance"===radio,onChange:()=>setRadio("governance")}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_src_lib_components_radio_Radio_component__WEBPACK_IMPORTED_MODULE_4__.s,{name:"overview-radio",value:"compliance",label:"Compliance",checked:"compliance"===radio,onChange:()=>setRadio("compliance")})]})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div",{style:labelStyle,children:"Select"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_src_lib_components_selectv2_Selectv2_component__WEBPACK_IMPORTED_MODULE_5__.l,{placeholder:"Select an option",value:select,onChange:v=>setSelect(v),children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_src_lib_components_selectv2_Selectv2_component__WEBPACK_IMPORTED_MODULE_5__.l.Option,{value:"a",children:"Option A"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_src_lib_components_selectv2_Selectv2_component__WEBPACK_IMPORTED_MODULE_5__.l.Option,{value:"b",children:"Option B"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_src_lib_components_selectv2_Selectv2_component__WEBPACK_IMPORTED_MODULE_5__.l.Option,{value:"c",children:"Option C"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_src_lib_components_selectv2_Selectv2_component__WEBPACK_IMPORTED_MODULE_5__.l.Option,{value:"d",children:"Option D"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_src_lib_components_selectv2_Selectv2_component__WEBPACK_IMPORTED_MODULE_5__.l.Option,{value:"e",children:"Option E"})]})]})]})}},__namedExportsOrder=["Overview"];Overview.parameters={...Overview.parameters,docs:{...Overview.parameters?.docs,source:{originalSource:"{\n  render: () => {\n    const [checked, setChecked] = useState(true);\n    const [toggle, setToggle] = useState(false);\n    const [radio, setRadio] = useState('governance');\n    const [select, setSelect] = useState<string | undefined>(undefined);\n    const labelStyle: React.CSSProperties = {\n      fontSize: '0.75rem',\n      textTransform: 'uppercase',\n      letterSpacing: '0.05em',\n      opacity: 0.5,\n      marginBottom: '0.75rem'\n    };\n    return <div style={{\n      display: 'flex',\n      gap: '3rem',\n      alignItems: 'flex-start',\n      paddingTop: '1.5rem',\n      minHeight: '220px'\n    }}>\n        <div>\n          <div style={labelStyle}>Checkbox</div>\n          <div style={{\n          display: 'flex',\n          alignItems: 'center',\n          gap: '0.5rem'\n        }}>\n            <span>Enable versioning</span>\n            <Checkbox checked={checked} onChange={e => setChecked(e.target.checked)} />\n          </div>\n        </div>\n        <div>\n          <div style={labelStyle}>Toggle</div>\n          <Toggle name=\"overview-toggle\" toggle={toggle} label=\"List versions\" onChange={() => setToggle(!toggle)} />\n        </div>\n        <div>\n          <div style={labelStyle}>Radio</div>\n          <div style={{\n          display: 'flex',\n          flexDirection: 'column',\n          gap: '0.5rem'\n        }}>\n            <Radio name=\"overview-radio\" value=\"governance\" label=\"Governance\" checked={radio === 'governance'} onChange={() => setRadio('governance')} />\n            <Radio name=\"overview-radio\" value=\"compliance\" label=\"Compliance\" checked={radio === 'compliance'} onChange={() => setRadio('compliance')} />\n          </div>\n        </div>\n        <div>\n          <div style={labelStyle}>Select</div>\n          <Select placeholder=\"Select an option\" value={select} onChange={v => setSelect(v as string)}>\n            <Select.Option value=\"a\">Option A</Select.Option>\n            <Select.Option value=\"b\">Option B</Select.Option>\n            <Select.Option value=\"c\">Option C</Select.Option>\n            <Select.Option value=\"d\">Option D</Select.Option>\n            <Select.Option value=\"e\">Option E</Select.Option>\n          </Select>\n        </div>\n      </div>;\n  }\n}",...Overview.parameters?.docs?.source}}}},"./src/lib/components/checkbox/Checkbox.component.tsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{S:()=>Checkbox});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/jsx-runtime.js"),react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/index.js"),styled_components__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),_spacing__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/lib/spacing.tsx"),_text_Text_component__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/lib/components/text/Text.component.tsx"),_buttonv2_Buttonv2_component__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/lib/components/buttonv2/Buttonv2.component.tsx");const CheckboxInput=styled_components__WEBPACK_IMPORTED_MODULE_2__.Ay.input`
	transform: scale(1.5);`,Checkbox=(0,react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(({disabled,checked,label,value,onChange,...rest},ref)=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(StyledCheckbox,{checked,disabled,className:"sc-checkbox",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_spacing__WEBPACK_IMPORTED_MODULE_3__.BJ,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(CheckboxInput,{type:"checkbox",checked,disabled,value,onChange,ref,...rest}),label&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_text_Text_component__WEBPACK_IMPORTED_MODULE_4__.EY,{children:label})]})})),StyledCheckbox=styled_components__WEBPACK_IMPORTED_MODULE_2__.Ay.label`
  ${props=>props.disabled?"opacity: 0.5;":""}
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
    ${props=>!props.disabled&&`background-color: ${props.theme.highlight};`}
  }

  [type='checkbox']:hover::before {
    ${props=>!props.disabled&&`box-shadow: inset 0 0 0 ${_spacing__WEBPACK_IMPORTED_MODULE_3__.YK.r1} ${props.theme.selectedActive};`}
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
`;try{Checkbox.displayName="Checkbox",Checkbox.__docgenInfo={description:"",displayName:"Checkbox",props:{label:{defaultValue:null,description:"Label displayed next to the checkbox.\nUse only for standalone checkboxes (not inside a FormGroup).\nWhen inside a FormGroup, set the label on FormGroup's `label` prop instead.",name:"label",required:!1,type:{name:"string"}},value:{defaultValue:null,description:"",name:"value",required:!1,type:{name:"string | (string & readonly string[])"}},checked:{defaultValue:null,description:"",name:"checked",required:!1,type:{name:"boolean"}},disabled:{defaultValue:null,description:"",name:"disabled",required:!1,type:{name:"boolean"}},onChange:{defaultValue:null,description:"",name:"onChange",required:!1,type:{name:"(((e: ChangeEvent<HTMLInputElement>) => void) & ChangeEventHandler<HTMLInputElement>)"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/lib/components/checkbox/Checkbox.component.tsx#Checkbox"]={docgenInfo:Checkbox.__docgenInfo,name:"Checkbox",path:"src/lib/components/checkbox/Checkbox.component.tsx#Checkbox"})}catch(__react_docgen_typescript_loader_error){}},"./src/lib/components/constrainedtext/Constrainedtext.component.tsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{u:()=>ConstrainedText});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/jsx-runtime.js"),react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/index.js"),styled_components__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),_tooltip_Tooltip_component__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/lib/components/tooltip/Tooltip.component.tsx"),_text_Text_component__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/lib/components/text/Text.component.tsx");const ConstrainedTextContainer=styled_components__WEBPACK_IMPORTED_MODULE_2__.Ay.div`
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: ${props=>props.centered?"center":"left"};

  ${props=>props.lineClamp>1?`\n  display: -webkit-box;\n  -webkit-line-clamp: ${props.lineClamp};\n  -webkit-box-orient: vertical;\n  overflow-wrap: break-word;\n  word-break: normal;\n  line-height: 1.2;\n  `:"overflow-wrap: break-word;\n      white-space: nowrap;\n      word-break: normal;\n      "};
`,BlockTooltip=styled_components__WEBPACK_IMPORTED_MODULE_2__.Ay.div`
  width: stretch;
  & > .sc-tooltip {
    display: block;
  }
`;function getConstrainedTextContainer(constrainedTextRef,lineClamp,text,centered){return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ConstrainedTextContainer,{ref:constrainedTextRef,className:"sc-constrainedtext",lineClamp,centered,children:text})}function ConstrainedText({text,tooltipStyle,tooltipPlacement,lineClamp=1,color,centered=!1}){const[displayToolTip,setDisplayToolTip]=(0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(!1),constrainedTextRef=(0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(element=>{element&&text&&setDisplayToolTip(function isEllipsisActive(element){return element&&(element.offsetWidth<element.scrollWidth||element.offsetHeight<element.scrollHeight)}(element))},[text]);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(BlockTooltip,{children:displayToolTip?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_tooltip_Tooltip_component__WEBPACK_IMPORTED_MODULE_3__.m_,{overlay:text,overlayStyle:tooltipStyle,placement:tooltipPlacement,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_text_Text_component__WEBPACK_IMPORTED_MODULE_4__.EY,{color,children:getConstrainedTextContainer(constrainedTextRef,lineClamp,text,centered)})}):(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_text_Text_component__WEBPACK_IMPORTED_MODULE_4__.EY,{color,children:getConstrainedTextContainer(constrainedTextRef,lineClamp,text,centered)})})}try{ConstrainedText.displayName="ConstrainedText",ConstrainedText.__docgenInfo={description:"",displayName:"ConstrainedText",props:{text:{defaultValue:null,description:"",name:"text",required:!0,type:{name:"string | number | Element | Element[]"}},tooltipStyle:{defaultValue:null,description:"",name:"tooltipStyle",required:!1,type:{name:"any"}},tooltipPlacement:{defaultValue:null,description:"",name:"tooltipPlacement",required:!1,type:{name:"any"}},lineClamp:{defaultValue:{value:"1"},description:"",name:"lineClamp",required:!1,type:{name:"number"}},centered:{defaultValue:{value:"false"},description:"",name:"centered",required:!1,type:{name:"boolean"}},color:{defaultValue:null,description:"",name:"color",required:!1,type:{name:"enum",value:[{value:'"statusHealthy"'},{value:'"statusWarning"'},{value:'"statusCritical"'},{value:'"infoPrimary"'},{value:'"infoSecondary"'},{value:'"selectedActive"'},{value:'"statusHealthyRGB"'},{value:'"statusWarningRGB"'},{value:'"statusCriticalRGB"'},{value:'"highlight"'},{value:'"border"'},{value:'"buttonPrimary"'},{value:'"buttonSecondary"'},{value:'"buttonDelete"'},{value:'"backgroundLevel1"'},{value:'"backgroundLevel2"'},{value:'"backgroundLevel3"'},{value:'"backgroundLevel4"'},{value:'"navbarBackground"'},{value:'"textPrimary"'},{value:'"textSecondary"'},{value:'"textTertiary"'},{value:'"textReverse"'},{value:'"textLink"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/lib/components/constrainedtext/Constrainedtext.component.tsx#ConstrainedText"]={docgenInfo:ConstrainedText.__docgenInfo,name:"ConstrainedText",path:"src/lib/components/constrainedtext/Constrainedtext.component.tsx#ConstrainedText"})}catch(__react_docgen_typescript_loader_error){}},"./src/lib/components/inputv2/inputv2.tsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{c:()=>convertSizeToRem,p:()=>Input});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/jsx-runtime.js"),react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/index.js"),styled_components__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),_spacing__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/lib/spacing.tsx"),_form_Form_component__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/lib/components/form/Form.component.tsx"),_icon_Icon_component__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/lib/components/icon/Icon.component.tsx");const convertSizeToRem=size=>"2/3"===size?"14rem":"1/3"===size?"6rem":"1/2"===size?"10rem":"20.5rem",StyledInput=styled_components__WEBPACK_IMPORTED_MODULE_2__.Ay.input`
  max-width: ${props=>props.hasIcon?`calc(100% - 1rem - ${_spacing__WEBPACK_IMPORTED_MODULE_3__.YK.f8})`:"100%"};

  font-family: 'Lato';
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
  ${props=>props.disabled?styled_components__WEBPACK_IMPORTED_MODULE_2__.AH`
          opacity: 0.5;
          cursor: not-allowed;
        `:""}
`,InputBorder=styled_components__WEBPACK_IMPORTED_MODULE_2__.Ay.div`
  box-sizing: border-box;
  width: ${props=>props.width};
  height: ${_spacing__WEBPACK_IMPORTED_MODULE_3__.YK.r32};
  border: ${_spacing__WEBPACK_IMPORTED_MODULE_3__.YK.r1} solid
    ${props=>props.hasError?props.theme.statusCritical:props.theme.border};
  border-radius: ${_spacing__WEBPACK_IMPORTED_MODULE_3__.YK.r4};
  &:hover {
    ${props=>!props.disabled&&`border: ${_spacing__WEBPACK_IMPORTED_MODULE_3__.YK.r1} solid ${props.theme.infoPrimary};`}
  }
  &:focus-within {
    border: ${_spacing__WEBPACK_IMPORTED_MODULE_3__.YK.r1} solid ${props=>props.theme.infoPrimary};
  }
`,SelfCenterredIcon=(0,styled_components__WEBPACK_IMPORTED_MODULE_2__.Ay)(_icon_Icon_component__WEBPACK_IMPORTED_MODULE_5__.In)`
  align-self: center;
  color: ${props=>props.theme[props.color]};
`,Input=(0,react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(({error,disabled,id,leftIcon,leftIconColor="textSecondary",rightIcon,rightIconColor="textSecondary",placeholder,size,noPlaceholderPrefix,...inputProps},ref)=>{const{isContextAvailable,disabled:disabledFromFieldContext,error:errorFromFieldContext}=(0,_form_Form_component__WEBPACK_IMPORTED_MODULE_4__.fY)();return placeholder=placeholder?noPlaceholderPrefix?placeholder:`Example: ${placeholder}`:void 0,(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(InputBorder,{disabled:!(!disabled&&!disabledFromFieldContext),hasError:!(!error&&!errorFromFieldContext),width:convertSizeToRem(size),children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(InputContainer,{isContextAvailable,disabled:!(!disabled&&!disabledFromFieldContext),hasError:!(!error&&!errorFromFieldContext),children:[leftIcon&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(SelfCenterredIcon,{name:leftIcon,color:leftIconColor}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(StyledInput,{ref,disabled:disabled||disabledFromFieldContext,"aria-invalid":!(!error&&!errorFromFieldContext),"aria-describedby":`${_form_Form_component__WEBPACK_IMPORTED_MODULE_4__._1}${id}`,hasIcon:!(!leftIcon&&!rightIcon),id,...inputProps,placeholder}),rightIcon&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(SelfCenterredIcon,{name:rightIcon,color:rightIconColor})]})})});try{convertSizeToRem.displayName="convertSizeToRem",convertSizeToRem.__docgenInfo={description:"",displayName:"convertSizeToRem",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/lib/components/inputv2/inputv2.tsx#convertSizeToRem"]={docgenInfo:convertSizeToRem.__docgenInfo,name:"convertSizeToRem",path:"src/lib/components/inputv2/inputv2.tsx#convertSizeToRem"})}catch(__react_docgen_typescript_loader_error){}try{Input.displayName="Input",Input.__docgenInfo={description:"",displayName:"Input",props:{error:{defaultValue:null,description:"",name:"error",required:!1,type:{name:"string"}},id:{defaultValue:null,description:"",name:"id",required:!1,type:{name:"string"}},leftIcon:{defaultValue:null,description:"",name:"leftIcon",required:!1,type:{name:"string"}},leftIconColor:{defaultValue:{value:"textSecondary"},description:"",name:"leftIconColor",required:!1,type:{name:"enum",value:[{value:'"statusHealthy"'},{value:'"statusWarning"'},{value:'"statusCritical"'},{value:'"infoPrimary"'},{value:'"infoSecondary"'},{value:'"selectedActive"'},{value:'"statusHealthyRGB"'},{value:'"statusWarningRGB"'},{value:'"statusCriticalRGB"'},{value:'"highlight"'},{value:'"border"'},{value:'"buttonPrimary"'},{value:'"buttonSecondary"'},{value:'"buttonDelete"'},{value:'"backgroundLevel1"'},{value:'"backgroundLevel2"'},{value:'"backgroundLevel3"'},{value:'"backgroundLevel4"'},{value:'"navbarBackground"'},{value:'"textPrimary"'},{value:'"textSecondary"'},{value:'"textTertiary"'},{value:'"textReverse"'},{value:'"textLink"'}]}},rightIcon:{defaultValue:null,description:"",name:"rightIcon",required:!1,type:{name:"string"}},rightIconColor:{defaultValue:{value:"textSecondary"},description:"",name:"rightIconColor",required:!1,type:{name:"enum",value:[{value:'"statusHealthy"'},{value:'"statusWarning"'},{value:'"statusCritical"'},{value:'"infoPrimary"'},{value:'"infoSecondary"'},{value:'"selectedActive"'},{value:'"statusHealthyRGB"'},{value:'"statusWarningRGB"'},{value:'"statusCriticalRGB"'},{value:'"highlight"'},{value:'"border"'},{value:'"buttonPrimary"'},{value:'"buttonSecondary"'},{value:'"buttonDelete"'},{value:'"backgroundLevel1"'},{value:'"backgroundLevel2"'},{value:'"backgroundLevel3"'},{value:'"backgroundLevel4"'},{value:'"navbarBackground"'},{value:'"textPrimary"'},{value:'"textSecondary"'},{value:'"textTertiary"'},{value:'"textReverse"'},{value:'"textLink"'}]}},size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"1"'},{value:'"2/3"'},{value:'"1/2"'},{value:'"1/3"'}]}},noPlaceholderPrefix:{defaultValue:null,description:"",name:"noPlaceholderPrefix",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/lib/components/inputv2/inputv2.tsx#Input"]={docgenInfo:Input.__docgenInfo,name:"Input",path:"src/lib/components/inputv2/inputv2.tsx#Input"})}catch(__react_docgen_typescript_loader_error){}},"./src/lib/components/radio/Radio.component.tsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{s:()=>Radio});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/jsx-runtime.js"),react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/index.js"),styled_components__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),_spacing__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/lib/spacing.tsx"),_text_Text_component__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/lib/components/text/Text.component.tsx"),_buttonv2_Buttonv2_component__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/lib/components/buttonv2/Buttonv2.component.tsx");const RadioInput=styled_components__WEBPACK_IMPORTED_MODULE_2__.Ay.input`
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
`;try{Radio.displayName="Radio",Radio.__docgenInfo={description:"",displayName:"Radio",props:{name:{defaultValue:null,description:"",name:"name",required:!1,type:{name:"string"}},value:{defaultValue:null,description:"",name:"value",required:!1,type:{name:"string | (string & readonly string[])"}},label:{defaultValue:null,description:"",name:"label",required:!1,type:{name:"string"}},checked:{defaultValue:null,description:"",name:"checked",required:!1,type:{name:"boolean"}},disabled:{defaultValue:null,description:"",name:"disabled",required:!1,type:{name:"boolean"}},onChange:{defaultValue:null,description:"",name:"onChange",required:!1,type:{name:"(((e: ChangeEvent<HTMLInputElement>) => void) & ChangeEventHandler<HTMLInputElement>)"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/lib/components/radio/Radio.component.tsx#Radio"]={docgenInfo:Radio.__docgenInfo,name:"Radio",path:"src/lib/components/radio/Radio.component.tsx#Radio"})}catch(__react_docgen_typescript_loader_error){}},"./src/lib/components/toggle/Toggle.component.tsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{l:()=>Toggle});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/jsx-runtime.js"),react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/index.js"),styled_components__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),_form_Form_component__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/lib/components/form/Form.component.tsx"),_spacing__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/lib/spacing.tsx"),_text_Text_component__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/lib/components/text/Text.component.tsx");const ToggleContainer=styled_components__WEBPACK_IMPORTED_MODULE_2__.Ay.span`
  display: inline-flex;
  align-items: center;
  position: relative;
  opacity: ${props=>props.disabled?.5:1};
`,Switch=styled_components__WEBPACK_IMPORTED_MODULE_2__.Ay.label`
  position: relative;
  width: ${_spacing__WEBPACK_IMPORTED_MODULE_4__.YK.r24};
  align-self: center;
  ${props=>styled_components__WEBPACK_IMPORTED_MODULE_2__.AH`
      ${props.disabled?"\n          cursor: not-allowed;\n        ":"\n          cursor: pointer;\n        "}
    `}
`,Slider=styled_components__WEBPACK_IMPORTED_MODULE_2__.Ay.div`
  width: 100%;
  height: 1rem;
  background-color: ${props=>props.theme.backgroundLevel1};
  border: ${_spacing__WEBPACK_IMPORTED_MODULE_4__.YK.r1} solid
    ${props=>props.theme[props.toggle?"selectedActive":"infoPrimary"]};
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
    background-color: ${props=>props.theme[props.toggle?"textSecondary":"textPrimary"]};
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
  color: ${props=>props.theme[props.toggle,"textPrimary"]};
`;const Toggle=function ToggleSwitch({toggle,label,onChange,disabled,...rest}){const{isContextAvailable}=(0,_form_Form_component__WEBPACK_IMPORTED_MODULE_3__.fY)(),checkboxRef=(0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(StyledSwitchLabel,{toggle,className:"text",id:`${rest.id}-label`,htmlFor:rest.id,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ToggleContainer,{className:"sc-toggle",disabled,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_spacing__WEBPACK_IMPORTED_MODULE_4__.BJ,{gap:"r8",style:{alignItems:"baseline"},children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(Switch,{htmlFor:rest.id,role:"checkbox","aria-checked":toggle,tabIndex:disabled?-1:0,"aria-disabled":disabled,disabled,onKeyDown:e=>{"Space"!==e.code&&"Enter"!==e.code||(e.preventDefault(),e.stopPropagation(),checkboxRef.current&&checkboxRef.current.click())},"aria-labelledby":label?`${rest.id}-label`:isContextAvailable?`${_form_Form_component__WEBPACK_IMPORTED_MODULE_3__.Ag}${rest.id}`:void 0,children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ToggleInput,{type:"checkbox",checked:toggle,onChange,disabled,ref:checkboxRef,...rest}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Slider,{className:"sc-slider",toggle})]}),label&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_text_Text_component__WEBPACK_IMPORTED_MODULE_5__.EY,{children:label})]})})})};try{Toggle.displayName="Toggle",Toggle.__docgenInfo={description:"",displayName:"Toggle",props:{toggle:{defaultValue:null,description:"",name:"toggle",required:!0,type:{name:"boolean"}},label:{defaultValue:null,description:"",name:"label",required:!1,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/lib/components/toggle/Toggle.component.tsx#Toggle"]={docgenInfo:Toggle.__docgenInfo,name:"Toggle",path:"src/lib/components/toggle/Toggle.component.tsx#Toggle"})}catch(__react_docgen_typescript_loader_error){}}}]);
//# sourceMappingURL=guideline-selection-controls-overview-stories.43e291d3.iframe.bundle.js.map