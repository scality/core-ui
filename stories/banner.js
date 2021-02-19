//@flow
import React from "react";
import Banner from "../src/lib/components/banner/Banner.component";
import { Wrapper } from "./common";

export default { title: "Banner" };

export const ErrorBanner = () => (
  <Wrapper>
    <Banner
      variant="danger"
      icon={<i className="fas fa-exclamation-triangle" />}
      title={"Error"}
    >
      {"There is an error."}
    </Banner>
  </Wrapper>
);
export const WarningBanner = () => (
  <Wrapper>
    <Banner
      variant="warning"
      icon={<i className="fas fa-exclamation-triangle" />}
      title={"Warning"}
    >
      {"There is a warning."}
    </Banner>
  </Wrapper>
);

export const SuccessBanner = () => (
  <Wrapper>
    <Banner
      variant="danger"
      icon={<i className="fas fa-exclamation-triangle" />}
      title={"Error"}
    >
      {"There is an error."}
    </Banner>
  </Wrapper>
);
