// @flow
import React from "react";
import { Wrapper, Title } from "./common"

export default {
  title: "Style/Icons",
};

export const Default = () => {
  return (
    <Wrapper className="storybook-icon">

      <i class="fab fa-js"></i>
      <p>test</p>
      
     <i class="fas fa-wallet"></i>
      <p>Account</p>
                 
    </Wrapper>
  );
};
