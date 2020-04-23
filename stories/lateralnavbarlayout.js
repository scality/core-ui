//@flow
import React, { useState } from "react";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import { withKnobs, boolean } from "@storybook/addon-knobs";
import LateralNavbarLayout from "../src/lib/components/lateralnavbarlayout/LateralNavbarLayout.component";
import Loader from "../src/lib/components/loader/Loader.component";

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
  .add("Sidebar expand when hovering to the left", () => {
    const [isExpanded, setIsExpanded] = useState(true);
    const [isOpening, setIsOpening] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    const sidebar = {
      expanded: isExpanded,
      actions: sideBarActions,
      isClosing: isClosing,
      isOpening: isOpening,
    };
    const isMouseHoverLeft = (e) => {
      const x = e.clientX;
      // the x scope should define base on the margin-left in the real case
      if (x <= 10) {
        setIsOpening(true);
        setIsClosing(false);
        setIsExpanded(true);
      } else if (x > 156) {
        setIsClosing(true);
        setIsOpening(false);
        setIsExpanded(false);
      }
    };
    return (
      <LateralNavbarLayout sidebar={sidebar} onMouseMove={isMouseHoverLeft}>
        <Loader size="massive" />
      </LateralNavbarLayout>
    );
  });
