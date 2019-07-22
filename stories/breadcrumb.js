import React from "react";
import { storiesOf } from "@storybook/react";
import { ThemeProvider } from "styled-components";
import Breadcrumb from "../src/lib/components/breadcrumb/Breadcrumb.component";
import { jade } from "../src/lib/style/theme";

storiesOf("Breadcrumb", module).add("Default", () => {
  return (
    <div>
      <h3>Default Breadcrumb </h3>
      <Breadcrumb
        paths={[
          <a href="home">home</a>,
          <a href="clusters">clusters</a>,
          <a href="cluster">cluster_1</a>,
          <a href="nodes">nodes</a>,
          <a
            href="node"
            title={"node_longlonglonglonglonglonglonglonglonglonglong"}
          >
            node_longlonglonglonglonglonglonglonglonglonglong
          </a>,
          <a href="volumes">volumes</a>,
          <label>volume_1</label>
        ]}
      />
      <h3>Breadcrumb with customized color</h3>
      <Breadcrumb
        hoverColor="#006F62"
        activeColor="#e99121"
        paths={[
          <a href="home">home</a>,
          <a href="clusters">clusters</a>,
          <a href="cluster">cluster_1</a>,
          <a href="nodes">nodes</a>,
          <a
            href="node"
            title={"node_longlonglonglonglonglonglonglonglonglonglong"}
          >
            node_longlonglonglonglonglonglonglonglonglonglong
          </a>,
          <a href="volumes">volumes</a>,
          <label>volume_1</label>
        ]}
      />
    </div>
  );
});
