"use strict";(self.webpackChunk_scality_core_ui=self.webpackChunk_scality_core_ui||[]).push([[45889],{"./stories/sidebar.stories.tsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{DefaultSidebar:()=>DefaultSidebar,ExpandedSidebar:()=>ExpandedSidebar,HoverableSidebar:()=>HoverableSidebar,SidebarInLayout:()=>SidebarInLayout,SidebarWithToggle:()=>SidebarWithToggle,SidebarinLayoutWithToggle:()=>SidebarinLayoutWithToggle,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/jsx-runtime.js"),storybook_actions__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("storybook/actions"),storybook_preview_api__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("storybook/preview-api"),react__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/react/index.js"),_src_lib__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/lib/components/loader/Loader.component.tsx"),_src_lib__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/lib/components/lateralnavbarlayout/LateralNavbarLayout.component.tsx"),_src_lib_components_sidebar_Sidebar_component__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./src/lib/components/sidebar/Sidebar.component.tsx");const actions=[{label:"Dashboard",icon:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("i",{className:"fas fa-tachometer-alt"}),onClick:(0,storybook_actions__WEBPACK_IMPORTED_MODULE_1__.action)("dashboard clicked"),active:!0},{label:"Servers",icon:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("i",{className:"fas fa-server"}),onClick:(0,storybook_actions__WEBPACK_IMPORTED_MODULE_1__.action)("server clicked")},{label:"Disks",icon:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("i",{className:"fas fa-hdd"}),onClick:(0,storybook_actions__WEBPACK_IMPORTED_MODULE_1__.action)("disk clicked")}],__WEBPACK_DEFAULT_EXPORT__={title:"Components/Navigation/Sidebar",component:_src_lib_components_sidebar_Sidebar_component__WEBPACK_IMPORTED_MODULE_6__.B,args:{actions},parameters:{layout:"fullscreen"}},DefaultSidebar={},ExpandedSidebar={args:{expanded:!0}},SidebarWithToggle={render:args=>{const[{expanded},updateArgs]=(0,storybook_preview_api__WEBPACK_IMPORTED_MODULE_2__.useArgs)();return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_src_lib_components_sidebar_Sidebar_component__WEBPACK_IMPORTED_MODULE_6__.B,{expanded,onToggleClick:()=>updateArgs({expanded:!expanded}),...args})}},HoverableSidebar={args:{hoverable:!0}},SidebarInLayout={render:args=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_src_lib__WEBPACK_IMPORTED_MODULE_5__.u,{sidebar:{...args},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_src_lib__WEBPACK_IMPORTED_MODULE_4__.a,{size:"massive"})})},SidebarinLayoutWithToggle={render:args=>{const[expandedWithToggle,setExpandedWithToggle]=(0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(!1);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_src_lib__WEBPACK_IMPORTED_MODULE_5__.u,{sidebar:{expanded:expandedWithToggle,onToggleClick:()=>{setExpandedWithToggle(!expandedWithToggle)},...args},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_src_lib__WEBPACK_IMPORTED_MODULE_4__.a,{size:"massive"})})}},__namedExportsOrder=["DefaultSidebar","ExpandedSidebar","SidebarWithToggle","HoverableSidebar","SidebarInLayout","SidebarinLayoutWithToggle"];DefaultSidebar.parameters={...DefaultSidebar.parameters,docs:{...DefaultSidebar.parameters?.docs,source:{originalSource:"{}",...DefaultSidebar.parameters?.docs?.source}}},ExpandedSidebar.parameters={...ExpandedSidebar.parameters,docs:{...ExpandedSidebar.parameters?.docs,source:{originalSource:"{\n  args: {\n    expanded: true\n  }\n}",...ExpandedSidebar.parameters?.docs?.source}}},SidebarWithToggle.parameters={...SidebarWithToggle.parameters,docs:{...SidebarWithToggle.parameters?.docs,source:{originalSource:"{\n  render: args => {\n    const [{\n      expanded\n    }, updateArgs] = useArgs();\n    return <Sidebar expanded={expanded} onToggleClick={() => updateArgs({\n      expanded: !expanded\n    })} {...args} />;\n  }\n}",...SidebarWithToggle.parameters?.docs?.source}}},HoverableSidebar.parameters={...HoverableSidebar.parameters,docs:{...HoverableSidebar.parameters?.docs,source:{originalSource:"{\n  args: {\n    hoverable: true\n  }\n}",...HoverableSidebar.parameters?.docs?.source}}},SidebarInLayout.parameters={...SidebarInLayout.parameters,docs:{...SidebarInLayout.parameters?.docs,source:{originalSource:'{\n  render: args => {\n    return <LateralNavbarLayout sidebar={{\n      ...args\n    }}>\n        <Loader size="massive" />\n      </LateralNavbarLayout>;\n  }\n}',...SidebarInLayout.parameters?.docs?.source}}},SidebarinLayoutWithToggle.parameters={...SidebarinLayoutWithToggle.parameters,docs:{...SidebarinLayoutWithToggle.parameters?.docs,source:{originalSource:'{\n  render: args => {\n    const [expandedWithToggle, setExpandedWithToggle] = useState(false);\n    return <LateralNavbarLayout sidebar={{\n      expanded: expandedWithToggle,\n      onToggleClick: () => {\n        setExpandedWithToggle(!expandedWithToggle);\n      },\n      ...args\n    }}>\n        <Loader size="massive" />\n      </LateralNavbarLayout>;\n  }\n}',...SidebarinLayoutWithToggle.parameters?.docs?.source}}}},"./src/lib/components/lateralnavbarlayout/LateralNavbarLayout.component.tsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{u:()=>LateralNavbarLayout});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/jsx-runtime.js"),styled_components__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),_sidebar_Sidebar_component__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/lib/components/sidebar/Sidebar.component.tsx"),_utils__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/lib/utils.ts");const LateralNavbarLayoutContainer=styled_components__WEBPACK_IMPORTED_MODULE_1__.Ay.div.withConfig({componentId:"sc-lateralnavbarlayout"})`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`,ContentContainer=styled_components__WEBPACK_IMPORTED_MODULE_1__.Ay.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
`,MainContent=styled_components__WEBPACK_IMPORTED_MODULE_1__.Ay.div`
  flex-grow: 1;
  background-color: ${(0,_utils__WEBPACK_IMPORTED_MODULE_3__.sP)("backgroundLevel1")};
