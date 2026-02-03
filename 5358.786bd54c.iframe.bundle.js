"use strict";(self.webpackChunk_scality_core_ui=self.webpackChunk_scality_core_ui||[]).push([[5358],{"./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js"(__unused_webpack_module,__webpack_exports__,__webpack_require__){function _objectWithoutPropertiesLoose(r,e){if(null==r)return{};var t={};for(var n in r)if({}.hasOwnProperty.call(r,n)){if(-1!==e.indexOf(n))continue;t[n]=r[n]}return t}__webpack_require__.d(__webpack_exports__,{A:()=>_objectWithoutPropertiesLoose})},"./node_modules/@storybook/addon-actions/dist/index.mjs"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{XI:()=>action});var external_STORYBOOK_MODULE_PREVIEW_API_=__webpack_require__("storybook/internal/preview-api"),external_STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS_=__webpack_require__("storybook/internal/preview-errors"),external_STORYBOOK_MODULE_GLOBAL_=__webpack_require__("@storybook/global");const esm_browser_native={randomUUID:"undefined"!=typeof crypto&&crypto.randomUUID&&crypto.randomUUID.bind(crypto)};let getRandomValues;const rnds8=new Uint8Array(16);function rng(){if(!getRandomValues&&(getRandomValues="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!getRandomValues))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return getRandomValues(rnds8)}const byteToHex=[];for(let i=0;i<256;++i)byteToHex.push((i+256).toString(16).slice(1));function unsafeStringify(arr,offset=0){return byteToHex[arr[offset+0]]+byteToHex[arr[offset+1]]+byteToHex[arr[offset+2]]+byteToHex[arr[offset+3]]+"-"+byteToHex[arr[offset+4]]+byteToHex[arr[offset+5]]+"-"+byteToHex[arr[offset+6]]+byteToHex[arr[offset+7]]+"-"+byteToHex[arr[offset+8]]+byteToHex[arr[offset+9]]+"-"+byteToHex[arr[offset+10]]+byteToHex[arr[offset+11]]+byteToHex[arr[offset+12]]+byteToHex[arr[offset+13]]+byteToHex[arr[offset+14]]+byteToHex[arr[offset+15]]}const esm_browser_v4=function v4(options,buf,offset){if(esm_browser_native.randomUUID&&!buf&&!options)return esm_browser_native.randomUUID();const rnds=(options=options||{}).random||(options.rng||rng)();if(rnds[6]=15&rnds[6]|64,rnds[8]=63&rnds[8]|128,buf){offset=offset||0;for(let i=0;i<16;++i)buf[offset+i]=rnds[i];return buf}return unsafeStringify(rnds)};var __defProp=Object.defineProperty,ADDON_ID="storybook/actions",EVENT_ID=`${ADDON_ID}/action-event`,config={depth:10,clearOnStoryChange:!0,limit:50},findProto=(obj,callback)=>{let proto=Object.getPrototypeOf(obj);return!proto||callback(proto)?proto:findProto(proto,callback)},serializeArg=a=>{if("object"==typeof(e=a)&&e&&findProto(e,proto=>/^Synthetic(?:Base)?Event$/.test(proto.constructor.name))&&"function"==typeof e.persist){let e=Object.create(a.constructor.prototype,Object.getOwnPropertyDescriptors(a));e.persist();let viewDescriptor=Object.getOwnPropertyDescriptor(e,"view"),view=viewDescriptor?.value;return"object"==typeof view&&"Window"===view?.constructor.name&&Object.defineProperty(e,"view",{...viewDescriptor,value:Object.create(view.constructor.prototype)}),e}var e;return a};function action(name,options={}){let actionOptions={...config,...options},handler=function(...args){if(options.implicit){let storyRenderer=("__STORYBOOK_PREVIEW__"in external_STORYBOOK_MODULE_GLOBAL_.global?external_STORYBOOK_MODULE_GLOBAL_.global.__STORYBOOK_PREVIEW__:void 0)?.storyRenders.find(render=>"playing"===render.phase||"rendering"===render.phase);if(storyRenderer){let deprecated=!globalThis?.FEATURES?.disallowImplicitActionsInRenderV8,error=new external_STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS_.ImplicitActionsDuringRendering({phase:storyRenderer.phase,name,deprecated});if(!deprecated)throw error;console.warn(error)}}let channel=external_STORYBOOK_MODULE_PREVIEW_API_.addons.getChannel(),id="object"==typeof crypto&&"function"==typeof crypto.getRandomValues?esm_browser_v4():Date.now().toString(36)+Math.random().toString(36).substring(2),serializedArgs=args.map(serializeArg),normalizedArgs=args.length>1?serializedArgs:serializedArgs[0],actionDisplayToEmit={id,count:0,data:{name,args:normalizedArgs},options:{...actionOptions,maxDepth:5+(actionOptions.depth||3),allowFunction:actionOptions.allowFunction||!1}};channel.emit(EVENT_ID,actionDisplayToEmit)};return handler.isAction=!0,handler.implicit=options.implicit,handler}var preview_exports={};((target,all)=>{for(var name in all)__defProp(target,name,{get:all[name],enumerable:!0})})(preview_exports,{argsEnhancers:()=>argsEnhancers,loaders:()=>loaders});var isInInitialArgs=(name,initialArgs)=>typeof initialArgs[name]>"u"&&!(name in initialArgs),argsEnhancers=[context=>{let{initialArgs,argTypes,parameters:{actions:actions2}}=context;return actions2?.disable||!argTypes?{}:Object.entries(argTypes).filter(([name,argType])=>!!argType.action).reduce((acc,[name,argType])=>(isInInitialArgs(name,initialArgs)&&(acc[name]=action("string"==typeof argType.action?argType.action:name)),acc),{})},context=>{let{initialArgs,argTypes,id,parameters:{actions:actions2}}=context;if(!actions2||actions2.disable||!actions2.argTypesRegex||!argTypes)return{};let argTypesRegex=new RegExp(actions2.argTypesRegex);return Object.entries(argTypes).filter(([name])=>!!argTypesRegex.test(name)).reduce((acc,[name,argType])=>(isInInitialArgs(name,initialArgs)&&(acc[name]=action(name,{implicit:!0,id})),acc),{})}],subscribed=!1,loaders=[context=>{let{parameters:{actions:actions2}}=context;if(!actions2?.disable&&!subscribed&&"__STORYBOOK_TEST_ON_MOCK_CALL__"in external_STORYBOOK_MODULE_GLOBAL_.global&&"function"==typeof external_STORYBOOK_MODULE_GLOBAL_.global.__STORYBOOK_TEST_ON_MOCK_CALL__){(0,external_STORYBOOK_MODULE_GLOBAL_.global.__STORYBOOK_TEST_ON_MOCK_CALL__)((mock,args)=>{let name=mock.getMockName();"spy"!==name&&(!/^next\/.*::/.test(name)||["next/router::useRouter()","next/navigation::useRouter()","next/navigation::redirect","next/cache::","next/headers::cookies().set","next/headers::cookies().delete","next/headers::headers().set","next/headers::headers().delete"].some(prefix=>name.startsWith(prefix)))&&action(name)(args)}),subscribed=!0}}]},"./src/lib/components/dropdown/Dropdown.component.tsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{m:()=>Dropdown});var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),polished_es=__webpack_require__("./node_modules/polished/dist/polished.es.js"),spacing=__webpack_require__("./src/lib/spacing.tsx"),theme=__webpack_require__("./src/lib/style/theme.ts");const ButtonStyled=styled_components_browser_esm.Ay.button`
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
`,Anchor=ButtonStyled.withComponent("a");function Button({text="",href="",icon=null,size="base",variant="buttonPrimary",outlined=!1,disabled=!1,onClick,title="",isLoading=!1,type="button",inverted=!1,...rest}){return href&&href.length?_jsxs(Anchor,{className:"sc-button",href,variant,outlined,disabled,size,title,...rest,children:[icon&&_jsx(ButtonIcon,{text,size,children:icon}),_jsx(ButtonText,{children:text})]}):_jsx(ButtonStyled,{className:"sc-button",variant,outlined,disabled:disabled||isLoading,size,onClick,title,isLoading,type,inverted,icon,text,...rest,children:_jsxs(ButtonContent,{children:[isLoading&&_jsx(Loader,{size}),_jsxs("span",{className:"sc-button-text",children:[icon&&_jsx(ButtonIcon,{text,size,children:icon}),_jsx(ButtonText,{children:text})]})]})})}try{ButtonStyled.displayName="ButtonStyled",ButtonStyled.__docgenInfo={description:"",displayName:"ButtonStyled",props:{ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"((instance: HTMLButtonElement | null) => void) | RefObject<HTMLButtonElement> | null"}},theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"any"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"undefined"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/lib/components/button/Button.component.tsx#ButtonStyled"]={docgenInfo:ButtonStyled.__docgenInfo,name:"ButtonStyled",path:"src/lib/components/button/Button.component.tsx#ButtonStyled"})}catch(__react_docgen_typescript_loader_error){}try{ButtonIcon.displayName="ButtonIcon",ButtonIcon.__docgenInfo={description:"",displayName:"ButtonIcon",props:{ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"((instance: HTMLSpanElement | null) => void) | RefObject<HTMLSpanElement> | null"}},theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"any"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"undefined"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/lib/components/button/Button.component.tsx#ButtonIcon"]={docgenInfo:ButtonIcon.__docgenInfo,name:"ButtonIcon",path:"src/lib/components/button/Button.component.tsx#ButtonIcon"})}catch(__react_docgen_typescript_loader_error){}try{ButtonText.displayName="ButtonText",ButtonText.__docgenInfo={description:"",displayName:"ButtonText",props:{ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"((instance: HTMLSpanElement | null) => void) | RefObject<HTMLSpanElement> | null"}},theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"any"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"undefined"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/lib/components/button/Button.component.tsx#ButtonText"]={docgenInfo:ButtonText.__docgenInfo,name:"ButtonText",path:"src/lib/components/button/Button.component.tsx#ButtonText"})}catch(__react_docgen_typescript_loader_error){}try{ButtonContent.displayName="ButtonContent",ButtonContent.__docgenInfo={description:"",displayName:"ButtonContent",props:{ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"((instance: HTMLSpanElement | null) => void) | RefObject<HTMLSpanElement> | null"}},theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"any"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"undefined"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/lib/components/button/Button.component.tsx#ButtonContent"]={docgenInfo:ButtonContent.__docgenInfo,name:"ButtonContent",path:"src/lib/components/button/Button.component.tsx#ButtonContent"})}catch(__react_docgen_typescript_loader_error){}try{Button.displayName="Button",Button.__docgenInfo={description:"",displayName:"Button",props:{text:{defaultValue:{value:""},description:"",name:"text",required:!1,type:{name:"string"}},size:{defaultValue:{value:"base"},description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"smaller"'},{value:'"small"'},{value:'"base"'},{value:'"large"'},{value:'"larger"'},{value:'"huge"'},{value:'"massive"'}]}},variant:{defaultValue:{value:"buttonPrimary"},description:"",name:"variant",required:!1,type:{name:"enum",value:[{value:'"backgroundLevel1"'},{value:'"buttonPrimary"'},{value:'"buttonSecondary"'},{value:'"buttonDelete"'}]}},outlined:{defaultValue:{value:"false"},description:"",name:"outlined",required:!1,type:{name:"boolean"}},inverted:{defaultValue:{value:"false"},description:"",name:"inverted",required:!1,type:{name:"boolean"}},disabled:{defaultValue:{value:"false"},description:"",name:"disabled",required:!1,type:{name:"boolean"}},icon:{defaultValue:{value:"null"},description:"",name:"icon",required:!1,type:{name:"Element"}},href:{defaultValue:{value:""},description:"",name:"href",required:!1,type:{name:"string"}},title:{defaultValue:{value:""},description:"",name:"title",required:!1,type:{name:"string"}},type:{defaultValue:{value:"button"},description:"",name:"type",required:!1,type:{name:"string"}},isLoading:{defaultValue:{value:"false"},description:"",name:"isLoading",required:!1,type:{name:"boolean"}},onClick:{defaultValue:null,description:"",name:"onClick",required:!1,type:{name:"((arg0: any) => void)"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/lib/components/button/Button.component.tsx#Button"]={docgenInfo:Button.__docgenInfo,name:"Button",path:"src/lib/components/button/Button.component.tsx#Button"})}catch(__react_docgen_typescript_loader_error){}var utils=__webpack_require__("./src/lib/utils.ts"),Icon_component=__webpack_require__("./src/lib/components/icon/Icon.component.tsx"),downshift_esm=__webpack_require__("./node_modules/downshift/dist/downshift.esm.js"),Buttonv2_component=__webpack_require__("./src/lib/components/buttonv2/Buttonv2.component.tsx"),floating_ui_dom=__webpack_require__("./node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs"),floating_ui_react=__webpack_require__("./node_modules/@floating-ui/react/dist/floating-ui.react.mjs");const DropdownStyled=styled_components_browser_esm.Ay.div`
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
`;function Dropdown({items,text,icon,size="base",variant="buttonSecondary",title,caret=!0,placement="bottom",...rest}){const{isOpen,getToggleButtonProps,getMenuProps,getItemProps,highlightedIndex}=(0,downshift_esm.WM)({items,itemToString:item=>item?.label||""}),{refs,floatingStyles}=(0,floating_ui_react.we)({middleware:[(0,floating_ui_dom.cY)(10),(0,floating_ui_dom.UU)(),(0,floating_ui_dom.BN)()],placement,whileElementsMounted:floating_ui_dom.ll}),{getReferenceProps,getFloatingProps}=(0,floating_ui_react.bv)();return(0,jsx_runtime.jsxs)(DropdownStyled,{variant,className:"sc-dropdown",...rest,ref:refs.setReference,children:[(0,jsx_runtime.jsxs)(TriggerStyled,{variant,size,className:"trigger",title,...getToggleButtonProps(),...getReferenceProps(),children:[icon&&(0,jsx_runtime.jsx)(ButtonIcon,{text,size,children:icon}),text&&(0,jsx_runtime.jsx)(ButtonText,{className:"sc-trigger-text",children:text}),caret&&(0,jsx_runtime.jsx)(Caret,{children:(0,jsx_runtime.jsx)(Icon_component.In,{name:"Dropdown-down"})})]}),(0,jsx_runtime.jsx)(DropdownMenuStyled,{className:"menu-item",isOpen,style:floatingStyles,...getFloatingProps(),...getMenuProps({ref:refs.setFloating}),children:items.map((item,index)=>(0,jsx_runtime.jsx)(DropdownMenuItemStyled,{className:"menu-item-label",variant:item.variant,...item,...getItemProps({item,index,onClick:item.onClick}),isSelected:index===highlightedIndex,children:item.label},item.label))})]})}try{Dropdown.displayName="Dropdown",Dropdown.__docgenInfo={description:"",displayName:"Dropdown",props:{text:{defaultValue:null,description:"",name:"text",required:!1,type:{name:"string"}},size:{defaultValue:{value:"base"},description:"",name:"size",required:!1,type:{name:"string"}},variant:{defaultValue:{value:"buttonSecondary"},description:"",name:"variant",required:!1,type:{name:"string"}},title:{defaultValue:null,description:"",name:"title",required:!1,type:{name:"string"}},items:{defaultValue:null,description:"",name:"items",required:!0,type:{name:"Items"}},icon:{defaultValue:null,description:"",name:"icon",required:!1,type:{name:"Element"}},caret:{defaultValue:{value:"true"},description:"",name:"caret",required:!1,type:{name:"boolean"}},placement:{defaultValue:{value:"bottom"},description:"",name:"placement",required:!1,type:{name:"enum",value:[{value:'"top"'},{value:'"bottom"'},{value:'"left"'},{value:'"top-start"'},{value:'"top-end"'},{value:'"right"'},{value:'"right-start"'},{value:'"right-end"'},{value:'"bottom-end"'},{value:'"bottom-start"'},{value:'"left-start"'},{value:'"left-end"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/lib/components/dropdown/Dropdown.component.tsx#Dropdown"]={docgenInfo:Dropdown.__docgenInfo,name:"Dropdown",path:"src/lib/components/dropdown/Dropdown.component.tsx#Dropdown"})}catch(__react_docgen_typescript_loader_error){}}}]);
//# sourceMappingURL=5358.786bd54c.iframe.bundle.js.map