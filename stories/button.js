// @flow
import React from "react";
import Button from "../src/lib/components/button/Button.component";
import { withKnobs } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import withPropsCombinations from "react-storybook-addon-props-combinations";

storiesOf("Button", module)
  .addDecorator(withKnobs)
  .add("Default", () => {
    return (
      <div className="storybook-button">
        <h3>Button Default</h3>
        <Button size="smaller" text="Smaller" />
        <Button size="small" text="Small" />
        <Button text="default" data-cy="default_button" />
        <Button size="large" text="Large" />
        <Button size="larger" text="Larger" />

        <h3>Button Variant</h3>
        <Button variant="primary" text="primary" />
        <Button variant="secondary" text="secondary" />
        <Button variant="success" text="success" />
        <Button variant="info" text="info" />
        <Button variant="warning" text="warning" />
        <Button variant="danger" text="danger" />

        <h3>Button Outlined</h3>
        <Button
          outlined
          text="Hello"
          onClick={action("Button Outlined Click")}
        />

        <h3>Button Disabled</h3>
        <Button
          disabled
          text="Hello"
          onClick={action("Button Disabled Click")}
        />

        <h3>Button Link</h3>
        <Button text="Hello" href="/" />

        <h3>Button Loading</h3>
        <Button
          text="Hello"
          icon={<i className="fas fa-star" />}
          isLoading={true}
        />

        <h3>Button Text Icon</h3>
        <Button
          size="smaller"
          icon={<i className="fas fa-star" />}
          text="Smaller"
        />
        <Button
          size="small"
          icon={<i className="fas fa-star" />}
          text="Small"
        />
        <Button text="default" icon={<i className="fas fa-star" />} />
        <Button
          size="large"
          icon={<i className="fas fa-star" />}
          text="Large"
        />
        <Button
          size="larger"
          icon={<i className="fas fa-star" />}
          text="Larger"
        />

        <h3>Icon Button</h3>
        <Button size="smaller" icon={<i className="fas fa-star" />} />
        <Button size="small" icon={<i className="fas fa-star" />} />
        <Button icon={<i className="fas fa-star" />} />
        <Button size="large" icon={<i className="fas fa-star" />} />
        <Button size="larger" icon={<i className="fas fa-star" />} />

        <h3>Icon Button Inverted</h3>
        <Button
          inverted={true}
          size="smaller"
          icon={<i className="fas fa-star" />}
        />
        <Button
          inverted={true}
          size="small"
          icon={<i className="fas fa-star" />}
        />
        <Button inverted={true} icon={<i className="fas fa-star" />} />
        <Button
          inverted={true}
          size="large"
          icon={<i className="fas fa-star" />}
        />
        <Button
          inverted={true}
          size="larger"
          icon={<i className="fas fa-star" />}
        />
      </div>
    );
  })
  .add(
    "Combinations",
    withPropsCombinations(Button, {
      outlined: [false, true],
      variant: ["primary", "secondary", "success", "info", "warning", "danger"],
      text: ["Hello"],
      icon: [<i className="fas fa-star" />]
    })
  );
