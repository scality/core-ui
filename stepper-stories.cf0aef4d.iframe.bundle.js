"use strict";(self.webpackChunk_scality_core_ui=self.webpackChunk_scality_core_ui||[]).push([[44674],{"./stories/stepper.stories.tsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{SimpleStepper:()=>SimpleStepper,StateCompleted:()=>StateCompleted,StateError:()=>StateError,StateInProgress:()=>StateInProgress,__namedExportsOrder:()=>__namedExportsOrder,default:()=>stepper_stories});var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),react=__webpack_require__("./node_modules/react/index.js"),Steppers_component=__webpack_require__("./src/lib/components/steppers/Steppers.component.tsx"),Box=__webpack_require__("./src/lib/components/box/Box.ts");window.StepperContext||(window.StepperContext=(0,react.createContext)(null));const useStepper=(index,steps)=>{const context=(0,react.useContext)(window.StepperContext);if(null===context)throw new Error("Cannot use useStepper outside of Stepper");const{next,prev}=context;return{next,prev}},Stepper=({steps})=>{const[stepProps,setStepProps]=(0,react.useState)({step:0,props:{}}),next=(0,react.useCallback)(props=>{setStepProps(current=>({step:current.step+1,props}))},[]),prev=(0,react.useCallback)(props=>{setStepProps(current=>({step:current.step-1,props}))},[]),{Component}=steps[stepProps.step],StepperContext=window.StepperContext,stepperValue=(0,react.useMemo)(()=>({next,prev}),[next,prev]);return(0,jsx_runtime.jsx)(StepperContext.Provider,{value:stepperValue,children:(0,jsx_runtime.jsxs)(Box.a,{display:"flex",gap:32,flex:1,height:"100%",children:[(0,jsx_runtime.jsx)(Steppers_component.t,{activeStep:stepProps.step,steps:steps.map(step=>({title:step.label}))}),(0,jsx_runtime.jsx)(Component,{...stepProps.props})]})})};try{Stepper.displayName="Stepper",Stepper.__docgenInfo={description:"",displayName:"Stepper",props:{steps:{defaultValue:null,description:"",name:"steps",required:!0,type:{name:"readonly [...T extends [] ? [] : T extends [infer Head] ? [GetResults<Head>] : T extends [infer Head, ...infer Tail] ? [...Tail] extends [] ? [] : [...Tail] extends [...] ? [...] : [......] extends [...] ? [......] extends [] ? [] : [......] extends [...] ? [...] : [......] extends [...] ? [......] extends [] ? [] :..."}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/lib/components/steppers/Stepper.component.tsx#Stepper"]={docgenInfo:Stepper.__docgenInfo,name:"Stepper",path:"src/lib/components/steppers/Stepper.component.tsx#Stepper"})}catch(__react_docgen_typescript_loader_error){}var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),Buttonv2_component=__webpack_require__("./src/lib/components/buttonv2/Buttonv2.component.tsx"),Text_component=__webpack_require__("./src/lib/components/text/Text.component.tsx"),common=__webpack_require__("./stories/common.tsx");const Wrapper=styled_components_browser_esm.Ay.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  height: 100%;
  min-width: 16rem;
  border: 1px solid rgba(128, 128, 128, 0.2);
  border-radius: 6px;
  padding: 16px;
`,StepBody=styled_components_browser_esm.Ay.div`
  flex: 1;
  padding: 8px 0;
