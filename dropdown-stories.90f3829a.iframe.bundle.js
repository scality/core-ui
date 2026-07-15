"use strict";(self.webpackChunk_scality_core_ui=self.webpackChunk_scality_core_ui||[]).push([[32792],{"./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js"(__unused_webpack_module,__webpack_exports__,__webpack_require__){function _objectWithoutPropertiesLoose(r,e){if(null==r)return{};var t={};for(var n in r)if({}.hasOwnProperty.call(r,n)){if(-1!==e.indexOf(n))continue;t[n]=r[n]}return t}__webpack_require__.d(__webpack_exports__,{A:()=>_objectWithoutPropertiesLoose})},"./stories/dropdown.stories.tsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{DifferentSizes:()=>DifferentSizes,DropdownVariant:()=>DropdownVariant,DropdownWithIcon:()=>DropdownWithIcon,DropdownWithText:()=>DropdownWithText,DropdownWithTextAndIcon:()=>DropdownWithTextAndIcon,Playground:()=>Playground,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/jsx-runtime.js"),storybook_actions__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("storybook/actions"),_src_lib__WEBPACK_IMPORTED_MODULE_3__=(__webpack_require__("./node_modules/react/index.js"),__webpack_require__("./src/lib/components/icon/Icon.component.tsx")),_src_lib_components_dropdown_Dropdown_component__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/lib/components/dropdown/Dropdown.component.tsx"),_common__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./stories/common.tsx"),_controls__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./stories/controls.ts");const items=[{label:"About",onClick:(0,storybook_actions__WEBPACK_IMPORTED_MODULE_1__.action)("About clicked"),"data-cy":"About"},{label:"Documentation",onClick:(0,storybook_actions__WEBPACK_IMPORTED_MODULE_1__.action)("Documentation clicked"),"data-cy":"Documentation"},{label:"Onboarding",onClick:(0,storybook_actions__WEBPACK_IMPORTED_MODULE_1__.action)("Onboarding clicked"),"data-cy":"Onboarding"}],__WEBPACK_DEFAULT_EXPORT__={title:"Components/Navigation/Dropdown",component:_src_lib_components_dropdown_Dropdown_component__WEBPACK_IMPORTED_MODULE_4__.m,decorators:[story=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common__WEBPACK_IMPORTED_MODULE_5__.mO,{style:{minHeight:"40vh",display:"flex",justifyContent:"space-between",alignItems:"center",padding:"0"},className:"storybook-dropdown",children:story()})],args:{items},argTypes:{icon:_controls__WEBPACK_IMPORTED_MODULE_6__.Yp,size:{options:_controls__WEBPACK_IMPORTED_MODULE_6__.bP,control:{type:"radio"}},variant:{options:_controls__WEBPACK_IMPORTED_MODULE_6__.vI,control:{type:"radio"}}},render:({icon,items,...args})=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_src_lib_components_dropdown_Dropdown_component__WEBPACK_IMPORTED_MODULE_4__.m,{items,icon:icon&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_src_lib__WEBPACK_IMPORTED_MODULE_3__.In,{name:icon}),...args})},Playground={args:{text:"Playground"}},DropdownWithText={args:{text:"Help"}},DropdownWithIcon={args:{icon:"Folder",caret:!1}},DropdownWithTextAndIcon={args:{text:"Help",icon:"Info-circle"}},DropdownVariant={render:({icon,...args})=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment,{children:_controls__WEBPACK_IMPORTED_MODULE_6__.vI.map((variant,i)=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_src_lib_components_dropdown_Dropdown_component__WEBPACK_IMPORTED_MODULE_4__.m,{items,icon:icon&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_src_lib__WEBPACK_IMPORTED_MODULE_3__.In,{name:icon}),text:"Help",variant,...args},i))})},DifferentSizes={render:({icon,...args})=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment,{children:_controls__WEBPACK_IMPORTED_MODULE_6__.bP.map((size,i)=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_src_lib_components_dropdown_Dropdown_component__WEBPACK_IMPORTED_MODULE_4__.m,{items,icon:icon&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_src_lib__WEBPACK_IMPORTED_MODULE_3__.In,{name:icon}),text:"Help",size,...args},i))}),args:{text:"Help",icon:"Info-circle"}},__namedExportsOrder=["Playground","DropdownWithText","DropdownWithIcon","DropdownWithTextAndIcon","DropdownVariant","DifferentSizes"];Playground.parameters={...Playground.parameters,docs:{...Playground.parameters?.docs,source:{originalSource:"{\n  args: {\n    text: 'Playground'\n  }\n}",...Playground.parameters?.docs?.source}}},DropdownWithText.parameters={...DropdownWithText.parameters,docs:{...DropdownWithText.parameters?.docs,source:{originalSource:"{\n  args: {\n    text: 'Help'\n  }\n}",...DropdownWithText.parameters?.docs?.source}}},DropdownWithIcon.parameters={...DropdownWithIcon.parameters,docs:{...DropdownWithIcon.parameters?.docs,source:{originalSource:"{\n  args: {\n    icon: 'Folder',\n    caret: false\n  }\n}",...DropdownWithIcon.parameters?.docs?.source}}},DropdownWithTextAndIcon.parameters={...DropdownWithTextAndIcon.parameters,docs:{...DropdownWithTextAndIcon.parameters?.docs,source:{originalSource:"{\n  args: {\n    text: 'Help',\n    icon: 'Info-circle'\n  }\n}",...DropdownWithTextAndIcon.parameters?.docs?.source}}},DropdownVariant.parameters={...DropdownVariant.parameters,docs:{...DropdownVariant.parameters?.docs,source:{originalSource:'{\n  render: ({\n    icon,\n    ...args\n  }) => {\n    return <>\n        {variants.map((variant, i) => {\n        return <Dropdown key={i} items={items} icon={icon && <Icon name={icon}></Icon>} text="Help" variant={variant} {...args} />;\n      })}\n      </>;\n  }\n}',...DropdownVariant.parameters?.docs?.source}}},DifferentSizes.parameters={...DifferentSizes.parameters,docs:{...DifferentSizes.parameters?.docs,source:{originalSource:"{\n  render: ({\n    icon,\n    ...args\n  }) => {\n    return <>\n        {sizes.map((size, i) => {\n        return <Dropdown key={i} items={items} icon={icon && <Icon name={icon}></Icon>} text=\"Help\" size={size} {...args} />;\n      })}\n      </>;\n  },\n  args: {\n    text: 'Help',\n    icon: 'Info-circle'\n  }\n}",...DifferentSizes.parameters?.docs?.source}}};try{Dropdown.displayName="Dropdown",Dropdown.__docgenInfo={description:"",displayName:"Dropdown",props:{text:{defaultValue:null,description:"",name:"text",required:!1,type:{name:"string"}},size:{defaultValue:{value:"base"},description:"",name:"size",required:!1,type:{name:"string"}},variant:{defaultValue:{value:"buttonSecondary"},description:"",name:"variant",required:!1,type:{name:"string"}},title:{defaultValue:null,description:"",name:"title",required:!1,type:{name:"string"}},items:{defaultValue:null,description:"",name:"items",required:!0,type:{name:"Items"}},icon:{defaultValue:null,description:"",name:"icon",required:!1,type:{name:"Element"}},caret:{defaultValue:{value:"true"},description:"",name:"caret",required:!1,type:{name:"boolean"}},placement:{defaultValue:{value:"bottom"},description:"",name:"placement",required:!1,type:{name:"enum",value:[{value:'"top"'},{value:'"bottom"'},{value:'"left"'},{value:'"top-start"'},{value:'"top-end"'},{value:'"right"'},{value:'"right-start"'},{value:'"right-end"'},{value:'"bottom-end"'},{value:'"bottom-start"'},{value:'"left-start"'},{value:'"left-end"'}]}},"aria-label":{defaultValue:null,description:"Accessible name for the trigger. Set this when the trigger is icon-only\n(no visible `text`) so it still has a name; falls back to `title` in that\ncase. Overrides the label reference the underlying select would set.",name:"aria-label",required:!1,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["stories/dropdown.stories.tsx#Dropdown"]={docgenInfo:Dropdown.__docgenInfo,name:"Dropdown",path:"stories/dropdown.stories.tsx#Dropdown"})}catch(__react_docgen_typescript_loader_error){}try{render.displayName="render",render.__docgenInfo={description:"",displayName:"render",props:{icon:{defaultValue:null,description:"",name:"icon",required:!0,type:{name:"any"}},items:{defaultValue:null,description:"",name:"items",required:!0,type:{name:"any"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["stories/dropdown.stories.tsx#render"]={docgenInfo:render.__docgenInfo,name:"render",path:"stories/dropdown.stories.tsx#render"})}catch(__react_docgen_typescript_loader_error){}},"./src/lib/components/dropdown/Dropdown.component.tsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{m:()=>Dropdown});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/jsx-runtime.js"),styled_components__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),_style_theme__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/lib/style/theme.ts"),_spacing__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/lib/spacing.tsx"),_utils__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/lib/utils.ts"),_icon_Icon_component__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/lib/components/icon/Icon.component.tsx"),downshift__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/downshift/dist/downshift.esm.js"),_buttonv2_Buttonv2_component__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./src/lib/components/buttonv2/Buttonv2.component.tsx"),_floating_ui_dom__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("./node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs"),_floating_ui_react__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("./node_modules/@floating-ui/react/dist/floating-ui.react.mjs");const DropdownStyled=styled_components__WEBPACK_IMPORTED_MODULE_1__.Ay.div`
  position: relative;
  user-select: none;
  cursor: pointer;
  .trigger {
    margin: 0;
    border-radius: 0;
  }
`,DropdownMenuStyled=styled_components__WEBPACK_IMPORTED_MODULE_1__.Ay.ul`
  position: absolute;
  margin: 0;
  padding: 0;
  top: 50px;
  border: 1px solid ${(0,_utils__WEBPACK_IMPORTED_MODULE_4__.sP)("backgroundLevel1")};
  z-index: ${_style_theme__WEBPACK_IMPORTED_MODULE_2__.fE.dropdown};
  max-height: 200px;
  min-width: 100%;
  overflow: auto;
  display: ${props=>props.$isOpen?"auto":"none"};
`,DropdownMenuItemStyled=styled_components__WEBPACK_IMPORTED_MODULE_1__.Ay.li`
  display: flex;
  align-items: center;
  padding: ${_spacing__WEBPACK_IMPORTED_MODULE_3__.YK.r16};
  white-space: nowrap;
  cursor: pointer;
  font-size: ${_style_theme__WEBPACK_IMPORTED_MODULE_2__.J.base};
  ${props=>props.$isSelected?`background-color: ${props.theme.highlight};`:`background-color: ${props.theme.backgroundLevel1};`}

  color: ${(0,_utils__WEBPACK_IMPORTED_MODULE_4__.sP)("textPrimary")};
  border-top: 0.3px solid ${(0,_utils__WEBPACK_IMPORTED_MODULE_4__.sP)("border")};
  border-left: 0.3px solid ${(0,_utils__WEBPACK_IMPORTED_MODULE_4__.sP)("border")};
  border-right: 0.3px solid ${(0,_utils__WEBPACK_IMPORTED_MODULE_4__.sP)("border")};

  &:hover {
    background-color: ${(0,_utils__WEBPACK_IMPORTED_MODULE_4__.sP)("highlight")};
  }
  &:active {
    background-color: ${(0,_utils__WEBPACK_IMPORTED_MODULE_4__.sP)("highlight")};
  }
  &:last-child {
    border-bottom: 0.3px solid ${(0,_utils__WEBPACK_IMPORTED_MODULE_4__.sP)("border")};
  }
`,Caret=styled_components__WEBPACK_IMPORTED_MODULE_1__.Ay.span`
  margin-left: ${_spacing__WEBPACK_IMPORTED_MODULE_3__.YK.r16};
`,ButtonStyled=styled_components__WEBPACK_IMPORTED_MODULE_1__.Ay.button`
  -webkit-appearance: none;
  -moz-appearance: none;
  position: relative;
  display: inline-flex;
  user-select: none;
  vertical-align: middle;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  text-decoration: none;
  border: none;
  font-weight: ${_style_theme__WEBPACK_IMPORTED_MODULE_2__.Wy.base};

  &:hover,
  &:focus,
  &:active {
    outline: none;
    cursor: pointer;
  }

  ${props=>{switch(props.$size){case"smaller":return styled_components__WEBPACK_IMPORTED_MODULE_1__.AH`
          padding: 7px 14px;
          font-size: ${_style_theme__WEBPACK_IMPORTED_MODULE_2__.J.smaller};
          border-radius: 4px;
          height: 27px;
        `;case"small":return styled_components__WEBPACK_IMPORTED_MODULE_1__.AH`
          padding: 8px 16px;
          font-size: ${_style_theme__WEBPACK_IMPORTED_MODULE_2__.J.small};
          border-radius: 5px;
          height: 30px;
        `;case"large":return styled_components__WEBPACK_IMPORTED_MODULE_1__.AH`
          padding: 10px 20px;
          font-size: ${_style_theme__WEBPACK_IMPORTED_MODULE_2__.J.large};
          border-radius: 7px;
          height: 40px;
        `;case"larger":return styled_components__WEBPACK_IMPORTED_MODULE_1__.AH`
          padding: 11px 22px;
          font-size: ${_style_theme__WEBPACK_IMPORTED_MODULE_2__.J.larger};
          border-radius: 8px;
          height: 48px;
        `;default:return styled_components__WEBPACK_IMPORTED_MODULE_1__.AH`
          padding: 12px 16px;
          font-size: ${_style_theme__WEBPACK_IMPORTED_MODULE_2__.J.base};
          border-radius: 6px;
          height: 32px;
        `}}}

  ${props=>"buttonPrimary"===props.$variant?styled_components__WEBPACK_IMPORTED_MODULE_1__.AH`
        background-color: ${props.theme.buttonPrimary};
        border: 1px solid ${props.theme.buttonPrimary};
        color: ${props.theme.textPrimary};
        &:hover {
          background-color: ${props.theme.highlight};
          outline: none;
          border: 1px solid ${props.theme.infoPrimary};
        }
      `:"buttonSecondary"===props.$variant?styled_components__WEBPACK_IMPORTED_MODULE_1__.AH`
        background-color: ${props.theme.buttonSecondary};
        border: 1px solid ${props.theme.buttonSecondary};
        color: ${props.theme.textPrimary};
        &:hover {
          background-color: ${props.theme.infoPrimary};
          border: 1px solid ${props.theme.infoPrimary};
        }
      `:"buttonDelete"===props.$variant?styled_components__WEBPACK_IMPORTED_MODULE_1__.AH`
        background-color: ${props.theme.buttonDelete};
        border: 1px solid ${props.theme.buttonDelete};
        color: ${props.theme.statusCritical};
        &:hover {
          background-color: ${props.theme.statusCritical};
          border: 1px solid ${props.theme.infoPrimary};
          color: ${props.theme.textPrimary};
        }
      `:"backgroundLevel1"===props.$variant?styled_components__WEBPACK_IMPORTED_MODULE_1__.AH`
        background-color: ${props.theme.backgroundLevel1};
        color: ${props.theme.textPrimary};
        &:hover {
          background-color: ${props.theme.highlight};
        }
      `:styled_components__WEBPACK_IMPORTED_MODULE_1__.AH`
        background-color: ${props.theme.backgroundLevel1};
        border: 1px solid ${props.theme.backgroundLevel1};
        color: ${props.theme.statusCritical};
        &:hover {
          background-color: ${props.theme.backgroundLevel1};
          border: 1px solid ${props.theme.infoPrimary};
          color: ${props.theme.textPrimary};
        }
      `}
`,ButtonIcon=styled_components__WEBPACK_IMPORTED_MODULE_1__.Ay.span`
  ${props=>props.$text&&styled_components__WEBPACK_IMPORTED_MODULE_1__.AH`
      padding-right: 8px;
      display: inline-flex;
      justify-content: center;
      align-items: center;
    `}
`,ButtonText=styled_components__WEBPACK_IMPORTED_MODULE_1__.Ay.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
`,Trigger=(0,styled_components__WEBPACK_IMPORTED_MODULE_1__.Ay)(ButtonStyled).attrs({as:"div"})``,TriggerStyled=(0,styled_components__WEBPACK_IMPORTED_MODULE_1__.Ay)(Trigger)`
  // :focus-visible is the keyboard-only version of :focus
  &:focus-visible {
    ${_buttonv2_Buttonv2_component__WEBPACK_IMPORTED_MODULE_7__.kD}
    color: ${props=>props.theme.textPrimary};
  }
`;function Dropdown({items,text,icon,size="base",variant="buttonSecondary",title,caret=!0,placement="bottom","aria-label":ariaLabel,...rest}){const triggerAriaLabel=ariaLabel??(icon&&!text?title:void 0),{isOpen,getToggleButtonProps,getMenuProps,getItemProps,highlightedIndex}=(0,downshift__WEBPACK_IMPORTED_MODULE_6__.WM)({items,itemToString:item=>item?.label||""}),{refs,floatingStyles}=(0,_floating_ui_react__WEBPACK_IMPORTED_MODULE_9__.we)({middleware:[(0,_floating_ui_dom__WEBPACK_IMPORTED_MODULE_8__.cY)(10),(0,_floating_ui_dom__WEBPACK_IMPORTED_MODULE_8__.UU)(),(0,_floating_ui_dom__WEBPACK_IMPORTED_MODULE_8__.BN)()],placement,whileElementsMounted:_floating_ui_dom__WEBPACK_IMPORTED_MODULE_8__.ll}),{getReferenceProps,getFloatingProps}=(0,_floating_ui_react__WEBPACK_IMPORTED_MODULE_9__.bv)();return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(DropdownStyled,{className:"sc-dropdown",...rest,ref:refs.setReference,children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(TriggerStyled,{$variant:variant,$size:size,className:"trigger",title,...getToggleButtonProps(),...getReferenceProps(),...triggerAriaLabel?{"aria-label":triggerAriaLabel,"aria-labelledby":void 0}:{},children:[icon&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ButtonIcon,{$text:text,$size:size,children:icon}),text&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ButtonText,{className:"sc-trigger-text",children:text}),caret&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Caret,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_icon_Icon_component__WEBPACK_IMPORTED_MODULE_5__.In,{name:"Dropdown-down"})})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(DropdownMenuStyled,{className:"menu-item",$isOpen:isOpen,style:floatingStyles,...getFloatingProps(),...getMenuProps({ref:refs.setFloating}),children:items.map((item,index)=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(DropdownMenuItemStyled,{className:"menu-item-label",...getItemProps({item,index,onClick:item.onClick}),$isSelected:index===highlightedIndex,children:item.label},item.label))})]})}try{Dropdown.displayName="Dropdown",Dropdown.__docgenInfo={description:"",displayName:"Dropdown",props:{text:{defaultValue:null,description:"",name:"text",required:!1,type:{name:"string"}},size:{defaultValue:{value:"base"},description:"",name:"size",required:!1,type:{name:"string"}},variant:{defaultValue:{value:"buttonSecondary"},description:"",name:"variant",required:!1,type:{name:"string"}},title:{defaultValue:null,description:"",name:"title",required:!1,type:{name:"string"}},items:{defaultValue:null,description:"",name:"items",required:!0,type:{name:"Items"}},icon:{defaultValue:null,description:"",name:"icon",required:!1,type:{name:"Element"}},caret:{defaultValue:{value:"true"},description:"",name:"caret",required:!1,type:{name:"boolean"}},placement:{defaultValue:{value:"bottom"},description:"",name:"placement",required:!1,type:{name:"enum",value:[{value:'"top"'},{value:'"bottom"'},{value:'"left"'},{value:'"top-start"'},{value:'"top-end"'},{value:'"right"'},{value:'"right-start"'},{value:'"right-end"'},{value:'"bottom-end"'},{value:'"bottom-start"'},{value:'"left-start"'},{value:'"left-end"'}]}},"aria-label":{defaultValue:null,description:"Accessible name for the trigger. Set this when the trigger is icon-only\n(no visible `text`) so it still has a name; falls back to `title` in that\ncase. Overrides the label reference the underlying select would set.",name:"aria-label",required:!1,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/lib/components/dropdown/Dropdown.component.tsx#Dropdown"]={docgenInfo:Dropdown.__docgenInfo,name:"Dropdown",path:"src/lib/components/dropdown/Dropdown.component.tsx#Dropdown"})}catch(__react_docgen_typescript_loader_error){}},"./stories/controls.ts"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Yp:()=>iconArgType,bP:()=>sizesOptions,tg:()=>localeArgtype,vI:()=>variantsOptions,wo:()=>placementOptions});var _src_lib_components_icon_Icon_component__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/lib/components/icon/iconTable.ts");const iconOptions=Object.keys(_src_lib_components_icon_Icon_component__WEBPACK_IMPORTED_MODULE_0__._),sizesOptions=["smaller","small","base","large","larger"],placementOptions=["top","bottom","left","top-start","top-end","right","right-start","right-end","bottom-end","bottom-start","left-start","left-end"],localeArgtype={control:{type:"radio"},options:["en","fr"],description:"Set language for the component"},iconArgType={control:{type:"select"},options:iconOptions,description:"Icon to display with the component",table:{type:{summary:"Element"}}},variantsOptions=["buttonPrimary","buttonSecondary","buttonDelete","backgroundLevel1"]}}]);
//# sourceMappingURL=dropdown-stories.90f3829a.iframe.bundle.js.map