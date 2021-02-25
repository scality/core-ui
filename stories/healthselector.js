//@flow
import React, { useState } from "react";
import { action } from "@storybook/addon-actions";
import styled from "styled-components";
import Healthselector from "../src/lib/components/healthselector/Healthselector.component";
import { Wrapper, Title } from "./common";

const RowWrapper = styled.div`
  margin-bottom: 70px;
  display: flex;
`;

const HorizontalContainer = styled.div`
  margin-right: 150px;
`;

export default {
  title: "Components/Selector/Healthselector",
};

export const Default = () => {
  const [selected, setSelected] = useState(0);
  action("All clicked");

  let items = [
    {
      label: "All",
      onClick: action("All clicked"),
      selected: selected === 0,
    },
    {
      label: "Ok",
      onClick: action("Ok clicked"),
      selected: selected === 1,
    },
    {
      label: "Warning",
      onClick: action("Warning clicked"),
      selected: selected === 2,
    },
    {
      label: "Critical",
      onClick: action("Critical clicked"),
      selected: selected === 3,
    },
  ];

  let itemsCustomLabel = [
    {
      label: "Custom1",
      onClick: action("Custom1 clicked"),
      selected: selected === 0,
    },
    {
      label: "Custom2",
      onClick: action("Custom2 clicked"),
      selected: selected === 1,
    },
    {
      label: "Custom3",
      onClick: action("Custom3 clicked"),
      selected: selected === 2,
    },
    {
      label: "Custom4",
      onClick: action("Custom4 clicked"),
      selected: selected === 3,
    },
  ];

  let itemsWithSelection = [
    {
      label: "All",
      onClick: () => setSelected(0),
      selected: selected === 0,
    },
    {
      label: "Ok",
      onClick: () => setSelected(1),
      selected: selected === 1,
    },
    {
      label: "Warning",
      onClick: () => setSelected(2),
      selected: selected === 2,
    },
    {
      label: "Critical",
      onClick: () => setSelected(3),
      selected: selected === 3,
    },
  ];

  return (
    <Wrapper>
      <Title>Basic usage</Title>
      <Healthselector items={itemsWithSelection} />

      <Title>Health Selector Sizes (Triggering StoryBook actions)</Title>
      <RowWrapper>
        <HorizontalContainer>
          <Healthselector items={items} size="smaller" />
        </HorizontalContainer>
        <HorizontalContainer>
          <Healthselector items={items} size="small" />
        </HorizontalContainer>
        <HorizontalContainer>
          <Healthselector items={items} size="base" />
        </HorizontalContainer>
      </RowWrapper>
      <RowWrapper>
        <HorizontalContainer>
          <Healthselector items={items} size="large" />
        </HorizontalContainer>
        <HorizontalContainer>
          <Healthselector items={items} size="larger" />
        </HorizontalContainer>
      </RowWrapper>

      <Title>With custom labels (Triggering StoryBook actions)</Title>
      <Healthselector items={itemsCustomLabel} />
    </Wrapper>
  );
};
