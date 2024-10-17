"use strict";(self.webpackChunk_scality_core_ui=self.webpackChunk_scality_core_ui||[]).push([[50391],{"./stories/linechart.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{AnotherExample:()=>AnotherExample,ForecastChart:()=>ForecastChart,VegaChartWithoutAxis:()=>VegaChartWithoutAxis,VegaLiteChart:()=>VegaLiteChart,__namedExportsOrder:()=>__namedExportsOrder,default:()=>linechart_stories});var VegaChart_component=__webpack_require__("./src/lib/components/vegachart/VegaChart.component.tsx"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),_excluded=["id","data","xAxis","yAxis","color","tooltip","lineConfig","height","width","displayTrendLine","strokeDashEncodingConfig","opacityEncodingConfig","tooltipConfig","tooltipTheme"];function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,o)}return t}function _objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(Object(t),!0).forEach((function(r){_defineProperty(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function _defineProperty(obj,key,value){return(key=function _toPropertyKey(t){var i=function _toPrimitive(t,r){if("object"!=typeof t||!t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var i=e.call(t,r||"default");if("object"!=typeof i)return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===r?String:Number)(t)}(t,"string");return"symbol"==typeof i?i:String(i)}(key))in obj?Object.defineProperty(obj,key,{value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}function _objectWithoutProperties(source,excluded){if(null==source)return{};var key,i,target=function _objectWithoutPropertiesLoose(source,excluded){if(null==source)return{};var key,i,target={},sourceKeys=Object.keys(source);for(i=0;i<sourceKeys.length;i++)key=sourceKeys[i],excluded.indexOf(key)>=0||(target[key]=source[key]);return target}(source,excluded);if(Object.getOwnPropertySymbols){var sourceSymbolKeys=Object.getOwnPropertySymbols(source);for(i=0;i<sourceSymbolKeys.length;i++)key=sourceSymbolKeys[i],excluded.indexOf(key)>=0||Object.prototype.propertyIsEnumerable.call(source,key)&&(target[key]=source[key])}return target}function LineChart(_ref){var{id,data,xAxis,yAxis,color,tooltip=!1,lineConfig,height=300,width=1e3,displayTrendLine=!1,strokeDashEncodingConfig,opacityEncodingConfig,tooltipConfig,tooltipTheme}=_ref,rest=_objectWithoutProperties(_ref,_excluded),lines=yAxis.map((y=>({mark:_objectSpread({type:"line"},lineConfig),encoding:{y,strokeDash:strokeDashEncodingConfig,opacity:opacityEncodingConfig}}))),currentTimeTrendline={mark:{type:"rule",style:"ruleCurrentTime",color:"white",opacity:.2},encoding:{x:{value:width/2},y:{value:height},y2:{value:0}}},topTrendline={mark:{type:"rule",style:"ruleTop",color:"orange",opacity:.2},encoding:{y:{aggregate:"max",field:"capacity",type:"quantitative"},x:{value:0},x2:{value:width}}},spec=_objectSpread({data:{values:data},encoding:{x:xAxis,color,tooltip:tooltip?[xAxis,...yAxis]:null},height,width,layer:[...lines]},rest);return tooltip&&spec.layer.push(tooltipConfig||{mark:"rule",selection:{index:{type:"single",on:"mousemove",encodings:["x"],nearest:!0}},encoding:{color:{condition:{selection:{not:"index"},value:"transparent"}}}}),displayTrendLine&&(spec.layer.push(currentTimeTrendline),spec.layer.push(topTrendline)),(0,jsx_runtime.jsx)(VegaChart_component.sD,{id,spec,theme:tooltipTheme||"light"})}LineChart.displayName="LineChart";try{LineChart.displayName="LineChart",LineChart.__docgenInfo={description:"",displayName:"LineChart",props:{id:{defaultValue:null,description:"",name:"id",required:!0,type:{name:"string"}},data:{defaultValue:null,description:"",name:"data",required:!0,type:{name:"Record<string, any>[]"}},xAxis:{defaultValue:null,description:"",name:"xAxis",required:!0,type:{name:"Record<string, any>"}},yAxis:{defaultValue:null,description:"",name:"yAxis",required:!0,type:{name:"Record<string, any>[]"}},color:{defaultValue:null,description:"",name:"color",required:!1,type:{name:"Record<string, any>"}},tooltip:{defaultValue:{value:"false"},description:"",name:"tooltip",required:!1,type:{name:"boolean"}},lineConfig:{defaultValue:null,description:"",name:"lineConfig",required:!1,type:{name:"Record<string, any>"}},width:{defaultValue:{value:"1000"},description:"",name:"width",required:!1,type:{name:"number"}},height:{defaultValue:{value:"300"},description:"",name:"height",required:!1,type:{name:"number"}},displayTrendLine:{defaultValue:{value:"false"},description:"",name:"displayTrendLine",required:!1,type:{name:"boolean"}},strokeDashEncodingConfig:{defaultValue:null,description:"",name:"strokeDashEncodingConfig",required:!1,type:{name:"any"}},opacityEncodingConfig:{defaultValue:null,description:"",name:"opacityEncodingConfig",required:!1,type:{name:"any"}},tooltipConfig:{defaultValue:null,description:"",name:"tooltipConfig",required:!1,type:{name:"any"}},tooltipTheme:{defaultValue:null,description:"",name:"tooltipTheme",required:!1,type:{name:"enum",value:[{value:'"custom"'},{value:'"dark"'},{value:'"light"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/lib/components/linechart/LineChart.component.tsx#LineChart"]={docgenInfo:LineChart.__docgenInfo,name:"LineChart",path:"src/lib/components/linechart/LineChart.component.tsx#LineChart"})}catch(__react_docgen_typescript_loader_error){}var linechart=__webpack_require__("./stories/data/linechart.ts");const linechart_stories={parameters:{storySource:{source:"import React from 'react';\nimport { LineChart } from '../src/lib/components/linechart/LineChart.component';\nimport {\n  data,\n  data_graph_with_axis,\n  forecast_data,\n  in_out_data,\n} from './data/linechart';\nimport { Wrapper, Title } from './common';\nconst xAxis = {\n  field: 'time',\n  type: 'temporal',\n  timeUnit: 'yearmonthdatehoursminutes',\n  title: 'time',\n};\nconst yAxis = [\n  {\n    field: 'total_space',\n    type: 'quantitative',\n    title: 'TOTAL SPACE (GB)',\n    color: 'yellow',\n  },\n  {\n    field: 'used_space',\n    type: 'quantitative',\n    title: 'USED SPACE (GB)',\n    color: 'blue',\n  },\n];\n// the line chart without x axis and y axis\nconst xAxis_without_axis = {\n  field: 'time',\n  type: 'temporal',\n  timeUnit: 'yearmonthdatehoursminutes',\n  title: 'time',\n  axis: null,\n};\nconst yAxis_without_axis = [\n  {\n    field: 'Latency',\n    type: 'quantitative',\n    color: '#18DFAD',\n    axis: {\n      title: null,\n      ticks: false,\n      labels: false,\n    },\n  },\n  {\n    field: 'Latency',\n    type: 'quantitative',\n    color: '#968BFF',\n    axis: {\n      title: null,\n      ticks: false,\n      labels: false,\n    },\n  },\n  {\n    field: 'Latency',\n    type: 'quantitative',\n    color: '#F6B187',\n    axis: {\n      title: null,\n      ticks: false,\n      labels: false,\n    },\n  },\n  {\n    field: 'Latency',\n    type: 'quantitative',\n    color: '#4BE4E2',\n    axis: {\n      title: null,\n      ticks: false,\n      labels: false,\n    },\n  },\n];\nconst color = {\n  field: 'resquest_method',\n  type: 'nominal',\n  legend: {\n    direction: 'horizontal',\n    orient: 'bottom',\n    title: null,\n    symbolType: 'stroke',\n    labelFontSize: 15,\n    columnPadding: 50,\n    symbolStrokeWidth: 5,\n  },\n  domain: ['Get', 'Put', 'Delete', 'List'],\n  scale: {\n    range: ['#18DFAD', '#968BFF', '#F6B187', '#4BE4E2'],\n  },\n};\nconst lineConfig = {\n  strokeWidth: 1,\n  opacity: 0.5,\n};\nconst id = 'vis';\nconst id_without_axis = 'vis2';\n// forecast chart\nconst xAxis_forecast_chart = {\n  field: 'time',\n  type: 'ordinal',\n  title: null,\n  axis: {\n    labelAngle: 0,\n  },\n  // sort the according the given xlabel\n  sort: ['-3m', 'Now', '+3m'],\n};\nconst yAxis_forecast_chart = [\n  {\n    field: 'capacity',\n    type: 'quantitative',\n    color: '#968BFF',\n    axis: {\n      title: null,\n      ticks: false,\n      labels: false,\n    },\n  },\n];\nconst lineConfig_forecast_chart = {\n  interpolate: 'monotone',\n};\nconst id_forecast_chart = 'vis_forecast_chart';\nconst xAxis_inout_chart = {\n  field: 'date',\n  type: 'temporal',\n  axis: {\n    format: '%m/%d',\n    ticks: true,\n    tickCount: 4,\n    labelAngle: -50,\n    labelColor: '#B5B5B5',\n  },\n  title: null,\n};\nconst yAxis_inout_chart = [\n  {\n    field: 'value',\n    type: 'quantitative',\n    title: null,\n  },\n];\nconst color_inout_chart = {\n  field: 'type',\n  type: 'nominal',\n  domain: ['in', 'out'],\n  scale: {\n    range: ['#F6B187', '#968BFF'],\n  },\n  legend: {\n    direction: 'horizontal',\n    orient: 'bottom',\n    title: null,\n    values: ['in', 'out'],\n    symbolSize: 300,\n    labelFontSize: 15,\n  },\n};\nconst strokeDashConfig_inout = {\n  field: 'symbol',\n  type: 'nominal',\n  legend: {\n    direction: 'horizontal',\n    orient: 'bottom',\n    title: null,\n    values: ['Cluster avg'],\n    symbolSize: 300,\n    labelFontSize: 15,\n  },\n};\nconst opacityConfig_inout = {\n  condition: {\n    test: 'datum.symbol == \"Cluster avg\"',\n    value: 0.5,\n  },\n  value: 1,\n};\nconst lineConfigInOut = {\n  strokeWidth: 1.5,\n};\n// Overriding the tooltip config to format data properly through the tooltipConfig prop\nconst tooltipConfigInOut = {\n  transform: [\n    {\n      pivot: 'type',\n      value: 'value',\n      groupby: ['date'],\n    },\n  ],\n  mark: 'rule',\n  encoding: {\n    opacity: {\n      condition: {\n        value: 1,\n        selection: 'hover',\n      },\n      value: 0,\n    },\n    tooltip: [\n      {\n        field: 'date',\n        type: 'temporal',\n        axis: {\n          format: '%d/%m %H:%M',\n          ticks: true,\n          tickCount: 4,\n          labelAngle: -50,\n          labelColor: '#B5B5B5',\n        },\n        title: 'Date',\n      },\n      {\n        field: 'in',\n        type: 'quantitative',\n        title: 'In',\n      },\n      {\n        field: 'out',\n        type: 'quantitative',\n        title: 'Out',\n      },\n      {\n        field: 'avgIn',\n        type: 'quantitative',\n        title: 'Avg In',\n      },\n      {\n        field: 'avgOut',\n        type: 'quantitative',\n        title: 'Avg Out',\n      },\n    ],\n    color: {\n      legend: null,\n    },\n  },\n  selection: {\n    hover: {\n      type: 'single',\n      fields: ['date'],\n      nearest: true,\n      on: 'mouseover',\n      empty: 'none',\n      clear: 'mouseout',\n    },\n  },\n};\nexport default {\n  title: 'Components/Data Display/Charts/LineChart',\n  component: LineChart,\n  args: {\n    width: 800,\n    tooltip: true,\n  },\n  argTypes: {\n    data: {\n      control: false,\n    },\n  },\n};\nexport const VegaLiteChart = {\n  name: 'Vega-Lite line chart demo',\n  args: {\n    id,\n    data,\n    xAxis,\n    yAxis,\n  },\n};\n\nexport const VegaChartWithoutAxis = {\n  name: 'Vega-Lite line chart without axis',\n  args: {\n    id: id_without_axis,\n    data: data_graph_with_axis,\n    xAxis: xAxis_without_axis,\n    yAxis: yAxis_without_axis,\n    tooltip: false,\n    color,\n    lineConfig,\n  },\n};\n\nexport const ForecastChart = {\n  args: {\n    id: id_forecast_chart,\n    data: forecast_data,\n    xAxis: xAxis_forecast_chart,\n    yAxis: yAxis_forecast_chart,\n    tooltip: false,\n    lineConfig: lineConfig_forecast_chart,\n    width: 300,\n    heigth: 150,\n    displayTrendLine: true,\n  },\n};\n\nexport const AnotherExample = {\n  name: 'Vega-Lite with strokeDash config, opacity config and custom Tooltip',\n  args: {\n    id: 'id_strokedash',\n    data: in_out_data,\n    xAxis: xAxis_inout_chart,\n    yAxis: yAxis_inout_chart,\n    color: color_inout_chart,\n    height: 250,\n    lineConfig: lineConfigInOut,\n    strokeDashEncodingConfig: strokeDashConfig_inout,\n    opacityEncodingConfig: opacityConfig_inout,\n    tooltipConfig: tooltipConfigInOut,\n    tooltipTheme: 'dark',\n  },\n};\n",locationsMap:{"vega-lite-chart":{startLoc:{col:29,line:267},endLoc:{col:1,line:275},startBody:{col:29,line:267},endBody:{col:1,line:275}},"vega-chart-without-axis":{startLoc:{col:36,line:277},endLoc:{col:1,line:288},startBody:{col:36,line:277},endBody:{col:1,line:288}},"forecast-chart":{startLoc:{col:29,line:290},endLoc:{col:1,line:302},startBody:{col:29,line:290},endBody:{col:1,line:302}},"another-example":{startLoc:{col:30,line:304},endLoc:{col:1,line:319},startBody:{col:30,line:304},endBody:{col:1,line:319}}}}},title:"Components/Data Display/Charts/LineChart",component:LineChart,args:{width:800,tooltip:!0},argTypes:{data:{control:!1}}};var VegaLiteChart={name:"Vega-Lite line chart demo",args:{id:"vis",data:linechart.p,xAxis:{field:"time",type:"temporal",timeUnit:"yearmonthdatehoursminutes",title:"time"},yAxis:[{field:"total_space",type:"quantitative",title:"TOTAL SPACE (GB)",color:"yellow"},{field:"used_space",type:"quantitative",title:"USED SPACE (GB)",color:"blue"}]}},VegaChartWithoutAxis={name:"Vega-Lite line chart without axis",args:{id:"vis2",data:linechart.tc,xAxis:{field:"time",type:"temporal",timeUnit:"yearmonthdatehoursminutes",title:"time",axis:null},yAxis:[{field:"Latency",type:"quantitative",color:"#18DFAD",axis:{title:null,ticks:!1,labels:!1}},{field:"Latency",type:"quantitative",color:"#968BFF",axis:{title:null,ticks:!1,labels:!1}},{field:"Latency",type:"quantitative",color:"#F6B187",axis:{title:null,ticks:!1,labels:!1}},{field:"Latency",type:"quantitative",color:"#4BE4E2",axis:{title:null,ticks:!1,labels:!1}}],tooltip:!1,color:{field:"resquest_method",type:"nominal",legend:{direction:"horizontal",orient:"bottom",title:null,symbolType:"stroke",labelFontSize:15,columnPadding:50,symbolStrokeWidth:5},domain:["Get","Put","Delete","List"],scale:{range:["#18DFAD","#968BFF","#F6B187","#4BE4E2"]}},lineConfig:{strokeWidth:1,opacity:.5}}},ForecastChart={args:{id:"vis_forecast_chart",data:linechart.bX,xAxis:{field:"time",type:"ordinal",title:null,axis:{labelAngle:0},sort:["-3m","Now","+3m"]},yAxis:[{field:"capacity",type:"quantitative",color:"#968BFF",axis:{title:null,ticks:!1,labels:!1}}],tooltip:!1,lineConfig:{interpolate:"monotone"},width:300,heigth:150,displayTrendLine:!0}},AnotherExample={name:"Vega-Lite with strokeDash config, opacity config and custom Tooltip",args:{id:"id_strokedash",data:linechart.Mo,xAxis:{field:"date",type:"temporal",axis:{format:"%m/%d",ticks:!0,tickCount:4,labelAngle:-50,labelColor:"#B5B5B5"},title:null},yAxis:[{field:"value",type:"quantitative",title:null}],color:{field:"type",type:"nominal",domain:["in","out"],scale:{range:["#F6B187","#968BFF"]},legend:{direction:"horizontal",orient:"bottom",title:null,values:["in","out"],symbolSize:300,labelFontSize:15}},height:250,lineConfig:{strokeWidth:1.5},strokeDashEncodingConfig:{field:"symbol",type:"nominal",legend:{direction:"horizontal",orient:"bottom",title:null,values:["Cluster avg"],symbolSize:300,labelFontSize:15}},opacityEncodingConfig:{condition:{test:'datum.symbol == "Cluster avg"',value:.5},value:1},tooltipConfig:{transform:[{pivot:"type",value:"value",groupby:["date"]}],mark:"rule",encoding:{opacity:{condition:{value:1,selection:"hover"},value:0},tooltip:[{field:"date",type:"temporal",axis:{format:"%d/%m %H:%M",ticks:!0,tickCount:4,labelAngle:-50,labelColor:"#B5B5B5"},title:"Date"},{field:"in",type:"quantitative",title:"In"},{field:"out",type:"quantitative",title:"Out"},{field:"avgIn",type:"quantitative",title:"Avg In"},{field:"avgOut",type:"quantitative",title:"Avg Out"}],color:{legend:null}},selection:{hover:{type:"single",fields:["date"],nearest:!0,on:"mouseover",empty:"none",clear:"mouseout"}}},tooltipTheme:"dark"}};VegaLiteChart.parameters={...VegaLiteChart.parameters,docs:{...VegaLiteChart.parameters?.docs,source:{originalSource:"{\n  name: 'Vega-Lite line chart demo',\n  args: {\n    id,\n    data,\n    xAxis,\n    yAxis\n  }\n}",...VegaLiteChart.parameters?.docs?.source}}},VegaChartWithoutAxis.parameters={...VegaChartWithoutAxis.parameters,docs:{...VegaChartWithoutAxis.parameters?.docs,source:{originalSource:"{\n  name: 'Vega-Lite line chart without axis',\n  args: {\n    id: id_without_axis,\n    data: data_graph_with_axis,\n    xAxis: xAxis_without_axis,\n    yAxis: yAxis_without_axis,\n    tooltip: false,\n    color,\n    lineConfig\n  }\n}",...VegaChartWithoutAxis.parameters?.docs?.source}}},ForecastChart.parameters={...ForecastChart.parameters,docs:{...ForecastChart.parameters?.docs,source:{originalSource:"{\n  args: {\n    id: id_forecast_chart,\n    data: forecast_data,\n    xAxis: xAxis_forecast_chart,\n    yAxis: yAxis_forecast_chart,\n    tooltip: false,\n    lineConfig: lineConfig_forecast_chart,\n    width: 300,\n    heigth: 150,\n    displayTrendLine: true\n  }\n}",...ForecastChart.parameters?.docs?.source}}},AnotherExample.parameters={...AnotherExample.parameters,docs:{...AnotherExample.parameters?.docs,source:{originalSource:"{\n  name: 'Vega-Lite with strokeDash config, opacity config and custom Tooltip',\n  args: {\n    id: 'id_strokedash',\n    data: in_out_data,\n    xAxis: xAxis_inout_chart,\n    yAxis: yAxis_inout_chart,\n    color: color_inout_chart,\n    height: 250,\n    lineConfig: lineConfigInOut,\n    strokeDashEncodingConfig: strokeDashConfig_inout,\n    opacityEncodingConfig: opacityConfig_inout,\n    tooltipConfig: tooltipConfigInOut,\n    tooltipTheme: 'dark'\n  }\n}",...AnotherExample.parameters?.docs?.source}}};const __namedExportsOrder=["VegaLiteChart","VegaChartWithoutAxis","ForecastChart","AnotherExample"]},"./src/lib/components/vegachart/VegaChart.component.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{sD:()=>VegaChart});var _templateObject,react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),vega_embed__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/vega-embed/build/src/embed.js"),styled_components__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),_utils__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/lib/utils.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/jsx-runtime.js");function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,o)}return t}function _objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(Object(t),!0).forEach((function(r){_defineProperty(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function _defineProperty(obj,key,value){return(key=function _toPropertyKey(t){var i=function _toPrimitive(t,r){if("object"!=typeof t||!t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var i=e.call(t,r||"default");if("object"!=typeof i)return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===r?String:Number)(t)}(t,"string");return"symbol"==typeof i?i:String(i)}(key))in obj?Object.defineProperty(obj,key,{value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}var TOP="top",BOTTOM="bottom",VegaTooltipTheme=(0,styled_components__WEBPACK_IMPORTED_MODULE_3__.DU)(_templateObject||(_templateObject=function _taggedTemplateLiteral(strings,raw){return raw||(raw=strings.slice(0)),Object.freeze(Object.defineProperties(strings,{raw:{value:Object.freeze(raw)}}))}(["\n  #vg-tooltip-element.vg-tooltip.custom-theme {\n    padding: 8px;\n    position: fixed;\n    z-index: 1000;\n    font-family: 'Lato';\n    font-size: 12px;\n    border-radius: 3px;\n    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);\n    color: ",";\n    background-color: ",";\n    border: 1px solid ",";\n    // customize the title\n    h2 {\n      color: ",";\n      margin-bottom: 10px;\n      font-size: 12px;\n    }\n  }\n"])),(0,_utils__WEBPACK_IMPORTED_MODULE_4__.sP)("textPrimary"),(0,_utils__WEBPACK_IMPORTED_MODULE_4__.sP)("backgroundLevel1"),(0,_utils__WEBPACK_IMPORTED_MODULE_4__.sP)("border"),(0,_utils__WEBPACK_IMPORTED_MODULE_4__.sP)("textSecondary"));function VegaChart(_ref){var{id,spec,tooltipPosition=BOTTOM,theme="custom"}=_ref,themeContext=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(styled_components__WEBPACK_IMPORTED_MODULE_3__.Dx),currentBackgroundColor=themeContext&&themeContext.brand?themeContext.brand.backgroundLevel4:themeContext.backgroundLevel4,currentBackgroundColor2=themeContext&&themeContext.brand?themeContext.brand.backgroundLevel1:themeContext.backgroundLevel1,brandText=themeContext&&themeContext.brand?themeContext.brand.textPrimary:themeContext.textPrimary,themeConfig={config:{background:currentBackgroundColor,axis:{labelColor:brandText,titleColor:brandText,grid:!1,domainColor:currentBackgroundColor2},title:{color:brandText,font:"Lato"},view:{stroke:"transparent",fill:currentBackgroundColor2},header:{labelColor:brandText},text:{color:brandText,font:"Lato"},rule:{color:brandText},legend:{labelColor:brandText,titleColor:brandText}}},themedSpec=_objectSpread(_objectSpread({},spec),themeConfig),vegaInstance=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(),tooltipOptions={theme};return tooltipPosition===TOP&&(tooltipOptions={theme,offsetX:-85,offsetY:-140}),(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{var isMounted=!0;return(0,vega_embed__WEBPACK_IMPORTED_MODULE_1__.Ay)("#".concat(id),themedSpec,{renderer:"svg",tooltip:tooltipOptions,actions:!1}).then((result=>{vegaInstance.current=result})).catch((function(){isMounted&&console.error(...arguments)})),()=>{isMounted=!1,vegaInstance.current&&vegaInstance.current.view.finalize()}}),[id,themedSpec,tooltipOptions,vegaInstance]),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div",{id,className:"sc-vegachart",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(VegaTooltipTheme,{})})}VegaChart.displayName="VegaChart";try{VegaChart.displayName="VegaChart",VegaChart.__docgenInfo={description:"",displayName:"VegaChart",props:{id:{defaultValue:null,description:"",name:"id",required:!0,type:{name:"string"}},spec:{defaultValue:null,description:"",name:"spec",required:!0,type:{name:"Record<string, any>"}},tooltipPosition:{defaultValue:{value:"bottom"},description:"",name:"tooltipPosition",required:!1,type:{name:"enum",value:[{value:'"top"'},{value:'"bottom"'}]}},theme:{defaultValue:{value:"custom"},description:"",name:"theme",required:!1,type:{name:"enum",value:[{value:'"custom"'},{value:'"dark"'},{value:'"light"'}]}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/lib/components/vegachart/VegaChart.component.tsx#VegaChart"]={docgenInfo:VegaChart.__docgenInfo,name:"VegaChart",path:"src/lib/components/vegachart/VegaChart.component.tsx#VegaChart"})}catch(__react_docgen_typescript_loader_error){}}}]);