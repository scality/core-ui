"use strict";(self.webpackChunk_scality_core_ui=self.webpackChunk_scality_core_ui||[]).push([[63492],{"./stories/areachart.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>areachart_stories});var VegaChart_component=__webpack_require__("./src/lib/components/vegachart/VegaChart.component.tsx"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),_excluded=["id","data","xAxis","yAxis","color","height","width","areas"];function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,o)}return t}function _defineProperty(obj,key,value){return(key=function _toPropertyKey(t){var i=function _toPrimitive(t,r){if("object"!=typeof t||!t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var i=e.call(t,r||"default");if("object"!=typeof i)return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===r?String:Number)(t)}(t,"string");return"symbol"==typeof i?i:String(i)}(key))in obj?Object.defineProperty(obj,key,{value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}function _objectWithoutProperties(source,excluded){if(null==source)return{};var key,i,target=function _objectWithoutPropertiesLoose(source,excluded){if(null==source)return{};var key,i,target={},sourceKeys=Object.keys(source);for(i=0;i<sourceKeys.length;i++)key=sourceKeys[i],excluded.indexOf(key)>=0||(target[key]=source[key]);return target}(source,excluded);if(Object.getOwnPropertySymbols){var sourceSymbolKeys=Object.getOwnPropertySymbols(source);for(i=0;i<sourceSymbolKeys.length;i++)key=sourceSymbolKeys[i],excluded.indexOf(key)>=0||Object.prototype.propertyIsEnumerable.call(source,key)&&(target[key]=source[key])}return target}function AreaChart(_ref){var{id,data,xAxis,yAxis,color,height=300,width=1e3,areas=[]}=_ref,rest=_objectWithoutProperties(_ref,_excluded),spec=function _objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(Object(t),!0).forEach((function(r){_defineProperty(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}({data:{values:data},encoding:{x:xAxis,color},layer:[...yAxis.map((y=>({mark:{type:"line"},encoding:{y}}))),...areas],height,width},rest);return(0,jsx_runtime.jsx)(VegaChart_component.sD,{className:"sc-areachart",id,spec})}AreaChart.displayName="AreaChart";try{AreaChart.displayName="AreaChart",AreaChart.__docgenInfo={description:"",displayName:"AreaChart",props:{id:{defaultValue:null,description:"",name:"id",required:!0,type:{name:"string"}},data:{defaultValue:null,description:"",name:"data",required:!0,type:{name:"Record<string, any>[]"}},xAxis:{defaultValue:null,description:"",name:"xAxis",required:!0,type:{name:"Record<string, any>"}},yAxis:{defaultValue:null,description:"",name:"yAxis",required:!0,type:{name:"Record<string, any>[]"}},color:{defaultValue:null,description:"",name:"color",required:!1,type:{name:"Record<string, any>"}},areas:{defaultValue:{value:"[]"},description:"",name:"areas",required:!1,type:{name:"Record<string, any>[]"}},width:{defaultValue:{value:"1000"},description:"",name:"width",required:!1,type:{name:"number"}},height:{defaultValue:{value:"300"},description:"",name:"height",required:!1,type:{name:"number"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/lib/components/areachart/AreaChart.component.tsx#AreaChart"]={docgenInfo:AreaChart.__docgenInfo,name:"AreaChart",path:"src/lib/components/areachart/AreaChart.component.tsx#AreaChart"})}catch(__react_docgen_typescript_loader_error){}const areachart_stories={parameters:{storySource:{source:"import React from 'react';\nimport { AreaChart } from '../src/lib/components/areachart/AreaChart.component';\nimport { area_charts } from './data/areachart';\nimport { Wrapper } from './common';\nconst xAxis_area_chart = {\n  field: 'time',\n  type: 'temporal',\n  timeUnit: 'yearmonthdatehoursminutes',\n  title: 'time',\n  axis: null,\n};\nconst yAxis_area_chart = [\n  {\n    field: 'Bandwidth',\n    type: 'quantitative',\n    color: '#968BFF',\n    axis: {\n      title: null,\n      ticks: false,\n      labels: false,\n    },\n  },\n  {\n    field: 'Bandwidth',\n    type: 'quantitative',\n    color: '#F6B288',\n    axis: {\n      title: null,\n      ticks: false,\n      labels: false,\n    },\n  },\n];\nconst color_area_chart = {\n  field: 'Average',\n  type: 'nominal',\n  legend: {\n    direction: 'horizontal',\n    orient: 'bottom',\n    title: null,\n    labelFontSize: 15,\n    columnPadding: 50,\n    symbolStrokeWidth: 5,\n  },\n  domain: ['AvgIn', 'AvgOut'],\n  scale: {\n    range: ['#968BFF', '#F6B288'],\n  },\n};\nconst area = {\n  transform: [\n    {\n      filter: \"datum.Average==='AvgOut'\",\n    },\n  ],\n  mark: {\n    opacity: 0.3,\n    type: 'area',\n  },\n  encoding: {\n    x: {\n      field: 'time',\n      type: 'temporal',\n      timeUnit: 'yearmonthdatehoursminutes',\n      title: 'time',\n      axis: null,\n    },\n    y: {\n      field: 'Bandwidth',\n      type: 'quantitative',\n    },\n    y2: {\n      value: 0,\n    },\n  },\n};\nconst area2 = {\n  transform: [\n    {\n      filter: \"datum.Average==='AvgIn'\",\n    },\n  ],\n  mark: {\n    opacity: 0.3,\n    type: 'area',\n  },\n  encoding: {\n    x: {\n      field: 'time',\n      type: 'temporal',\n      timeUnit: 'yearmonthdatehoursminutes',\n      title: 'time',\n      axis: null,\n    },\n    y: {\n      field: 'Bandwidth',\n      type: 'quantitative',\n    },\n    y2: {\n      value: 0,\n    },\n  },\n};\nconst areas = [area, area2];\nconst id_area_chart = 'vis_area_chart';\nexport default {\n  title: 'Components/Data Display/Charts/Area Chart',\n  component: AreaChart,\n};\n\nexport const Default = {\n  args: {\n    id: id_area_chart,\n    data: area_charts,\n    xAxis: xAxis_area_chart,\n    yAxis: yAxis_area_chart,\n    color: color_area_chart,\n    areas,\n    width: 800,\n  },\n};\n",locationsMap:{default:{startLoc:{col:23,line:111},endLoc:{col:1,line:121},startBody:{col:23,line:111},endBody:{col:1,line:121}}}}},title:"Components/Data Display/Charts/Area Chart",component:AreaChart};var Default={args:{id:"vis_area_chart",data:[{time:"2019-10-01 00:00:00",Average:"AvgIn",Bandwidth:1.4},{time:"2019-10-01 00:00:00",Average:"AvgOut",Bandwidth:1.2},{time:"2019-10-01 00:15:00",Average:"AvgIn",Bandwidth:.8},{time:"2019-10-01 00:15:00",Average:"AvgOut",Bandwidth:1.2},{time:"2019-10-01 00:30:00",Average:"AvgIn",Bandwidth:.7},{time:"2019-10-01 00:30:00",Average:"AvgOut",Bandwidth:2.1},{time:"2019-10-01 00:45:00",Average:"AvgIn",Bandwidth:.8},{time:"2019-10-01 00:45:00",Average:"AvgOut",Bandwidth:.9},{time:"2019-10-01 01:00:00",Average:"AvgIn",Bandwidth:1.3},{time:"2019-10-01 01:00:00",Average:"AvgOut",Bandwidth:.8},{time:"2019-10-01 01:15:00",Average:"AvgIn",Bandwidth:.8},{time:"2019-10-01 01:15:00",Average:"AvgOut",Bandwidth:2},{time:"2019-10-01 01:30:00",Average:"AvgIn",Bandwidth:.7},{time:"2019-10-01 01:30:00",Average:"AvgOut",Bandwidth:.2},{time:"2019-10-01 01:45:00",Average:"AvgIn",Bandwidth:.8},{time:"2019-10-01 01:45:00",Average:"AvgOut",Bandwidth:.9},{time:"2019-10-01 02:00:00",Average:"AvgIn",Bandwidth:1.4},{time:"2019-10-01 02:00:00",Average:"AvgOut",Bandwidth:1.2},{time:"2019-10-01 02:15:00",Average:"AvgIn",Bandwidth:.8},{time:"2019-10-01 02:15:00",Average:"AvgOut",Bandwidth:1.2},{time:"2019-10-01 02:30:00",Average:"AvgIn",Bandwidth:.7},{time:"2019-10-01 02:30:00",Average:"AvgOut",Bandwidth:2.1},{time:"2019-10-01 02:45:00",Average:"AvgIn",Bandwidth:.8},{time:"2019-10-01 02:45:00",Average:"AvgOut",Bandwidth:.9}],xAxis:{field:"time",type:"temporal",timeUnit:"yearmonthdatehoursminutes",title:"time",axis:null},yAxis:[{field:"Bandwidth",type:"quantitative",color:"#968BFF",axis:{title:null,ticks:!1,labels:!1}},{field:"Bandwidth",type:"quantitative",color:"#F6B288",axis:{title:null,ticks:!1,labels:!1}}],color:{field:"Average",type:"nominal",legend:{direction:"horizontal",orient:"bottom",title:null,labelFontSize:15,columnPadding:50,symbolStrokeWidth:5},domain:["AvgIn","AvgOut"],scale:{range:["#968BFF","#F6B288"]}},areas:[{transform:[{filter:"datum.Average==='AvgOut'"}],mark:{opacity:.3,type:"area"},encoding:{x:{field:"time",type:"temporal",timeUnit:"yearmonthdatehoursminutes",title:"time",axis:null},y:{field:"Bandwidth",type:"quantitative"},y2:{value:0}}},{transform:[{filter:"datum.Average==='AvgIn'"}],mark:{opacity:.3,type:"area"},encoding:{x:{field:"time",type:"temporal",timeUnit:"yearmonthdatehoursminutes",title:"time",axis:null},y:{field:"Bandwidth",type:"quantitative"},y2:{value:0}}}],width:800}};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  args: {\n    id: id_area_chart,\n    data: area_charts,\n    xAxis: xAxis_area_chart,\n    yAxis: yAxis_area_chart,\n    color: color_area_chart,\n    areas,\n    width: 800\n  }\n}",...Default.parameters?.docs?.source}}};const __namedExportsOrder=["Default"]},"./src/lib/components/vegachart/VegaChart.component.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{sD:()=>VegaChart});var _templateObject,react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),vega_embed__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/vega-embed/build/src/embed.js"),styled_components__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),_utils__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/lib/utils.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/jsx-runtime.js");function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,o)}return t}function _objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(Object(t),!0).forEach((function(r){_defineProperty(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function _defineProperty(obj,key,value){return(key=function _toPropertyKey(t){var i=function _toPrimitive(t,r){if("object"!=typeof t||!t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var i=e.call(t,r||"default");if("object"!=typeof i)return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===r?String:Number)(t)}(t,"string");return"symbol"==typeof i?i:String(i)}(key))in obj?Object.defineProperty(obj,key,{value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}var TOP="top",BOTTOM="bottom",VegaTooltipTheme=(0,styled_components__WEBPACK_IMPORTED_MODULE_3__.DU)(_templateObject||(_templateObject=function _taggedTemplateLiteral(strings,raw){return raw||(raw=strings.slice(0)),Object.freeze(Object.defineProperties(strings,{raw:{value:Object.freeze(raw)}}))}(["\n  #vg-tooltip-element.vg-tooltip.custom-theme {\n    padding: 8px;\n    position: fixed;\n    z-index: 1000;\n    font-family: 'Lato';\n    font-size: 12px;\n    border-radius: 3px;\n    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);\n    color: ",";\n    background-color: ",";\n    border: 1px solid ",";\n    // customize the title\n    h2 {\n      color: ",";\n      margin-bottom: 10px;\n      font-size: 12px;\n    }\n  }\n"])),(0,_utils__WEBPACK_IMPORTED_MODULE_4__.sP)("textPrimary"),(0,_utils__WEBPACK_IMPORTED_MODULE_4__.sP)("backgroundLevel1"),(0,_utils__WEBPACK_IMPORTED_MODULE_4__.sP)("border"),(0,_utils__WEBPACK_IMPORTED_MODULE_4__.sP)("textSecondary"));function VegaChart(_ref){var{id,spec,tooltipPosition=BOTTOM,theme="custom"}=_ref,themeContext=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(styled_components__WEBPACK_IMPORTED_MODULE_3__.Dx),currentBackgroundColor=themeContext&&themeContext.brand?themeContext.brand.backgroundLevel4:themeContext.backgroundLevel4,currentBackgroundColor2=themeContext&&themeContext.brand?themeContext.brand.backgroundLevel1:themeContext.backgroundLevel1,brandText=themeContext&&themeContext.brand?themeContext.brand.textPrimary:themeContext.textPrimary,themeConfig={config:{background:currentBackgroundColor,axis:{labelColor:brandText,titleColor:brandText,grid:!1,domainColor:currentBackgroundColor2},title:{color:brandText,font:"Lato"},view:{stroke:"transparent",fill:currentBackgroundColor2},header:{labelColor:brandText},text:{color:brandText,font:"Lato"},rule:{color:brandText},legend:{labelColor:brandText,titleColor:brandText}}},themedSpec=_objectSpread(_objectSpread({},spec),themeConfig),vegaInstance=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(),tooltipOptions={theme};return tooltipPosition===TOP&&(tooltipOptions={theme,offsetX:-85,offsetY:-140}),(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{var isMounted=!0;return(0,vega_embed__WEBPACK_IMPORTED_MODULE_1__.Ay)("#".concat(id),themedSpec,{renderer:"svg",tooltip:tooltipOptions,actions:!1}).then((result=>{vegaInstance.current=result})).catch((function(){isMounted&&console.error(...arguments)})),()=>{isMounted=!1,vegaInstance.current&&vegaInstance.current.view.finalize()}}),[id,themedSpec,tooltipOptions,vegaInstance]),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div",{id,className:"sc-vegachart",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(VegaTooltipTheme,{})})}VegaChart.displayName="VegaChart";try{VegaChart.displayName="VegaChart",VegaChart.__docgenInfo={description:"",displayName:"VegaChart",props:{id:{defaultValue:null,description:"",name:"id",required:!0,type:{name:"string"}},spec:{defaultValue:null,description:"",name:"spec",required:!0,type:{name:"Record<string, any>"}},tooltipPosition:{defaultValue:{value:"bottom"},description:"",name:"tooltipPosition",required:!1,type:{name:"enum",value:[{value:'"top"'},{value:'"bottom"'}]}},theme:{defaultValue:{value:"custom"},description:"",name:"theme",required:!1,type:{name:"enum",value:[{value:'"custom"'},{value:'"dark"'},{value:'"light"'}]}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/lib/components/vegachart/VegaChart.component.tsx#VegaChart"]={docgenInfo:VegaChart.__docgenInfo,name:"VegaChart",path:"src/lib/components/vegachart/VegaChart.component.tsx#VegaChart"})}catch(__react_docgen_typescript_loader_error){}}}]);