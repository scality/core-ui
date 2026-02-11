"use strict";(self.webpackChunk_scality_core_ui=self.webpackChunk_scality_core_ui||[]).push([[32792],{"./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js"(__unused_webpack_module,__webpack_exports__,__webpack_require__){function _objectWithoutPropertiesLoose(r,e){if(null==r)return{};var t={};for(var n in r)if({}.hasOwnProperty.call(r,n)){if(-1!==e.indexOf(n))continue;t[n]=r[n]}return t}__webpack_require__.d(__webpack_exports__,{A:()=>_objectWithoutPropertiesLoose})},"./node_modules/@storybook/addon-actions/dist/index.mjs"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{XI:()=>action});var external_STORYBOOK_MODULE_PREVIEW_API_=__webpack_require__("storybook/internal/preview-api"),external_STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS_=__webpack_require__("storybook/internal/preview-errors"),external_STORYBOOK_MODULE_GLOBAL_=__webpack_require__("@storybook/global"),v4=__webpack_require__("./node_modules/@storybook/addon-actions/node_modules/uuid/dist/esm-browser/v4.js"),__defProp=Object.defineProperty,ADDON_ID="storybook/actions",EVENT_ID=`${ADDON_ID}/action-event`,config={depth:10,clearOnStoryChange:!0,limit:50},findProto=(obj,callback)=>{let proto=Object.getPrototypeOf(obj);return!proto||callback(proto)?proto:findProto(proto,callback)},serializeArg=a=>{if("object"==typeof(e=a)&&e&&findProto(e,proto=>/^Synthetic(?:Base)?Event$/.test(proto.constructor.name))&&"function"==typeof e.persist){let e=Object.create(a.constructor.prototype,Object.getOwnPropertyDescriptors(a));e.persist();let viewDescriptor=Object.getOwnPropertyDescriptor(e,"view"),view=viewDescriptor?.value;return"object"==typeof view&&"Window"===view?.constructor.name&&Object.defineProperty(e,"view",{...viewDescriptor,value:Object.create(view.constructor.prototype)}),e}var e;return a};function action(name,options={}){let actionOptions={...config,...options},handler=function(...args){if(options.implicit){let storyRenderer=("__STORYBOOK_PREVIEW__"in external_STORYBOOK_MODULE_GLOBAL_.global?external_STORYBOOK_MODULE_GLOBAL_.global.__STORYBOOK_PREVIEW__:void 0)?.storyRenders.find(render=>"playing"===render.phase||"rendering"===render.phase);if(storyRenderer){let deprecated=!globalThis?.FEATURES?.disallowImplicitActionsInRenderV8,error=new external_STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS_.ImplicitActionsDuringRendering({phase:storyRenderer.phase,name,deprecated});if(!deprecated)throw error;console.warn(error)}}let channel=external_STORYBOOK_MODULE_PREVIEW_API_.addons.getChannel(),id="object"==typeof crypto&&"function"==typeof crypto.getRandomValues?(0,v4.A)():Date.now().toString(36)+Math.random().toString(36).substring(2),serializedArgs=args.map(serializeArg),normalizedArgs=args.length>1?serializedArgs:serializedArgs[0],actionDisplayToEmit={id,count:0,data:{name,args:normalizedArgs},options:{...actionOptions,maxDepth:5+(actionOptions.depth||3),allowFunction:actionOptions.allowFunction||!1}};channel.emit(EVENT_ID,actionDisplayToEmit)};return handler.isAction=!0,handler.implicit=options.implicit,handler}var preview_exports={};((target,all)=>{for(var name in all)__defProp(target,name,{get:all[name],enumerable:!0})})(preview_exports,{argsEnhancers:()=>argsEnhancers,loaders:()=>loaders});var isInInitialArgs=(name,initialArgs)=>typeof initialArgs[name]>"u"&&!(name in initialArgs),argsEnhancers=[context=>{let{initialArgs,argTypes,parameters:{actions:actions2}}=context;return actions2?.disable||!argTypes?{}:Object.entries(argTypes).filter(([name,argType])=>!!argType.action).reduce((acc,[name,argType])=>(isInInitialArgs(name,initialArgs)&&(acc[name]=action("string"==typeof argType.action?argType.action:name)),acc),{})},context=>{let{initialArgs,argTypes,id,parameters:{actions:actions2}}=context;if(!actions2||actions2.disable||!actions2.argTypesRegex||!argTypes)return{};let argTypesRegex=new RegExp(actions2.argTypesRegex);return Object.entries(argTypes).filter(([name])=>!!argTypesRegex.test(name)).reduce((acc,[name,argType])=>(isInInitialArgs(name,initialArgs)&&(acc[name]=action(name,{implicit:!0,id})),acc),{})}],subscribed=!1,loaders=[context=>{let{parameters:{actions:actions2}}=context;if(!actions2?.disable&&!subscribed&&"__STORYBOOK_TEST_ON_MOCK_CALL__"in external_STORYBOOK_MODULE_GLOBAL_.global&&"function"==typeof external_STORYBOOK_MODULE_GLOBAL_.global.__STORYBOOK_TEST_ON_MOCK_CALL__){(0,external_STORYBOOK_MODULE_GLOBAL_.global.__STORYBOOK_TEST_ON_MOCK_CALL__)((mock,args)=>{let name=mock.getMockName();"spy"!==name&&(!/^next\/.*::/.test(name)||["next/router::useRouter()","next/navigation::useRouter()","next/navigation::redirect","next/cache::","next/headers::cookies().set","next/headers::cookies().delete","next/headers::headers().set","next/headers::headers().delete"].some(prefix=>name.startsWith(prefix)))&&action(name)(args)}),subscribed=!0}}]},"./src/lib/components/dropdown/Dropdown.component.tsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{m:()=>Dropdown});var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),polished_es=__webpack_require__("./node_modules/polished/dist/polished.es.js"),spacing=__webpack_require__("./src/lib/spacing.tsx"),theme=__webpack_require__("./src/lib/style/theme.ts");const ButtonStyled=styled_components_browser_esm.Ay.button`
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
  font-weight: ${theme.Wy.base};

  &:hover,
  &:focus,
  &:active {
    outline: none;
    cursor: pointer;
  }

  ${props=>{switch(props.size){case"smaller":return styled_components_browser_esm.AH`
          padding: 7px 14px;
          font-size: ${theme.J.smaller};
          border-radius: 4px;
          height: 27px;
        `;case"small":return styled_components_browser_esm.AH`
          padding: 8px 16px;
          font-size: ${theme.J.small};
          border-radius: 5px;
          height: 30px;
        `;case"large":return styled_components_browser_esm.AH`
          padding: 10px 20px;
          font-size: ${theme.J.large};
          border-radius: 7px;
          height: 40px;
        `;case"larger":return styled_components_browser_esm.AH`
          padding: 11px 22px;
          font-size: ${theme.J.larger};
          border-radius: 8px;
          height: 48px;
        `;default:return styled_components_browser_esm.AH`
          padding: 12px 16px;
          font-size: ${theme.J.base};
          border-radius: 6px;
          height: 32px;
        `}}}

  ${props=>props.isLoading?styled_components_browser_esm.AH`
        > span {
          display: flex;
          .sc-loader {
            margin: 0px ${spacing.YK.r4};
            svg {
              fill: ${props.theme.textPrimary} !important;
            }
          }
        }
      `:props.outlined?styled_components_browser_esm.AH`
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
      `:"buttonPrimary"===props.variant?styled_components_browser_esm.AH`
        background-color: ${props.theme.buttonPrimary};
        border: 1px solid ${props.theme.buttonPrimary};
        color: ${props.theme.textPrimary};
        &:hover {
          background-color: ${props.theme.highlight};
          outline: none;
          border: 1px solid ${props.theme.infoPrimary};
        }
      `:"buttonSecondary"===props.variant?styled_components_browser_esm.AH`
        background-color: ${props.theme.buttonSecondary};
        border: 1px solid ${props.theme.buttonSecondary};
        color: ${props.theme.textPrimary};
        &:hover {
          background-color: ${props.theme.infoPrimary};
          border: 1px solid ${props.theme.infoPrimary};
        }
      `:"buttonDelete"===props.variant?styled_components_browser_esm.AH`
        background-color: ${props.theme.buttonDelete};
        border: 1px solid ${props.theme.buttonDelete};
        color: ${props.theme.statusCritical};
        &:hover {
          background-color: ${props.theme.statusCritical};
          border: 1px solid ${props.theme.infoPrimary};
          color: ${props.theme.textPrimary};
        }
      `:"backgroundLevel1"===props.variant?styled_components_browser_esm.AH`
        background-color: ${props.theme.backgroundLevel1};
        color: ${props.theme.textPrimary};
        &:hover {
          background-color: ${props.theme.highlight};
        }
      `:styled_components_browser_esm.AH`
        background-color: ${props.theme.backgroundLevel1};
        border: 1px solid ${props.theme.backgroundLevel1};
        color: ${props.theme.statusCritical};
        &:hover {
          background-color: ${props.theme.backgroundLevel1};
          border: 1px solid ${props.theme.infoPrimary};
          color: ${props.theme.textPrimary};
        }
      `}

${props=>{const brandLighter=(0,polished_es.a)(.2,props.theme[props.variant]).toString();return styled_components_browser_esm.AH`
      ${props.disabled?`\n          box-shadow: none;\n          pointer-events: none;\n          opacity: 0.3;\n          border-color: ${brandLighter};\n          color: ${theme.ON};\n        `:null}
    `}}

${props=>{const brandLighter=(0,polished_es.a)(.2,props.theme[props.variant]).toString(),brandLight=(0,polished_es.a)(.1,props.theme[props.variant]).toString();return styled_components_browser_esm.AH`
      ${!props.text&&props.icon&&props.inverted?`\n        padding: 0;\n        height: auto;\n        border: none;\n        background-color: transparent;\n        color: ${props.disabled?brandLight:props.theme[props.variant]};\n\n        &:hover{\n          background-color: transparent;\n          color: ${brandLight};\n          border: none;\n        }\n\n        &:active {\n          background-color: transparent;\n          color: ${brandLighter};\n        }\n        `:null}
    `}}
`,ButtonIcon=styled_components_browser_esm.Ay.span`
  ${props=>props.text&&styled_components_browser_esm.AH`
      padding-right: 8px;
      display: inline-flex;
      justify-content: center;
      align-items: center;
    `}
`,ButtonText=styled_components_browser_esm.Ay.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
`,ButtonContent=styled_components_browser_esm.Ay.span`
  position: relative;
`,Anchor=ButtonStyled.withComponent("a");function Button({text="",href="",icon=null,size="base",variant="buttonPrimary",outlined=!1,disabled=!1,onClick,title="",isLoading=!1,type="button",inverted=!1,...rest}){return href&&href.length?_jsxs(Anchor,{className:"sc-button",href,variant,outlined,disabled,size,title,...rest,children:[icon&&_jsx(ButtonIcon,{text,size,children:icon}),_jsx(ButtonText,{children:text})]}):_jsx(ButtonStyled,{className:"sc-button",variant,outlined,disabled:disabled||isLoading,size,onClick,title,isLoading,type,inverted,icon,text,...rest,children:_jsxs(ButtonContent,{children:[isLoading&&_jsx(Loader,{size}),_jsxs("span",{className:"sc-button-text",children:[icon&&_jsx(ButtonIcon,{text,size,children:icon}),_jsx(ButtonText,{children:text})]})]})})}try{ButtonStyled.displayName="ButtonStyled",ButtonStyled.__docgenInfo={description:"",displayName:"ButtonStyled",props:{ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"((instance: HTMLButtonElement | null) => void) | RefObject<HTMLButtonElement> | null"}},theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"any"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"undefined"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/lib/components/button/Button.component.tsx#ButtonStyled"]={docgenInfo:ButtonStyled.__docgenInfo,name:"ButtonStyled",path:"src/lib/components/button/Button.component.tsx#ButtonStyled"})}catch(__react_docgen_typescript_loader_error){}try{ButtonIcon.displayName="ButtonIcon",ButtonIcon.__docgenInfo={description:"",displayName:"ButtonIcon",props:{ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"((instance: HTMLSpanElement | null) => void) | RefObject<HTMLSpanElement> | null"}},theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"any"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"undefined"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/lib/components/button/Button.component.tsx#ButtonIcon"]={docgenInfo:ButtonIcon.__docgenInfo,name:"ButtonIcon",path:"src/lib/components/button/Button.component.tsx#ButtonIcon"})}catch(__react_docgen_typescript_loader_error){}try{ButtonText.displayName="ButtonText",ButtonText.__docgenInfo={description:"",displayName:"ButtonText",props:{ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"((instance: HTMLSpanElement | null) => void) | RefObject<HTMLSpanElement> | null"}},theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"any"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"undefined"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/lib/components/button/Button.component.tsx#ButtonText"]={docgenInfo:ButtonText.__docgenInfo,name:"ButtonText",path:"src/lib/components/button/Button.component.tsx#ButtonText"})}catch(__react_docgen_typescript_loader_error){}try{ButtonContent.displayName="ButtonContent",ButtonContent.__docgenInfo={description:"",displayName:"ButtonContent",props:{ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"((instance: HTMLSpanElement | null) => void) | RefObject<HTMLSpanElement> | null"}},theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"any"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"undefined"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/lib/components/button/Button.component.tsx#ButtonContent"]={docgenInfo:ButtonContent.__docgenInfo,name:"ButtonContent",path:"src/lib/components/button/Button.component.tsx#ButtonContent"})}catch(__react_docgen_typescript_loader_error){}try{Button.displayName="Button",Button.__docgenInfo={description:"",displayName:"Button",props:{text:{defaultValue:{value:""},description:"",name:"text",required:!1,type:{name:"string"}},size:{defaultValue:{value:"base"},description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"smaller"'},{value:'"small"'},{value:'"base"'},{value:'"large"'},{value:'"larger"'},{value:'"huge"'},{value:'"massive"'}]}},variant:{defaultValue:{value:"buttonPrimary"},description:"",name:"variant",required:!1,type:{name:"enum",value:[{value:'"buttonPrimary"'},{value:'"buttonSecondary"'},{value:'"buttonDelete"'},{value:'"backgroundLevel1"'}]}},outlined:{defaultValue:{value:"false"},description:"",name:"outlined",required:!1,type:{name:"boolean"}},inverted:{defaultValue:{value:"false"},description:"",name:"inverted",required:!1,type:{name:"boolean"}},disabled:{defaultValue:{value:"false"},description:"",name:"disabled",required:!1,type:{name:"boolean"}},icon:{defaultValue:{value:"null"},description:"",name:"icon",required:!1,type:{name:"Element"}},href:{defaultValue:{value:""},description:"",name:"href",required:!1,type:{name:"string"}},title:{defaultValue:{value:""},description:"",name:"title",required:!1,type:{name:"string"}},type:{defaultValue:{value:"button"},description:"",name:"type",required:!1,type:{name:"string"}},isLoading:{defaultValue:{value:"false"},description:"",name:"isLoading",required:!1,type:{name:"boolean"}},onClick:{defaultValue:null,description:"",name:"onClick",required:!1,type:{name:"((arg0: any) => void)"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/lib/components/button/Button.component.tsx#Button"]={docgenInfo:Button.__docgenInfo,name:"Button",path:"src/lib/components/button/Button.component.tsx#Button"})}catch(__react_docgen_typescript_loader_error){}var utils=__webpack_require__("./src/lib/utils.ts"),Icon_component=__webpack_require__("./src/lib/components/icon/Icon.component.tsx"),downshift_esm=__webpack_require__("./node_modules/downshift/dist/downshift.esm.js"),Buttonv2_component=__webpack_require__("./src/lib/components/buttonv2/Buttonv2.component.tsx"),floating_ui_dom=__webpack_require__("./node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs"),floating_ui_react=__webpack_require__("./node_modules/@floating-ui/react/dist/floating-ui.react.mjs");const DropdownStyled=styled_components_browser_esm.Ay.div`
  position: relative;
  user-select: none;
  cursor: pointer;
  .trigger {
    margin: 0;
    border-radius: 0;
  }
`,DropdownMenuStyled=styled_components_browser_esm.Ay.ul`
  position: absolute;
  margin: 0;
  padding: 0;
  top: 50px;
  border: 1px solid ${(0,utils.sP)("backgroundLevel1")};
  z-index: ${theme.fE.dropdown};
  max-height: 200px;
  min-width: 100%;
  overflow: auto;
  display: ${props=>props.isOpen?"auto":"none"};
`,DropdownMenuItemStyled=styled_components_browser_esm.Ay.li`
  display: flex;
  align-items: center;
  padding: ${spacing.YK.r16};
  white-space: nowrap;
  cursor: pointer;
  font-size: ${theme.J.base};
  ${props=>props.isSelected?`background-color: ${props.theme.highlight};`:`background-color: ${props.theme.backgroundLevel1};`}

  color: ${(0,utils.sP)("textPrimary")};
  border-top: 0.3px solid ${(0,utils.sP)("border")};
  border-left: 0.3px solid ${(0,utils.sP)("border")};
  border-right: 0.3px solid ${(0,utils.sP)("border")};

  &:hover {
    background-color: ${(0,utils.sP)("highlight")};
  }
  &:active {
    background-color: ${(0,utils.sP)("highlight")};
  }
  &:last-child {
    border-bottom: 0.3px solid ${(0,utils.sP)("border")};
  }
`,Caret=styled_components_browser_esm.Ay.span`
  margin-left: ${spacing.YK.r16};
`,Trigger=ButtonStyled.withComponent("div"),TriggerStyled=(0,styled_components_browser_esm.Ay)(Trigger)`
  // :focus-visible is the keyboard-only version of :focus
  &:focus-visible {
    ${Buttonv2_component.kD}
    color: ${props=>props.theme.textPrimary};
  }
`;function Dropdown({items,text,icon,size="base",variant="buttonSecondary",title,caret=!0,placement="bottom",...rest}){const{isOpen,getToggleButtonProps,getMenuProps,getItemProps,highlightedIndex}=(0,downshift_esm.WM)({items,itemToString:item=>item?.label||""}),{refs,floatingStyles}=(0,floating_ui_react.we)({middleware:[(0,floating_ui_dom.cY)(10),(0,floating_ui_dom.UU)(),(0,floating_ui_dom.BN)()],placement,whileElementsMounted:floating_ui_dom.ll}),{getReferenceProps,getFloatingProps}=(0,floating_ui_react.bv)();return(0,jsx_runtime.jsxs)(DropdownStyled,{variant,className:"sc-dropdown",...rest,ref:refs.setReference,children:[(0,jsx_runtime.jsxs)(TriggerStyled,{variant,size,className:"trigger",title,...getToggleButtonProps(),...getReferenceProps(),children:[icon&&(0,jsx_runtime.jsx)(ButtonIcon,{text,size,children:icon}),text&&(0,jsx_runtime.jsx)(ButtonText,{className:"sc-trigger-text",children:text}),caret&&(0,jsx_runtime.jsx)(Caret,{children:(0,jsx_runtime.jsx)(Icon_component.In,{name:"Dropdown-down"})})]}),(0,jsx_runtime.jsx)(DropdownMenuStyled,{className:"menu-item",isOpen,style:floatingStyles,...getFloatingProps(),...getMenuProps({ref:refs.setFloating}),children:items.map((item,index)=>(0,jsx_runtime.jsx)(DropdownMenuItemStyled,{className:"menu-item-label",variant:item.variant,...item,...getItemProps({item,index,onClick:item.onClick}),isSelected:index===highlightedIndex,children:item.label},item.label))})]})}try{Dropdown.displayName="Dropdown",Dropdown.__docgenInfo={description:"",displayName:"Dropdown",props:{text:{defaultValue:null,description:"",name:"text",required:!1,type:{name:"string"}},size:{defaultValue:{value:"base"},description:"",name:"size",required:!1,type:{name:"string"}},variant:{defaultValue:{value:"buttonSecondary"},description:"",name:"variant",required:!1,type:{name:"string"}},title:{defaultValue:null,description:"",name:"title",required:!1,type:{name:"string"}},items:{defaultValue:null,description:"",name:"items",required:!0,type:{name:"Items"}},icon:{defaultValue:null,description:"",name:"icon",required:!1,type:{name:"Element"}},caret:{defaultValue:{value:"true"},description:"",name:"caret",required:!1,type:{name:"boolean"}},placement:{defaultValue:{value:"bottom"},description:"",name:"placement",required:!1,type:{name:"enum",value:[{value:'"top"'},{value:'"bottom"'},{value:'"left"'},{value:'"top-start"'},{value:'"top-end"'},{value:'"right"'},{value:'"right-start"'},{value:'"right-end"'},{value:'"bottom-end"'},{value:'"bottom-start"'},{value:'"left-start"'},{value:'"left-end"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/lib/components/dropdown/Dropdown.component.tsx#Dropdown"]={docgenInfo:Dropdown.__docgenInfo,name:"Dropdown",path:"src/lib/components/dropdown/Dropdown.component.tsx#Dropdown"})}catch(__react_docgen_typescript_loader_error){}},"./stories/controls.ts"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Yp:()=>iconArgType,bP:()=>sizesOptions,tg:()=>localeArgtype,vI:()=>variantsOptions,wo:()=>placementOptions});var _src_lib_components_icon_Icon_component__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/lib/components/icon/iconTable.ts");const iconOptions=Object.keys(_src_lib_components_icon_Icon_component__WEBPACK_IMPORTED_MODULE_0__._),sizesOptions=["smaller","small","base","large","larger"],placementOptions=["top","bottom","left","top-start","top-end","right","right-start","right-end","bottom-end","bottom-start","left-start","left-end"],localeArgtype={control:{type:"radio"},options:["en","fr"],description:"Set language for the component"},iconArgType={control:{type:"select"},options:iconOptions,description:"Icon to display with the component",table:{type:{summary:"Element"}}},variantsOptions=["buttonPrimary","buttonSecondary","buttonDelete","backgroundLevel1"]},"./stories/dropdown.stories.tsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{DifferentSizes:()=>DifferentSizes,DropdownVariant:()=>DropdownVariant,DropdownWithIcon:()=>DropdownWithIcon,DropdownWithText:()=>DropdownWithText,DropdownWithTextAndIcon:()=>DropdownWithTextAndIcon,Playground:()=>Playground,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/jsx-runtime.js"),_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@storybook/addon-actions/dist/index.mjs"),_src_lib__WEBPACK_IMPORTED_MODULE_3__=(__webpack_require__("./node_modules/react/index.js"),__webpack_require__("./src/lib/components/icon/Icon.component.tsx")),_src_lib_components_dropdown_Dropdown_component__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/lib/components/dropdown/Dropdown.component.tsx"),_common__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./stories/common.tsx"),_controls__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./stories/controls.ts");const items=[{label:"About",onClick:(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_1__.XI)("About clicked"),"data-cy":"About"},{label:"Documentation",onClick:(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_1__.XI)("Documentation clicked"),"data-cy":"Documentation"},{label:"Onboarding",onClick:(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_1__.XI)("Onboarding clicked"),"data-cy":"Onboarding"}],__WEBPACK_DEFAULT_EXPORT__={parameters:{storySource:{source:"import { jsx as _jsx, Fragment as _Fragment } from \"react/jsx-runtime\";\nimport { action } from '@storybook/addon-actions';\nimport React from 'react';\nimport { Icon } from '../src/lib';\nimport { Dropdown } from '../src/lib/components/dropdown/Dropdown.component';\nimport { Wrapper } from './common';\nimport { iconArgType, sizesOptions as sizes, variantsOptions as variants } from './controls';\nconst items = [\n    {\n        label: 'About',\n        onClick: action('About clicked'),\n        'data-cy': 'About'\n    },\n    {\n        label: 'Documentation',\n        onClick: action('Documentation clicked'),\n        'data-cy': 'Documentation'\n    },\n    {\n        label: 'Onboarding',\n        onClick: action('Onboarding clicked'),\n        'data-cy': 'Onboarding'\n    }\n];\nexport default {\n    title: 'Components/Navigation/Dropdown',\n    component: Dropdown,\n    decorators: [\n        (story)=>/*#__PURE__*/ _jsx(Wrapper, {\n                style: {\n                    minHeight: '40vh',\n                    display: 'flex',\n                    justifyContent: 'space-between',\n                    alignItems: 'center',\n                    padding: '0'\n                },\n                className: \"storybook-dropdown\",\n                children: story()\n            })\n    ],\n    args: {\n        items\n    },\n    argTypes: {\n        icon: iconArgType,\n        size: {\n            options: sizes,\n            control: {\n                type: 'radio'\n            }\n        },\n        variant: {\n            options: variants,\n            control: {\n                type: 'radio'\n            }\n        }\n    },\n    render: ({ icon, items, ...args })=>/*#__PURE__*/ _jsx(Dropdown, {\n            items: items,\n            icon: icon && /*#__PURE__*/ _jsx(Icon, {\n                name: icon\n            }),\n            ...args\n        })\n};\nexport const Playground = {\n    args: {\n        text: 'Playground'\n    }\n};\nexport const DropdownWithText = {\n    args: {\n        text: 'Help'\n    }\n};\nexport const DropdownWithIcon = {\n    args: {\n        icon: 'Folder',\n        caret: false\n    }\n};\nexport const DropdownWithTextAndIcon = {\n    args: {\n        text: 'Help',\n        icon: 'Info-circle'\n    }\n};\nexport const DropdownVariant = {\n    render: ({ icon, ...args })=>{\n        return /*#__PURE__*/ _jsx(_Fragment, {\n            children: variants.map((variant, i)=>{\n                return /*#__PURE__*/ _jsx(Dropdown, {\n                    items: items,\n                    icon: icon && /*#__PURE__*/ _jsx(Icon, {\n                        name: icon\n                    }),\n                    text: \"Help\",\n                    variant: variant,\n                    ...args\n                }, i);\n            })\n        });\n    }\n};\nexport const DifferentSizes = {\n    render: ({ icon, ...args })=>{\n        return /*#__PURE__*/ _jsx(_Fragment, {\n            children: sizes.map((size, i)=>{\n                return /*#__PURE__*/ _jsx(Dropdown, {\n                    items: items,\n                    icon: icon && /*#__PURE__*/ _jsx(Icon, {\n                        name: icon\n                    }),\n                    text: \"Help\",\n                    size: size,\n                    ...args\n                }, i);\n            })\n        });\n    },\n    args: {\n        text: 'Help',\n        icon: 'Info-circle'\n    }\n};\n",locationsMap:{playground:{startLoc:{col:26,line:67},endLoc:{col:1,line:71},startBody:{col:26,line:67},endBody:{col:1,line:71}},"dropdown-with-text":{startLoc:{col:32,line:72},endLoc:{col:1,line:76},startBody:{col:32,line:72},endBody:{col:1,line:76}},"dropdown-with-icon":{startLoc:{col:32,line:77},endLoc:{col:1,line:82},startBody:{col:32,line:77},endBody:{col:1,line:82}},"dropdown-with-text-and-icon":{startLoc:{col:39,line:83},endLoc:{col:1,line:88},startBody:{col:39,line:83},endBody:{col:1,line:88}},"dropdown-variant":{startLoc:{col:31,line:89},endLoc:{col:1,line:105},startBody:{col:31,line:89},endBody:{col:1,line:105}},"different-sizes":{startLoc:{col:30,line:106},endLoc:{col:1,line:126},startBody:{col:30,line:106},endBody:{col:1,line:126}}}}},title:"Components/Navigation/Dropdown",component:_src_lib_components_dropdown_Dropdown_component__WEBPACK_IMPORTED_MODULE_4__.m,decorators:[story=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common__WEBPACK_IMPORTED_MODULE_5__.mO,{style:{minHeight:"40vh",display:"flex",justifyContent:"space-between",alignItems:"center",padding:"0"},className:"storybook-dropdown",children:story()})],args:{items},argTypes:{icon:_controls__WEBPACK_IMPORTED_MODULE_6__.Yp,size:{options:_controls__WEBPACK_IMPORTED_MODULE_6__.bP,control:{type:"radio"}},variant:{options:_controls__WEBPACK_IMPORTED_MODULE_6__.vI,control:{type:"radio"}}},render:({icon,items,...args})=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_src_lib_components_dropdown_Dropdown_component__WEBPACK_IMPORTED_MODULE_4__.m,{items,icon:icon&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_src_lib__WEBPACK_IMPORTED_MODULE_3__.In,{name:icon}),...args})},Playground={args:{text:"Playground"}},DropdownWithText={args:{text:"Help"}},DropdownWithIcon={args:{icon:"Folder",caret:!1}},DropdownWithTextAndIcon={args:{text:"Help",icon:"Info-circle"}},DropdownVariant={render:({icon,...args})=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment,{children:_controls__WEBPACK_IMPORTED_MODULE_6__.vI.map((variant,i)=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_src_lib_components_dropdown_Dropdown_component__WEBPACK_IMPORTED_MODULE_4__.m,{items,icon:icon&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_src_lib__WEBPACK_IMPORTED_MODULE_3__.In,{name:icon}),text:"Help",variant,...args},i))})},DifferentSizes={render:({icon,...args})=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment,{children:_controls__WEBPACK_IMPORTED_MODULE_6__.bP.map((size,i)=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_src_lib_components_dropdown_Dropdown_component__WEBPACK_IMPORTED_MODULE_4__.m,{items,icon:icon&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_src_lib__WEBPACK_IMPORTED_MODULE_3__.In,{name:icon}),text:"Help",size,...args},i))}),args:{text:"Help",icon:"Info-circle"}},__namedExportsOrder=["Playground","DropdownWithText","DropdownWithIcon","DropdownWithTextAndIcon","DropdownVariant","DifferentSizes"];Playground.parameters={...Playground.parameters,docs:{...Playground.parameters?.docs,source:{originalSource:"{\n  args: {\n    text: 'Playground'\n  }\n}",...Playground.parameters?.docs?.source}}},DropdownWithText.parameters={...DropdownWithText.parameters,docs:{...DropdownWithText.parameters?.docs,source:{originalSource:"{\n  args: {\n    text: 'Help'\n  }\n}",...DropdownWithText.parameters?.docs?.source}}},DropdownWithIcon.parameters={...DropdownWithIcon.parameters,docs:{...DropdownWithIcon.parameters?.docs,source:{originalSource:"{\n  args: {\n    icon: 'Folder',\n    caret: false\n  }\n}",...DropdownWithIcon.parameters?.docs?.source}}},DropdownWithTextAndIcon.parameters={...DropdownWithTextAndIcon.parameters,docs:{...DropdownWithTextAndIcon.parameters?.docs,source:{originalSource:"{\n  args: {\n    text: 'Help',\n    icon: 'Info-circle'\n  }\n}",...DropdownWithTextAndIcon.parameters?.docs?.source}}},DropdownVariant.parameters={...DropdownVariant.parameters,docs:{...DropdownVariant.parameters?.docs,source:{originalSource:'{\n  render: ({\n    icon,\n    ...args\n  }) => {\n    return <>\n        {variants.map((variant, i) => {\n        return <Dropdown key={i} items={items} icon={icon && <Icon name={icon}></Icon>} text="Help" variant={variant} {...args} />;\n      })}\n      </>;\n  }\n}',...DropdownVariant.parameters?.docs?.source}}},DifferentSizes.parameters={...DifferentSizes.parameters,docs:{...DifferentSizes.parameters?.docs,source:{originalSource:"{\n  render: ({\n    icon,\n    ...args\n  }) => {\n    return <>\n        {sizes.map((size, i) => {\n        return <Dropdown key={i} items={items} icon={icon && <Icon name={icon}></Icon>} text=\"Help\" size={size} {...args} />;\n      })}\n      </>;\n  },\n  args: {\n    text: 'Help',\n    icon: 'Info-circle'\n  }\n}",...DifferentSizes.parameters?.docs?.source}}};try{Dropdown.displayName="Dropdown",Dropdown.__docgenInfo={description:"",displayName:"Dropdown",props:{text:{defaultValue:null,description:"",name:"text",required:!1,type:{name:"string"}},size:{defaultValue:{value:"base"},description:"",name:"size",required:!1,type:{name:"string"}},variant:{defaultValue:{value:"buttonSecondary"},description:"",name:"variant",required:!1,type:{name:"string"}},title:{defaultValue:null,description:"",name:"title",required:!1,type:{name:"string"}},items:{defaultValue:null,description:"",name:"items",required:!0,type:{name:"Items"}},icon:{defaultValue:null,description:"",name:"icon",required:!1,type:{name:"Element"}},caret:{defaultValue:{value:"true"},description:"",name:"caret",required:!1,type:{name:"boolean"}},placement:{defaultValue:{value:"bottom"},description:"",name:"placement",required:!1,type:{name:"enum",value:[{value:'"top"'},{value:'"bottom"'},{value:'"left"'},{value:'"top-start"'},{value:'"top-end"'},{value:'"right"'},{value:'"right-start"'},{value:'"right-end"'},{value:'"bottom-end"'},{value:'"bottom-start"'},{value:'"left-start"'},{value:'"left-end"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["stories/dropdown.stories.tsx#Dropdown"]={docgenInfo:Dropdown.__docgenInfo,name:"Dropdown",path:"stories/dropdown.stories.tsx#Dropdown"})}catch(__react_docgen_typescript_loader_error){}try{render.displayName="render",render.__docgenInfo={description:"",displayName:"render",props:{icon:{defaultValue:null,description:"",name:"icon",required:!0,type:{name:"any"}},items:{defaultValue:null,description:"",name:"items",required:!0,type:{name:"any"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["stories/dropdown.stories.tsx#render"]={docgenInfo:render.__docgenInfo,name:"render",path:"stories/dropdown.stories.tsx#render"})}catch(__react_docgen_typescript_loader_error){}}}]);
//# sourceMappingURL=dropdown-stories.d8d50023.iframe.bundle.js.map