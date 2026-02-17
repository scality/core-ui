"use strict";(self.webpackChunk_scality_core_ui=self.webpackChunk_scality_core_ui||[]).push([[32217],{"./src/lib/components/constrainedtext/Constrainedtext.component.tsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{u:()=>ConstrainedText});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/jsx-runtime.js"),react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/index.js"),styled_components__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),_tooltip_Tooltip_component__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/lib/components/tooltip/Tooltip.component.tsx"),_text_Text_component__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/lib/components/text/Text.component.tsx");const ConstrainedTextContainer=styled_components__WEBPACK_IMPORTED_MODULE_2__.Ay.div`
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: ${props=>props.centered?"center":"left"};

  ${props=>props.lineClamp>1?`\n  display: -webkit-box;\n  -webkit-line-clamp: ${props.lineClamp};\n  -webkit-box-orient: vertical;\n  overflow-wrap: break-word;\n  word-break: normal;\n  line-height: 1.2;\n  `:"overflow-wrap: break-word;\n      white-space: nowrap;\n      word-break: normal;\n      "};
`,BlockTooltip=styled_components__WEBPACK_IMPORTED_MODULE_2__.Ay.div`
  width: stretch;
  & > .sc-tooltip {
    display: block;
  }
`;function getConstrainedTextContainer(constrainedTextRef,lineClamp,text,centered){return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ConstrainedTextContainer,{ref:constrainedTextRef,className:"sc-constrainedtext",lineClamp,centered,children:text})}function ConstrainedText({text,tooltipStyle,tooltipPlacement,lineClamp=1,color,centered=!1}){const[displayToolTip,setDisplayToolTip]=(0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(!1),constrainedTextRef=(0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(element=>{element&&text&&setDisplayToolTip(function isEllipsisActive(element){return element&&(element.offsetWidth<element.scrollWidth||element.offsetHeight<element.scrollHeight)}(element))},[text]);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(BlockTooltip,{children:displayToolTip?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_tooltip_Tooltip_component__WEBPACK_IMPORTED_MODULE_3__.m_,{overlay:text,overlayStyle:tooltipStyle,placement:tooltipPlacement,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_text_Text_component__WEBPACK_IMPORTED_MODULE_4__.EY,{color,children:getConstrainedTextContainer(constrainedTextRef,lineClamp,text,centered)})}):(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_text_Text_component__WEBPACK_IMPORTED_MODULE_4__.EY,{color,children:getConstrainedTextContainer(constrainedTextRef,lineClamp,text,centered)})})}try{ConstrainedText.displayName="ConstrainedText",ConstrainedText.__docgenInfo={description:"",displayName:"ConstrainedText",props:{text:{defaultValue:null,description:"",name:"text",required:!0,type:{name:"string | number | Element | Element[]"}},tooltipStyle:{defaultValue:null,description:"",name:"tooltipStyle",required:!1,type:{name:"any"}},tooltipPlacement:{defaultValue:null,description:"",name:"tooltipPlacement",required:!1,type:{name:"any"}},lineClamp:{defaultValue:{value:"1"},description:"",name:"lineClamp",required:!1,type:{name:"number"}},centered:{defaultValue:{value:"false"},description:"",name:"centered",required:!1,type:{name:"boolean"}},color:{defaultValue:null,description:"",name:"color",required:!1,type:{name:"enum",value:[{value:'"statusHealthy"'},{value:'"statusWarning"'},{value:'"statusCritical"'},{value:'"infoPrimary"'},{value:'"infoSecondary"'},{value:'"selectedActive"'},{value:'"statusHealthyRGB"'},{value:'"statusWarningRGB"'},{value:'"statusCriticalRGB"'},{value:'"highlight"'},{value:'"border"'},{value:'"buttonPrimary"'},{value:'"buttonSecondary"'},{value:'"buttonDelete"'},{value:'"backgroundLevel1"'},{value:'"backgroundLevel2"'},{value:'"backgroundLevel3"'},{value:'"backgroundLevel4"'},{value:'"navbarBackground"'},{value:'"textPrimary"'},{value:'"textSecondary"'},{value:'"textTertiary"'},{value:'"textReverse"'},{value:'"textLink"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/lib/components/constrainedtext/Constrainedtext.component.tsx#ConstrainedText"]={docgenInfo:ConstrainedText.__docgenInfo,name:"ConstrainedText",path:"src/lib/components/constrainedtext/Constrainedtext.component.tsx#ConstrainedText"})}catch(__react_docgen_typescript_loader_error){}},"./src/lib/components/selectv2/Selectv2.component.tsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{l:()=>Select});var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),react=__webpack_require__("./node_modules/react/index.js"),Tooltip_component=__webpack_require__("./src/lib/components/tooltip/Tooltip.component.tsx"),ScrollbarWrapper_component=__webpack_require__("./src/lib/components/scrollbarwrapper/ScrollbarWrapper.component.tsx"),index_4bd03571_esm=__webpack_require__("./node_modules/react-select/dist/index-4bd03571.esm.js"),Icon_component=__webpack_require__("./src/lib/components/icon/Icon.component.tsx"),react_select_esm=__webpack_require__("./node_modules/react-select/dist/react-select.esm.js"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),spacing=__webpack_require__("./src/lib/spacing.tsx"),theme=__webpack_require__("./src/lib/style/theme.ts"),utils=__webpack_require__("./src/lib/utils.ts");const SelectStyle=(0,styled_components_browser_esm.Ay)(react_select_esm.Ay)`
  font-size: ${theme.J.base};
  box-sizing: border-box;
  width: ${({width})=>width};
  ${({isDefault})=>isDefault?`height: ${spacing.YK.r32}`:`height: ${spacing.YK.r24}`};

  ${({isDefault})=>!isDefault&&`font-weight: ${theme.Wy.bold};`}
  .sc-select__control {
    ${({isDefault})=>isDefault?`min-height: ${spacing.YK.r32}`:`min-height: ${spacing.YK.r24}`};
    padding-left: ${({isDefault})=>isDefault?spacing.YK.r8:spacing.YK.r16};
    cursor: pointer;

    caret-color: ${({isDefault})=>(0,utils.sP)(isDefault?"textSecondary":"textPrimary")};
    background-color: ${({isDefault})=>(0,utils.sP)(isDefault?"backgroundLevel1":"selectedActive")};
    height: auto;
    border-radius: ${({isDefault})=>isDefault?spacing.YK.r4:spacing.YK.r12};
    border: ${spacing.YK.r1} solid
      ${({isDefault})=>(0,utils.sP)(isDefault?"border":"selectedActive")};

    &:hover {
      border: ${spacing.YK.r1} solid
        ${({isDefault})=>(0,utils.sP)(isDefault?"infoPrimary":"selectedActive")};
      ${({isDefault})=>!isDefault&&`background-color: ${(0,utils.sP)("highlight")};`}
    }

    &.sc-select__control--is-disabled {
      pointer-events: auto;
      cursor: not-allowed;
      opacity: 0.5;

      &:hover {
        border: ${spacing.YK.r1} solid
          ${({isDefault})=>(0,utils.sP)(isDefault?"border":"selectedActive")};
      }
    }

    &.sc-select__control--menu-is-open {
      ${props=>props.isDefault?`background-color: ${props.theme.backgroundLevel1};`:`\n            border-radius: ${props.isMenuBottom?`${spacing.YK.r12} ${spacing.YK.r12} 0 0`:`0 0 ${spacing.YK.r12} ${spacing.YK.r12}`};\n            background-color: ${props.theme.selectedActive} !important;\n      `}
    }

    &.sc-select__control--is-focused {
      .sc-select__placeholder {
        ${props=>props.isSearchable&&"opacity: 0.5;"}
      }
      ${props=>props.isDefault?`border-color: ${props.theme.infoPrimary};`:`\n             border-color: ${props.theme.selectedActive};\n             background-color: ${props.theme.highlight};\n      `}
      box-shadow: none;
      outline: none;
    }

    .sc-select__input {
      ${({isDefault})=>isDefault&&`margin-top: ${spacing.YK.r1};`}
      color: ${(0,utils.sP)("textPrimary")};

      & > input {
        font-weight: inherit;
        font-family: inherit;
      }
    }

    .sc-select__placeholder {
      font-style: italic;
      color: ${(0,utils.sP)("textSecondary")};
    }

    .sc-select__value-container {
      ${({isDefault})=>!isDefault&&`max-height: ${spacing.YK.r24};`}
      padding: 0;

      input {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        opacity: 1 !important;
      }

      .value-container-icon {
        color: ${(0,utils.sP)("textPrimary")};
        padding-right: ${spacing.YK.r4};
      }
    }

    .sc-select__single-value {
      color: ${(0,utils.sP)("textPrimary")};
    }

    .sc-select__indicator,
    .sc-select__dropdown-indicator {
      padding: 0 ${spacing.YK.r8} 0 ${spacing.YK.r8};
      color: ${({isDefault})=>(0,utils.sP)(isDefault?"textSecondary":"textPrimary")};
    }
  }

  .sc-select__menu {
    width: ${({width})=>width};
    border: ${spacing.YK.r1} solid
      ${({isDefault})=>(0,utils.sP)(isDefault?"border":"selectedActive")};
    ${props=>props.options&&0===props.options.length&&!props.isDefault&&"\n      border: none;\n    "}
    color: ${(0,utils.sP)("textPrimary")};
    background-color: ${(0,utils.sP)("backgroundLevel1")};
    box-sizing: border-box;
    overflow: hidden;
    margin: 0;
    ${props=>!props.isDefault&&`\n        border-radius: ${props.isMenuBottom?`0 0 ${spacing.YK.r12} ${spacing.YK.r12}`:`${spacing.YK.r12} ${spacing.YK.r12} 0 0`};\n    `}
    z-index: ${theme.fE.dropdown};

    .sc-select__menu-list {
      padding: 0;
      overflow: hidden;
      ${({isDefault})=>isDefault?`\n        max-height: calc(${spacing.YK.r32} * ${props=>props.ITEMS_PER_SCROLL_WINDOW} + ${spacing.YK.r32} / 2);`:`\n        max-height: calc(${spacing.YK.r24} * ${props=>props.ITEMS_PER_SCROLL_WINDOW} + ${spacing.YK.r24} / 2);`}

      .sc-select__menu-notice {
        color: ${({isDefault})=>(0,utils.sP)(isDefault?"textSecondary":"textPrimary")};
        &.sc-select__menu-notice--no-options {
          background-color: ${({isDefault})=>(0,utils.sP)(isDefault?"backgroundLevel3":"selectedActive")};
        }
      }
      .sc-tooltip {
        width: 100%;
      }

      div > .react-window-option > .sc-select__option,
      .sc-select__option {
        cursor: pointer;
        background-color: ${(0,utils.sP)("backgroundLevel1")};
        height: ${({isDefault})=>isDefault?spacing.YK.r40:spacing.YK.r24};
        display: flex;
        align-items: center;
        justify-content: space-between;
        border: ${spacing.YK.r1} solid transparent;
        border-radius: 0;
        ${props=>props.isDefault&&`border-bottom: ${spacing.YK.r1} solid ${props.theme.border};`}
        padding-left: 0;

        .option-icon {
          padding-right: ${spacing.YK.r4};
        }

        &.sc-select__option--is-focused {
          ${({isDefault})=>isDefault&&`background-color: ${(0,utils.sP)("backgroundLevel1")};`}
          border: ${spacing.YK.r1} dashed
            ${(0,utils.sP)("selectedActive")};
        }

        &.sc-select__option:hover {
          border: ${spacing.YK.r1} solid transparent;
          background-color: ${(0,utils.sP)("highlight")};
        }

        &.sc-select__option--is-disabled {
          cursor: not-allowed;
          opacity: 50%;
          background-color: ${(0,utils.sP)("backgroundLevel2")};
          font-style: italic;
          i {
            color: ${(0,utils.sP)("textPrimary")};
          }
        }

        &.sc-select__option--is-selected {
          &:before {
            content: '';
            background: ${(0,utils.sP)("selectedActive")};
            position: absolute;
            right: 0;
            height: ${spacing.YK.r24};
            width: ${spacing.YK.r4};
          }
          background-color: ${(0,utils.sP)("highlight")};
          color: ${props=>props.theme.textPrimary};
        }

        &.sc-select__option--is-disabled:hover {
          opacity: 50%;
          background-color: ${(0,utils.sP)("backgroundLevel2")};
        }

        .sc-highlighted-matching-text {
          color: ${(0,utils.sP)("selectedActive")};
        }

        .option-value-wrapper {
          display: flex;
          align-items: center;
          width: stretch;
          padding: ${spacing.YK.r4} ${spacing.YK.r8} ${spacing.YK.r4} ${spacing.YK.r16};
        }
      }

      ${({isDefault})=>isDefault&&`\n          div > .react-window-option:first-of-type > .sc-select__option {\n          .sc-select__option:first-of-type {\n            border-radius: ${spacing.YK.r4} ${spacing.YK.r4} 0 0;\n          }\n\n          div > .react-window-option:last-of-type > .sc-select__option {\n          .sc-select__option:last-of-type {\n            border-bottom: ${spacing.YK.r1} solid transparent;\n            border-radius: 0 0 ${spacing.YK.r4} ${spacing.YK.r4};\n          }\n        `}
    }
  }
`;var index_esm=__webpack_require__("./node_modules/react-window/dist/index.esm.js"),inputv2=__webpack_require__("./src/lib/components/inputv2/inputv2.tsx"),Constrainedtext_component=__webpack_require__("./src/lib/components/constrainedtext/Constrainedtext.component.tsx");function Option({value,children,disabled,icon,disabledReason,...rest}){const optionContext=(0,react.useContext)(OptionContext);if(!optionContext)throw new Error("Option cannot be rendered outside the Select component");const prevValue=(value=>{const ref=(0,react.useRef)(null);return(0,react.useEffect)(()=>{ref.current=value}),ref.current})(value);return(0,react.useEffect)(()=>(prevValue&&prevValue!==value&&optionContext.unregister(prevValue),optionContext.register({value,label:children||"",isDisabled:disabled||!1,icon,disabledReason,optionProps:{...rest}}),()=>{optionContext.unregister(value)}),[children,disabled,icon,value,prevValue]),(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{})}const Input=props=>(0,jsx_runtime.jsx)(index_4bd03571_esm.c.Input,{...props}),selectDropdownIndicator=(caretType,indicatorDirection)=>"chevron"===caretType?"up"===indicatorDirection?"Chevron-up":"Chevron-down":"up"===indicatorDirection?"Dropdown-up":"Dropdown-down",DropdownIndicator=props=>{const indicatorDirection=props.selectProps.menuIsOpen?"up":"down",caretType=props.selectProps.isDefault?"chevron":"caret";return(0,jsx_runtime.jsx)(index_4bd03571_esm.c.DropdownIndicator,{...props,children:(0,jsx_runtime.jsx)(Icon_component.In,{name:props.isDisabled?"Deletion-marker":selectDropdownIndicator(caretType,indicatorDirection)})})},InternalOption=(width,isDefaultVariant)=>props=>{const innerProps={...props.innerProps,...props.data.optionProps,onMouseMove:void 0,onMouseOver:void 0,role:"option","aria-disabled":props.isDisabled,"aria-selected":props.isSelected};return(0,jsx_runtime.jsx)(Tooltip_component.m_,{overlay:props.data.isDisabled&&props.data.disabledReason,placement:"right",overlayStyle:{marginLeft:"0.5rem",maxWidth:"15rem"},children:(0,jsx_runtime.jsxs)(index_4bd03571_esm.c.Option,{...props,innerProps,isFocused:props.isFocused&&props.selectProps.keyboardFocusEnabled,children:[(0,jsx_runtime.jsxs)("div",{className:"option-value-wrapper",children:[(0,jsx_runtime.jsx)("div",{className:"option-icon",children:props.data.icon}),(()=>{const label=props.data.label,inputValue=props.selectProps.inputValue,parts=label.split(inputValue).flatMap((item,index)=>[inputValue,item]).slice(1),reducedWidth=parseFloat(width.replace("rem"))-2+"rem";return inputValue?(0,jsx_runtime.jsx)(Constrainedtext_component.u,{lineClamp:isDefaultVariant?2:1,tooltipStyle:{width:reducedWidth},text:parts.map((part,i)=>{const highlightStyle=part.toLowerCase()===inputValue.toLowerCase()?"sc-highlighted-matching-text":"";return(0,jsx_runtime.jsx)("span",{role:highlightStyle?"mark":void 0,className:highlightStyle,children:part},i)})}):(0,jsx_runtime.jsx)(Constrainedtext_component.u,{lineClamp:isDefaultVariant?2:1,tooltipStyle:{width:reducedWidth},text:label})})()]}),(0,jsx_runtime.jsx)("div",{children:props.isDisabled&&(0,jsx_runtime.jsx)(Icon_component.In,{name:"Deletion-marker"})})]})})},Menu=props=>((0,react.useEffect)(()=>{props.selectProps.setIsMenuBottom("bottom"===props.placement)},[props]),(0,jsx_runtime.jsx)(index_4bd03571_esm.c.Menu,{...props})),MenuList=props=>{const listRef=(0,react.useRef)(null),{children,getValue}=props,[selectedOption]=getValue(),optionHeight=(0,utils.mO)(parseFloat(props.selectProps.isDefault?spacing.YK.r40:spacing.YK.r24))||32;let selectedIndex=0,focusedIndex=0;children&&children.length>0&&(selectedIndex=children.findIndex(child=>child.props.data===selectedOption),focusedIndex=props.focusedOption?children.findIndex(child=>child.props.data===props.focusedOption):selectedIndex);const initialOffset=selectedIndex*optionHeight-3*optionHeight;return(0,react.useEffect)(()=>{listRef&&listRef.current&&listRef.current.scrollTo(((list,index,itemCount,offset)=>{const{itemSize,height}=list.props,scrollOffset=list.state?list.state.scrollOffset:0,lastItemOffset=Math.max(0,itemCount*itemSize-height),maxOffset=Math.min(lastItemOffset,index*itemSize),minOffset=Math.max(0,index*itemSize-height+itemSize);return scrollOffset>=minOffset&&scrollOffset<=maxOffset?scrollOffset:scrollOffset<minOffset?0===minOffset?minOffset:minOffset+offset:0===maxOffset?maxOffset:maxOffset-offset})(listRef.current,focusedIndex,children.length,optionHeight/2))},[children.length,focusedIndex,optionHeight,listRef]),children.length>4?(0,jsx_runtime.jsx)(index_esm.Y1,{ref:listRef,className:"sc-select__menu-list",height:4*optionHeight+optionHeight/2,itemCount:children.length,itemSize:optionHeight,initialScrollOffset:initialOffset,style:{willChange:void 0},children:({index,style})=>(0,jsx_runtime.jsx)("div",{className:"react-window-option",style,children:children[index]})}):(0,jsx_runtime.jsx)(index_4bd03571_esm.c.MenuList,{...props,children})},ValueContainer=({children,...props})=>{const selectedOption=props.selectProps.selectedOption,icon=selectedOption?selectedOption.icon:null,ariaProps={innerProps:{disabled:!0,role:props.selectProps.isSearchable?"combobox":"listbox","aria-expanded":props.selectProps.menuIsOpen,"aria-autocomplete":"list","aria-label":props.selectProps.placeholder}};return(0,jsx_runtime.jsxs)(index_4bd03571_esm.c.ValueContainer,{...props,...ariaProps,children:[icon?(0,jsx_runtime.jsx)("div",{className:"value-container-icon",children:icon}):null,(0,jsx_runtime.jsx)("div",{children})]})},OptionContext=(0,react.createContext)(null);function SelectBox({placeholder="Select...",disabled=!1,value,onChange,variant="default",className,size="1",id,selectRef,...rest}){const[keyboardFocusEnabled,setKeyboardFocusEnabled]=(0,react.useState)(!1),[searchSelection,setSearchSelection]=(0,react.useState)(""),[searchValue,setSearchValue]=(0,react.useState)(""),[customPlaceholder,setPlaceholder]=(0,react.useState)(placeholder),isDefaultVariant="default"===variant,[isMenuBottom,setIsMenuBottom]=(0,react.useState)(!0),internalSelectRef=(0,react.useRef)(null);(0,react.useImperativeHandle)(selectRef,()=>({focus:()=>{internalSelectRef.current&&internalSelectRef.current.focus()},blur:()=>{internalSelectRef.current&&internalSelectRef.current.blur()},select:internalSelectRef.current,openMenu:()=>{internalSelectRef.current&&internalSelectRef.current.setState({menuIsOpen:!0})},closeMenu:()=>{internalSelectRef.current&&internalSelectRef.current.setState({menuIsOpen:!1})},setValue:newValue=>{if(internalSelectRef.current){const option=options.find(opt=>opt.value===newValue);option&&internalSelectRef.current.select.setValue(option)}},clearValue:()=>{internalSelectRef.current&&internalSelectRef.current.select&&internalSelectRef.current.select.clearValue()}}),[internalSelectRef]);const options=function useOptions(){const optionContext=(0,react.useContext)(OptionContext);if(!optionContext)throw new Error("useOptions cannot be rendered outside the Select component");return Object.values(optionContext.options)}(),isEmptyStringInOptions=options.find(option=>""===option.value);return(0,react.useEffect)(()=>{!isEmptyStringInOptions&&""===value&&internalSelectRef.current&&internalSelectRef.current.select&&internalSelectRef.current.select.clearValue()},[value,isEmptyStringInOptions]),(0,jsx_runtime.jsx)(ScrollbarWrapper_component.K,{children:(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:options&&(0,jsx_runtime.jsx)(SelectStyle,{inputId:id,className:["sc-select",className].join(" "),classNamePrefix:"sc-select",name:"sc-select",value:searchSelection||options.find(opt=>opt.value===value),inputValue:options.length>8?searchValue:void 0,selectedOption:options.find(opt=>opt.value===value),keyboardFocusEnabled,options,isDisabled:disabled,placeholder:customPlaceholder,menuPlacement:"auto",isSearchable:options.length>8,components:{Input,Option:InternalOption((0,inputv2.c)(size),isDefaultVariant),Menu,MenuList,ValueContainer,DropdownIndicator,IndicatorSeparator:null},isDefault:isDefaultVariant,ITEMS_PER_SCROLL_WINDOW:4,onChange:option=>{const newValue=option?option.value:"";onChange&&"function"==typeof onChange&&newValue!==value&&onChange(newValue),options&&options.length>8&&internalSelectRef.current&&internalSelectRef.current.blur()},onInputChange:(inputValue,{action})=>{options&&options.length>8&&("menu-close"===action&&setSearchSelection(""),"input-blur"===action||"set-value"===action?(setPlaceholder(searchValue||placeholder),setSearchValue(inputValue)):(setSearchValue(inputValue),0===inputValue.length&&setPlaceholder(placeholder)))},ref:internalSelectRef,isMenuBottom,setIsMenuBottom,onBlur:rest.onBlur,onFocus:rest.onFocus,onMenuClose:()=>setKeyboardFocusEnabled(!1),onKeyDown:event=>{event&&"Enter"===event.key&&internalSelectRef.current&&!internalSelectRef.current.state.isOpen?internalSelectRef.current.setState({menuIsOpen:!0}):setKeyboardFocusEnabled(!0)},width:(0,inputv2.c)(size),...rest})})})}const SelectWithOptionContext=(0,react.forwardRef)((props,ref)=>{const[options,setOptions]=(0,react.useState)({}),register=(0,react.useCallback)(option=>{setOptions(prevOptions=>({...prevOptions,[option.value]:option}))},[]),unregister=(0,react.useCallback)(value=>{setOptions(prevOptions=>{const{[value]:_,...rest}=prevOptions;return rest})},[]),contextValue=(0,react.useMemo)(()=>({options,register,unregister}),[options,register,unregister]);return(0,jsx_runtime.jsx)(OptionContext.Provider,{value:contextValue,children:(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(SelectBox,{...props,selectRef:ref}),props.children]})})});SelectWithOptionContext.displayName="Select",SelectWithOptionContext.Option=Option;const Select=SelectWithOptionContext;try{Option.displayName="Option",Option.__docgenInfo={description:"",displayName:"Option",props:{title:{defaultValue:null,description:"",name:"title",required:!1,type:{name:"string"}},disabled:{defaultValue:null,description:"",name:"disabled",required:!1,type:{name:"boolean"}},icon:{defaultValue:null,description:"",name:"icon",required:!1,type:{name:"ReactNode"}},value:{defaultValue:null,description:"",name:"value",required:!0,type:{name:"string"}},disabledReason:{defaultValue:null,description:"",name:"disabledReason",required:!1,type:{name:"ReactNode"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/lib/components/selectv2/Selectv2.component.tsx#Option"]={docgenInfo:Option.__docgenInfo,name:"Option",path:"src/lib/components/selectv2/Selectv2.component.tsx#Option"})}catch(__react_docgen_typescript_loader_error){}try{Select.displayName="Select",Select.__docgenInfo={description:"",displayName:"Select",props:{id:{defaultValue:null,description:"",name:"id",required:!0,type:{name:"string"}},placeholder:{defaultValue:null,description:"",name:"placeholder",required:!1,type:{name:"string"}},disabled:{defaultValue:null,description:"",name:"disabled",required:!1,type:{name:"boolean"}},value:{defaultValue:null,description:"",name:"value",required:!1,type:{name:"string"}},onFocus:{defaultValue:null,description:"",name:"onFocus",required:!1,type:{name:"((event: FocusEvent) => void)"}},onBlur:{defaultValue:null,description:"",name:"onBlur",required:!1,type:{name:"((event: FocusEvent) => void)"}},onChange:{defaultValue:null,description:"",name:"onChange",required:!0,type:{name:"(newValue: string) => void"}},variant:{defaultValue:null,description:"",name:"variant",required:!1,type:{name:"enum",value:[{value:'"default"'},{value:'"rounded"'}]}},size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"1"'},{value:'"2/3"'},{value:'"1/2"'},{value:'"1/3"'}]}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},menuPosition:{defaultValue:null,description:"use menuPositon='fixed' inside modal to avoid display issue",name:"menuPosition",required:!1,type:{name:"enum",value:[{value:'"fixed"'},{value:'"absolute"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/lib/components/selectv2/Selectv2.component.tsx#Select"]={docgenInfo:Select.__docgenInfo,name:"Select",path:"src/lib/components/selectv2/Selectv2.component.tsx#Select"})}catch(__react_docgen_typescript_loader_error){}}}]);
//# sourceMappingURL=32217.c46b4bdb.iframe.bundle.js.map