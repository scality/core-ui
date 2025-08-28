"use strict";(self.webpackChunk_scality_core_ui=self.webpackChunk_scality_core_ui||[]).push([[11692],{"./node_modules/@storybook/addon-actions/dist/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{XI:()=>action});var external_STORYBOOK_MODULE_PREVIEW_API_=__webpack_require__("storybook/internal/preview-api"),external_STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS_=__webpack_require__("storybook/internal/preview-errors"),external_STORYBOOK_MODULE_GLOBAL_=__webpack_require__("@storybook/global"),v4=__webpack_require__("./node_modules/uuid/dist/esm-browser/v4.js"),ADDON_ID="storybook/actions",EVENT_ID=`${ADDON_ID}/action-event`,config={depth:10,clearOnStoryChange:!0,limit:50},findProto=(obj,callback)=>{let proto=Object.getPrototypeOf(obj);return!proto||callback(proto)?proto:findProto(proto,callback)},serializeArg=a=>{if("object"==typeof(e=a)&&e&&findProto(e,(proto=>/^Synthetic(?:Base)?Event$/.test(proto.constructor.name)))&&"function"==typeof e.persist){let e=Object.create(a.constructor.prototype,Object.getOwnPropertyDescriptors(a));e.persist();let viewDescriptor=Object.getOwnPropertyDescriptor(e,"view"),view=viewDescriptor?.value;return"object"==typeof view&&"Window"===view?.constructor.name&&Object.defineProperty(e,"view",{...viewDescriptor,value:Object.create(view.constructor.prototype)}),e}var e;return a},generateId=()=>"object"==typeof crypto&&"function"==typeof crypto.getRandomValues?(0,v4.A)():Date.now().toString(36)+Math.random().toString(36).substring(2);function action(name,options={}){let actionOptions={...config,...options},handler=function(...args){if(options.implicit){let storyRenderer=("__STORYBOOK_PREVIEW__"in external_STORYBOOK_MODULE_GLOBAL_.global?external_STORYBOOK_MODULE_GLOBAL_.global.__STORYBOOK_PREVIEW__:void 0)?.storyRenders.find((render=>"playing"===render.phase||"rendering"===render.phase));if(storyRenderer){let deprecated=!window?.FEATURES?.disallowImplicitActionsInRenderV8,error=new external_STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS_.ImplicitActionsDuringRendering({phase:storyRenderer.phase,name,deprecated});if(!deprecated)throw error;console.warn(error)}}let channel=external_STORYBOOK_MODULE_PREVIEW_API_.addons.getChannel(),id=generateId(),serializedArgs=args.map(serializeArg),normalizedArgs=args.length>1?serializedArgs:serializedArgs[0],actionDisplayToEmit={id,count:0,data:{name,args:normalizedArgs},options:{...actionOptions,maxDepth:5+(actionOptions.depth||3),allowFunction:actionOptions.allowFunction||!1}};channel.emit(EVENT_ID,actionDisplayToEmit)};return handler.isAction=!0,handler.implicit=options.implicit,handler}},"./stories/chips.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{BasicChips:()=>BasicChips,ClickableChips:()=>ClickableChips,DeletableChips:()=>DeletableChips,DifferentsSizeChips:()=>DifferentsSizeChips,Playground:()=>Playground,__namedExportsOrder:()=>__namedExportsOrder,default:()=>chips_stories});var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),dist=__webpack_require__("./node_modules/@storybook/addon-actions/dist/index.mjs"),polished_es=(__webpack_require__("./node_modules/react/index.js"),__webpack_require__("./node_modules/polished/dist/polished.es.js")),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/lib/style/theme.ts"),Button_component=__webpack_require__("./src/lib/components/button/Button.component.tsx"),Icon_component=__webpack_require__("./src/lib/components/icon/Icon.component.tsx");const ChipsContainer=styled_components_browser_esm.Ay.div`
  display: inline-flex;
  .sc-chips-remove {
    padding-right: 10px;
    color: ${theme.ON};
    &:hover {
      color: ${theme.g2};
    }
  }
  ${props=>{switch(props.size){case"smaller":return styled_components_browser_esm.AH`
          border-radius: 10px;
          .sc-chips-icon {
            border-radius: 10px;
            padding: 5px;
          }
        `;case"small":default:return styled_components_browser_esm.AH`
          border-radius: 12px;
          .sc-chips-icon {
            border-radius: 12px;
            padding: 6px;
          }
        `;case"large":return styled_components_browser_esm.AH`
          border-radius: 14px;
          .sc-chips-icon {
            border-radius: 14px;
            padding: 6px;
          }
        `;case"larger":return styled_components_browser_esm.AH`
          border-radius: 17px;
          .sc-chips-icon {
            border-radius: 17px;
            padding: 7px;
          }
        `}}}
  ${props=>{const brand=props.theme;return styled_components_browser_esm.AH`
      color: ${brand.textReverse};
    `}}

  ${props=>{const brand=props.theme,brandLight=(0,polished_es.a)(.1,brand[props.variant]).toString();return props.onClick?styled_components_browser_esm.AH`
          background-color: ${brand[props.variant]};
          font-size: ${theme.J[props.size||"base"]};
          &:hover {
            cursor: pointer;
            background-color: ${brandLight};
          }
          &:active {
            background-color: ${brand[props.variant]};
          }
        `:styled_components_browser_esm.AH`
          background-color: ${brand[props.variant]};
          font-size: ${theme.J[props.size||"base"]};
        `}}
`,ChipsIcon=styled_components_browser_esm.Ay.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background-color: ${props=>(0,polished_es.a)(.15,props.theme[props.variant]).toString()};
`,ChipsText=styled_components_browser_esm.Ay.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: ${props=>props.icon||props.isRemovable?"5px":"5px 10px"};
`,Chips=({text="",variant="infoPrimary",icon,onClick,onRemove,size="base"})=>(0,jsx_runtime.jsxs)(ChipsContainer,{className:"sc-chips",onClick,variant,icon,size,children:[icon&&(0,jsx_runtime.jsx)(ChipsIcon,{className:"sc-chips-icon",text,variant,size,children:icon}),(0,jsx_runtime.jsx)(ChipsText,{className:"sc-chips-text",icon,isRemovable:!!onRemove,children:text}),onRemove&&(0,jsx_runtime.jsx)(Button_component.$n,{className:"sc-chips-remove",size,inverted:!0,icon:(0,jsx_runtime.jsx)(Icon_component.In,{name:"Close"}),onClick:onRemove})]});try{ChipsIcon.displayName="ChipsIcon",ChipsIcon.__docgenInfo={description:"",displayName:"ChipsIcon",props:{ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"((instance: HTMLSpanElement | null) => void) | RefObject<HTMLSpanElement> | null"}},variant:{defaultValue:{value:"infoPrimary"},description:"",name:"variant",required:!1,type:{name:"any"}},text:{defaultValue:{value:""},description:"",name:"text",required:!1,type:{name:"string"}},size:{defaultValue:{value:"base"},description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"base"'},{value:'"small"'},{value:'"large"'},{value:'"smaller"'},{value:'"larger"'},{value:'"huge"'},{value:'"massive"'}]}},theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"any"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"undefined"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/lib/components/chips/Chips.component.tsx#ChipsIcon"]={docgenInfo:ChipsIcon.__docgenInfo,name:"ChipsIcon",path:"src/lib/components/chips/Chips.component.tsx#ChipsIcon"})}catch(__react_docgen_typescript_loader_error){}try{ChipsText.displayName="ChipsText",ChipsText.__docgenInfo={description:"",displayName:"ChipsText",props:{icon:{defaultValue:{value:"undefined"},description:"",name:"icon",required:!1,type:{name:"any"}},ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"((instance: HTMLSpanElement | null) => void) | RefObject<HTMLSpanElement> | null"}},isRemovable:{defaultValue:null,description:"",name:"isRemovable",required:!0,type:{name:"boolean"}},theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"any"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"undefined"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/lib/components/chips/Chips.component.tsx#ChipsText"]={docgenInfo:ChipsText.__docgenInfo,name:"ChipsText",path:"src/lib/components/chips/Chips.component.tsx#ChipsText"})}catch(__react_docgen_typescript_loader_error){}try{Chips.displayName="Chips",Chips.__docgenInfo={description:"",displayName:"Chips",props:{text:{defaultValue:{value:""},description:"",name:"text",required:!1,type:{name:"string"}},variant:{defaultValue:{value:"infoPrimary"},description:"",name:"variant",required:!1,type:{name:"enum",value:[{value:'"statusHealthy"'},{value:'"statusWarning"'},{value:'"statusCritical"'},{value:'"infoPrimary"'},{value:'"infoSecondary"'}]}},icon:{defaultValue:{value:"undefined"},description:"",name:"icon",required:!1,type:{name:"Element"}},onClick:{defaultValue:null,description:"",name:"onClick",required:!1,type:{name:"((arg0: any) => void)"}},onRemove:{defaultValue:null,description:"",name:"onRemove",required:!1,type:{name:"((arg0: any) => void)"}},size:{defaultValue:{value:"base"},description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"base"'},{value:'"small"'},{value:'"large"'},{value:'"smaller"'},{value:'"larger"'},{value:'"huge"'},{value:'"massive"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/lib/components/chips/Chips.component.tsx#Chips"]={docgenInfo:Chips.__docgenInfo,name:"Chips",path:"src/lib/components/chips/Chips.component.tsx#Chips"})}catch(__react_docgen_typescript_loader_error){}var common=__webpack_require__("./stories/common.tsx"),controls=__webpack_require__("./stories/controls.ts");const chips_stories={title:"Components/Deprecated/Chips",component:Chips,decorators:[story=>(0,jsx_runtime.jsx)(common.mO,{style:{minHeight:"10vh",padding:"3rem"},className:"storybook-chips",children:story()})],argTypes:{icon:controls.Yp}},Template={render:({variant,text,icon,...args})=>(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:variant.map((status=>(0,jsx_runtime.jsx)(Chips,{variant:status,icon:icon&&(0,jsx_runtime.jsx)(Icon_component.In,{name:icon}),text,...args},status)))}),args:{variant:["infoPrimary","statusHealthy","statusWarning","statusCritical"],text:"Basic Chip"}},Playground={render:({icon,text,...args})=>(0,jsx_runtime.jsx)(Chips,{icon:icon&&(0,jsx_runtime.jsx)(Icon_component.In,{name:icon}),text,...args}),args:{text:"Playground"}},BasicChips={...Template},ClickableChips={...Template,args:{...Template.args,text:"Clickable Chip",icon:"Check",onClick:(0,dist.XI)("Clickable Chip")}},DeletableChips={...Template,args:{...Template.args,icon:"Delete",onRemove:(0,dist.XI)("Deletable Chip"),text:"Deletable"}},DifferentsSizeChips={render:args=>(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(Chips,{text:"Smaller",size:"smaller",...args}),(0,jsx_runtime.jsx)(Chips,{text:"Small",size:"small",...args}),(0,jsx_runtime.jsx)(Chips,{text:"Base",size:"base",...args}),(0,jsx_runtime.jsx)(Chips,{text:"Large",size:"large",...args}),(0,jsx_runtime.jsx)(Chips,{text:"Larger",size:"larger",...args})]}),args:{variant:"statusHealthy",icon:(0,jsx_runtime.jsx)("i",{className:"fas fa-star"}),onClick:(0,dist.XI)("Clickable Chip")}},__namedExportsOrder=["Playground","BasicChips","ClickableChips","DeletableChips","DifferentsSizeChips"];Playground.parameters={...Playground.parameters,docs:{...Playground.parameters?.docs,source:{originalSource:"{\n  render: ({\n    icon,\n    text,\n    ...args\n  }) => {\n    return <Chips icon={icon && <Icon name={icon}></Icon>} text={text} {...args} />;\n  },\n  args: {\n    text: 'Playground'\n  }\n}",...Playground.parameters?.docs?.source}}},BasicChips.parameters={...BasicChips.parameters,docs:{...BasicChips.parameters?.docs,source:{originalSource:"{\n  ...Template\n}",...BasicChips.parameters?.docs?.source}}},ClickableChips.parameters={...ClickableChips.parameters,docs:{...ClickableChips.parameters?.docs,source:{originalSource:"{\n  ...Template,\n  args: {\n    ...Template.args,\n    text: 'Clickable Chip',\n    icon: 'Check',\n    onClick: action('Clickable Chip')\n  }\n}",...ClickableChips.parameters?.docs?.source}}},DeletableChips.parameters={...DeletableChips.parameters,docs:{...DeletableChips.parameters?.docs,source:{originalSource:"{\n  ...Template,\n  args: {\n    ...Template.args,\n    icon: 'Delete',\n    onRemove: action('Deletable Chip'),\n    text: 'Deletable'\n  }\n}",...DeletableChips.parameters?.docs?.source}}},DifferentsSizeChips.parameters={...DifferentsSizeChips.parameters,docs:{...DifferentsSizeChips.parameters?.docs,source:{originalSource:'{\n  render: args => {\n    return <>\n        <Chips text="Smaller" size="smaller" {...args} />\n        <Chips text="Small" size="small" {...args} />\n        <Chips text="Base" size="base" {...args} />\n        <Chips text="Large" size="large" {...args} />\n        <Chips text="Larger" size="larger" {...args} />\n      </>;\n  },\n  args: {\n    variant: \'statusHealthy\',\n    icon: <i className="fas fa-star" />,\n    onClick: action(\'Clickable Chip\')\n  }\n}',...DifferentsSizeChips.parameters?.docs?.source}}}},"./src/lib/components/button/Button.component.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{$n:()=>Button,Ak:()=>ButtonStyled,C3:()=>ButtonText,a2:()=>ButtonIcon});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/jsx-runtime.js"),polished__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/polished/dist/polished.es.js"),styled_components__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),_spacing__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/lib/spacing.tsx"),_style_theme__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/lib/style/theme.ts"),_loader_Loader_component__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/lib/components/loader/Loader.component.tsx");const ButtonStyled=styled_components__WEBPACK_IMPORTED_MODULE_1__.Ay.button`
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
`,Anchor=ButtonStyled.withComponent("a");function Button({text="",href="",icon=null,size="base",variant="buttonPrimary",outlined=!1,disabled=!1,onClick,title="",isLoading=!1,type="button",inverted=!1,...rest}){return href&&href.length?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(Anchor,{className:"sc-button",href,variant,outlined,disabled,size,title,...rest,children:[icon&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ButtonIcon,{text,size,children:icon}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ButtonText,{children:text})]}):(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ButtonStyled,{className:"sc-button",variant,outlined,disabled:disabled||isLoading,size,onClick,title,isLoading,type,inverted,icon,text,...rest,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(ButtonContent,{children:[isLoading&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_loader_Loader_component__WEBPACK_IMPORTED_MODULE_5__.a,{size}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span",{className:"sc-button-text",children:[icon&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ButtonIcon,{text,size,children:icon}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ButtonText,{children:text})]})]})})}try{ButtonStyled.displayName="ButtonStyled",ButtonStyled.__docgenInfo={description:"",displayName:"ButtonStyled",props:{ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"((instance: HTMLButtonElement | null) => void) | RefObject<HTMLButtonElement> | null"}},theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"any"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"undefined"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/lib/components/button/Button.component.tsx#ButtonStyled"]={docgenInfo:ButtonStyled.__docgenInfo,name:"ButtonStyled",path:"src/lib/components/button/Button.component.tsx#ButtonStyled"})}catch(__react_docgen_typescript_loader_error){}try{ButtonIcon.displayName="ButtonIcon",ButtonIcon.__docgenInfo={description:"",displayName:"ButtonIcon",props:{ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"((instance: HTMLSpanElement | null) => void) | RefObject<HTMLSpanElement> | null"}},theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"any"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"undefined"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/lib/components/button/Button.component.tsx#ButtonIcon"]={docgenInfo:ButtonIcon.__docgenInfo,name:"ButtonIcon",path:"src/lib/components/button/Button.component.tsx#ButtonIcon"})}catch(__react_docgen_typescript_loader_error){}try{ButtonText.displayName="ButtonText",ButtonText.__docgenInfo={description:"",displayName:"ButtonText",props:{ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"((instance: HTMLSpanElement | null) => void) | RefObject<HTMLSpanElement> | null"}},theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"any"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"undefined"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/lib/components/button/Button.component.tsx#ButtonText"]={docgenInfo:ButtonText.__docgenInfo,name:"ButtonText",path:"src/lib/components/button/Button.component.tsx#ButtonText"})}catch(__react_docgen_typescript_loader_error){}try{ButtonContent.displayName="ButtonContent",ButtonContent.__docgenInfo={description:"",displayName:"ButtonContent",props:{ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"((instance: HTMLSpanElement | null) => void) | RefObject<HTMLSpanElement> | null"}},theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"any"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"undefined"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/lib/components/button/Button.component.tsx#ButtonContent"]={docgenInfo:ButtonContent.__docgenInfo,name:"ButtonContent",path:"src/lib/components/button/Button.component.tsx#ButtonContent"})}catch(__react_docgen_typescript_loader_error){}try{Button.displayName="Button",Button.__docgenInfo={description:"",displayName:"Button",props:{text:{defaultValue:{value:""},description:"",name:"text",required:!1,type:{name:"string"}},size:{defaultValue:{value:"base"},description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"base"'},{value:'"small"'},{value:'"large"'},{value:'"smaller"'},{value:'"larger"'},{value:'"huge"'},{value:'"massive"'}]}},variant:{defaultValue:{value:"buttonPrimary"},description:"",name:"variant",required:!1,type:{name:"enum",value:[{value:'"backgroundLevel1"'},{value:'"buttonPrimary"'},{value:'"buttonSecondary"'},{value:'"buttonDelete"'}]}},outlined:{defaultValue:{value:"false"},description:"",name:"outlined",required:!1,type:{name:"boolean"}},inverted:{defaultValue:{value:"false"},description:"",name:"inverted",required:!1,type:{name:"boolean"}},disabled:{defaultValue:{value:"false"},description:"",name:"disabled",required:!1,type:{name:"boolean"}},icon:{defaultValue:{value:"null"},description:"",name:"icon",required:!1,type:{name:"Element"}},href:{defaultValue:{value:""},description:"",name:"href",required:!1,type:{name:"string"}},title:{defaultValue:{value:""},description:"",name:"title",required:!1,type:{name:"string"}},type:{defaultValue:{value:"button"},description:"",name:"type",required:!1,type:{name:"string"}},isLoading:{defaultValue:{value:"false"},description:"",name:"isLoading",required:!1,type:{name:"boolean"}},onClick:{defaultValue:null,description:"",name:"onClick",required:!1,type:{name:"((arg0: any) => void)"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/lib/components/button/Button.component.tsx#Button"]={docgenInfo:Button.__docgenInfo,name:"Button",path:"src/lib/components/button/Button.component.tsx#Button"})}catch(__react_docgen_typescript_loader_error){}},"./stories/controls.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Yp:()=>iconArgType,bP:()=>sizesOptions,tg:()=>localeArgtype,vI:()=>variantsOptions,wo:()=>placementOptions});var _src_lib_components_icon_Icon_component__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/lib/components/icon/Icon.component.tsx");const iconOptions=Object.keys(_src_lib_components_icon_Icon_component__WEBPACK_IMPORTED_MODULE_0__._K),sizesOptions=["smaller","small","base","large","larger"],placementOptions=["top","bottom","left","top-start","top-end","right","right-start","right-end","bottom-end","bottom-start","left-start","left-end"],localeArgtype={control:{type:"radio"},options:["en","fr"],description:"Set language for the component"},iconArgType={control:{type:"select"},options:iconOptions,description:"Icon to display with the component",table:{type:{summary:"Element"}}},variantsOptions=["buttonPrimary","buttonSecondary","buttonDelete","backgroundLevel1"]}}]);
//# sourceMappingURL=chips-stories.f2c0ef07.iframe.bundle.js.map