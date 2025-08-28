"use strict";(self.webpackChunk_scality_core_ui=self.webpackChunk_scality_core_ui||[]).push([[10293],{"./stories/navbar.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{BasicNavbar:()=>BasicNavbar,NavbarWithCustomizedLogo:()=>NavbarWithCustomizedLogo,NavbarWithOnlyLinkTabs:()=>NavbarWithOnlyLinkTabs,NavbarWithOnlyTabs:()=>NavbarWithOnlyTabs,NavbarWithToggle:()=>NavbarWithToggle,__namedExportsOrder:()=>__namedExportsOrder,default:()=>navbar_stories});var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),react=__webpack_require__("./node_modules/react/index.js"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Logo=()=>(0,jsx_runtime.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"186",height:"49",viewBox:"0 0 186 49",children:[(0,jsx_runtime.jsx)("path",{fill:"#fff",d:"M72.23 18.19c0-2.03-1.18-3.18-4.53-3.18-3.35 0-4.53 1.15-4.53 3.18v.71c0 1.68 1.09 2.21 1.9 2.47l6.98 2.57c2.27.88 4.17 2.29 4.17 5.04v3.09c0 3.09-2.27 5.75-8.61 5.75-6.43 0-8.61-2.66-8.61-5.75v-2.03c0-.53.27-.71.82-.71h2.26c.45 0 .64.18.64.71v1.68c0 2.03 1.45 3.18 4.89 3.18 3.44 0 4.89-1.15 4.89-3.18v-1.77c0-1.86-1.72-2.48-3.17-3.1l-6.43-2.38a4.98 4.98 0 0 1-3.36-4.6v-2.12c0-3.1 2-5.75 8.16-5.75 6.25 0 8.25 2.65 8.25 5.75v1.68c0 .44-.18.7-.64.7h-2.26c-.55 0-.82-.17-.82-.7zM97.04 32.16c0 3.09-1.91 5.75-8.52 5.75-6.62 0-8.52-2.66-8.52-5.75V17.75c0-3.1 1.9-5.75 8.52-5.75 6.61 0 8.52 2.65 8.52 5.75v1.85c0 .53-.18.71-.73.71h-2.17c-.55 0-.82-.18-.82-.71v-1.23c0-2.04-1.36-3.28-4.8-3.28-3.44 0-4.8 1.24-4.8 3.28v13.26c0 2.03 1.36 3.27 4.8 3.27 3.44 0 4.8-1.24 4.8-3.27v-1.77c0-.44.27-.71.82-.71h2.17c.46 0 .73.27.73.71zM125.81 34.28h9.78c.46 0 .82.18.82.71v1.68c0 .53-.36.71-.82.71h-12.96c-.45 0-.63-.27-.63-.71V12.8c0-.53.18-.8.73-.8h2.35c.45 0 .73.27.73.8zM164.58 12c.46 0 .64.18.64.71v1.68c0 .53-.09.7-.64.7h-5.98v21.58c0 .53-.27.71-.81.71h-2.36c-.45 0-.81-.27-.81-.71V15.09h-5.99c-.54 0-.63-.17-.63-.7v-1.68c0-.53.09-.71.63-.71z"}),(0,jsx_runtime.jsx)("path",{fill:"#fff",d:"M72.23 18.19c0-2.03-1.18-3.18-4.53-3.18-3.35 0-4.53 1.15-4.53 3.18v.71c0 1.68 1.09 2.21 1.9 2.47l6.98 2.57c2.27.88 4.17 2.29 4.17 5.04v3.09c0 3.09-2.27 5.75-8.61 5.75-6.43 0-8.61-2.66-8.61-5.75v-2.03c0-.53.27-.71.82-.71h2.26c.45 0 .64.18.64.71v1.68c0 2.03 1.45 3.18 4.89 3.18 3.44 0 4.89-1.15 4.89-3.18v-1.77c0-1.86-1.72-2.48-3.17-3.1l-6.43-2.38a4.98 4.98 0 0 1-3.36-4.6v-2.12c0-3.1 2-5.75 8.16-5.75 6.25 0 8.25 2.65 8.25 5.75v1.68c0 .44-.18.7-.64.7h-2.26c-.55 0-.82-.17-.82-.7zM97.04 32.16c0 3.09-1.91 5.75-8.52 5.75-6.62 0-8.52-2.66-8.52-5.75V17.75c0-3.1 1.9-5.75 8.52-5.75 6.61 0 8.52 2.65 8.52 5.75v1.85c0 .53-.18.71-.73.71h-2.17c-.55 0-.82-.18-.82-.71v-1.23c0-2.04-1.36-3.28-4.8-3.28-3.44 0-4.8 1.24-4.8 3.28v13.26c0 2.03 1.36 3.27 4.8 3.27 3.44 0 4.8-1.24 4.8-3.27v-1.77c0-.44.27-.71.82-.71h2.17c.46 0 .73.27.73.71zM125.81 34.28h9.78c.46 0 .82.18.82.71v1.68c0 .53-.36.71-.82.71h-12.96c-.45 0-.63-.27-.63-.71V12.8c0-.53.18-.8.73-.8h2.35c.45 0 .73.27.73.8zM143.72 36.67c0 .53-.19.71-.73.71h-2.36c-.45 0-.63-.27-.63-.71V12.8c0-.53.09-.8.63-.8h2.36c.54 0 .73.27.73.8zM164.58 12c.46 0 .64.18.64.71v1.68c0 .53-.09.7-.64.7h-5.98v21.58c0 .53-.27.71-.81.71h-2.36c-.45 0-.81-.27-.81-.71V15.09h-5.99c-.54 0-.63-.17-.63-.7v-1.68c0-.53.09-.71.63-.71zM175.53 23.76l5.71-11.05c.18-.36.36-.71.82-.71h2.35c.55 0 .82.27.55.71l-7.53 14.59v9.37c0 .44-.18.71-.72.71h-2.36c-.54 0-.63-.27-.63-.71V27.3l-7.61-14.59c-.28-.44 0-.71.54-.71h2.27c.54 0 .63.27.9.71zM110.76 12c.45 0 .73.27.91.71l7.43 23.96c.18.44 0 .71-.54.71h-2.45c-.45 0-.73-.27-.82-.71l-1.72-5.75h-7.97l-1.73 5.75c-.09.44-.36.71-.81.71h-2.45c-.54 0-.72-.27-.54-.71l7.43-23.96c.18-.44.45-.71.91-.71zm-1.18 5.48l-3.17 10.61h6.25z"}),(0,jsx_runtime.jsx)("path",{fill:"#3d9bd6",d:"M21.25 4.42v7.25h3.99V4.33l5.16 2.92 2-3.36L27.14.97A7.7 7.7 0 0 0 23.15 0c-1.36 0-2.72.35-3.89 1.06L14 3.98l1.99 3.36z"}),(0,jsx_runtime.jsx)("path",{fill:"#007664",d:"M21.25 4.42v7.25h3.99V4.33l5.16 2.92 2-3.36L27.14.97A7.7 7.7 0 0 0 23.15 0c-1.36 0-2.72.35-3.89 1.06L14 3.98l1.99 3.36z"}),(0,jsx_runtime.jsx)("path",{fill:"#ee4642",d:"M21.16 44.25V37h3.99v7.25l5.16-2.92 2 3.36-5.17 2.92a7.9 7.9 0 0 1-7.88 0L14 44.69l1.99-3.36z"}),(0,jsx_runtime.jsx)("path",{fill:"#2aad8e",d:"M40.43 13.28L34 16.9l1.99 3.36 6.44-3.62v5.83h3.99v-5.92c0-1.33-.37-2.65-1.09-3.8a8.82 8.82 0 0 0-2.9-2.83L37.17 7l-1.99 3.36z"}),(0,jsx_runtime.jsx)("path",{fill:"#d71d4f",d:"M4.99 32.84l6.43-3.63 2 3.36-6.44 3.63 5.17 2.91-2 3.36-5.25-2.92a7.6 7.6 0 0 1-2.81-2.82A7.1 7.1 0 0 1 1 32.92V27h3.99z"}),(0,jsx_runtime.jsx)("path",{fill:"#9e2569",d:"M4.08 16.64l6.43 3.62 2-3.36-6.44-3.62 5.17-2.92-2-3.36-5.25 2.92a8.72 8.72 0 0 0-2.9 2.83A7.16 7.16 0 0 0 0 16.64v5.92h3.99z"}),(0,jsx_runtime.jsx)("path",{fill:"#f79836",d:"M40.34 36.2L34 32.57l1.99-3.36 6.44 3.63V27h3.99v5.92c0 1.33-.37 2.57-1.09 3.81a8.69 8.69 0 0 1-2.9 2.82l-5.26 2.92-1.99-3.36z"}),(0,jsx_runtime.jsx)("path",{fill:"#007664",d:"M24 15v8.22l7.34-4.06z"}),(0,jsx_runtime.jsx)("path",{fill:"#9e2569",d:"M23.25 15L16 19.16l7.25 4.06z"}),(0,jsx_runtime.jsx)("path",{fill:"#d71d4f",d:"M22.25 25.07L15 21v8.13z"}),(0,jsx_runtime.jsx)("path",{fill:"#2aad8e",d:"M24 24.98l7.25 4.07V21z"}),(0,jsx_runtime.jsx)("path",{fill:"#ee4642",d:"M23.16 26L16 30.07l7.16 4.15z"}),(0,jsx_runtime.jsx)("path",{fill:"#f79836",d:"M24 26v8.22l7.25-4.15z"})]});var spacing=__webpack_require__("./src/lib/spacing.tsx"),theme=__webpack_require__("./src/lib/style/theme.ts"),utils=__webpack_require__("./src/lib/utils.ts"),Dropdown_component=__webpack_require__("./src/lib/components/dropdown/Dropdown.component.tsx"),Icon_component=__webpack_require__("./src/lib/components/icon/Icon.component.tsx"),Buttonv2_component=__webpack_require__("./src/lib/components/buttonv2/Buttonv2.component.tsx");const NavbarContainer=styled_components_browser_esm.Ay.div`
  height: ${theme.Ce};
  display: flex;
  justify-content: space-between;
  ${styled_components_browser_esm.AH`
    background-color: ${(0,utils.sP)("backgroundLevel1")};
    color: ${(0,utils.sP)("textPrimary")};
    .fas,
    .sc-trigger-text {
      color: ${(0,utils.sP)("textPrimary")};
    }
    box-sizing: border-box;
    border-bottom: 0.5px solid ${props=>props.theme.backgroundLevel2};
  `};
`,NavbarMenu=styled_components_browser_esm.Ay.div`
  display: flex;
  justify-content: center;
  align-items: center;
`,NavbarTabs=styled_components_browser_esm.Ay.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  a {
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    height: 100%;
    padding: 0 ${spacing.YK.r16};
    border-bottom: ${spacing.YK.r2} solid transparent;
    border-top: ${spacing.YK.r2} solid transparent;
    ${props=>{const{selectedActive}=props.theme;return styled_components_browser_esm.AH`
        color: ${(0,utils.sP)("textPrimary")};
        &:hover {
          background-color: ${(0,utils.sP)("highlight")};
        }
        &.selected {
          color: ${(0,utils.sP)("textPrimary")};
          font-weight: bold;
          border-bottom-color: ${selectedActive};
        }
        // :focus-visible is the keyboard-only version of :focus
        &:focus-visible {
          ${Buttonv2_component.kD}
          color: ${props.theme.textPrimary};
        }
      `}};
  }
`,TabItem=styled_components_browser_esm.Ay.div`
  box-sizing: border-box;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 ${spacing.YK.r16};
  ${props=>{const{textPrimary}=props.theme;return styled_components_browser_esm.AH`
      color: ${textPrimary};
      &:hover {
        border-bottom: ${spacing.YK.r2} solid;
        border-top: ${spacing.YK.r2} solid;
        cursor: pointer;
      }
      // :focus-visible is the keyboard-only version of :focus
      &:focus-visible {
        ${Buttonv2_component.kD}
        color: ${props.theme.textPrimary};
      }
    `}};
  ${props=>props.selected&&styled_components_browser_esm.AH`
      border-top: ${spacing.YK.r2} solid;
      border-bottom: ${spacing.YK.r2} solid;
    `};
`,NavbarMenuItem=styled_components_browser_esm.Ay.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .sc-dropdown {
    .trigger {
      background-color: ${(0,utils.sP)("backgroundLevel1")};
      &:hover {
        background-color: ${(0,utils.sP)("highlight")};
      }
      height: auto;
      font-size: ${theme.J.base};
    }
    .menu-item {
      max-height: unset;
    }
  }

  .sc-button {
    margin: 0;
    border-radius: 0;
    height: ${theme.Ce};
    font-size: ${theme.J.base};
    background-color: ${(0,utils.sP)("backgroundLevel1")};
    &:hover {
      background-color: ${(0,utils.sP)("highlight")};
    }
    // :focus-visible is the keyboard-only version of :focus
    &:focus-visible {
      ${Buttonv2_component.kD}
      color: ${props=>props.theme.textPrimary};
    }
    width: ${theme.yu};
  }
`,LogoContainer=styled_components_browser_esm.Ay.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 ${spacing.YK.r16};
  svg {
    width: 7.143rem;
    height: 2.143rem;
  }
`;const Navbar=function NavBar({onToggleClick,logo,tabs=[],rightActions=[],...rest}){return(0,jsx_runtime.jsxs)(NavbarContainer,{className:"sc-navbar",...rest,children:[(0,jsx_runtime.jsxs)(NavbarMenu,{children:[onToggleClick&&(0,jsx_runtime.jsx)(NavbarMenuItem,{onClick:onToggleClick,children:(0,jsx_runtime.jsx)(Buttonv2_component.$n,{icon:(0,jsx_runtime.jsx)(Icon_component.In,{name:"Lat-menu"}),title:"Main Menu"})}),(0,jsx_runtime.jsx)(NavbarMenuItem,{children:(0,jsx_runtime.jsx)(LogoContainer,{className:"sc-logo",children:logo||(0,jsx_runtime.jsx)(Logo,{})})})]}),tabs.length?(0,jsx_runtime.jsx)(NavbarTabs,{children:tabs.map((({link,title,selected,onClick,render},index)=>render?(0,jsx_runtime.jsx)(react.Fragment,{children:render},`navbar_tab_item_${index}`):link?(0,react.cloneElement)(link,{className:selected?"selected":"","aria-selected":selected,role:"tab",key:`navbar_tab_item_${index}`}):(0,jsx_runtime.jsx)(TabItem,{onClick,role:"tab",selected:!!selected,"aria-selected":selected,children:(0,jsx_runtime.jsx)("span",{children:title})},`navbar_tab_item_${index}`)))}):null,rightActions.length?(0,jsx_runtime.jsx)(NavbarMenu,{children:(0,jsx_runtime.jsx)(NavbarMenuItem,{children:rightActions.map(((action,index)=>(({type,items=null,...rest},index)=>"dropdown"===type?items?(0,jsx_runtime.jsx)(Dropdown_component.m,{size:"larger",variant:"backgroundLevel1",items,caret:!1,...rest},`navbar_right_action_${index}`):null:"button"===type?(0,jsx_runtime.jsx)(Buttonv2_component.$n,{...rest},`navbar_right_action_${index}`):"custom"===type?(0,jsx_runtime.jsx)(rest.render,{},`navbar_right_action_${index}`):null)(action,index)))})}):null]})};try{Navbar.displayName="Navbar",Navbar.__docgenInfo={description:"",displayName:"Navbar",props:{onToggleClick:{defaultValue:null,description:"",name:"onToggleClick",required:!1,type:{name:"(() => void)"}},rightActions:{defaultValue:null,description:"",name:"rightActions",required:!0,type:{name:"Actions"}},logo:{defaultValue:null,description:"",name:"logo",required:!1,type:{name:"Element"}},tabs:{defaultValue:null,description:"",name:"tabs",required:!1,type:{name:"Tab[]"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/lib/components/navbar/Navbar.component.tsx#Navbar"]={docgenInfo:Navbar.__docgenInfo,name:"Navbar",path:"src/lib/components/navbar/Navbar.component.tsx#Navbar"})}catch(__react_docgen_typescript_loader_error){}var dist=__webpack_require__("./node_modules/@storybook/addon-actions/dist/index.mjs"),Text_component=__webpack_require__("./src/lib/components/text/Text.component.tsx"),InlineInput=__webpack_require__("./src/lib/components/inlineinput/InlineInput.tsx");const branding_logo_Logo=()=>(0,jsx_runtime.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"49",height:"49",viewBox:"0 0 49 49",children:[(0,jsx_runtime.jsx)("path",{fill:"#3d9bd6",d:"M21.25 4.42v7.25h3.99V4.33l5.16 2.92 2-3.36L27.14.97A7.7 7.7 0 0 0 23.15 0c-1.36 0-2.72.35-3.89 1.06L14 3.98l1.99 3.36z"}),(0,jsx_runtime.jsx)("path",{fill:"#007664",d:"M21.25 4.42v7.25h3.99V4.33l5.16 2.92 2-3.36L27.14.97A7.7 7.7 0 0 0 23.15 0c-1.36 0-2.72.35-3.89 1.06L14 3.98l1.99 3.36z"}),(0,jsx_runtime.jsx)("path",{fill:"#ee4642",d:"M21.16 44.25V37h3.99v7.25l5.16-2.92 2 3.36-5.17 2.92a7.9 7.9 0 0 1-7.88 0L14 44.69l1.99-3.36z"}),(0,jsx_runtime.jsx)("path",{fill:"#2aad8e",d:"M40.43 13.28L34 16.9l1.99 3.36 6.44-3.62v5.83h3.99v-5.92c0-1.33-.37-2.65-1.09-3.8a8.82 8.82 0 0 0-2.9-2.83L37.17 7l-1.99 3.36z"}),(0,jsx_runtime.jsx)("path",{fill:"#d71d4f",d:"M4.99 32.84l6.43-3.63 2 3.36-6.44 3.63 5.17 2.91-2 3.36-5.25-2.92a7.6 7.6 0 0 1-2.81-2.82A7.1 7.1 0 0 1 1 32.92V27h3.99z"}),(0,jsx_runtime.jsx)("path",{fill:"#9e2569",d:"M4.08 16.64l6.43 3.62 2-3.36-6.44-3.62 5.17-2.92-2-3.36-5.25 2.92a8.72 8.72 0 0 0-2.9 2.83A7.16 7.16 0 0 0 0 16.64v5.92h3.99z"}),(0,jsx_runtime.jsx)("path",{fill:"#f79836",d:"M40.34 36.2L34 32.57l1.99-3.36 6.44 3.63V27h3.99v5.92c0 1.33-.37 2.57-1.09 3.81a8.69 8.69 0 0 1-2.9 2.82l-5.26 2.92-1.99-3.36z"}),(0,jsx_runtime.jsx)("path",{fill:"#007664",d:"M24 15v8.22l7.34-4.06z"}),(0,jsx_runtime.jsx)("path",{fill:"#9e2569",d:"M23.25 15L16 19.16l7.25 4.06z"}),(0,jsx_runtime.jsx)("path",{fill:"#d71d4f",d:"M22.25 25.07L15 21v8.13z"}),(0,jsx_runtime.jsx)("path",{fill:"#2aad8e",d:"M24 24.98l7.25 4.07V21z"}),(0,jsx_runtime.jsx)("path",{fill:"#ee4642",d:"M23.16 26L16 30.07l7.16 4.15z"}),(0,jsx_runtime.jsx)("path",{fill:"#f79836",d:"M24 26v8.22l7.25-4.15z"})]}),tabs=[{render:(0,jsx_runtime.jsx)(InlineInput.I,{id:"instanceName",changeMutation:{isLoading:!1,mutate:()=>{}},defaultValue:"My instance",maxLength:14})},{selected:!0,title:"Groups",link:(0,jsx_runtime.jsx)("a",{href:"/groups",children:"Groups"}),onClick:(0,dist.XI)("Groups clicked")},{selected:!1,title:"Users",link:(0,jsx_runtime.jsx)("a",{href:"/users",children:"Users"}),onClick:(0,dist.XI)("Users clicked")},{selected:!1,title:"Policies",link:(0,jsx_runtime.jsx)("a",{href:"/policies",children:"Policies"}),onClick:(0,dist.XI)("Policies clicked")},{selected:!1,title:"Buckets",link:(0,jsx_runtime.jsx)("a",{href:"/buckets",children:"Buckets"}),onClick:(0,dist.XI)("Buckets clicked")},{selected:!1,title:"Workflows",link:(0,jsx_runtime.jsx)("a",{href:"/workflows",children:"Workflows"}),onClick:(0,dist.XI)("Workflows clicked")}],linkTabs=[{link:(0,jsx_runtime.jsx)("a",{href:"/groups",children:"Groups"}),selected:!0},{link:(0,jsx_runtime.jsx)("a",{href:"/users",children:"Users"})},{link:(0,jsx_runtime.jsx)("a",{href:"/policies",children:"Policies"})},{link:(0,jsx_runtime.jsx)("a",{href:"/buckets",children:"Buckets"})},{link:(0,jsx_runtime.jsx)("a",{href:"/workflows",children:"Workflows"})}],rightActions=[{type:"dropdown",text:"FR",icon:(0,jsx_runtime.jsx)("i",{className:"fas fa-globe"}),items:[{label:"English",name:"EN",onClick:(0,dist.XI)("English selected")}]},{type:"dropdown",icon:(0,jsx_runtime.jsx)("i",{className:"fas fa-th"}),items:[{label:"App 1",onClick:(0,dist.XI)("App 1 clicked")}]},{type:"dropdown",icon:(0,jsx_runtime.jsx)("i",{className:"fas fa-question-circle"}),items:[{label:"About",onClick:(0,dist.XI)("About clicked")},{label:"Documentation",onClick:(0,dist.XI)("Documentation clicked")},{label:"Onboarding",onClick:(0,dist.XI)("Onboarding clicked")}]},{type:"custom",render:()=>(0,jsx_runtime.jsxs)(spacing.BJ,{children:[(0,jsx_runtime.jsx)("i",{className:"fas fa-exclamation-circle"})," ",(0,jsx_runtime.jsx)(Text_component.N_,{children:"New version available"})]})},{type:"button",icon:(0,jsx_runtime.jsx)("i",{className:"fas fa-sun"}),onClick:(0,dist.XI)("Theme toggle clicked")},{type:"dropdown",text:"Carlito",icon:(0,jsx_runtime.jsx)("i",{className:"fas fa-user"}),items:[{label:"Log out",onClick:(0,dist.XI)("Logout clicked")}]}],navbar_stories={title:"Components/Navigation/Navbar",component:Navbar,args:{productName:"Hardware UI",rightActions,tabs,logo:(0,jsx_runtime.jsx)(branding_logo_Logo,{})}},BasicNavbar={},NavbarWithToggle={args:{onToggleClick:(0,dist.XI)("toggle clicked")}},NavbarWithCustomizedLogo={args:{logo:(0,jsx_runtime.jsx)("i",{className:"fas fa-ring"})}},NavbarWithOnlyTabs={args:{rightActions:[rightActions[4]]}},NavbarWithOnlyLinkTabs={args:{rightActions:[rightActions[4]],tabs:linkTabs}},__namedExportsOrder=["BasicNavbar","NavbarWithToggle","NavbarWithCustomizedLogo","NavbarWithOnlyTabs","NavbarWithOnlyLinkTabs"];BasicNavbar.parameters={...BasicNavbar.parameters,docs:{...BasicNavbar.parameters?.docs,source:{originalSource:"{}",...BasicNavbar.parameters?.docs?.source}}},NavbarWithToggle.parameters={...NavbarWithToggle.parameters,docs:{...NavbarWithToggle.parameters?.docs,source:{originalSource:"{\n  args: {\n    onToggleClick: action('toggle clicked')\n  }\n}",...NavbarWithToggle.parameters?.docs?.source}}},NavbarWithCustomizedLogo.parameters={...NavbarWithCustomizedLogo.parameters,docs:{...NavbarWithCustomizedLogo.parameters?.docs,source:{originalSource:'{\n  args: {\n    logo: <i className="fas fa-ring" />\n  }\n}',...NavbarWithCustomizedLogo.parameters?.docs?.source}}},NavbarWithOnlyTabs.parameters={...NavbarWithOnlyTabs.parameters,docs:{...NavbarWithOnlyTabs.parameters?.docs,source:{originalSource:"{\n  args: {\n    rightActions: [rightActions[4]]\n  }\n}",...NavbarWithOnlyTabs.parameters?.docs?.source}}},NavbarWithOnlyLinkTabs.parameters={...NavbarWithOnlyLinkTabs.parameters,docs:{...NavbarWithOnlyLinkTabs.parameters?.docs,source:{originalSource:"{\n  args: {\n    rightActions: [rightActions[4]],\n    tabs: linkTabs\n  }\n}",...NavbarWithOnlyLinkTabs.parameters?.docs?.source}}}},"./src/lib/components/button/Button.component.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{$n:()=>Button,Ak:()=>ButtonStyled,C3:()=>ButtonText,a2:()=>ButtonIcon});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/jsx-runtime.js"),polished__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/polished/dist/polished.es.js"),styled_components__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),_spacing__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/lib/spacing.tsx"),_style_theme__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/lib/style/theme.ts"),_loader_Loader_component__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/lib/components/loader/Loader.component.tsx");const ButtonStyled=styled_components__WEBPACK_IMPORTED_MODULE_1__.Ay.button`
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
  text-decoration: none;
  font-weight: ${_style_theme__WEBPACK_IMPORTED_MODULE_2__.Wy.base};

  &:hover,
  &:focus,
  &:active {
    outline: none;
    cursor: pointer;
  }

  ${props=>{switch(props.size){case"smaller":return styled_components__WEBPACK_IMPORTED_MODULE_1__.AH`
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

  ${props=>props.isLoading?styled_components__WEBPACK_IMPORTED_MODULE_1__.AH`
        > span {
          display: flex;
          .sc-loader {
            margin: 0px ${_spacing__WEBPACK_IMPORTED_MODULE_3__.YK.r4};
            svg {
              fill: ${props.theme.textPrimary} !important;
            }
          }
        }
      `:props.outlined?styled_components__WEBPACK_IMPORTED_MODULE_1__.AH`
        border-width: 1px;
        border-style: solid;
        border-color: ${props.theme.buttonSecondary};
        // to be checked
        background-color: ${props.theme.backgroundLevel1};
        color: ${props.theme.textPrimary};

        &:hover {
          border-color: ${props.theme.infoPrimary};
          color: ${props.theme.textPrimary};
        }
      `:"buttonPrimary"===props.variant?styled_components__WEBPACK_IMPORTED_MODULE_1__.AH`
        background-color: ${props.theme.buttonPrimary};
        border: 1px solid ${props.theme.buttonPrimary};
        color: ${props.theme.textPrimary};
        &:hover {
          background-color: ${props.theme.highlight};
          outline: none;
          border: 1px solid ${props.theme.infoPrimary};
        }
      `:"buttonSecondary"===props.variant?styled_components__WEBPACK_IMPORTED_MODULE_1__.AH`
        background-color: ${props.theme.buttonSecondary};
        border: 1px solid ${props.theme.buttonSecondary};
        color: ${props.theme.textPrimary};
        &:hover {
          background-color: ${props.theme.infoPrimary};
          border: 1px solid ${props.theme.infoPrimary};
        }
      `:"buttonDelete"===props.variant?styled_components__WEBPACK_IMPORTED_MODULE_1__.AH`
        background-color: ${props.theme.buttonDelete};
        border: 1px solid ${props.theme.buttonDelete};
        color: ${props.theme.statusCritical};
        &:hover {
          background-color: ${props.theme.statusCritical};
          border: 1px solid ${props.theme.infoPrimary};
          color: ${props.theme.textPrimary};
        }
      `:"backgroundLevel1"===props.variant?styled_components__WEBPACK_IMPORTED_MODULE_1__.AH`
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

${props=>{const brandLighter=(0,polished__WEBPACK_IMPORTED_MODULE_4__.a)(.2,props.theme[props.variant]).toString();return styled_components__WEBPACK_IMPORTED_MODULE_1__.AH`
      ${props.disabled?`\n          box-shadow: none;\n          pointer-events: none;\n          opacity: 0.3;\n          border-color: ${brandLighter};\n          color: ${_style_theme__WEBPACK_IMPORTED_MODULE_2__.ON};\n        `:null}
    `}}

${props=>{const brandLighter=(0,polished__WEBPACK_IMPORTED_MODULE_4__.a)(.2,props.theme[props.variant]).toString(),brandLight=(0,polished__WEBPACK_IMPORTED_MODULE_4__.a)(.1,props.theme[props.variant]).toString();return styled_components__WEBPACK_IMPORTED_MODULE_1__.AH`
      ${!props.text&&props.icon&&props.inverted?`\n        padding: 0;\n        height: auto;\n        border: none;\n        background-color: transparent;\n        color: ${props.disabled?brandLight:props.theme[props.variant]};\n\n        &:hover{\n          background-color: transparent;\n          color: ${brandLight};\n          border: none;\n        }\n\n        &:active {\n          background-color: transparent;\n          color: ${brandLighter};\n        }\n        `:null}
    `}}
`,ButtonIcon=styled_components__WEBPACK_IMPORTED_MODULE_1__.Ay.span`
  ${props=>props.text&&styled_components__WEBPACK_IMPORTED_MODULE_1__.AH`
      padding-right: 8px;
      display: inline-flex;
      justify-content: center;
      align-items: center;
    `}
`,ButtonText=styled_components__WEBPACK_IMPORTED_MODULE_1__.Ay.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
`,ButtonContent=styled_components__WEBPACK_IMPORTED_MODULE_1__.Ay.span`
  position: relative;
`,Anchor=ButtonStyled.withComponent("a");function Button({text="",href="",icon=null,size="base",variant="buttonPrimary",outlined=!1,disabled=!1,onClick,title="",isLoading=!1,type="button",inverted=!1,...rest}){return href&&href.length?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(Anchor,{className:"sc-button",href,variant,outlined,disabled,size,title,...rest,children:[icon&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ButtonIcon,{text,size,children:icon}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ButtonText,{children:text})]}):(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ButtonStyled,{className:"sc-button",variant,outlined,disabled:disabled||isLoading,size,onClick,title,isLoading,type,inverted,icon,text,...rest,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(ButtonContent,{children:[isLoading&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_loader_Loader_component__WEBPACK_IMPORTED_MODULE_5__.a,{size}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span",{className:"sc-button-text",children:[icon&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ButtonIcon,{text,size,children:icon}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ButtonText,{children:text})]})]})})}try{ButtonStyled.displayName="ButtonStyled",ButtonStyled.__docgenInfo={description:"",displayName:"ButtonStyled",props:{ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"((instance: HTMLButtonElement | null) => void) | RefObject<HTMLButtonElement> | null"}},theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"any"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"undefined"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/lib/components/button/Button.component.tsx#ButtonStyled"]={docgenInfo:ButtonStyled.__docgenInfo,name:"ButtonStyled",path:"src/lib/components/button/Button.component.tsx#ButtonStyled"})}catch(__react_docgen_typescript_loader_error){}try{ButtonIcon.displayName="ButtonIcon",ButtonIcon.__docgenInfo={description:"",displayName:"ButtonIcon",props:{ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"((instance: HTMLSpanElement | null) => void) | RefObject<HTMLSpanElement> | null"}},theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"any"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"undefined"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/lib/components/button/Button.component.tsx#ButtonIcon"]={docgenInfo:ButtonIcon.__docgenInfo,name:"ButtonIcon",path:"src/lib/components/button/Button.component.tsx#ButtonIcon"})}catch(__react_docgen_typescript_loader_error){}try{ButtonText.displayName="ButtonText",ButtonText.__docgenInfo={description:"",displayName:"ButtonText",props:{ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"((instance: HTMLSpanElement | null) => void) | RefObject<HTMLSpanElement> | null"}},theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"any"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"undefined"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/lib/components/button/Button.component.tsx#ButtonText"]={docgenInfo:ButtonText.__docgenInfo,name:"ButtonText",path:"src/lib/components/button/Button.component.tsx#ButtonText"})}catch(__react_docgen_typescript_loader_error){}try{ButtonContent.displayName="ButtonContent",ButtonContent.__docgenInfo={description:"",displayName:"ButtonContent",props:{ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"((instance: HTMLSpanElement | null) => void) | RefObject<HTMLSpanElement> | null"}},theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"any"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"undefined"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/lib/components/button/Button.component.tsx#ButtonContent"]={docgenInfo:ButtonContent.__docgenInfo,name:"ButtonContent",path:"src/lib/components/button/Button.component.tsx#ButtonContent"})}catch(__react_docgen_typescript_loader_error){}try{Button.displayName="Button",Button.__docgenInfo={description:"",displayName:"Button",props:{text:{defaultValue:{value:""},description:"",name:"text",required:!1,type:{name:"string"}},size:{defaultValue:{value:"base"},description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"base"'},{value:'"small"'},{value:'"large"'},{value:'"smaller"'},{value:'"larger"'},{value:'"huge"'},{value:'"massive"'}]}},variant:{defaultValue:{value:"buttonPrimary"},description:"",name:"variant",required:!1,type:{name:"enum",value:[{value:'"backgroundLevel1"'},{value:'"buttonPrimary"'},{value:'"buttonSecondary"'},{value:'"buttonDelete"'}]}},outlined:{defaultValue:{value:"false"},description:"",name:"outlined",required:!1,type:{name:"boolean"}},inverted:{defaultValue:{value:"false"},description:"",name:"inverted",required:!1,type:{name:"boolean"}},disabled:{defaultValue:{value:"false"},description:"",name:"disabled",required:!1,type:{name:"boolean"}},icon:{defaultValue:{value:"null"},description:"",name:"icon",required:!1,type:{name:"Element"}},href:{defaultValue:{value:""},description:"",name:"href",required:!1,type:{name:"string"}},title:{defaultValue:{value:""},description:"",name:"title",required:!1,type:{name:"string"}},type:{defaultValue:{value:"button"},description:"",name:"type",required:!1,type:{name:"string"}},isLoading:{defaultValue:{value:"false"},description:"",name:"isLoading",required:!1,type:{name:"boolean"}},onClick:{defaultValue:null,description:"",name:"onClick",required:!1,type:{name:"((arg0: any) => void)"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/lib/components/button/Button.component.tsx#Button"]={docgenInfo:Button.__docgenInfo,name:"Button",path:"src/lib/components/button/Button.component.tsx#Button"})}catch(__react_docgen_typescript_loader_error){}},"./src/lib/components/dropdown/Dropdown.component.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{m:()=>Dropdown});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/jsx-runtime.js"),styled_components__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),_button_Button_component__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/lib/components/button/Button.component.tsx"),_style_theme__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/lib/style/theme.ts"),_spacing__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/lib/spacing.tsx"),_utils__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/lib/utils.ts"),_icon_Icon_component__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__("./src/lib/components/icon/Icon.component.tsx"),downshift__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./node_modules/downshift/dist/downshift.esm.js"),_buttonv2_Buttonv2_component__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./src/lib/components/buttonv2/Buttonv2.component.tsx"),_floating_ui_dom__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("./node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs"),_floating_ui_react__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("./node_modules/@floating-ui/react/dist/floating-ui.react.mjs");const DropdownStyled=styled_components__WEBPACK_IMPORTED_MODULE_1__.Ay.div`
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
  border: 1px solid ${(0,_utils__WEBPACK_IMPORTED_MODULE_2__.sP)("backgroundLevel1")};
  z-index: ${_style_theme__WEBPACK_IMPORTED_MODULE_3__.fE.dropdown};
  max-height: 200px;
  min-width: 100%;
  overflow: auto;
  display: ${props=>props.isOpen?"auto":"none"};
`,DropdownMenuItemStyled=styled_components__WEBPACK_IMPORTED_MODULE_1__.Ay.li`
  display: flex;
  align-items: center;
  padding: ${_spacing__WEBPACK_IMPORTED_MODULE_4__.YK.r16};
  white-space: nowrap;
  cursor: pointer;
  font-size: ${_style_theme__WEBPACK_IMPORTED_MODULE_3__.J.base};
  ${props=>props.isSelected?`background-color: ${props.theme.highlight};`:`background-color: ${props.theme.backgroundLevel1};`}

  color: ${(0,_utils__WEBPACK_IMPORTED_MODULE_2__.sP)("textPrimary")};
  border-top: 0.3px solid ${(0,_utils__WEBPACK_IMPORTED_MODULE_2__.sP)("border")};
  border-left: 0.3px solid ${(0,_utils__WEBPACK_IMPORTED_MODULE_2__.sP)("border")};
  border-right: 0.3px solid ${(0,_utils__WEBPACK_IMPORTED_MODULE_2__.sP)("border")};

  &:hover {
    background-color: ${(0,_utils__WEBPACK_IMPORTED_MODULE_2__.sP)("highlight")};
  }
  &:active {
    background-color: ${(0,_utils__WEBPACK_IMPORTED_MODULE_2__.sP)("highlight")};
  }
`,Caret=styled_components__WEBPACK_IMPORTED_MODULE_1__.Ay.span`
  margin-left: ${_spacing__WEBPACK_IMPORTED_MODULE_4__.YK.r16};
`,Trigger=_button_Button_component__WEBPACK_IMPORTED_MODULE_5__.Ak.withComponent("div"),TriggerStyled=(0,styled_components__WEBPACK_IMPORTED_MODULE_1__.Ay)(Trigger)`
  // :focus-visible is the keyboard-only version of :focus
  &:focus-visible {
    ${_buttonv2_Buttonv2_component__WEBPACK_IMPORTED_MODULE_6__.kD}
    color: ${props=>props.theme.textPrimary};
  }
`;function Dropdown({items,text,icon,size="base",variant="buttonSecondary",title,caret=!0,placement="bottom",...rest}){const{isOpen,getToggleButtonProps,getMenuProps,getItemProps,highlightedIndex}=(0,downshift__WEBPACK_IMPORTED_MODULE_7__.WM)({items,itemToString:item=>item?.label||""}),{refs,floatingStyles}=(0,_floating_ui_react__WEBPACK_IMPORTED_MODULE_8__.we)({middleware:[(0,_floating_ui_dom__WEBPACK_IMPORTED_MODULE_9__.cY)(10),(0,_floating_ui_dom__WEBPACK_IMPORTED_MODULE_9__.UU)(),(0,_floating_ui_dom__WEBPACK_IMPORTED_MODULE_9__.BN)()],placement,whileElementsMounted:_floating_ui_dom__WEBPACK_IMPORTED_MODULE_9__.ll}),{getReferenceProps,getFloatingProps}=(0,_floating_ui_react__WEBPACK_IMPORTED_MODULE_8__.bv)();return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(DropdownStyled,{variant,className:"sc-dropdown",...rest,ref:refs.setReference,children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(TriggerStyled,{variant,size,className:"trigger",title,...getToggleButtonProps(),...getReferenceProps(),children:[icon&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_button_Button_component__WEBPACK_IMPORTED_MODULE_5__.a2,{text,size,children:icon}),text&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_button_Button_component__WEBPACK_IMPORTED_MODULE_5__.C3,{className:"sc-trigger-text",children:text}),caret&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Caret,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_icon_Icon_component__WEBPACK_IMPORTED_MODULE_10__.In,{name:"Dropdown-down"})})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(DropdownMenuStyled,{className:"menu-item",isOpen,style:floatingStyles,...getFloatingProps(),...getMenuProps({ref:refs.setFloating}),children:items.map(((item,index)=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(DropdownMenuItemStyled,{className:"menu-item-label",variant:item.variant,...item,...getItemProps({item,index,onClick:item.onClick}),isSelected:index===highlightedIndex,children:item.label},item.label)))})]})}try{Dropdown.displayName="Dropdown",Dropdown.__docgenInfo={description:"",displayName:"Dropdown",props:{text:{defaultValue:null,description:"",name:"text",required:!1,type:{name:"string"}},size:{defaultValue:{value:"base"},description:"",name:"size",required:!1,type:{name:"string"}},variant:{defaultValue:{value:"buttonSecondary"},description:"",name:"variant",required:!1,type:{name:"string"}},title:{defaultValue:null,description:"",name:"title",required:!1,type:{name:"string"}},items:{defaultValue:null,description:"",name:"items",required:!0,type:{name:"Items"}},icon:{defaultValue:null,description:"",name:"icon",required:!1,type:{name:"Element"}},caret:{defaultValue:{value:"true"},description:"",name:"caret",required:!1,type:{name:"boolean"}},placement:{defaultValue:{value:"bottom"},description:"",name:"placement",required:!1,type:{name:"enum",value:[{value:'"top"'},{value:'"bottom"'},{value:'"left"'},{value:'"top-start"'},{value:'"top-end"'},{value:'"right"'},{value:'"right-start"'},{value:'"right-end"'},{value:'"bottom-end"'},{value:'"bottom-start"'},{value:'"left-start"'},{value:'"left-end"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/lib/components/dropdown/Dropdown.component.tsx#Dropdown"]={docgenInfo:Dropdown.__docgenInfo,name:"Dropdown",path:"src/lib/components/dropdown/Dropdown.component.tsx#Dropdown"})}catch(__react_docgen_typescript_loader_error){}},"./src/lib/components/inlineinput/InlineInput.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{I:()=>InlineInput});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/jsx-runtime.js"),styled_components__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),_buttonv2_Buttonv2_component__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("./src/lib/components/buttonv2/Buttonv2.component.tsx"),_icon_Icon_component__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("./src/lib/components/icon/Icon.component.tsx"),_inputv2_inputv2__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./src/lib/components/inputv2/inputv2.tsx"),_modal_Modal_component__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__("./src/lib/components/modal/Modal.component.tsx"),_toast_ToastProvider__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/lib/components/toast/ToastProvider.tsx"),react_hook_form__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/react-hook-form/dist/index.esm.mjs"),_text_Text_component__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/lib/components/text/Text.component.tsx"),react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/index.js"),_spacing__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./src/lib/spacing.tsx");const UnderlinedText=(0,styled_components__WEBPACK_IMPORTED_MODULE_2__.Ay)(_text_Text_component__WEBPACK_IMPORTED_MODULE_3__.EY)`
  text-decoration-line: underline;
  text-decoration-style: dashed;
  cursor: text;
`,InlineInput=({defaultValue,confirmationModal,changeMutation,...props})=>{const{register,handleSubmit,watch,reset}=(0,react_hook_form__WEBPACK_IMPORTED_MODULE_4__.mN)({defaultValues:{value:defaultValue}}),[isConfirmationModalOpened,setIsConfirmationModalOpened]=(0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(!1),handleSuccess=()=>{setIsConfirmationModalOpened(!1),setIsEditing(!1),setIsHover(!1)},onSubmit=data=>{confirmationModal?setIsConfirmationModalOpened(!0):changeMutation.mutate(data,{onSuccess:()=>{handleSuccess()},onError:()=>{showToast({open:!0,status:"error",message:"An error occurred while updating the value"})}})},{showToast}=(0,_toast_ToastProvider__WEBPACK_IMPORTED_MODULE_5__.dj)(),[isHover,setIsHover]=(0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(!1),[isEditing,setIsEditing]=(0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(!1),handleReset=()=>{reset(),setIsEditing(!1),setIsHover(!1)},handleKeyDown=event=>{"Escape"===event.key&&handleReset()};return isEditing?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("form",{onSubmit:handleSubmit(onSubmit),children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_spacing__WEBPACK_IMPORTED_MODULE_6__.BJ,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_inputv2_inputv2__WEBPACK_IMPORTED_MODULE_7__.p,{...register("value"),size:"1/3",autoFocus:!0,onKeyDown:handleKeyDown,...props}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_buttonv2_Buttonv2_component__WEBPACK_IMPORTED_MODULE_8__.$n,{icon:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_icon_Icon_component__WEBPACK_IMPORTED_MODULE_9__.In,{name:"Close"}),tooltip:{overlay:"Cancel"},type:"reset",variant:"outline",onClick:handleReset}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_buttonv2_Buttonv2_component__WEBPACK_IMPORTED_MODULE_8__.$n,{icon:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_icon_Icon_component__WEBPACK_IMPORTED_MODULE_9__.In,{name:"Check"}),tooltip:{overlay:"Save"},variant:"primary",type:"submit",isLoading:changeMutation.isLoading})]})}),confirmationModal&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_modal_Modal_component__WEBPACK_IMPORTED_MODULE_10__.a,{isOpen:isConfirmationModalOpened,title:confirmationModal.title,footer:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_spacing__WEBPACK_IMPORTED_MODULE_6__.B_,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p",{}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_spacing__WEBPACK_IMPORTED_MODULE_6__.BJ,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_buttonv2_Buttonv2_component__WEBPACK_IMPORTED_MODULE_8__.$n,{label:"Cancel",variant:"outline",onClick:()=>setIsConfirmationModalOpened(!1)}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_buttonv2_Buttonv2_component__WEBPACK_IMPORTED_MODULE_8__.$n,{label:"Confirm",variant:"primary",isLoading:changeMutation.isLoading,onClick:()=>{changeMutation.mutate(watch(),{onSuccess:()=>{handleSuccess()},onError:()=>{showToast({open:!0,status:"error",message:"An error occurred while updating the value"})}})}})]})]}),children:confirmationModal.body})]}):(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_spacing__WEBPACK_IMPORTED_MODULE_6__.BJ,{onMouseEnter:()=>setIsHover(!0),onMouseLeave:()=>setIsHover(!1),onFocus:()=>setIsHover(!0),onBlur:()=>setIsHover(!1),children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(UnderlinedText,{children:watch("value")}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_buttonv2_Buttonv2_component__WEBPACK_IMPORTED_MODULE_8__.$n,{icon:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_icon_Icon_component__WEBPACK_IMPORTED_MODULE_9__.In,{name:"Pencil"}),tooltip:{overlay:"Edit"},variant:"primary",onClick:()=>setIsEditing(!0),style:{opacity:isHover?"1":"0"}})]})};try{InlineInput.displayName="InlineInput",InlineInput.__docgenInfo={description:"",displayName:"InlineInput",props:{defaultValue:{defaultValue:null,description:"",name:"defaultValue",required:!1,type:{name:"string | (string & readonly string[])"}},confirmationModal:{defaultValue:null,description:"",name:"confirmationModal",required:!1,type:{name:"{ title: Element; body: Element; }"}},changeMutation:{defaultValue:null,description:"",name:"changeMutation",required:!0,type:{name:"UseMutationResult<unknown, unknown, InlineInputForm, unknown>"}},error:{defaultValue:null,description:"",name:"error",required:!1,type:{name:"string"}},id:{defaultValue:null,description:"",name:"id",required:!1,type:{name:"string"}},leftIcon:{defaultValue:null,description:"",name:"leftIcon",required:!1,type:{name:"enum",value:[{value:'"Documentation"'},{value:'"Delete"'},{value:'"Dashboard"'},{value:'"Account"'},{value:'"Backend"'},{value:'"Tape"'},{value:'"Node-backend"'},{value:'"Volume-backend"'},{value:'"Node-pdf"'},{value:'"Volume-pdf"'},{value:'"Network"'},{value:'"Bucket"'},{value:'"Cloud-backend"'},{value:'"Datacenter"'},{value:'"Simple-user"'},{value:'"User"'},{value:'"Group"'},{value:'"Alert"'},{value:'"Bell"'},{value:'"Lat-menu"'},{value:'"Workflow"'},{value:'"Expiration"'},{value:'"Replication"'},{value:'"Transition"'},{value:'"Discovery"'},{value:'"Metrics"'},{value:'"Edit"'},{value:'"Logs"'},{value:'"Lock"'},{value:'"Lock-open"'},{value:'"Create-add"'},{value:'"Save"'},{value:'"External-link"'},{value:'"Link"'},{value:'"Unlink"'},{value:'"Close"'},{value:'"Dropdown-down"'},{value:'"Dropdown-up"'},{value:'"Search"'},{value:'"More"'},{value:'"Info"'},{value:'"Sync"'},{value:'"Export"'},{value:'"Copy"'},{value:'"Simple-upload"'},{value:'"Upload"'},{value:'"Add-plus"'},{value:'"Minus"'},{value:'"Remove-minus"'},{value:'"Sort"'},{value:'"Sort-up"'},{value:'"Sort-down"'},{value:'"Calendar"'},{value:'"Calendar-minus"'},{value:'"Arrow-up"'},{value:'"Arrow-down"'},{value:'"Arrow-right"'},{value:'"Arrow-left"'},{value:'"Arrow-alt-circle-up"'},{value:'"Folder"'},{value:'"File"'},{value:'"File-invoice"'},{value:'"License"'},{value:'"Deletion-marker"'},{value:'"Map-marker"'},{value:'"Location"'},{value:'"Info-circle"'},{value:'"Exclamation-triangle"'},{value:'"Exclamation-circle"'},{value:'"Exclamation"'},{value:'"Check"'},{value:'"Protected"'},{value:'"Chevron-left"'},{value:'"Chevron-right"'},{value:'"Chevron-down"'},{value:'"Chevron-up"'},{value:'"Angle-right"'},{value:'"Angle-double-right"'},{value:'"Language"'},{value:'"Theme"'},{value:'"Support"'},{value:'"EULA"'},{value:'"Log-out"'},{value:'"Hourglass"'},{value:'"Pause"'},{value:'"Pause-circle"'},{value:'"Play-circle"'},{value:'"Upgrade"'},{value:'"Expansion"'},{value:'"Rebalance"'},{value:'"Maintenance"'},{value:'"Role"'},{value:'"Change-erasure"'},{value:'"Circle-health"'},{value:'"Circle-empty"'},{value:'"Dot-circle"'},{value:'"Check-circle"'},{value:'"Times-circle"'},{value:'"Toolbox"'},{value:'"Cubes"'},{value:'"Policy"'},{value:'"Pen"'},{value:'"Pencil"'},{value:'"Eye"'},{value:'"EyeSlash"'},{value:'"Snowflake"'},{value:'"Key"'},{value:'"Filter"'},{value:'"Download"'},{value:'"Certificate"'},{value:'"Redo"'},{value:'"Eraser"'},{value:'"ID-card"'},{value:'"Setting"'},{value:'"Desktop"'},{value:'"Globe"'},{value:'"Satellite"'},{value:'"LightMode"'},{value:'"DarkMode"'},{value:'"News"'},{value:'"Ring"'},{value:'"Stop"'},{value:'"Play"'},{value:'"Mail"'},{value:'"Remote-user"'},{value:'"Remote-group"'}]}},rightIcon:{defaultValue:null,description:"",name:"rightIcon",required:!1,type:{name:"enum",value:[{value:'"Documentation"'},{value:'"Delete"'},{value:'"Dashboard"'},{value:'"Account"'},{value:'"Backend"'},{value:'"Tape"'},{value:'"Node-backend"'},{value:'"Volume-backend"'},{value:'"Node-pdf"'},{value:'"Volume-pdf"'},{value:'"Network"'},{value:'"Bucket"'},{value:'"Cloud-backend"'},{value:'"Datacenter"'},{value:'"Simple-user"'},{value:'"User"'},{value:'"Group"'},{value:'"Alert"'},{value:'"Bell"'},{value:'"Lat-menu"'},{value:'"Workflow"'},{value:'"Expiration"'},{value:'"Replication"'},{value:'"Transition"'},{value:'"Discovery"'},{value:'"Metrics"'},{value:'"Edit"'},{value:'"Logs"'},{value:'"Lock"'},{value:'"Lock-open"'},{value:'"Create-add"'},{value:'"Save"'},{value:'"External-link"'},{value:'"Link"'},{value:'"Unlink"'},{value:'"Close"'},{value:'"Dropdown-down"'},{value:'"Dropdown-up"'},{value:'"Search"'},{value:'"More"'},{value:'"Info"'},{value:'"Sync"'},{value:'"Export"'},{value:'"Copy"'},{value:'"Simple-upload"'},{value:'"Upload"'},{value:'"Add-plus"'},{value:'"Minus"'},{value:'"Remove-minus"'},{value:'"Sort"'},{value:'"Sort-up"'},{value:'"Sort-down"'},{value:'"Calendar"'},{value:'"Calendar-minus"'},{value:'"Arrow-up"'},{value:'"Arrow-down"'},{value:'"Arrow-right"'},{value:'"Arrow-left"'},{value:'"Arrow-alt-circle-up"'},{value:'"Folder"'},{value:'"File"'},{value:'"File-invoice"'},{value:'"License"'},{value:'"Deletion-marker"'},{value:'"Map-marker"'},{value:'"Location"'},{value:'"Info-circle"'},{value:'"Exclamation-triangle"'},{value:'"Exclamation-circle"'},{value:'"Exclamation"'},{value:'"Check"'},{value:'"Protected"'},{value:'"Chevron-left"'},{value:'"Chevron-right"'},{value:'"Chevron-down"'},{value:'"Chevron-up"'},{value:'"Angle-right"'},{value:'"Angle-double-right"'},{value:'"Language"'},{value:'"Theme"'},{value:'"Support"'},{value:'"EULA"'},{value:'"Log-out"'},{value:'"Hourglass"'},{value:'"Pause"'},{value:'"Pause-circle"'},{value:'"Play-circle"'},{value:'"Upgrade"'},{value:'"Expansion"'},{value:'"Rebalance"'},{value:'"Maintenance"'},{value:'"Role"'},{value:'"Change-erasure"'},{value:'"Circle-health"'},{value:'"Circle-empty"'},{value:'"Dot-circle"'},{value:'"Check-circle"'},{value:'"Times-circle"'},{value:'"Toolbox"'},{value:'"Cubes"'},{value:'"Policy"'},{value:'"Pen"'},{value:'"Pencil"'},{value:'"Eye"'},{value:'"EyeSlash"'},{value:'"Snowflake"'},{value:'"Key"'},{value:'"Filter"'},{value:'"Download"'},{value:'"Certificate"'},{value:'"Redo"'},{value:'"Eraser"'},{value:'"ID-card"'},{value:'"Setting"'},{value:'"Desktop"'},{value:'"Globe"'},{value:'"Satellite"'},{value:'"LightMode"'},{value:'"DarkMode"'},{value:'"News"'},{value:'"Ring"'},{value:'"Stop"'},{value:'"Play"'},{value:'"Mail"'},{value:'"Remote-user"'},{value:'"Remote-group"'}]}},size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"1"'},{value:'"2/3"'},{value:'"1/2"'},{value:'"1/3"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/lib/components/inlineinput/InlineInput.tsx#InlineInput"]={docgenInfo:InlineInput.__docgenInfo,name:"InlineInput",path:"src/lib/components/inlineinput/InlineInput.tsx#InlineInput"})}catch(__react_docgen_typescript_loader_error){}},"./src/lib/components/modal/Modal.component.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{a:()=>Modal});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/jsx-runtime.js"),react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/index.js"),react_dom__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react-dom/index.js"),styled_components__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),_spacing__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./src/lib/spacing.tsx"),_style_theme__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/lib/style/theme.ts"),_utils__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/lib/utils.ts"),_buttonv2_Buttonv2_component__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("./src/lib/components/buttonv2/Buttonv2.component.tsx"),_icon_Icon_component__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("./src/lib/components/icon/Icon.component.tsx"),_text_Text_component__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./src/lib/components/text/Text.component.tsx");const ModalContainer=styled_components__WEBPACK_IMPORTED_MODULE_3__.Ay.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: ${_style_theme__WEBPACK_IMPORTED_MODULE_4__.fE.modal};
`,ModalContent=styled_components__WEBPACK_IMPORTED_MODULE_3__.Ay.div`
  display: flex;
  flex-direction: column;
  background-color: ${(0,_utils__WEBPACK_IMPORTED_MODULE_5__.sP)("backgroundLevel1")};
  color: ${(0,_utils__WEBPACK_IMPORTED_MODULE_5__.sP)("textPrimary")};
  border-radius: 5px;
  overflow: hidden;
  min-width: 250px;
  min-height: 150px;
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
  max-height: calc(100vh - ${_spacing__WEBPACK_IMPORTED_MODULE_6__.YK.r24} - ${_spacing__WEBPACK_IMPORTED_MODULE_6__.YK.r24});
`,ModalHeader=styled_components__WEBPACK_IMPORTED_MODULE_3__.Ay.div`
  display: flex;
  padding: ${_spacing__WEBPACK_IMPORTED_MODULE_6__.YK.r16} ${_spacing__WEBPACK_IMPORTED_MODULE_6__.YK.r16} ${_spacing__WEBPACK_IMPORTED_MODULE_6__.YK.r16} ${_spacing__WEBPACK_IMPORTED_MODULE_6__.YK.r32};
  background-color: ${props=>props.theme.backgroundLevel3};
`,ModalBody=styled_components__WEBPACK_IMPORTED_MODULE_3__.Ay.div`
  padding: ${_spacing__WEBPACK_IMPORTED_MODULE_6__.YK.r32};
  flex-grow: 1;
  background-color: ${props=>props.theme.backgroundLevel4};
  overflow-y: auto;
`,ModalFooter=styled_components__WEBPACK_IMPORTED_MODULE_3__.Ay.div`
  padding: ${_spacing__WEBPACK_IMPORTED_MODULE_6__.YK.r16};
  background-color: ${props=>props.theme.backgroundLevel3};
`,Modal=({isOpen,close,title,children,footer,subTitle,role="dialog",...rest})=>{const modalContainer=(0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(document.createElement("div"));return(0,react__WEBPACK_IMPORTED_MODULE_1__.useLayoutEffect)((()=>(document.body&&document.body.prepend(modalContainer.current),()=>{document.body&&document.body.removeChild(modalContainer.current)})),[modalContainer]),(0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)((()=>{if(isOpen){modalContainer.current.setAttribute("tabindex","0"),modalContainer.current.focus();const handleEsc=event=>{"Escape"===event.key&&close&&close()};return document.addEventListener("keydown",handleEsc),()=>{document.removeEventListener("keydown",handleEsc)}}}),[isOpen]),isOpen?(0,react_dom__WEBPACK_IMPORTED_MODULE_2__.createPortal)((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ModalContainer,{className:"sc-modal",role,"aria-modal":"true","aria-labelledby":"dialog_label","aria-describedby":"dialog_desc",...rest,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(ModalContent,{className:"sc-modal-content",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ModalHeader,{className:"sc-modal-header",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_spacing__WEBPACK_IMPORTED_MODULE_6__.B_,{style:{flex:1},children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_text_Text_component__WEBPACK_IMPORTED_MODULE_7__.EY,{variant:"Larger",id:"dialog_label",children:title}),close?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_buttonv2_Buttonv2_component__WEBPACK_IMPORTED_MODULE_8__.$n,{icon:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_icon_Icon_component__WEBPACK_IMPORTED_MODULE_9__.In,{name:"Close"}),onClick:close,tooltip:{overlay:"Close modal"}}):(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment,{children:subTitle})]})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ModalBody,{className:"sc-modal-body",id:"dialog_desc",children}),footer&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ModalFooter,{className:"sc-modal-footer",children:footer})]})}),modalContainer.current):null};try{Modal.displayName="Modal",Modal.__docgenInfo={description:"",displayName:"Modal",props:{isOpen:{defaultValue:null,description:"",name:"isOpen",required:!0,type:{name:"boolean"}},close:{defaultValue:null,description:"",name:"close",required:!1,type:{name:"(() => void)"}},title:{defaultValue:null,description:"",name:"title",required:!0,type:{name:"ReactNode"}},footer:{defaultValue:null,description:"",name:"footer",required:!1,type:{name:"ReactNode"}},subTitle:{defaultValue:null,description:"",name:"subTitle",required:!1,type:{name:"ReactNode"}},role:{defaultValue:{value:"dialog"},description:"",name:"role",required:!1,type:{name:"enum",value:[{value:'"dialog"'},{value:'"alertdialog"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/lib/components/modal/Modal.component.tsx#Modal"]={docgenInfo:Modal.__docgenInfo,name:"Modal",path:"src/lib/components/modal/Modal.component.tsx#Modal"})}catch(__react_docgen_typescript_loader_error){}}}]);
//# sourceMappingURL=navbar-stories.dfd4fc6c.iframe.bundle.js.map