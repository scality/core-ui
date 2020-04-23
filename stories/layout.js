//@flow
import React, { useState } from "react";
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

storiesOf("Layout", module)
  .addDecorator(withKnobs)
  .add("Sidebar docked", () => {
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
  })

  .add("Sidebar expanded", () => {
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
  })

  .add("Sidebar expand when hovering to the left", () => {
    const [isExpanded, setIsExpanded] = useState(true);
    const [isOpening, setIsOpening] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    let sidebar = {
      expanded: isExpanded,
      actions: sideBarActions,
      isClosing: isClosing,
      isOpening: isOpening,
    };

    const navbar = {
      onToggleClick: action("toggle clicked"),
      productName: "Harware UI",
      rightActions,
    };

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
        <Layout sidebar={sidebar} navbar={navbar} onMouseOut={onMouseFunction}>
          <Loader size="massive" />
        </Layout>
      </div>
    );
  });
