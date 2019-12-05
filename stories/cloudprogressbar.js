//@flow
import React from "react";
import CloudProgressBar from "../src/lib/components/cloudprogressbar/CloudProgressBar.component";
import { Wrapper, Title, SubTitle } from "./common";
import { storiesOf } from "@storybook/react";

storiesOf("CloudProgressBar", module).add("Default", () => {
  return (
    <Wrapper>
      <Title>CloudProgressBar</Title>
      <div style={{ width: "300px", margin: "20px 0 20px 0" }}>
        <CloudProgressBar
          percentage={30}
          borderSize="1.5px"
          cloudColor="yellow"
          progressCloudColor="blue"
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)"
            }}
          >
            <Title>30%</Title>
            <SubTitle>of the quotas has been reached.</SubTitle>
          </div>
        </CloudProgressBar>
      </div>
      <div style={{ width: "400px", margin: "20px 0 20px 0" }}>
        <CloudProgressBar
          percentage={50}
          borderSize="1.5px"
          cloudColor="#ccc"
          progressCloudColor="#000"
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)"
            }}
          >
            <Title>50%</Title>
            <SubTitle>of the quotas has been reached</SubTitle>
          </div>
        </CloudProgressBar>
      </div>
      <div style={{ width: "500px", margin: "20px 0 20px 0" }}>
        <CloudProgressBar
          percentage={80}
          borderSize="2px"
          cloudColor="#3d383a"
          progressCloudColor="#83d136"
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)"
            }}
          >
            <Title>80%</Title>
            <SubTitle>of the quotas has been reached</SubTitle>
          </div>
        </CloudProgressBar>
      </div>
      <div style={{ width: "600px", margin: "20px 0 20px 0" }}>
        <CloudProgressBar
          percentage={70}
          borderSize="2px"
          cloudColor="#BDFFB0"
          progressCloudColor="#A3FFCB"
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)"
            }}
          >
            <Title>70%</Title>
            <SubTitle>of the quotas has been reached</SubTitle>
          </div>
        </CloudProgressBar>
      </div>
    </Wrapper>
  );
});
