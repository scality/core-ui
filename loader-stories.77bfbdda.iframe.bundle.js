"use strict";(self.webpackChunk_scality_core_ui=self.webpackChunk_scality_core_ui||[]).push([[32782],{"./stories/loader.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{BasicLoader:()=>BasicLoader,CenteredLoader:()=>CenteredLoader,DifferentColor:()=>DifferentColor,DifferentSizes:()=>DifferentSizes,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});__webpack_require__("./node_modules/react/index.js");var _src_lib_components_loader_Loader_component__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/lib/components/loader/Loader.component.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={parameters:{storySource:{source:"import React from 'react';\nimport { Loader } from '../src/lib/components/loader/Loader.component';\nimport { Wrapper } from './common';\nimport { Size } from '../src/lib/components/constants';\n\nconst info = {\n  title: 'Components/Progress & loading/Loader',\n  component: Loader,\n  args: {\n    size: 'base',\n    children: 'Loading',\n  },\n  argTypes: {\n    color: {\n      control: 'color',\n    },\n  },\n};\nexport default info;\n\nconst sizes: Size[] = ['base', 'large', 'larger', 'huge', 'massive'];\n\nexport const BasicLoader = {};\n\nexport const DifferentColor = {\n  args: {\n    color: 'white',\n  },\n};\n\nexport const DifferentSizes = {\n  render: ({}) => {\n    return (\n      <>\n        {sizes.map((size) => (\n          <Loader key={size} size={size}>\n            <span>Loader</span>\n          </Loader>\n        ))}\n      </>\n    );\n  },\n};\n\nexport const CenteredLoader = {\n  args: {\n    centered: true,\n  },\n};\n",locationsMap:{"basic-loader":{startLoc:{col:27,line:23},endLoc:{col:29,line:23},startBody:{col:27,line:23},endBody:{col:29,line:23}},"different-color":{startLoc:{col:30,line:25},endLoc:{col:1,line:29},startBody:{col:30,line:25},endBody:{col:1,line:29}},"different-sizes":{startLoc:{col:30,line:31},endLoc:{col:1,line:43},startBody:{col:30,line:31},endBody:{col:1,line:43}},"centered-loader":{startLoc:{col:30,line:45},endLoc:{col:1,line:49},startBody:{col:30,line:45},endBody:{col:1,line:49}}}}},title:"Components/Progress & loading/Loader",component:_src_lib_components_loader_Loader_component__WEBPACK_IMPORTED_MODULE_2__.a,args:{size:"base",children:"Loading"},argTypes:{color:{control:"color"}}};var sizes=["base","large","larger","huge","massive"],BasicLoader={},DifferentColor={args:{color:"white"}},DifferentSizes={render:_ref=>{var{}=_ref;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:sizes.map((size=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_src_lib_components_loader_Loader_component__WEBPACK_IMPORTED_MODULE_2__.a,{size,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span",{children:"Loader"})},size)))})}},CenteredLoader={args:{centered:!0}};BasicLoader.parameters={...BasicLoader.parameters,docs:{...BasicLoader.parameters?.docs,source:{originalSource:"{}",...BasicLoader.parameters?.docs?.source}}},DifferentColor.parameters={...DifferentColor.parameters,docs:{...DifferentColor.parameters?.docs,source:{originalSource:"{\n  args: {\n    color: 'white'\n  }\n}",...DifferentColor.parameters?.docs?.source}}},DifferentSizes.parameters={...DifferentSizes.parameters,docs:{...DifferentSizes.parameters?.docs,source:{originalSource:"{\n  render: ({}) => {\n    return <>\n        {sizes.map(size => <Loader key={size} size={size}>\n            <span>Loader</span>\n          </Loader>)}\n      </>;\n  }\n}",...DifferentSizes.parameters?.docs?.source}}},CenteredLoader.parameters={...CenteredLoader.parameters,docs:{...CenteredLoader.parameters?.docs,source:{originalSource:"{\n  args: {\n    centered: true\n  }\n}",...CenteredLoader.parameters?.docs?.source}}};const __namedExportsOrder=["BasicLoader","DifferentColor","DifferentSizes","CenteredLoader"]}}]);