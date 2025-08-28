"use strict";(self.webpackChunk_scality_core_ui=self.webpackChunk_scality_core_ui||[]).push([[58198],{"./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function _objectWithoutPropertiesLoose(r,e){if(null==r)return{};var t={};for(var n in r)if({}.hasOwnProperty.call(r,n)){if(e.includes(n))continue;t[n]=r[n]}return t}__webpack_require__.d(__webpack_exports__,{A:()=>_objectWithoutPropertiesLoose})},"./node_modules/@storybook/addon-actions/dist/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{XI:()=>action});var external_STORYBOOK_MODULE_PREVIEW_API_=__webpack_require__("storybook/internal/preview-api"),external_STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS_=__webpack_require__("storybook/internal/preview-errors"),external_STORYBOOK_MODULE_GLOBAL_=__webpack_require__("@storybook/global"),v4=__webpack_require__("./node_modules/uuid/dist/esm-browser/v4.js"),ADDON_ID="storybook/actions",EVENT_ID=`${ADDON_ID}/action-event`,config={depth:10,clearOnStoryChange:!0,limit:50},findProto=(obj,callback)=>{let proto=Object.getPrototypeOf(obj);return!proto||callback(proto)?proto:findProto(proto,callback)},serializeArg=a=>{if("object"==typeof(e=a)&&e&&findProto(e,(proto=>/^Synthetic(?:Base)?Event$/.test(proto.constructor.name)))&&"function"==typeof e.persist){let e=Object.create(a.constructor.prototype,Object.getOwnPropertyDescriptors(a));e.persist();let viewDescriptor=Object.getOwnPropertyDescriptor(e,"view"),view=viewDescriptor?.value;return"object"==typeof view&&"Window"===view?.constructor.name&&Object.defineProperty(e,"view",{...viewDescriptor,value:Object.create(view.constructor.prototype)}),e}var e;return a},generateId=()=>"object"==typeof crypto&&"function"==typeof crypto.getRandomValues?(0,v4.A)():Date.now().toString(36)+Math.random().toString(36).substring(2);function action(name,options={}){let actionOptions={...config,...options},handler=function(...args){if(options.implicit){let storyRenderer=("__STORYBOOK_PREVIEW__"in external_STORYBOOK_MODULE_GLOBAL_.global?external_STORYBOOK_MODULE_GLOBAL_.global.__STORYBOOK_PREVIEW__:void 0)?.storyRenders.find((render=>"playing"===render.phase||"rendering"===render.phase));if(storyRenderer){let deprecated=!window?.FEATURES?.disallowImplicitActionsInRenderV8,error=new external_STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS_.ImplicitActionsDuringRendering({phase:storyRenderer.phase,name,deprecated});if(!deprecated)throw error;console.warn(error)}}let channel=external_STORYBOOK_MODULE_PREVIEW_API_.addons.getChannel(),id=generateId(),serializedArgs=args.map(serializeArg),normalizedArgs=args.length>1?serializedArgs:serializedArgs[0],actionDisplayToEmit={id,count:0,data:{name,args:normalizedArgs},options:{...actionOptions,maxDepth:5+(actionOptions.depth||3),allowFunction:actionOptions.allowFunction||!1}};channel.emit(EVENT_ID,actionDisplayToEmit)};return handler.isAction=!0,handler.implicit=options.implicit,handler}},"./stories/multiselect.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>multiselect_stories});var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),styled_components_browser_esm=(__webpack_require__("./node_modules/react/index.js"),__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js")),spacing=__webpack_require__("./src/lib/spacing.tsx"),theme=__webpack_require__("./src/lib/style/theme.ts"),utils=__webpack_require__("./src/lib/utils.ts"),Icon_component=__webpack_require__("./src/lib/components/icon/Icon.component.tsx"),Button_component=__webpack_require__("./src/lib/components/button/Button.component.tsx"),Checkbox_component=__webpack_require__("./src/lib/components/checkbox/Checkbox.component.tsx"),Select_component=__webpack_require__("./src/lib/components/select/Select.component.tsx");const MultiSelectContainer=styled_components_browser_esm.Ay.div`
  color: ${(0,utils.sP)("textPrimary")};
`,MultiSelectTitle=styled_components_browser_esm.Ay.h3`
  padding: ${spacing.YK.r16} 0;
  margin: 0;
  font-weight: ${theme.Wy.bold};
  font-size: ${theme.J.large};
`,MultiSelectItemContainer=styled_components_browser_esm.Ay.div`
  margin: ${spacing.YK.r4} 0;
  padding: ${spacing.YK.r8} 0;
  display: flex;
  align-items: center;
  border-bottom: 1px solid gray;
  &:last-child {
    border: none;
  }
`,MultiSelectSearchContainer=styled_components_browser_esm.Ay.div`
  display: flex;
  align-items: center;
  .sc-select-container {
    width: 100%;
  }
  .sc-button {
    margin: 0 ${spacing.YK.r8};
  }
`,MultiSelectItemLeft=styled_components_browser_esm.Ay.div`
  .sc-checkbox,
  .sc-button {
    margin: 0 ${spacing.YK.r8};
  }
`,MultiSelectItemCenter=styled_components_browser_esm.Ay.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: space-between;
`,MultiSelectItemRight=styled_components_browser_esm.Ay.div`
  padding: 0 ${spacing.YK.r16};
