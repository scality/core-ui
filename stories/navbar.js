//@flow
import React from "react";
import Navbar from "../src/lib/components/navbar/Navbar.component";
import { action } from "@storybook/addon-actions";

const tabs = [
  {
    selected: true,
    title: "Groups",
    onClick: action("Groups clicked"),
  },
  {
    selected: false,
    title: "Users",
    onClick: action("Users clicked"),
  },
  {
    selected: false,
    title: "Policies",
    onClick: action("Policies clicked"),
  },
  {
    selected: false,
    title: "Buckets",
    onClick: action("Buckets clicked"),
  },
  {
    selected: false,
    title: "Workflows",
    onClick: action("Workflows clicked"),
  },
];

const linkTabs = [
  {
    link: <a href="/groups">Groups</a>,
    selected: true,
  },
  {
    link: <a href="/users">Users</a>,
  },
  {
    link: <a href="/policies">Policies</a>,
  },
  {
    link: <a href="/buckets">Buckets</a>,
  },
  {
    link: <a href="/workflows">Workflows</a>,
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
    type: "button",
    icon: <i className="fas fa-sun" />,
    onClick: action("Theme toggle clicked"),
  },
  {
    type: "dropdown",
    text: "Carlito",
    icon: <i className="fas fa-user" />,
    items: [{ label: "Log out", onClick: action("Logout clicked") }],
  },
];

export default {
  title: "Navbar",
};

export const Default = () => {
  return (
    <div>
      <h3>Navbar with toggle</h3>
      <Navbar
        onToggleClick={action("toggle clicked")}
        productName={"Hardware UI"}
        rightActions={rightActions}
        tabs={tabs}
      />
      <h3>Navbar without toggle</h3>
      <Navbar
        productName={"Hardware UI"}
        rightActions={rightActions}
        tabs={tabs}
      />
      <h3>Navbar with customized logo</h3>
      <Navbar
        onToggleClick={action("toggle clicked")}
        productName={"Hardware UI"}
        rightActions={rightActions}
        logo={<i className="fas fa-ring" />}
        tabs={tabs}
      />
      <h3>Navbar with only tabs</h3>
      <Navbar rightActions={[rightActions[4]]} tabs={tabs} />

      <h3>Navbar with only link tabs</h3>
      <Navbar rightActions={[rightActions[4]]} tabs={linkTabs} />
    </div>
  );
};