`;function LateralNavbarLayout({children,sidebar,...rest}){return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(LateralNavbarLayoutContainer,{...rest,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(ContentContainer,{children:[sidebar&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_sidebar_Sidebar_component__WEBPACK_IMPORTED_MODULE_2__.B,{...sidebar}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(MainContent,{className:"main",children})]})})}try{LateralNavbarLayout.displayName="LateralNavbarLayout",LateralNavbarLayout.__docgenInfo={description:"",displayName:"LateralNavbarLayout",props:{sidebar:{defaultValue:null,description:"",name:"sidebar",required:!0,type:{name:"Props"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/lib/components/lateralnavbarlayout/LateralNavbarLayout.component.tsx#LateralNavbarLayout"]={docgenInfo:LateralNavbarLayout.__docgenInfo,name:"LateralNavbarLayout",path:"src/lib/components/lateralnavbarlayout/LateralNavbarLayout.component.tsx#LateralNavbarLayout"})}catch(__react_docgen_typescript_loader_error){}},"./src/lib/components/sidebar/Sidebar.component.tsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{B:()=>Sidebar});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/jsx-runtime.js"),react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/index.js"),styled_components__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),_style_theme__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/lib/style/theme.ts"),_buttonv2_Buttonv2_component__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/lib/components/buttonv2/Buttonv2.component.tsx"),_icon_Icon_component__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/lib/components/icon/Icon.component.tsx"),_spacing__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./src/lib/spacing.tsx");const Wrapper=styled_components__WEBPACK_IMPORTED_MODULE_2__.Ay.div`
  margin-top: 1px;
  flex-shrink: 0;
  ${props=>{const{backgroundLevel1,textPrimary}=props.theme;return styled_components__WEBPACK_IMPORTED_MODULE_2__.AH`
      background-color: ${backgroundLevel1};
      color: ${textPrimary};
      .fas {
        color: ${textPrimary};
      }
    `}}
  border-right: 1px solid ${props=>props.theme.backgroundLevel3};
  ${props=>props.$expanded?styled_components__WEBPACK_IMPORTED_MODULE_2__.AH`
        width: auto;
      `:styled_components__WEBPACK_IMPORTED_MODULE_2__.AH`
      width: ${_style_theme__WEBPACK_IMPORTED_MODULE_3__.NE};
    `}

  ${props=>{const{backgroundLevel1}=props.theme;if(props.$hoverable&&props.$hovered&&!props.$expanded)return styled_components__WEBPACK_IMPORTED_MODULE_2__.AH`
        .sc-sidebar {
          position: relative;
          width: fit-content;
          height: 100%;
          background-color: ${backgroundLevel1};
          z-index: ${_style_theme__WEBPACK_IMPORTED_MODULE_3__.fE.sidebar};
          border-right: 1px solid ${props=>props.theme.backgroundLevel3};
        }
      `}}
