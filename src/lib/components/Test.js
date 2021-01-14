import React from "react";
import styled from "styled-components";

const MyTest = styled.button`
  background-color: ${({ color }) => color || "red"};
`;

export { MyTest };