`,MultiSelectItemLabel=styled_components_browser_esm.Ay.span`
  font-size: ${theme.J.large};
`,MultiSelectItemDescription=styled_components_browser_esm.Ay.span``;function MultiSelectItem(props){const{selected,label,description,onItemRemove,onSelect}=props;return(0,jsx_runtime.jsxs)(MultiSelectItemContainer,{className:"sc-multi-select-item",children:[(0,jsx_runtime.jsx)(MultiSelectItemLeft,{className:"sc-multi-select-item-left",children:"boolean"==typeof selected&&onSelect&&(0,jsx_runtime.jsx)(Checkbox_component.S,{checked:selected,onChange:event=>onSelect(label,event)})}),(0,jsx_runtime.jsxs)(MultiSelectItemCenter,{className:"sc-multi-select-item-center",children:[(0,jsx_runtime.jsx)(MultiSelectItemLabel,{className:"sc-multi-select-item-label",children:label}),description&&(0,jsx_runtime.jsx)(MultiSelectItemDescription,{className:"sc-multi-select-item-description",children:description})]}),(0,jsx_runtime.jsx)(MultiSelectItemRight,{className:"sc-multi-select-item-right",children:onItemRemove&&(0,jsx_runtime.jsx)(Button_component.$n,{inverted:!0,variant:"buttonDelete",onClick:event=>onItemRemove(label,event),icon:(0,jsx_runtime.jsx)(Icon_component.In,{name:"Delete"})})})]})}function MultiSelectSearch(props){const{selectedOption,onSelect,onAdd,...rest}=props;return(0,jsx_runtime.jsxs)(MultiSelectSearchContainer,{className:"sc-multi-select-list-search",children:[(0,jsx_runtime.jsx)(Select_component.l,{onChange:onSelect,value:selectedOption,...rest}),onAdd&&(0,jsx_runtime.jsx)(Button_component.$n,{onClick:onAdd,icon:(0,jsx_runtime.jsx)(Icon_component.In,{name:"Create-add"})})]})}const MultiSelect=function MultiSelectList({title="",items=[],search,onItemRemove}){return(0,jsx_runtime.jsxs)(MultiSelectContainer,{className:"sc-multi-select-list",children:[title&&(0,jsx_runtime.jsx)(MultiSelectTitle,{children:title}),search&&(0,jsx_runtime.jsx)(MultiSelectSearch,{...search}),items.map(((item,index)=>(0,jsx_runtime.jsx)(MultiSelectItem,{onItemRemove,...item},`sc-multi-select-item-${index}`)))]})};try{MultiSelect.displayName="MultiSelect",MultiSelect.__docgenInfo={description:"",displayName:"MultiSelect",props:{title:{defaultValue:null,description:"",name:"title",required:!1,type:{name:"string"}},items:{defaultValue:null,description:"",name:"items",required:!0,type:{name:"ItemProps[]"}},search:{defaultValue:null,description:"",name:"search",required:!1,type:{name:"SearchProps"}},onItemRemove:{defaultValue:null,description:"",name:"onItemRemove",required:!1,type:{name:"((arg0: any, arg1: any) => void)"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/lib/components/multiselect/MultiSelect.component.tsx#MultiSelect"]={docgenInfo:MultiSelect.__docgenInfo,name:"MultiSelect",path:"src/lib/components/multiselect/MultiSelect.component.tsx#MultiSelect"})}catch(__react_docgen_typescript_loader_error){}var dist=__webpack_require__("./node_modules/@storybook/addon-actions/dist/index.mjs"),common=__webpack_require__("./stories/common.tsx");const items=[{selected:!0,isFavorite:!0,label:"AWS",description:"Amazon",onSelect:(0,dist.XI)("onSelect clicked"),onFavoriteClick:(0,dist.XI)("onFavoriteClick clicked")},{selected:!1,isFavorite:!1,label:"WM",description:"Walmart",onSelect:(0,dist.XI)("onSelect clicked"),onFavoriteClick:(0,dist.XI)("onFavoriteClick clicked")}],itemsWithoutFavourite=[{selected:!0,label:"AWS",description:"Amazon",onSelect:(0,dist.XI)("onSelect clicked")},{selected:!1,label:"WM",description:"Walmart",onSelect:(0,dist.XI)("onSelect clicked")}],itemsWithoutCheckboxFavourite=[{label:"AWS",description:"Amazon"},{label:"WM",description:"Walmart"}],search={placeholder:"Select location to add",options:[{label:"Azure",value:"Azure"},{label:"S3",value:"S3"}],onSelect:(0,dist.XI)("onSelect clicked"),onAdd:(0,dist.XI)("onAdd clicked"),selectedOption:null},multiselect_stories={title:"Components/Deprecated/Selector/MultiSelect",component:MultiSelect},Default={render:({})=>(0,jsx_runtime.jsxs)(common.mO,{children:[(0,jsx_runtime.jsx)(common.hE,{children:"MultiSelect List"}),(0,jsx_runtime.jsx)("div",{className:"storybook-mutiselect-container",children:(0,jsx_runtime.jsx)(MultiSelect,{title:"Destination Locations",items,search,onItemRemove:(0,dist.XI)("onItemRemove clicked")})}),(0,jsx_runtime.jsx)(common.hE,{children:"MultiSelect List without search"}),(0,jsx_runtime.jsx)("div",{className:"storybook-mutiselect-container",children:(0,jsx_runtime.jsx)(MultiSelect,{title:"Destination Locations",items,onItemRemove:(0,dist.XI)("onItemRemove clicked")})}),(0,jsx_runtime.jsx)(common.hE,{children:"MultiSelect List without Favourite"}),(0,jsx_runtime.jsx)("div",{className:"storybook-mutiselect-container",children:(0,jsx_runtime.jsx)(MultiSelect,{title:"Destination Locations",items:itemsWithoutFavourite,search,onItemRemove:(0,dist.XI)("onItemRemove clicked")})}),(0,jsx_runtime.jsx)(common.hE,{children:"MultiSelect List without Favourite and Selectbox"}),(0,jsx_runtime.jsx)("div",{className:"storybook-mutiselect-container",children:(0,jsx_runtime.jsx)(MultiSelect,{title:"Destination Locations",items:itemsWithoutCheckboxFavourite,search,onItemRemove:(0,dist.XI)("onItemRemove clicked")})}),(0,jsx_runtime.jsx)(common.hE,{children:"MultiSelect List without Remove Button, Favourite and Selectbox"}),(0,jsx_runtime.jsx)("div",{className:"storybook-mutiselect-container",children:(0,jsx_runtime.jsx)(MultiSelect,{title:"Destination Locations",items:itemsWithoutCheckboxFavourite,search})}),(0,jsx_runtime.jsx)(common.hE,{children:"MultiSelect List without Title, Remove Button, Favourite and Selectbox"}),(0,jsx_runtime.jsx)("div",{className:"storybook-mutiselect-container",children:(0,jsx_runtime.jsx)(MultiSelect,{items:itemsWithoutCheckboxFavourite,search})})]})},__namedExportsOrder=["Default"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:'{\n  render: ({}) => {\n    return <Wrapper>\n        <Title>MultiSelect List</Title>\n        <div className="storybook-mutiselect-container">\n          <MultiSelect title="Destination Locations" items={items} search={search} onItemRemove={action(\'onItemRemove clicked\')} />\n        </div>\n        <Title>MultiSelect List without search</Title>\n        <div className="storybook-mutiselect-container">\n          <MultiSelect title="Destination Locations" items={items} onItemRemove={action(\'onItemRemove clicked\')} />\n        </div>\n        <Title>MultiSelect List without Favourite</Title>\n        <div className="storybook-mutiselect-container">\n          <MultiSelect title="Destination Locations" items={itemsWithoutFavourite} search={search} onItemRemove={action(\'onItemRemove clicked\')} />\n        </div>\n        <Title>MultiSelect List without Favourite and Selectbox</Title>\n        <div className="storybook-mutiselect-container">\n          <MultiSelect title="Destination Locations" items={itemsWithoutCheckboxFavourite} search={search} onItemRemove={action(\'onItemRemove clicked\')} />\n        </div>\n        <Title>\n          MultiSelect List without Remove Button, Favourite and Selectbox\n        </Title>\n        <div className="storybook-mutiselect-container">\n          <MultiSelect title="Destination Locations" items={itemsWithoutCheckboxFavourite} search={search} />\n        </div>\n        <Title>\n          MultiSelect List without Title, Remove Button, Favourite and Selectbox\n        </Title>\n        <div className="storybook-mutiselect-container">\n          <MultiSelect items={itemsWithoutCheckboxFavourite} search={search} />\n        </div>\n      </Wrapper>;\n  }\n}',...Default.parameters?.docs?.source}}}},"./node_modules/memoize-one/dist/memoize-one.esm.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var safeIsNaN=Number.isNaN||function ponyfill(value){return"number"==typeof value&&value!=value};function areInputsEqual(newInputs,lastInputs){if(newInputs.length!==lastInputs.length)return!1;for(var i=0;i<newInputs.length;i++)if(first=newInputs[i],second=lastInputs[i],!(first===second||safeIsNaN(first)&&safeIsNaN(second)))return!1;var first,second;return!0}const __WEBPACK_DEFAULT_EXPORT__=function memoizeOne(resultFn,isEqual){var lastThis;void 0===isEqual&&(isEqual=areInputsEqual);var lastResult,lastArgs=[],calledOnce=!1;return function memoized(){for(var newArgs=[],_i=0;_i<arguments.length;_i++)newArgs[_i]=arguments[_i];return calledOnce&&lastThis===this&&isEqual(newArgs,lastArgs)||(lastResult=resultFn.apply(this,newArgs),calledOnce=!0,lastThis=this,lastArgs=newArgs),lastResult}}},"./src/lib/components/button/Button.component.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{$n:()=>Button,Ak:()=>ButtonStyled,C3:()=>ButtonText,a2:()=>ButtonIcon});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/jsx-runtime.js"),polished__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/polished/dist/polished.es.js"),styled_components__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),_spacing__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/lib/spacing.tsx"),_style_theme__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/lib/style/theme.ts"),_loader_Loader_component__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/lib/components/loader/Loader.component.tsx");const ButtonStyled=styled_components__WEBPACK_IMPORTED_MODULE_1__.Ay.button`
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
`,Anchor=ButtonStyled.withComponent("a");function Button({text="",href="",icon=null,size="base",variant="buttonPrimary",outlined=!1,disabled=!1,onClick,title="",isLoading=!1,type="button",inverted=!1,...rest}){return href&&href.length?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(Anchor,{className:"sc-button",href,variant,outlined,disabled,size,title,...rest,children:[icon&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ButtonIcon,{text,size,children:icon}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ButtonText,{children:text})]}):(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ButtonStyled,{className:"sc-button",variant,outlined,disabled:disabled||isLoading,size,onClick,title,isLoading,type,inverted,icon,text,...rest,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(ButtonContent,{children:[isLoading&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_loader_Loader_component__WEBPACK_IMPORTED_MODULE_5__.a,{size}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span",{className:"sc-button-text",children:[icon&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ButtonIcon,{text,size,children:icon}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ButtonText,{children:text})]})]})})}try{ButtonStyled.displayName="ButtonStyled",ButtonStyled.__docgenInfo={description:"",displayName:"ButtonStyled",props:{ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"((instance: HTMLButtonElement | null) => void) | RefObject<HTMLButtonElement> | null"}},theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"any"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"undefined"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/lib/components/button/Button.component.tsx#ButtonStyled"]={docgenInfo:ButtonStyled.__docgenInfo,name:"ButtonStyled",path:"src/lib/components/button/Button.component.tsx#ButtonStyled"})}catch(__react_docgen_typescript_loader_error){}try{ButtonIcon.displayName="ButtonIcon",ButtonIcon.__docgenInfo={description:"",displayName:"ButtonIcon",props:{ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"((instance: HTMLSpanElement | null) => void) | RefObject<HTMLSpanElement> | null"}},theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"any"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"undefined"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/lib/components/button/Button.component.tsx#ButtonIcon"]={docgenInfo:ButtonIcon.__docgenInfo,name:"ButtonIcon",path:"src/lib/components/button/Button.component.tsx#ButtonIcon"})}catch(__react_docgen_typescript_loader_error){}try{ButtonText.displayName="ButtonText",ButtonText.__docgenInfo={description:"",displayName:"ButtonText",props:{ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"((instance: HTMLSpanElement | null) => void) | RefObject<HTMLSpanElement> | null"}},theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"any"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"undefined"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/lib/components/button/Button.component.tsx#ButtonText"]={docgenInfo:ButtonText.__docgenInfo,name:"ButtonText",path:"src/lib/components/button/Button.component.tsx#ButtonText"})}catch(__react_docgen_typescript_loader_error){}try{ButtonContent.displayName="ButtonContent",ButtonContent.__docgenInfo={description:"",displayName:"ButtonContent",props:{ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"((instance: HTMLSpanElement | null) => void) | RefObject<HTMLSpanElement> | null"}},theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"any"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"undefined"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/lib/components/button/Button.component.tsx#ButtonContent"]={docgenInfo:ButtonContent.__docgenInfo,name:"ButtonContent",path:"src/lib/components/button/Button.component.tsx#ButtonContent"})}catch(__react_docgen_typescript_loader_error){}try{Button.displayName="Button",Button.__docgenInfo={description:"",displayName:"Button",props:{text:{defaultValue:{value:""},description:"",name:"text",required:!1,type:{name:"string"}},size:{defaultValue:{value:"base"},description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"base"'},{value:'"small"'},{value:'"large"'},{value:'"smaller"'},{value:'"larger"'},{value:'"huge"'},{value:'"massive"'}]}},variant:{defaultValue:{value:"buttonPrimary"},description:"",name:"variant",required:!1,type:{name:"enum",value:[{value:'"backgroundLevel1"'},{value:'"buttonPrimary"'},{value:'"buttonSecondary"'},{value:'"buttonDelete"'}]}},outlined:{defaultValue:{value:"false"},description:"",name:"outlined",required:!1,type:{name:"boolean"}},inverted:{defaultValue:{value:"false"},description:"",name:"inverted",required:!1,type:{name:"boolean"}},disabled:{defaultValue:{value:"false"},description:"",name:"disabled",required:!1,type:{name:"boolean"}},icon:{defaultValue:{value:"null"},description:"",name:"icon",required:!1,type:{name:"Element"}},href:{defaultValue:{value:""},description:"",name:"href",required:!1,type:{name:"string"}},title:{defaultValue:{value:""},description:"",name:"title",required:!1,type:{name:"string"}},type:{defaultValue:{value:"button"},description:"",name:"type",required:!1,type:{name:"string"}},isLoading:{defaultValue:{value:"false"},description:"",name:"isLoading",required:!1,type:{name:"boolean"}},onClick:{defaultValue:null,description:"",name:"onClick",required:!1,type:{name:"((arg0: any) => void)"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/lib/components/button/Button.component.tsx#Button"]={docgenInfo:Button.__docgenInfo,name:"Button",path:"src/lib/components/button/Button.component.tsx#Button"})}catch(__react_docgen_typescript_loader_error){}},"./src/lib/components/checkbox/Checkbox.component.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{S:()=>Checkbox});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/jsx-runtime.js"),react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/index.js"),styled_components__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),_spacing__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/lib/spacing.tsx"),_text_Text_component__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/lib/components/text/Text.component.tsx"),_buttonv2_Buttonv2_component__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/lib/components/buttonv2/Buttonv2.component.tsx");const Checkbox=(0,react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)((({disabled,checked,label,value,onChange,...rest},ref)=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(StyledCheckbox,{checked,disabled,className:"sc-checkbox",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_spacing__WEBPACK_IMPORTED_MODULE_2__.BJ,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input",{type:"checkbox",checked,disabled,value,onChange,ref,...rest}),label&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_text_Text_component__WEBPACK_IMPORTED_MODULE_3__.EY,{children:label})]})}))),StyledCheckbox=styled_components__WEBPACK_IMPORTED_MODULE_4__.Ay.label`
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
    border-radius: ${_spacing__WEBPACK_IMPORTED_MODULE_2__.YK.r2};
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
    box-shadow: inset 0 0 0 ${_spacing__WEBPACK_IMPORTED_MODULE_2__.YK.r1}
      ${props=>props.theme.textSecondary};
  }

  /* Checked */

  [type='checkbox']:checked {
    background-color: ${props=>props.theme.selectedActive};
  }

  [type='checkbox']:checked::before {
    box-shadow: none;
    background-image: url('data:image/svg+xml,%3Csvg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg"%3E %3Cpath d="M3 6.68646L5.0671 9L9 3" stroke="${props=>props.theme.textPrimary.replace("#","%23")}" stroke-width="1.5"/%3E %3C/svg%3E');
    background-repeat: no-repeat;
    background-position: center;
  }

  /* Indeterminate */

  [type='checkbox']:indeterminate::before {
    box-shadow: inset 0 0 0 ${_spacing__WEBPACK_IMPORTED_MODULE_2__.YK.r1}
      ${props=>props.theme.selectedActive};
    background-color: ${props=>props.theme.highlight};
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E %3Cline x1='6' y1='12' x2='20' y2='12' style='stroke:${props=>props.theme.textPrimary.replace("#","%23")};stroke-width:4'/%3E %3C/svg%3E");
  }

  /* Hover & focus */
  [type='checkbox']:hover {
    ${props=>!props.disabled&&`background-color: ${props.theme.highlight};`}
  }

  [type='checkbox']:hover::before {
    ${props=>!props.disabled&&`box-shadow: inset 0 0 0 ${_spacing__WEBPACK_IMPORTED_MODULE_2__.YK.r1} ${props.theme.selectedActive};`}
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
`;try{Checkbox.displayName="Checkbox",Checkbox.__docgenInfo={description:"",displayName:"Checkbox",props:{label:{defaultValue:null,description:"",name:"label",required:!1,type:{name:"string"}},value:{defaultValue:null,description:"",name:"value",required:!1,type:{name:"string | (string & readonly string[])"}},checked:{defaultValue:null,description:"",name:"checked",required:!1,type:{name:"boolean"}},disabled:{defaultValue:null,description:"",name:"disabled",required:!1,type:{name:"boolean"}},onChange:{defaultValue:null,description:"",name:"onChange",required:!1,type:{name:"(((e: ChangeEvent<HTMLInputElement>) => void) & ChangeEventHandler<HTMLInputElement>)"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/lib/components/checkbox/Checkbox.component.tsx#Checkbox"]={docgenInfo:Checkbox.__docgenInfo,name:"Checkbox",path:"src/lib/components/checkbox/Checkbox.component.tsx#Checkbox"})}catch(__react_docgen_typescript_loader_error){}},"./src/lib/components/select/Select.component.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{l:()=>Select});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/jsx-runtime.js"),react_select__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/react-select/dist/react-select.esm.js"),styled_components__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),_style_theme__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/lib/style/theme.ts"),_utils__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/lib/utils.ts");const SelectContainer=styled_components__WEBPACK_IMPORTED_MODULE_1__.Ay.div`
  font-size: ${_style_theme__WEBPACK_IMPORTED_MODULE_2__.J.base};
  .sc-select__control {
    background-color: ${(0,_utils__WEBPACK_IMPORTED_MODULE_3__.sP)("backgroundLevel1")};
    border-radius: 4px;
    border: 1px solid ${(0,_utils__WEBPACK_IMPORTED_MODULE_3__.sP)("border")};
    height: auto;

    .sc-select__placeholder,
    .sc-select__single-value {
      color: ${(0,_utils__WEBPACK_IMPORTED_MODULE_3__.sP)("textSecondary")};
    }
    &.sc-select__control--is-focused {
      border-color: ${(0,_utils__WEBPACK_IMPORTED_MODULE_3__.sP)("selectedActive")};
      box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
        0 0 0 1px rgba(0, 126, 255, 0.1);
      outline: none;
    }
    .sc-select__indicator {
      color: ${(0,_utils__WEBPACK_IMPORTED_MODULE_3__.sP)("textSecondary")};
      &.sc-select__dropdown-indicator:hover {
        color: ${(0,_utils__WEBPACK_IMPORTED_MODULE_3__.sP)("selectedActive")};
      }
      &.sc-select__clear-indicator:hover {
        color: ${_style_theme__WEBPACK_IMPORTED_MODULE_2__.wm};
      }
    }
    .sc-select__multi-value__remove {
      border-radius: 0;
      color: ${(0,_utils__WEBPACK_IMPORTED_MODULE_3__.sP)("textSecondary")};
      background-color: ${(0,_utils__WEBPACK_IMPORTED_MODULE_3__.sP)("backgroundLevel4")};
      &:hover {
        color: ${_style_theme__WEBPACK_IMPORTED_MODULE_2__.wm};
      }
    }
    .sc-select__multi-value__label {
      border-radius: 0;
      color: ${(0,_utils__WEBPACK_IMPORTED_MODULE_3__.sP)("selectedActive")};
      background-color: ${(0,_utils__WEBPACK_IMPORTED_MODULE_3__.sP)("backgroundLevel4")};
      vertical-align: initial;
    }
  }
  .sc-select__menu {
    background-color: ${(0,_utils__WEBPACK_IMPORTED_MODULE_3__.sP)("backgroundLevel1")};
    color: ${(0,_utils__WEBPACK_IMPORTED_MODULE_3__.sP)("textSecondary")};
    border: 1px solid ${(0,_utils__WEBPACK_IMPORTED_MODULE_3__.sP)("selectedActive")};
    box-sizing: border-box;
    overflow: hidden;
    z-index: ${_style_theme__WEBPACK_IMPORTED_MODULE_2__.fE.dropdown};
    .sc-select__option {
      &.sc-select__option--is-focused {
        background-color: ${(0,_utils__WEBPACK_IMPORTED_MODULE_3__.sP)("backgroundLevel1")};
      }
      &.sc-select__option--is-selected {
        background-color: ${(0,_utils__WEBPACK_IMPORTED_MODULE_3__.sP)("backgroundLevel1")};
        color: ${(0,_utils__WEBPACK_IMPORTED_MODULE_3__.sP)("selectedActive")};
        font-weight: ${_style_theme__WEBPACK_IMPORTED_MODULE_2__.Wy.bold};
      }
    }
  }
`,defaultFormatOptionLabel=({label,...rest})=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div",{className:"sc-select-option-label",...rest,children:label});const Select=function SelectBox({options,formatOptionLabel,...rest}){return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(SelectContainer,{className:"sc-select-container",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_select__WEBPACK_IMPORTED_MODULE_4__.Ay,{className:"sc-select",classNamePrefix:"sc-select",options,formatOptionLabel:formatOptionLabel||defaultFormatOptionLabel,...rest})})};try{Select.displayName="Select",Select.__docgenInfo={description:"",displayName:"Select",props:{id:{defaultValue:null,description:"",name:"id",required:!1,type:{name:"any"}},options:{defaultValue:null,description:"",name:"options",required:!0,type:{name:"Items"}},formatOptionLabel:{defaultValue:null,description:"",name:"formatOptionLabel",required:!1,type:{name:"((arg0: any) => Element)"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/lib/components/select/Select.component.tsx#Select"]={docgenInfo:Select.__docgenInfo,name:"Select",path:"src/lib/components/select/Select.component.tsx#Select"})}catch(__react_docgen_typescript_loader_error){}}}]);
//# sourceMappingURL=multiselect-stories.28a81cbf.iframe.bundle.js.map