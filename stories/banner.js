//@flow
import React from "react";
import { storiesOf } from "@storybook/react";
import Banner from "../src/lib/components/banner/Banner.component";
import { Wrapper, Title } from "./common";

storiesOf("Banner", module).add("Default", () => {
  return (
    <Wrapper>
      <Title>Error banner </Title>
      <Banner
        variant="danger"
        icon={<i className="fas fa-exclamation-triangle" />}
        title={"Error"}
      >
        {"There is an error."}
      </Banner>
      <Title>Warning banner </Title>
      <Banner
        variant="warning"
        icon={<i className="fas fa-exclamation-triangle" />}
        title={"Warning"}
      >
        {"There is a warning."}
      </Banner>
      <Title>Success banner </Title>
      <Banner
        variant="success"
        icon={<i className="fas fa-check-circle" />}
        title={"Success"}
      >
        {"Everything is ok."}
      </Banner>
    </Wrapper>
  );
});
