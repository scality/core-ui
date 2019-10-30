import React from "react";
import { storiesOf } from "@storybook/react";
import Breadcrumb from "../src/lib/components/breadcrumb/Breadcrumb.component";
import { Wrapper, Title } from "./common";

storiesOf("Breadcrumb", module).add("Default", () => {
  return (
    <Wrapper>
      <Title>Default Breadcrumb </Title>
      <Breadcrumb
        paths={[
          <a href="home">home</a>,
          <label href="clusters">clusters</label>,
          <a href="cluster">cluster_1</a>,
          <label href="nodes">nodes</label>,
          <a
            href="node"
            title={"node_longlonglonglonglonglonglonglonglonglonglong"}
          >
            node_longlonglonglonglonglonglonglonglonglonglong
          </a>,
          <a href="volumes">volumes</a>,
          <label title={"volume_longlonglonglonglonglonglonglonglong"}>
            volume_longlonglonglonglonglonglonglonglong
          </label>
        ]}
      />
    </Wrapper>
  );
});
