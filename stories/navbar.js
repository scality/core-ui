//@flow
import React from "react";
import Navbar from "../src/lib/components/navbar/Navbar.component";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";

const applications = [
  { label: "Hyperdrive UI", onClick: action("Hyperdrive UI clicked") }
];

const help = [
  { label: "About", onClick: action("About clicked") },
  { label: "Documentation", onClick: action("Documentation clicked") },
  { label: "Onboarding", onClick: action("Onboarding clicked") }
];

const user = {
  name: "Carlito",
  actions: [{ label: "Log out", onClick: action("Logout clicked") }]
};

const tabs = [
  {
    selected: true,
    title: "Groups",
    onClick: action("Groups clicked")
  },
  {
    selected: false,
    title: "Users",
    onClick: action("Users clicked")
  },
  {
    selected: false,
    title: "Policies",
    onClick: action("Policies clicked")
  },
  {
    selected: false,
    title: "Buckets",
    onClick: action("Buckets clicked")
  },
  {
    selected: false,
    title: "Workflows",
    onClick: action("Workflows clicked")
  }
];

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

storiesOf("Navbar", module).add("Default", () => {
  return (
    <div>
      <h3>Navbar with toggle</h3>
      <Navbar
        onToggleClick={action("toggle clicked")}
        toggleVisible={true}
        productName={"Hardware UI"}
        languages={languages}
        applications={applications}
        help={help}
        user={user}
        tabs={tabs}
      />
      <h3>Navbar without toggle</h3>
      <Navbar
        onToggleClick={action("toggle clicked")}
        toggleVisible={false}
        productName={"Hardware UI"}
        languages={languages}
        applications={applications}
        help={help}
        user={user}
        tabs={tabs}
      />
      <h3>Navbar with customized logo</h3>
      <Navbar
        onToggleClick={action("toggle clicked")}
        toggleVisible={true}
        productName={"Hardware UI"}
        languages={languages}
        applications={applications}
        help={help}
        user={user}
        logo={<i className="fas fa-ring" />}
        tabs={tabs}
      />
      <h3>Navbar with only tabs</h3>
      <Navbar user={user} tabs={tabs} />
    </div>
  );
});
