import React from "react";
import Layout from "../src/lib/components/layout/Layout.component";
import Loader from "../src/lib/components/loader/Loader.component";
import { withKnobs, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";

import { ThemeProvider } from "styled-components";
import { jade } from "../src/lib/style/theme";

const sideBarActions = [
  {
    label: "Dashboard",
    icon: <i className="fas fa-tachometer-alt" />,
    onClick: action("dashboard clicked"),
    active: true
  },
  {
    label: "Servers",
    icon: <i className="fas fa-server" />,
    onClick: action("server clicked")
  },
  {
    label: "Disks",
    icon: <i className="fas fa-hdd" />,
    onClick: action("disk clicked")
  }
];

const applications = [
  { label: "Hyperdrive UI", onClick: action("Hyperdrive UI clicked") }
];

const help = [
  { label: "About", onClick: action("About clicked") },
  { label: "Documentation", onClick: action("Documentation clicked") },
  { label: "Onboarding", onClick: action("Onboarding clicked") }
];

const user = {
  name: "Charles NGUYEN",
  actions: [{ label: "Log out", onClick: action("Logout clicked") }]
};

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
  .add("ThemeProvider", () => {
    const theme = {
      brand: {
        primary: jade
      }
    };

    const sidebar = {
      expanded: false,
      actions: sideBarActions
    };

    const navbar = {
      onToggleClick: action("toggle clicked"),
      toggleVisible: true,
      productName: "Harware UI",
      applications,
      help,
      user
    };

    return (
      <ThemeProvider theme={theme}>
        <Layout sidebar={sidebar} navbar={navbar}>
          <Loader size="massive" />
        </Layout>
      </ThemeProvider>
    );
  });