`,StepActions=styled_components_browser_esm.Ay.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding-top: 16px;
`,Hidden=styled_components_browser_esm.Ay.span`
  visibility: hidden;
`,STEPS=[{label:"Step 1",Component:props=>{const{next}=useStepper();return(0,jsx_runtime.jsxs)(Wrapper,{children:[(0,jsx_runtime.jsx)(StepBody,{children:(0,jsx_runtime.jsx)(Text_component.EY,{children:"First Step"})}),(0,jsx_runtime.jsxs)(StepActions,{children:[(0,jsx_runtime.jsx)(Hidden,{children:(0,jsx_runtime.jsx)(Buttonv2_component.$n,{label:"Back",variant:"secondary",onClick:()=>{}})}),(0,jsx_runtime.jsx)(Buttonv2_component.$n,{label:"Next",variant:"primary",onClick:()=>next({name:"something"})})]})]})}},{label:"Step 2",Component:({name})=>{const{next,prev}=useStepper();return(0,jsx_runtime.jsxs)(Wrapper,{children:[(0,jsx_runtime.jsx)(StepBody,{children:(0,jsx_runtime.jsxs)(Text_component.EY,{children:["Second Step: ",name]})}),(0,jsx_runtime.jsxs)(StepActions,{children:[(0,jsx_runtime.jsx)(Buttonv2_component.$n,{label:"Back",variant:"secondary",onClick:()=>prev({})}),(0,jsx_runtime.jsx)(Buttonv2_component.$n,{label:"Next",variant:"primary",onClick:()=>next({type:"anything"})})]})]})}},{label:"Step 3",Component:({type})=>{const{prev}=useStepper();return(0,jsx_runtime.jsxs)(Wrapper,{children:[(0,jsx_runtime.jsx)(StepBody,{children:(0,jsx_runtime.jsxs)(Text_component.EY,{children:["Third Step: ",type]})}),(0,jsx_runtime.jsxs)(StepActions,{children:[(0,jsx_runtime.jsx)(Buttonv2_component.$n,{label:"Back",variant:"secondary",onClick:()=>prev({name:"something"})}),(0,jsx_runtime.jsx)(Hidden,{children:(0,jsx_runtime.jsx)(Buttonv2_component.$n,{label:"Next",variant:"primary",onClick:()=>{}})})]})]})}}];const stepper_stories={tags:["autodocs"],title:"Components/Progress & loading/Stepper",component:Stepper},SimpleStepper={name:"Simple Stepper",render:()=>(0,jsx_runtime.jsx)(common.mO,{children:(0,jsx_runtime.jsx)(Stepper,{steps:STEPS})})},STATE_STEPS=[{title:"Configure"},{title:"Schedule"},{title:"Confirm"}],StateCompleted={tags:["!dev"],render:()=>(0,jsx_runtime.jsx)(Steppers_component.t,{steps:STATE_STEPS,activeStep:2})},StateInProgress={tags:["!dev"],render:()=>(0,jsx_runtime.jsx)(Steppers_component.t,{steps:[{title:"Configure"},{title:"Schedule",inProgress:!0},{title:"Confirm"}],activeStep:1})},StateError={tags:["!dev"],render:()=>(0,jsx_runtime.jsx)(Steppers_component.t,{steps:[{title:"Configure"},{title:"Schedule",error:!0},{title:"Confirm"}],activeStep:1})},__namedExportsOrder=["SimpleStepper","StateCompleted","StateInProgress","StateError"];SimpleStepper.parameters={...SimpleStepper.parameters,docs:{...SimpleStepper.parameters?.docs,source:{originalSource:"{\n  name: 'Simple Stepper',\n  render: () => <StoryWrapper>\n      <Stepper steps={STEPS} />\n    </StoryWrapper>\n}",...SimpleStepper.parameters?.docs?.source}}},StateCompleted.parameters={...StateCompleted.parameters,docs:{...StateCompleted.parameters?.docs,source:{originalSource:"{\n  tags: ['!dev'],\n  render: () => <Steppers steps={STATE_STEPS} activeStep={2} />\n}",...StateCompleted.parameters?.docs?.source}}},StateInProgress.parameters={...StateInProgress.parameters,docs:{...StateInProgress.parameters?.docs,source:{originalSource:"{\n  tags: ['!dev'],\n  render: () => <Steppers steps={[{\n    title: 'Configure'\n  }, {\n    title: 'Schedule',\n    inProgress: true\n  }, {\n    title: 'Confirm'\n  }]} activeStep={1} />\n}",...StateInProgress.parameters?.docs?.source}}},StateError.parameters={...StateError.parameters,docs:{...StateError.parameters?.docs,source:{originalSource:"{\n  tags: ['!dev'],\n  render: () => <Steppers steps={[{\n    title: 'Configure'\n  }, {\n    title: 'Schedule',\n    error: true\n  }, {\n    title: 'Confirm'\n  }]} activeStep={1} />\n}",...StateError.parameters?.docs?.source}}}},"./src/lib/components/steppers/Steppers.component.tsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{t:()=>Steppers});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/jsx-runtime.js"),styled_components__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),_spacing__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/lib/spacing.tsx"),_style_theme__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/lib/style/theme.ts"),_utils__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/lib/utils.ts"),_icon_Icon_component__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/lib/components/icon/Icon.component.tsx"),_loader_Loader_component__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./src/lib/components/loader/Loader.component.tsx");const SteppersContainer=styled_components__WEBPACK_IMPORTED_MODULE_1__.Ay.div`
  padding-top: 4rem;
  padding-left: 2rem;
`,StepContainer=styled_components__WEBPACK_IMPORTED_MODULE_1__.Ay.div`
  display: flex;
  min-height: 50px;
  min-width: 20rem;
