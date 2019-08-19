//@flow
import React from "react";
import { storiesOf } from "@storybook/react";
import Modal from "../src/lib/components/modal/Modal.component";
import Button from "../src/lib/components/button/Button.component";
import { action } from "@storybook/addon-actions";

storiesOf("Modal", module).add("Default", () => {
  return (
    <div>
      <Modal
        close={action("close clicked")}
        isOpen={true}
        title="Hello"
        footer={
          <div style={{ display: "flex", "justify-content": "space-between" }}>
            <Button
              variant="danger"
              text="No"
              size="small"
              onClick={action("No clicked")}
            />
            <Button
              variant="primary"
              text="Yes"
              size="small"
              onClick={action("Yes clicked")}
            />
          </div>
        }
      >
        <span>Do you want a cookie?</span>
      </Modal>
    </div>
  );
});
