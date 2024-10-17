"use strict";(self.webpackChunk_scality_core_ui=self.webpackChunk_scality_core_ui||[]).push([[45889],{"./node_modules/@storybook/addon-actions/dist/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{XI:()=>action});var v4=__webpack_require__("./node_modules/@storybook/addon-actions/node_modules/uuid/dist/esm-browser/v4.js"),external_STORYBOOK_MODULE_PREVIEW_API_=__webpack_require__("@storybook/preview-api"),external_STORYBOOK_MODULE_GLOBAL_=__webpack_require__("@storybook/global"),preview_errors=__webpack_require__("./node_modules/@storybook/core-events/dist/errors/preview-errors.mjs"),ADDON_ID="storybook/actions",EVENT_ID=`${ADDON_ID}/action-event`,config={depth:10,clearOnStoryChange:!0,limit:50},findProto=(obj,callback)=>{let proto=Object.getPrototypeOf(obj);return!proto||callback(proto)?proto:findProto(proto,callback)},serializeArg=a=>{if("object"==typeof(e=a)&&e&&findProto(e,(proto=>/^Synthetic(?:Base)?Event$/.test(proto.constructor.name)))&&"function"==typeof e.persist){let e=Object.create(a.constructor.prototype,Object.getOwnPropertyDescriptors(a));e.persist();let viewDescriptor=Object.getOwnPropertyDescriptor(e,"view"),view=viewDescriptor?.value;return"object"==typeof view&&"Window"===view?.constructor.name&&Object.defineProperty(e,"view",{...viewDescriptor,value:Object.create(view.constructor.prototype)}),e}var e;return a},generateId=()=>"object"==typeof crypto&&"function"==typeof crypto.getRandomValues?(0,v4.A)():Date.now().toString(36)+Math.random().toString(36).substring(2);function action(name,options={}){let actionOptions={...config,...options},handler=function(...args){if(options.implicit){let storyRenderer=("__STORYBOOK_PREVIEW__"in external_STORYBOOK_MODULE_GLOBAL_.global?external_STORYBOOK_MODULE_GLOBAL_.global.__STORYBOOK_PREVIEW__:void 0)?.storyRenders.find((render=>"playing"===render.phase||"rendering"===render.phase));if(storyRenderer){let deprecated=!window?.FEATURES?.disallowImplicitActionsInRenderV8,error=new preview_errors._U({phase:storyRenderer.phase,name,deprecated});if(!deprecated)throw error;console.warn(error)}}let channel=external_STORYBOOK_MODULE_PREVIEW_API_.addons.getChannel(),id=generateId(),serializedArgs=args.map(serializeArg),normalizedArgs=args.length>1?serializedArgs:serializedArgs[0],actionDisplayToEmit={id,count:0,data:{name,args:normalizedArgs},options:{...actionOptions,maxDepth:5+(actionOptions.depth||3),allowFunction:actionOptions.allowFunction||!1}};channel.emit(EVENT_ID,actionDisplayToEmit)};return handler.isAction=!0,handler}},"./stories/sidebar.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{DefaultSidebar:()=>DefaultSidebar,ExpandedSidebar:()=>ExpandedSidebar,HoverableSidebar:()=>HoverableSidebar,SidebarInLayout:()=>SidebarInLayout,SidebarWithToggle:()=>SidebarWithToggle,SidebarinLayoutWithToggle:()=>SidebarinLayoutWithToggle,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _storybook_addon_actions__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/addon-actions/dist/index.mjs"),_storybook_preview_api__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("@storybook/preview-api"),react__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/index.js"),_src_lib__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/lib/components/lateralnavbarlayout/LateralNavbarLayout.component.tsx"),_src_lib__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./src/lib/components/loader/Loader.component.tsx"),_src_lib_components_sidebar_Sidebar_component__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/lib/components/sidebar/Sidebar.component.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/react/jsx-runtime.js");function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,o)}return t}function _objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(Object(t),!0).forEach((function(r){_defineProperty(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function _defineProperty(obj,key,value){return(key=function _toPropertyKey(t){var i=function _toPrimitive(t,r){if("object"!=typeof t||!t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var i=e.call(t,r||"default");if("object"!=typeof i)return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===r?String:Number)(t)}(t,"string");return"symbol"==typeof i?i:String(i)}(key))in obj?Object.defineProperty(obj,key,{value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}var actions=[{label:"Dashboard",icon:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("i",{className:"fas fa-tachometer-alt"}),onClick:(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_0__.XI)("dashboard clicked"),active:!0},{label:"Servers",icon:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("i",{className:"fas fa-server"}),onClick:(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_0__.XI)("server clicked")},{label:"Disks",icon:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("i",{className:"fas fa-hdd"}),onClick:(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_0__.XI)("disk clicked")}];const __WEBPACK_DEFAULT_EXPORT__={title:"Components/Navigation/Sidebar",component:_src_lib_components_sidebar_Sidebar_component__WEBPACK_IMPORTED_MODULE_4__.B,args:{actions},parameters:{storySource:{source:"import { action } from '@storybook/addon-actions';\nimport { useArgs } from '@storybook/preview-api';\nimport { Meta, StoryObj } from '@storybook/react';\nimport React, { useState } from 'react';\nimport { LateralNavbarLayout, Loader } from '../src/lib';\nimport { Sidebar } from '../src/lib/components/sidebar/Sidebar.component';\n\ntype Story = StoryObj<typeof Sidebar>;\n\nconst actions = [\n  {\n    label: 'Dashboard',\n    icon: <i className=\"fas fa-tachometer-alt\" />,\n    onClick: action('dashboard clicked'),\n    active: true,\n  },\n  {\n    label: 'Servers',\n    icon: <i className=\"fas fa-server\" />,\n    onClick: action('server clicked'),\n  },\n  {\n    label: 'Disks',\n    icon: <i className=\"fas fa-hdd\" />,\n    onClick: action('disk clicked'),\n  },\n];\n\nconst meta: Meta<typeof Sidebar> = {\n  title: 'Components/Navigation/Sidebar',\n  component: Sidebar,\n  args: {\n    actions,\n  },\n  parameters: {\n    layout: 'fullscreen',\n  },\n};\nexport default meta;\n\nexport const DefaultSidebar: Story = {};\n\nexport const ExpandedSidebar: Story = {\n  args: {\n    expanded: true,\n  },\n};\n\nexport const SidebarWithToggle: Story = {\n  render: (args) => {\n    const [{ expanded }, updateArgs] = useArgs();\n    return (\n      <Sidebar\n        expanded={expanded}\n        onToggleClick={() => updateArgs({ expanded: !expanded })}\n        {...args}\n      />\n    );\n  },\n};\n\nexport const HoverableSidebar: Story = {\n  args: {\n    hoverable: true,\n  },\n};\n\nexport const SidebarInLayout: StoryObj<typeof Sidebar> = {\n  render: (args) => {\n    return (\n      <LateralNavbarLayout sidebar={{ ...args }}>\n        <Loader size=\"massive\" />\n      </LateralNavbarLayout>\n    );\n  },\n};\n\nexport const SidebarinLayoutWithToggle: Story = {\n  render: (args) => {\n    const [expandedWithToggle, setExpandedWithToggle] = useState(false);\n    return (\n      <LateralNavbarLayout\n        sidebar={{\n          expanded: expandedWithToggle,\n          onToggleClick: () => {\n            setExpandedWithToggle(!expandedWithToggle);\n          },\n          ...args,\n        }}\n      >\n        <Loader size=\"massive\" />\n      </LateralNavbarLayout>\n    );\n  },\n};\n",locationsMap:{"default-sidebar":{startLoc:{col:37,line:41},endLoc:{col:39,line:41},startBody:{col:37,line:41},endBody:{col:39,line:41}},"expanded-sidebar":{startLoc:{col:38,line:43},endLoc:{col:1,line:47},startBody:{col:38,line:43},endBody:{col:1,line:47}},"sidebar-with-toggle":{startLoc:{col:40,line:49},endLoc:{col:1,line:60},startBody:{col:40,line:49},endBody:{col:1,line:60}},"hoverable-sidebar":{startLoc:{col:39,line:62},endLoc:{col:1,line:66},startBody:{col:39,line:62},endBody:{col:1,line:66}},"sidebar-in-layout":{startLoc:{col:57,line:68},endLoc:{col:1,line:76},startBody:{col:57,line:68},endBody:{col:1,line:76}},"sidebarin-layout-with-toggle":{startLoc:{col:48,line:78},endLoc:{col:1,line:95},startBody:{col:48,line:78},endBody:{col:1,line:95}}}},layout:"fullscreen"}};var DefaultSidebar={},ExpandedSidebar={args:{expanded:!0}},SidebarWithToggle={render:args=>{var[{expanded},updateArgs]=(0,_storybook_preview_api__WEBPACK_IMPORTED_MODULE_1__.useArgs)();return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_src_lib_components_sidebar_Sidebar_component__WEBPACK_IMPORTED_MODULE_4__.B,_objectSpread({expanded,onToggleClick:()=>updateArgs({expanded:!expanded})},args))}},HoverableSidebar={args:{hoverable:!0}},SidebarInLayout={render:args=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_src_lib__WEBPACK_IMPORTED_MODULE_5__.u,{sidebar:_objectSpread({},args),children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_src_lib__WEBPACK_IMPORTED_MODULE_6__.a,{size:"massive"})})},SidebarinLayoutWithToggle={render:args=>{var[expandedWithToggle,setExpandedWithToggle]=(0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(!1);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_src_lib__WEBPACK_IMPORTED_MODULE_5__.u,{sidebar:_objectSpread({expanded:expandedWithToggle,onToggleClick:()=>{setExpandedWithToggle(!expandedWithToggle)}},args),children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_src_lib__WEBPACK_IMPORTED_MODULE_6__.a,{size:"massive"})})}};DefaultSidebar.parameters={...DefaultSidebar.parameters,docs:{...DefaultSidebar.parameters?.docs,source:{originalSource:"{}",...DefaultSidebar.parameters?.docs?.source}}},ExpandedSidebar.parameters={...ExpandedSidebar.parameters,docs:{...ExpandedSidebar.parameters?.docs,source:{originalSource:"{\n  args: {\n    expanded: true\n  }\n}",...ExpandedSidebar.parameters?.docs?.source}}},SidebarWithToggle.parameters={...SidebarWithToggle.parameters,docs:{...SidebarWithToggle.parameters?.docs,source:{originalSource:"{\n  render: args => {\n    const [{\n      expanded\n    }, updateArgs] = useArgs();\n    return <Sidebar expanded={expanded} onToggleClick={() => updateArgs({\n      expanded: !expanded\n    })} {...args} />;\n  }\n}",...SidebarWithToggle.parameters?.docs?.source}}},HoverableSidebar.parameters={...HoverableSidebar.parameters,docs:{...HoverableSidebar.parameters?.docs,source:{originalSource:"{\n  args: {\n    hoverable: true\n  }\n}",...HoverableSidebar.parameters?.docs?.source}}},SidebarInLayout.parameters={...SidebarInLayout.parameters,docs:{...SidebarInLayout.parameters?.docs,source:{originalSource:'{\n  render: args => {\n    return <LateralNavbarLayout sidebar={{\n      ...args\n    }}>\n        <Loader size="massive" />\n      </LateralNavbarLayout>;\n  }\n}',...SidebarInLayout.parameters?.docs?.source}}},SidebarinLayoutWithToggle.parameters={...SidebarinLayoutWithToggle.parameters,docs:{...SidebarinLayoutWithToggle.parameters?.docs,source:{originalSource:'{\n  render: args => {\n    const [expandedWithToggle, setExpandedWithToggle] = useState(false);\n    return <LateralNavbarLayout sidebar={{\n      expanded: expandedWithToggle,\n      onToggleClick: () => {\n        setExpandedWithToggle(!expandedWithToggle);\n      },\n      ...args\n    }}>\n        <Loader size="massive" />\n      </LateralNavbarLayout>;\n  }\n}',...SidebarinLayoutWithToggle.parameters?.docs?.source}}};const __namedExportsOrder=["DefaultSidebar","ExpandedSidebar","SidebarWithToggle","HoverableSidebar","SidebarInLayout","SidebarinLayoutWithToggle"]},"./src/lib/components/lateralnavbarlayout/LateralNavbarLayout.component.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{u:()=>LateralNavbarLayout});__webpack_require__("./node_modules/react/index.js");var _templateObject,_templateObject2,_templateObject3,styled_components__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),_sidebar_Sidebar_component__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/lib/components/sidebar/Sidebar.component.tsx"),_utils__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/lib/utils.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js"),_excluded=["children","sidebar"];function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,o)}return t}function _objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(Object(t),!0).forEach((function(r){_defineProperty(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function _defineProperty(obj,key,value){return(key=function _toPropertyKey(t){var i=function _toPrimitive(t,r){if("object"!=typeof t||!t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var i=e.call(t,r||"default");if("object"!=typeof i)return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===r?String:Number)(t)}(t,"string");return"symbol"==typeof i?i:String(i)}(key))in obj?Object.defineProperty(obj,key,{value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}function _objectWithoutProperties(source,excluded){if(null==source)return{};var key,i,target=function _objectWithoutPropertiesLoose(source,excluded){if(null==source)return{};var key,i,target={},sourceKeys=Object.keys(source);for(i=0;i<sourceKeys.length;i++)key=sourceKeys[i],excluded.indexOf(key)>=0||(target[key]=source[key]);return target}(source,excluded);if(Object.getOwnPropertySymbols){var sourceSymbolKeys=Object.getOwnPropertySymbols(source);for(i=0;i<sourceSymbolKeys.length;i++)key=sourceSymbolKeys[i],excluded.indexOf(key)>=0||Object.prototype.propertyIsEnumerable.call(source,key)&&(target[key]=source[key])}return target}function _taggedTemplateLiteral(strings,raw){return raw||(raw=strings.slice(0)),Object.freeze(Object.defineProperties(strings,{raw:{value:Object.freeze(raw)}}))}var LateralNavbarLayoutContainer=styled_components__WEBPACK_IMPORTED_MODULE_2__.Ay.div(_templateObject||(_templateObject=_taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n  height: 100vh;\n  width: 100vw;\n"]))),ContentContainer=styled_components__WEBPACK_IMPORTED_MODULE_2__.Ay.div(_templateObject2||(_templateObject2=_taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: row;\n  height: 100vh;\n"]))),MainContent=styled_components__WEBPACK_IMPORTED_MODULE_2__.Ay.div(_templateObject3||(_templateObject3=_taggedTemplateLiteral(["\n  flex-grow: 1;\n  background-color: ",";\n"])),(0,_utils__WEBPACK_IMPORTED_MODULE_3__.sP)("backgroundLevel1"));function LateralNavbarLayout(_ref){var{children,sidebar}=_ref,rest=_objectWithoutProperties(_ref,_excluded);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(LateralNavbarLayoutContainer,_objectSpread(_objectSpread({className:"sc-lateralnavbarlayout"},rest),{},{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(ContentContainer,{children:[sidebar&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_sidebar_Sidebar_component__WEBPACK_IMPORTED_MODULE_4__.B,_objectSpread({},sidebar)),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(MainContent,{className:"main",children})]})}))}LateralNavbarLayout.displayName="LateralNavbarLayout";try{LateralNavbarLayout.displayName="LateralNavbarLayout",LateralNavbarLayout.__docgenInfo={description:"",displayName:"LateralNavbarLayout",props:{sidebar:{defaultValue:null,description:"",name:"sidebar",required:!0,type:{name:"Props"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/lib/components/lateralnavbarlayout/LateralNavbarLayout.component.tsx#LateralNavbarLayout"]={docgenInfo:LateralNavbarLayout.__docgenInfo,name:"LateralNavbarLayout",path:"src/lib/components/lateralnavbarlayout/LateralNavbarLayout.component.tsx#LateralNavbarLayout"})}catch(__react_docgen_typescript_loader_error){}},"./src/lib/components/sidebar/Sidebar.component.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{B:()=>Sidebar});var _templateObject,_templateObject2,_templateObject3,_templateObject4,_templateObject5,_templateObject6,_templateObject7,_templateObject8,_templateObject9,_templateObject10,_templateObject11,_templateObject12,_templateObject13,_templateObject14,_templateObject15,react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),styled_components__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),_style_theme__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/lib/style/theme.ts"),_buttonv2_Buttonv2_component__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/lib/components/buttonv2/Buttonv2.component.tsx"),_icon_Icon_component__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./src/lib/components/icon/Icon.component.tsx"),_spacing__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/lib/spacing.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js"),_excluded=["expanded","actions","onToggleClick","hoverable"],_excluded2=["active","label","onClick","icon"];function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,o)}return t}function _objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(Object(t),!0).forEach((function(r){_defineProperty(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function _defineProperty(obj,key,value){return(key=function _toPropertyKey(t){var i=function _toPrimitive(t,r){if("object"!=typeof t||!t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var i=e.call(t,r||"default");if("object"!=typeof i)return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===r?String:Number)(t)}(t,"string");return"symbol"==typeof i?i:String(i)}(key))in obj?Object.defineProperty(obj,key,{value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}function _objectWithoutProperties(source,excluded){if(null==source)return{};var key,i,target=function _objectWithoutPropertiesLoose(source,excluded){if(null==source)return{};var key,i,target={},sourceKeys=Object.keys(source);for(i=0;i<sourceKeys.length;i++)key=sourceKeys[i],excluded.indexOf(key)>=0||(target[key]=source[key]);return target}(source,excluded);if(Object.getOwnPropertySymbols){var sourceSymbolKeys=Object.getOwnPropertySymbols(source);for(i=0;i<sourceSymbolKeys.length;i++)key=sourceSymbolKeys[i],excluded.indexOf(key)>=0||Object.prototype.propertyIsEnumerable.call(source,key)&&(target[key]=source[key])}return target}function _taggedTemplateLiteral(strings,raw){return raw||(raw=strings.slice(0)),Object.freeze(Object.defineProperties(strings,{raw:{value:Object.freeze(raw)}}))}var Wrapper=styled_components__WEBPACK_IMPORTED_MODULE_2__.Ay.div(_templateObject||(_templateObject=_taggedTemplateLiteral(["\n  margin-top: 1px;\n  flex-shrink: 0;\n  ","\n  border-right: 1px solid ",";\n  ","\n\n  ","\n"])),(props=>{var{backgroundLevel1,textPrimary}=props.theme;return(0,styled_components__WEBPACK_IMPORTED_MODULE_2__.AH)(_templateObject2||(_templateObject2=_taggedTemplateLiteral(["\n      background-color: ",";\n      color: ",";\n      .fas {\n        color: ",";\n      }\n    "])),backgroundLevel1,textPrimary,textPrimary)}),(props=>props.theme.backgroundLevel3),(props=>props.expanded?(0,styled_components__WEBPACK_IMPORTED_MODULE_2__.AH)(_templateObject3||(_templateObject3=_taggedTemplateLiteral(["\n        width: auto;\n      "]))):(0,styled_components__WEBPACK_IMPORTED_MODULE_2__.AH)(_templateObject4||(_templateObject4=_taggedTemplateLiteral(["\n      width: ",";\n    "])),_style_theme__WEBPACK_IMPORTED_MODULE_3__.NE)),(props=>{var{backgroundLevel1}=props.theme;if(props.hoverable&&props.hovered&&!props.expanded)return(0,styled_components__WEBPACK_IMPORTED_MODULE_2__.AH)(_templateObject5||(_templateObject5=_taggedTemplateLiteral(["\n        .sc-sidebar {\n          position: relative;\n          width: fit-content;\n          height: 100%;\n          background-color: ",";\n          z-index: ",";\n          border-right: 1px solid ",";\n        }\n      "])),backgroundLevel1,_style_theme__WEBPACK_IMPORTED_MODULE_3__.fE.sidebar,(props=>props.theme.backgroundLevel3))})),SidebarContainer=styled_components__WEBPACK_IMPORTED_MODULE_2__.Ay.div(_templateObject6||(_templateObject6=_taggedTemplateLiteral(["\n  ","\n\n  ","\n\n  .sc-button {\n    border-radius: 0;\n    background-color: ",";\n    color: ",";\n    &:hover {\n      background-color: ",";\n    }\n    &:focus-visible {\n      ","\n    }\n    height: ",";\n    width: ",";\n    padding: 0px;\n  }\n"])),(props=>{var{backgroundLevel1}=props.theme;return(0,styled_components__WEBPACK_IMPORTED_MODULE_2__.AH)(_templateObject7||(_templateObject7=_taggedTemplateLiteral(["\n      background-color: ",";\n    "])),backgroundLevel1)}),(props=>props.expanded||props.hoverable&&props.hovered&&!props.expanded?(0,styled_components__WEBPACK_IMPORTED_MODULE_2__.AH)(_templateObject8||(_templateObject8=_taggedTemplateLiteral(["\n        width: auto;\n      "]))):(0,styled_components__WEBPACK_IMPORTED_MODULE_2__.AH)(_templateObject9||(_templateObject9=_taggedTemplateLiteral(["\n      width: ",";\n    "])),_style_theme__WEBPACK_IMPORTED_MODULE_3__.NE)),(props=>props.theme.backgroundLevel1),(props=>props.theme.textPrimary),(props=>props.theme.highlight),_buttonv2_Buttonv2_component__WEBPACK_IMPORTED_MODULE_4__.kD,_style_theme__WEBPACK_IMPORTED_MODULE_3__.FB,_style_theme__WEBPACK_IMPORTED_MODULE_3__.NE),SidebarItem=styled_components__WEBPACK_IMPORTED_MODULE_2__.Ay.div(_templateObject10||(_templateObject10=_taggedTemplateLiteral(["\n  position: relative;\n  display: flex;\n  align-items: center;\n  cursor: pointer;\n  justify-content: flex-start;\n  .fas {\n    font-size: ",";\n  }\n\n  ","\n"])),_style_theme__WEBPACK_IMPORTED_MODULE_3__.J.larger,(props=>{var{textPrimary,highlight}=props.theme;return props.active?(0,styled_components__WEBPACK_IMPORTED_MODULE_2__.AH)(_templateObject11||(_templateObject11=_taggedTemplateLiteral(["\n          background-color: ",";\n          color: ",";\n          cursor: default;\n          &:focus-visible {\n            ","\n          }\n        "])),highlight,textPrimary,_buttonv2_Buttonv2_component__WEBPACK_IMPORTED_MODULE_4__.kD):(0,styled_components__WEBPACK_IMPORTED_MODULE_2__.AH)(_templateObject12||(_templateObject12=_taggedTemplateLiteral(["\n          &:hover {\n            background-color: ",";\n            color: ",";\n          }\n          &:focus-visible {\n            ","\n          }\n          &:active {\n            background-color: ",";\n            color: ",";\n          }\n        "])),highlight,textPrimary,_buttonv2_Buttonv2_component__WEBPACK_IMPORTED_MODULE_4__.kD,highlight,textPrimary)})),MenuItemText=styled_components__WEBPACK_IMPORTED_MODULE_2__.Ay.div(_templateObject13||(_templateObject13=_taggedTemplateLiteral(["\n  margin-right: ",";\n"])),_spacing__WEBPACK_IMPORTED_MODULE_5__.YK.r20),MenuItemSelected=styled_components__WEBPACK_IMPORTED_MODULE_2__.Ay.div(_templateObject14||(_templateObject14=_taggedTemplateLiteral(["\n  position: absolute;\n  width: 3px;\n  height: 100%;\n  right: 0;\n  background-color: ",";\n"])),(props=>props.theme.selectedActive)),MenuItemIcon=styled_components__WEBPACK_IMPORTED_MODULE_2__.Ay.div(_templateObject15||(_templateObject15=_taggedTemplateLiteral(["\n  width: ",";\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: ",";\n"])),_style_theme__WEBPACK_IMPORTED_MODULE_3__.NE,_style_theme__WEBPACK_IMPORTED_MODULE_3__.FB);function Sidebar(_ref){var{expanded,actions,onToggleClick,hoverable}=_ref,rest=_objectWithoutProperties(_ref,_excluded),[hovered,setHovered]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Wrapper,{onMouseEnter:()=>setHovered(!0),onMouseLeave:()=>setHovered(!1),hoverable,hovered,expanded,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(SidebarContainer,_objectSpread(_objectSpread({expanded,className:"sc-sidebar",hoverable,hovered},rest),{},{children:[onToggleClick&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(MenuItemIcon,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_buttonv2_Buttonv2_component__WEBPACK_IMPORTED_MODULE_4__.$n,{icon:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_icon_Icon_component__WEBPACK_IMPORTED_MODULE_6__.In,{size:"lg",name:"Lat-menu"}),onClick:()=>{setHovered(!1),onToggleClick()}})}),actions.map(((_ref2,index)=>{var{active,label,onClick,icon=null}=_ref2,actionRest=_objectWithoutProperties(_ref2,_excluded2);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(SidebarItem,_objectSpread(_objectSpread({className:"sc-sidebar-item",active,title:label,onClick,onKeyDown:event=>{" "!==event.key&&"Enter"!==event.key&&"Spacebar"!==event.key||(event.preventDefault(),onClick(event))},tabIndex:0},actionRest),{},{children:[!!icon&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(MenuItemIcon,{children:icon}),(expanded||hoverable&&hovered)&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(MenuItemText,{children:label}),active&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(MenuItemSelected,{})]}),index)}))]}))})}Sidebar.displayName="Sidebar";try{Sidebar.displayName="Sidebar",Sidebar.__docgenInfo={description:"",displayName:"Sidebar",props:{expanded:{defaultValue:null,description:"",name:"expanded",required:!1,type:{name:"boolean"}},actions:{defaultValue:null,description:"",name:"actions",required:!0,type:{name:"Items"}},hoverable:{defaultValue:null,description:"",name:"hoverable",required:!1,type:{name:"boolean"}},onToggleClick:{defaultValue:null,description:"",name:"onToggleClick",required:!1,type:{name:"(() => void)"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/lib/components/sidebar/Sidebar.component.tsx#Sidebar"]={docgenInfo:Sidebar.__docgenInfo,name:"Sidebar",path:"src/lib/components/sidebar/Sidebar.component.tsx#Sidebar"})}catch(__react_docgen_typescript_loader_error){}}}]);