`,SidebarContainer=styled_components__WEBPACK_IMPORTED_MODULE_2__.Ay.div.withConfig({componentId:"sc-sidebar"})`
  ${props=>{const{backgroundLevel1}=props.theme;return styled_components__WEBPACK_IMPORTED_MODULE_2__.AH`
      background-color: ${backgroundLevel1};
    `}}

  ${props=>props.$expanded||props.$hoverable&&props.$hovered&&!props.$expanded?styled_components__WEBPACK_IMPORTED_MODULE_2__.AH`
        width: auto;
      `:styled_components__WEBPACK_IMPORTED_MODULE_2__.AH`
      width: ${_style_theme__WEBPACK_IMPORTED_MODULE_3__.NE};
    `}

  .sc-button {
    border-radius: 0;
    background-color: ${props=>props.theme.backgroundLevel1};
    color: ${props=>props.theme.textPrimary};
    &:hover {
      background-color: ${props=>props.theme.highlight};
    }
    &:focus-visible {
      ${_buttonv2_Buttonv2_component__WEBPACK_IMPORTED_MODULE_4__.kD}
    }
    height: ${_style_theme__WEBPACK_IMPORTED_MODULE_3__.FB};
    width: ${_style_theme__WEBPACK_IMPORTED_MODULE_3__.NE};
    padding: 0px;
  }
`,SidebarItem=styled_components__WEBPACK_IMPORTED_MODULE_2__.Ay.div.withConfig({componentId:"sc-sidebar-item"})`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: flex-start;
  .fas {
    font-size: ${_style_theme__WEBPACK_IMPORTED_MODULE_3__.J.larger};
  }

  ${props=>{const{textPrimary,highlight}=props.theme;return props.$active?styled_components__WEBPACK_IMPORTED_MODULE_2__.AH`
          background-color: ${highlight};
          color: ${textPrimary};
          cursor: default;
          &:focus-visible {
            ${_buttonv2_Buttonv2_component__WEBPACK_IMPORTED_MODULE_4__.kD}
          }
        `:styled_components__WEBPACK_IMPORTED_MODULE_2__.AH`
          &:hover {
            background-color: ${highlight};
            color: ${textPrimary};
          }
          &:focus-visible {
            ${_buttonv2_Buttonv2_component__WEBPACK_IMPORTED_MODULE_4__.kD}
          }
          &:active {
            background-color: ${highlight};
            color: ${textPrimary};
          }
        `}}
`,MenuItemText=styled_components__WEBPACK_IMPORTED_MODULE_2__.Ay.div`
  margin-right: ${_spacing__WEBPACK_IMPORTED_MODULE_6__.YK.r20};
  white-space: nowrap;
`,MenuItemSelected=styled_components__WEBPACK_IMPORTED_MODULE_2__.Ay.div`
  position: absolute;
  width: 3px;
  height: 100%;
  right: 0;
  background-color: ${props=>props.theme.selectedActive};
`,MenuItemIcon=styled_components__WEBPACK_IMPORTED_MODULE_2__.Ay.div`
  width: ${_style_theme__WEBPACK_IMPORTED_MODULE_3__.NE};
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${_style_theme__WEBPACK_IMPORTED_MODULE_3__.FB};
`;function Sidebar({expanded,actions,onToggleClick,hoverable,...rest}){const[hovered,setHovered]=(0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(!1);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Wrapper,{onMouseEnter:()=>setHovered(!0),onMouseLeave:()=>setHovered(!1),$hoverable:hoverable,$hovered:hovered,$expanded:expanded,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(SidebarContainer,{$expanded:expanded,$hoverable:hoverable,$hovered:hovered,...rest,children:[onToggleClick&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(MenuItemIcon,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_buttonv2_Buttonv2_component__WEBPACK_IMPORTED_MODULE_4__.$n,{icon:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_icon_Icon_component__WEBPACK_IMPORTED_MODULE_5__.In,{size:"lg",name:"Lat-menu"}),onClick:()=>{setHovered(!1),onToggleClick()},tooltip:{overlay:"Toggle sidebar"}})}),actions.map(({active,label,onClick,icon=null,...actionRest},index)=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(SidebarItem,{$active:active,title:label,onClick,onKeyDown:event=>{" "!==event.key&&"Enter"!==event.key&&"Spacebar"!==event.key||(event.preventDefault(),onClick(event))},tabIndex:0,...actionRest,children:[!!icon&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(MenuItemIcon,{children:icon}),(expanded||hoverable&&hovered)&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(MenuItemText,{children:label}),active&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(MenuItemSelected,{})]},index))]})})}try{Sidebar.displayName="Sidebar",Sidebar.__docgenInfo={description:"",displayName:"Sidebar",props:{expanded:{defaultValue:null,description:"",name:"expanded",required:!1,type:{name:"boolean"}},actions:{defaultValue:null,description:"",name:"actions",required:!0,type:{name:"Items"}},hoverable:{defaultValue:null,description:"",name:"hoverable",required:!1,type:{name:"boolean"}},onToggleClick:{defaultValue:null,description:"",name:"onToggleClick",required:!1,type:{name:"(() => void)"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/lib/components/sidebar/Sidebar.component.tsx#Sidebar"]={docgenInfo:Sidebar.__docgenInfo,name:"Sidebar",path:"src/lib/components/sidebar/Sidebar.component.tsx#Sidebar"})}catch(__react_docgen_typescript_loader_error){}}}]);
//# sourceMappingURL=sidebar-stories.f18011b4.iframe.bundle.js.map