//@flow
import React from "react";
import { storiesOf } from "@storybook/react";
import ReactTable from "../src/lib/components/reacttable/ReactTable.component";
import { Wrapper } from "./common";

storiesOf("ReactTable", module).add("Default", () => {
  return (
    <Wrapper>
      <ReactTable />
    </Wrapper>
  );
});
