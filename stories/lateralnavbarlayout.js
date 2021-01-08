//@flow
import React, { useState, createElement } from "react";
import { action } from "@storybook/addon-actions";
import { storiesOf, addDecorator } from "@storybook/react";
import { withKnobs, boolean } from "@storybook/addon-knobs";
import LateralNavbarLayout from "../src/lib/components/lateralnavbarlayout/LateralNavbarLayout.component";
import Loader from "../src/lib/components/loader/Loader.component";

addDecorator(createElement);

const sideBarActions = [
  {
    label: "Dashboard",
    icon: <i className="fas fa-tachometer-alt" />,
    onClick: action("dashboard clicked"),
    active: true,
    "data-cy": "Dashboard",
  },
  {
    label: "Servers",
    icon: <i className="fas fa-server" />,
    onClick: action("server clicked"),
    "data-cy": "Servers",
  },
  {
    label: "Disks",
    icon: <i className="fas fa-hdd" />,
    onClick: action("disk clicked"),
    "data-cy": "Disks",
  },
];

storiesOf("LateralNavbarLayout", module)
  .addDecorator(withKnobs)
  .add("Sidebar docked", () => {
    const expanded = boolean("Sidebar Expanded", false);
    const sidebar = {
      expanded,
      actions: sideBarActions,
    };
    return (
      <div>
        <LateralNavbarLayout sidebar={sidebar}>
          <Loader size="massive" />
        </LateralNavbarLayout>
      </div>
    );
  })
  .add("Sidebar expanded", () => {
    const sidebar = {
      expanded: true,
      actions: sideBarActions,
    };
    return (
      <LateralNavbarLayout sidebar={sidebar}>
        <Loader size="massive" />
      </LateralNavbarLayout>
    );
  })
  .add("Sidebar with toggle", () => {
    const sidebar = {
      expanded: true,
      actions: sideBarActions,
      onToggleClick: action("toggle clicked"),
    };
    return (
      <LateralNavbarLayout sidebar={sidebar}>
        <Loader size="massive" />
      </LateralNavbarLayout>
    );
  })
  .add("Hoverable Sidebar", () => {
    const [expanded, setExpanded] = useState(false);
    const sidebar = {
      expanded: expanded,
      hoverable: true,
      actions: sideBarActions,
      onToggleClick: () => setExpanded(!expanded),
    };
    return (
      <LateralNavbarLayout sidebar={sidebar}>
        <Loader size="massive" />
      </LateralNavbarLayout>
    );
  });
