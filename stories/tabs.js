import React from "react";
import { action } from "@storybook/addon-actions";
import Tabs from "../src/lib/components/tabs/Tabs.component";
import { Wrapper, Title } from "./common";

const tabs = [
  {
    selected: true,
    title: "Detail",
    onClick: action("Detail clicked"),
  },
  {
    selected: false,
    title: "Pods",
    onClick: action("Pods clicked"),
  },
  {
    selected: false,
    title: "Volumes",
    onClick: action("Volumes clicked"),
  },
];

export default {
  title: "Components/Navigation/Tabs",
};

export const Default = () => {
  return (
    <Wrapper>
      <Title>Default Tabs </Title>
      <Tabs items={tabs}></Tabs>
    </Wrapper>
  );
};
