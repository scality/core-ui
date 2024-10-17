"use strict";(self.webpackChunk_scality_core_ui=self.webpackChunk_scality_core_ui||[]).push([[85583],{"./stories/formattedate.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{FormattedDate:()=>FormattedDate,__namedExportsOrder:()=>__namedExportsOrder,default:()=>formattedate_stories});__webpack_require__("./node_modules/react/index.js");var index_esm=__webpack_require__("./node_modules/@js-temporal/polyfill/dist/index.esm.js");function getDateDaysDiff(startDate,endDate,unit){var diff=index_esm.fE.Duration.from({milliseconds:endDate.getTime()-startDate.getTime()}).total({unit,relativeTo:startDate.toISOString().split("T")[0]});return diff>0?Math.floor(diff):Math.round(diff)}var Tooltip_component=__webpack_require__("./src/lib/components/tooltip/Tooltip.component.tsx"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),DATE_FORMATER=Intl.DateTimeFormat("fr-CA",{year:"numeric",month:"2-digit",day:"2-digit",hour12:!1}),TIME_SECOND_FORMATER=Intl.DateTimeFormat("en-GB",{hour12:!1,hour:"2-digit",minute:"2-digit",second:"2-digit"}),TIME_FORMATER=Intl.DateTimeFormat("en-GB",{hour12:!1,hour:"2-digit",minute:"2-digit"}),isItFutureOrIsItPast=(timeDiff,stringToBeFormatted)=>timeDiff>0?"".concat(stringToBeFormatted," ago"):"in ".concat(stringToBeFormatted),FormattedDateTime=_ref=>{var{format,value}=_ref;switch(format){case"date":return(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:DATE_FORMATER.format(value)});case"date-time":return(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:DATE_FORMATER.format(value)+" "+TIME_FORMATER.format(value)});case"date-time-second":return(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:DATE_FORMATER.format(value)+" "+TIME_SECOND_FORMATER.format(value)});case"time":return(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:TIME_FORMATER.format(value)});case"time-second":return(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:TIME_SECOND_FORMATER.format(value)});case"relative":var now=new Date,monthDiff=getDateDaysDiff(value,now,"months"),dayDiff=getDateDaysDiff(value,now,"days");if(0!==monthDiff&&Math.abs(dayDiff)>90)return(0,jsx_runtime.jsx)(Tooltip_component.m_,{overlay:(0,jsx_runtime.jsx)(FormattedDateTime,{format:"date-time-second",value}),children:isItFutureOrIsItPast(monthDiff,"".concat(Math.abs(monthDiff)," month").concat(Math.abs(monthDiff)>1?"s":""))});if(0!==dayDiff)return(0,jsx_runtime.jsx)(Tooltip_component.m_,{overlay:(0,jsx_runtime.jsx)(FormattedDateTime,{format:"date-time-second",value}),children:isItFutureOrIsItPast(dayDiff,"".concat(Math.abs(dayDiff)," day").concat(Math.abs(dayDiff)>1?"s":""))});var hourDiff=getDateDaysDiff(value,now,"hours");if(0!==hourDiff)return(0,jsx_runtime.jsx)(Tooltip_component.m_,{overlay:(0,jsx_runtime.jsx)(FormattedDateTime,{format:"date-time-second",value}),children:isItFutureOrIsItPast(hourDiff,"".concat(Math.abs(hourDiff)," hour").concat(Math.abs(hourDiff)>1?"s":""))});var minuteDiff=getDateDaysDiff(value,now,"minutes");return 0!==minuteDiff?(0,jsx_runtime.jsx)(Tooltip_component.m_,{overlay:(0,jsx_runtime.jsx)(FormattedDateTime,{format:"date-time-second",value}),children:isItFutureOrIsItPast(minuteDiff,"".concat(Math.abs(minuteDiff)," minute").concat(Math.abs(minuteDiff)>1?"s":""))}):(0,jsx_runtime.jsx)(Tooltip_component.m_,{overlay:(0,jsx_runtime.jsx)(FormattedDateTime,{format:"date-time-second",value}),children:"few seconds ago"});default:return(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{})}};try{FormattedDateTime.displayName="FormattedDateTime",FormattedDateTime.__docgenInfo={description:"",displayName:"FormattedDateTime",props:{format:{defaultValue:null,description:"",name:"format",required:!0,type:{name:"enum",value:[{value:'"date"'},{value:'"time"'},{value:'"date-time"'},{value:'"date-time-second"'},{value:'"time-second"'},{value:'"relative"'}]}},value:{defaultValue:null,description:"",name:"value",required:!0,type:{name:"Date"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/lib/components/date/FormattedDateTime.tsx#FormattedDateTime"]={docgenInfo:FormattedDateTime.__docgenInfo,name:"FormattedDateTime",path:"src/lib/components/date/FormattedDateTime.tsx#FormattedDateTime"})}catch(__react_docgen_typescript_loader_error){}const formattedate_stories={parameters:{storySource:{source:"import React from 'react';\nimport { FormattedDateTime } from '../src/lib/components/date/FormattedDateTime';\n\nexport default {\n  title: 'Components/FormattedDateTime',\n  component: FormattedDateTime,\n};\n\nexport const FormattedDate = {\n  render: ({}) => {\n    const now = new Date();\n    return (\n      <>\n        <table>\n          <thead>\n            <td>Format</td>\n            <td>Visual</td>\n          </thead>\n          <tbody>\n            {[\n              'date' as const,\n              'date-time' as const,\n              'date-time-second' as const,\n              'time' as const,\n              'time-second' as const,\n              'relative' as const,\n            ].map((format) => (\n              <tr key={format}>\n                <td>{format}</td>\n                <td>\n                  <FormattedDateTime format={format} value={now} />\n                </td>\n              </tr>\n            ))}\n            <tr>\n              <td>relative past</td>\n              <td>\n                <FormattedDateTime\n                  format={'relative'}\n                  value={new Date(new Date().setMonth(now.getMonth() - 10))}\n                />\n              </td>\n            </tr>\n            <tr>\n              <td>relative future</td>\n              <td>\n                <FormattedDateTime\n                  format={'relative'}\n                  value={new Date(new Date().setMonth(now.getMonth() + 10))}\n                />\n              </td>\n            </tr>\n          </tbody>\n        </table>\n      </>\n    );\n  },\n};\n",locationsMap:{"formatted-date":{startLoc:{col:29,line:9},endLoc:{col:1,line:58},startBody:{col:29,line:9},endBody:{col:1,line:58}}}}},title:"Components/FormattedDateTime",component:FormattedDateTime};var FormattedDate={render:_ref=>{var{}=_ref,now=new Date;return(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:(0,jsx_runtime.jsxs)("table",{children:[(0,jsx_runtime.jsxs)("thead",{children:[(0,jsx_runtime.jsx)("td",{children:"Format"}),(0,jsx_runtime.jsx)("td",{children:"Visual"})]}),(0,jsx_runtime.jsxs)("tbody",{children:[["date","date-time","date-time-second","time","time-second","relative"].map((format=>(0,jsx_runtime.jsxs)("tr",{children:[(0,jsx_runtime.jsx)("td",{children:format}),(0,jsx_runtime.jsx)("td",{children:(0,jsx_runtime.jsx)(FormattedDateTime,{format,value:now})})]},format))),(0,jsx_runtime.jsxs)("tr",{children:[(0,jsx_runtime.jsx)("td",{children:"relative past"}),(0,jsx_runtime.jsx)("td",{children:(0,jsx_runtime.jsx)(FormattedDateTime,{format:"relative",value:new Date((new Date).setMonth(now.getMonth()-10))})})]}),(0,jsx_runtime.jsxs)("tr",{children:[(0,jsx_runtime.jsx)("td",{children:"relative future"}),(0,jsx_runtime.jsx)("td",{children:(0,jsx_runtime.jsx)(FormattedDateTime,{format:"relative",value:new Date((new Date).setMonth(now.getMonth()+10))})})]})]})]})})}};FormattedDate.parameters={...FormattedDate.parameters,docs:{...FormattedDate.parameters?.docs,source:{originalSource:"{\n  render: ({}) => {\n    const now = new Date();\n    return <>\n        <table>\n          <thead>\n            <td>Format</td>\n            <td>Visual</td>\n          </thead>\n          <tbody>\n            {[('date' as const), ('date-time' as const), ('date-time-second' as const), ('time' as const), ('time-second' as const), ('relative' as const)].map(format => <tr key={format}>\n                <td>{format}</td>\n                <td>\n                  <FormattedDateTime format={format} value={now} />\n                </td>\n              </tr>)}\n            <tr>\n              <td>relative past</td>\n              <td>\n                <FormattedDateTime format={'relative'} value={new Date(new Date().setMonth(now.getMonth() - 10))} />\n              </td>\n            </tr>\n            <tr>\n              <td>relative future</td>\n              <td>\n                <FormattedDateTime format={'relative'} value={new Date(new Date().setMonth(now.getMonth() + 10))} />\n              </td>\n            </tr>\n          </tbody>\n        </table>\n      </>;\n  }\n}",...FormattedDate.parameters?.docs?.source}}};const __namedExportsOrder=["FormattedDate"]}}]);