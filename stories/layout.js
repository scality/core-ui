//@flow
import React from "react";
import Layout from "../src/lib/components/layout/Layout.component";
import Loader from "../src/lib/components/loader/Loader.component";
import { withKnobs, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";

const sideBarActions = [
  {
    label: "Dashboard",
    icon: <i className="fas fa-tachometer-alt" />,
    onClick: action("dashboard clicked"),
    active: true,
    "data-cy": "Dashboard"
  },
  {
    label: "Servers",
    icon: <i className="fas fa-server" />,
    onClick: action("server clicked"),
    "data-cy": "Servers"
  },
  {
    label: "Disks",
    icon: <i className="fas fa-hdd" />,
    onClick: action("disk clicked"),
    "data-cy": "Disks"
  }
];

const applications = [
  {
    label: "Hyperdrive UI",
    onClick: action("Hyperdrive UI clicked"),
    "data-cy": "Hyperdrive_UI"
  }
];

const help = [
  { label: "About", onClick: action("About clicked"), "data-cy": "About" },
  {
    label: "Documentation",
    onClick: action("Documentation clicked"),
    "data-cy": "Documentation"
  },
  {
    label: "Onboarding",
    onClick: action("Onboarding clicked"),
    "data-cy": "Onboarding"
  }
];

const user = {
  name: "Charles NGUYEN",
  actions: [
    { label: "Log out", onClick: action("Logout clicked"), "data-cy": "Logout" }
  ]
};

const languages = [
  {
    label: "Français",
    name: "FR",
    onClick: action("French selected"),
    selected: false
  },
  {
    label: "English",
    name: "EN",
    onClick: action("English selected"),
    selected: true
  }
];

storiesOf("Layout", module)
  .addDecorator(withKnobs)
  .add("Sidebar docked", () => {
    const toggle = boolean("Sidebar Toogle Visible", true);
    const expanded = boolean("Sidebar Expanded", false);

    const sidebar = {
      expanded,
      actions: sideBarActions
    };

    const navbar = {
      onToggleClick: action("toggle clicked"),
      toggleVisible: toggle,
      productName: "Harware UI",
      languages,
      applications,
      help,
      user
    };

    return (
      <Layout sidebar={sidebar} navbar={navbar}>
        <Loader size="massive" />
      </Layout>
    );
  })
  .add("Sidebar expanded", () => {
    const sidebar = {
      expanded: true,
      actions: sideBarActions
    };

    const navbar = {
      onToggleClick: action("toggle clicked"),
      toggleVisible: true,
      productName: "Harware UI",
      languages,
      applications,
      help,
      user
    };

    return (
      <Layout sidebar={sidebar} navbar={navbar}>
        <Loader size="massive" />
      </Layout>
    );
  });
