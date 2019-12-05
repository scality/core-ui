//@flow
import React from "react";
import { storiesOf } from "@storybook/react";
import DebounceInput from "../src/lib/components/debounceinput/DebounceInput.component";

storiesOf("DebounceInput", module)
  .add("Default", () => {
    return (
      <div>
          <DebounceInput minLength={3} delay={300} />
      </div>
    );
  });
