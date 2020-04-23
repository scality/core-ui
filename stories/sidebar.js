//@flow
import React, { useState } from "react";
import Sidebar from "../src/lib/components/sidebar/Sidebar.component";
import { withKnobs } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";

const actions = [
  {
    label: "Dashboard",
    icon: <i className="fas fa-tachometer-alt" />,
    onClick: action("dashboard clicked"),
    active: true,
  },
  {
    label: "Servers",
    icon: <i className="fas fa-server" />,
    onClick: action("server clicked"),
  },
  {
    label: "Disks",
    icon: <i className="fas fa-hdd" />,
    onClick: action("disk clicked"),
  },
];

storiesOf("Sidebar", module)
  .addDecorator(withKnobs)
  .add("Default", () => {
    const [isExpanded, setIsExpanded] = useState(true);
    const [isOpening, setIsOpening] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const onMouseFunction = (e) => {
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
      <div onMouseMove={onMouseFunction}>
        <h3>Sidebar docked</h3>
        <div style={{ width: "55px" }}>
          <Sidebar actions={actions} />
        </div>

        <h3>Sidebar expanded</h3>
        <div style={{ width: "150px" }}>
          <Sidebar expanded actions={actions} />
        </div>

        <h3>Sidebar expand when hovering to the left</h3>
        <div style={{ width: "150px" }} onMouseOut={onMouseFunction}>
          <Sidebar
            expanded={isExpanded}
            actions={actions}
            isClosing={isClosing}
            isOpening={isOpening}
          />
        </div>
      </div>
    );
  });