`,Panel=styled_components__WEBPACK_IMPORTED_MODULE_1__.Ay.div`
  display: flex;
  flex-direction: column;
`,Circle=styled_components__WEBPACK_IMPORTED_MODULE_1__.Ay.div`
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 30px;
  width: 30px;
  height: 30px;
  border-radius: 50%;

  ${props=>{const{statusCritical,statusHealthy,selectedActive,buttonSecondary}=props.theme;return props.error?styled_components__WEBPACK_IMPORTED_MODULE_1__.AH`
        background-color: ${statusCritical};
        color: ${_style_theme__WEBPACK_IMPORTED_MODULE_3__.ON};
      `:props.active?styled_components__WEBPACK_IMPORTED_MODULE_1__.AH`
        background-color: ${selectedActive};
        color: ${_style_theme__WEBPACK_IMPORTED_MODULE_3__.ON};
        svg {
          fill: ${_style_theme__WEBPACK_IMPORTED_MODULE_3__.ON};
        }
      `:props.completed?styled_components__WEBPACK_IMPORTED_MODULE_1__.AH`
        background-color: ${statusHealthy};
        color: ${_style_theme__WEBPACK_IMPORTED_MODULE_3__.ON};
      `:styled_components__WEBPACK_IMPORTED_MODULE_1__.AH`
        background-color: ${buttonSecondary};
        color: ${_style_theme__WEBPACK_IMPORTED_MODULE_3__.ON};
      `}};
`,StepHeader=styled_components__WEBPACK_IMPORTED_MODULE_1__.Ay.span`
  margin-left: ${_spacing__WEBPACK_IMPORTED_MODULE_2__.YK.r8};
  line-height: 30px;
  color: ${props=>props.active?(0,_utils__WEBPACK_IMPORTED_MODULE_4__.sP)("textPrimary"):(0,_utils__WEBPACK_IMPORTED_MODULE_4__.sP)("textSecondary")};
`,StepContent=styled_components__WEBPACK_IMPORTED_MODULE_1__.Ay.div`
  padding: ${_spacing__WEBPACK_IMPORTED_MODULE_2__.YK.r8} 0 ${_spacing__WEBPACK_IMPORTED_MODULE_2__.YK.r8} ${_spacing__WEBPACK_IMPORTED_MODULE_2__.YK.r8};
`,BottomBar=styled_components__WEBPACK_IMPORTED_MODULE_1__.Ay.hr`
  flex-grow: 1;
  margin: 0;
  border: none;
  margin: 4px 14px;

  ${props=>props.completed?styled_components__WEBPACK_IMPORTED_MODULE_1__.AH`
        border-left: 2px solid ${props.theme.statusHealthy};
      `:styled_components__WEBPACK_IMPORTED_MODULE_1__.AH`
        border-left: 2px solid ${_style_theme__WEBPACK_IMPORTED_MODULE_3__.wm};
      `};
`;function Step(props){const{title,content,active,completed,isLast,index=0,error,inProgress}=props,circleContent=completed?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_icon_Icon_component__WEBPACK_IMPORTED_MODULE_5__.In,{name:"Check"}):index+1;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(StepContainer,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(Panel,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Circle,{active,error,completed,children:active&&inProgress?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_loader_Loader_component__WEBPACK_IMPORTED_MODULE_6__.a,{size:"base"}):(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span",{children:circleContent})}),!isLast&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(BottomBar,{completed})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(Panel,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div",{style:{height:"30px",display:"flex",alignItems:"center"},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(StepHeader,{active,children:title})}),active&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(StepContent,{children:content})]})]})}function Steppers({steps,activeStep,...rest}){return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(SteppersContainer,{className:"sc-steppers",...rest,children:steps.map(({title,content,...stepRest},index)=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Step,{title,content,active:index===activeStep,completed:index<activeStep,isLast:index===steps.length-1,index,...stepRest},index))})}try{Steppers.displayName="Steppers",Steppers.__docgenInfo={description:"",displayName:"Steppers",props:{steps:{defaultValue:null,description:"",name:"steps",required:!0,type:{name:"StepProps[]"}},activeStep:{defaultValue:null,description:"",name:"activeStep",required:!0,type:{name:"number"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/lib/components/steppers/Steppers.component.tsx#Steppers"]={docgenInfo:Steppers.__docgenInfo,name:"Steppers",path:"src/lib/components/steppers/Steppers.component.tsx#Steppers"})}catch(__react_docgen_typescript_loader_error){}}}]);
//# sourceMappingURL=stepper-stories.cf0aef4d.iframe.bundle.js.map