// @flow
import React from "react";
import { withKnobs } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Button from "../src/lib/components/button/Button.component";
import { Wrapper, Title } from "./common";

storiesOf("Button", module)
  .addDecorator(withKnobs)
  .add("Default", () => {
    return (
      <Wrapper className="storybook-button">
        <Title>Button Default</Title>
        <Button size="smaller" text="Smaller" />
        <Button size="small" text="Small" />
        <Button text="default" data-cy="default_button" />
        <Button size="large" text="Large" />
        <Button size="larger" text="Larger" />

        <Title>Button Variant</Title>
        <Button variant="primary" text="primary" />
        <Button variant="secondary" text="secondary" />
        <Button variant="success" text="success" />
        <Button variant="info" text="info" />
        <Button variant="warning" text="warning" />
        <Button variant="danger" text="danger" />

        <Title>Button Outlined</Title>
        <Button
          outlined
          text="Hello"
          onClick={action("Button Outlined Click")}
        />

        <Title>Button Disabled</Title>
        <Button
          disabled
          text="Hello"
          onClick={action("Button Disabled Click")}
        />
        <Button
          inverted={true}
          size="larger"
          icon={<i className="fas fa-star" />}
          disabled={true}
        />

        <Title>Button Link</Title>
        <Button text="Hello" href="/" />

        <Title>Button Loading</Title>
        <Button
          text="Hello"
          icon={<i className="fas fa-star" />}
          isLoading={true}
        />

        <Title>Button Text Icon</Title>
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

        <Title>Icon Button</Title>
        <Button size="smaller" icon={<i className="fas fa-star" />} />
        <Button size="small" icon={<i className="fas fa-star" />} />
        <Button icon={<i className="fas fa-star" />} />
        <Button size="large" icon={<i className="fas fa-star" />} />
        <Button size="larger" icon={<i className="fas fa-star" />} />

        <Title>Icon Button Inverted</Title>
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
      </Wrapper>
    );
  });
