//@flow
import React from "react";
import Loader from "../src/lib/components/loader/Loader.component";
import withPropsCombinations from "react-storybook-addon-props-combinations";
import { withKnobs, text } from "@storybook/addon-knobs";
import { Wrapper } from "./common";

export default {
  title: "Components/Progress & loading/Loader",
  decorators: [withKnobs],
};

export const Combinations = withPropsCombinations(Loader, {
  size: ["base", "large", "larger", "huge", "massive"],
});

export const WithDynamicProps = () => {
  const size = text("Size", "base");
  const content = text("Children", "Loading");

  return (
    <Wrapper>
      <Loader size={size}>{content}</Loader>
    </Wrapper>
  );
};
