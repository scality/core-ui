//@flow
import React from "react";
import Sidebar from "../src/lib/components/sidebar/Sidebar.component";
import { withKnobs } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

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

export default {
  title: "Components/Navigation/Sidebar",
  decorators: [withKnobs],
};

export const Default = () => {
  return (
    <div>
      <h3>Sidebar docked</h3>
      <div style={{ width: "55px" }}>
        <Sidebar actions={actions} />
      </div>

      <h3>Sidebar expanded</h3>
      <div style={{ width: "150px" }}>
        <Sidebar expanded actions={actions} />
      </div>

      <h3>Sidebar with toggle</h3>
      <div style={{ width: "150px" }}>
        <Sidebar
          actions={actions}
          expanded
          onToggleClick={action("toggle clicked")}
        />
      </div>

      <h3>Hoverable Sidebar</h3>
      <div style={{ width: "150px" }}>
        <Sidebar
          actions={actions}
          hoverable
          onToggleClick={action("toggle clicked")}
        />
      </div>
    </div>
  );
};
