//@flow
import React, { useState, createElement } from "react";
import Layout from "../src/lib/components/layout/Layout.component";
import Loader from "../src/lib/components/loader/Loader.component";
import { withKnobs, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { addDecorator } from "@storybook/react";

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

const rightActions = [
  {
    type: "dropdown",
    text: "FR",
    icon: <i className="fas fa-globe" />,
    items: [
      {
        label: "English",
        name: "EN",
        onClick: action("English selected"),
      },
    ],
  },
  {
    type: "dropdown",
    icon: <i className="fas fa-th" />,
    items: [
      { label: "Hyperdrive UI", onClick: action("Hyperdrive UI clicked") },
    ],
  },
  {
    type: "dropdown",
    icon: <i className="fas fa-question-circle" />,
    items: [
      { label: "About", onClick: action("About clicked") },
      { label: "Documentation", onClick: action("Documentation clicked") },
      { label: "Onboarding", onClick: action("Onboarding clicked") },
    ],
  },
  {
    type: "dropdown",
    text: "Carlito",
    icon: <i className="fas fa-user" />,
    items: [{ label: "Log out", onClick: action("Logout clicked") }],
  },
];

export default {
  title: "Layout",
  decorators: [withKnobs],
};

export const SidebarDocked = () => {
  const expanded = boolean("Sidebar Expanded", false);

  const sidebar = {
    expanded,
    actions: sideBarActions,
  };

  const navbar = {
    onToggleClick: action("toggle clicked"),
    productName: "Harware UI",
    rightActions,
  };

  return (
    <Layout sidebar={sidebar} navbar={navbar}>
      <Loader size="massive" />
    </Layout>
  );
};

export const SidebarExpanded = () => {
  const sidebar = {
    expanded: true,
    actions: sideBarActions,
  };

  const navbar = {
    onToggleClick: action("toggle clicked"),
    productName: "Harware UI",
    rightActions,
  };

  return (
    <Layout sidebar={sidebar} navbar={navbar}>
      <Loader size="massive" />
    </Layout>
  );
};

export const SidebarWithToggle = () => {
  const sidebar = {
    expanded: true,
    actions: sideBarActions,
    onToggleClick: action("toggle clicked"),
  };

  const navbar = {
    productName: "Harware UI",
    rightActions,
  };

  return (
    <Layout sidebar={sidebar} navbar={navbar}>
      <Loader size="massive" />
    </Layout>
  );
};

export const HoverableSidebar = () => {
  const [expanded, setExpanded] = useState(false);
  const sidebar = {
    expanded: expanded,
    hoverable: true,
    actions: sideBarActions,
    onToggleClick: () => setExpanded(!expanded),
  };

  const navbar = {
    productName: "Harware UI",
    rightActions,
  };

  return (
    <Layout sidebar={sidebar} navbar={navbar}>
      <Loader size="massive" />
    </Layout>
  );
};
