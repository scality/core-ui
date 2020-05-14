import React from "react";
import { storiesOf } from "@storybook/react";
import * as defaultTheme from "../src/lib/style/theme";
storiesOf("ColorPalette", module).add("Default", () => {
  return (
    <div>
      <h3> Color Palette - light mode</h3>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <div className="card-color-palette">
          <div
            className="color"
            style={{ backgroundColor: defaultTheme.white }}
          />
          <div className="text">background</div>
          <div className="text">#FFFFFF</div>
        </div>
        <div className="card-color-palette">
          <div className="color" style={{ backgroundColor: "#FAF9FB" }} />
          <div className="text">primary</div>
          <div className="text">#FAF9FB</div>
        </div>
        <div className="card-color-palette">
          <div className="color" style={{ backgroundColor: "#F7F6F9" }} />
          <div className="text">primaryDark1</div>
          <div className="text">#F7F6F9</div>
        </div>
        <div className="card-color-palette">
          <div className="color" style={{ backgroundColor: "#EDEAF0" }} />
          <div className="text">primaryDark2</div>
          <div className="text">#EDEAF0</div>
        </div>
        <div className="card-color-palette">
          <div className="color" style={{ backgroundColor: "#607080" }} />
          <div className="text">base</div>
          <div className="text">primary button</div>
          <div className="text">#607080</div>
        </div>
        <div className="card-color-palette">
          <div className="color" style={{ backgroundColor: "#037AFF" }} />
          <div className="text">secondary</div>
          <div className="text">the main interactive color</div>
          <div className="text">#037AFF</div>
        </div>
        <div className="card-color-palette">
          <div className="color" style={{ backgroundColor: "#1C3D59" }} />
          <div className="text">secondaryDark1</div>
          <div className="text">#1C3D59</div>
        </div>
        <div className="card-color-palette">
          <div className="color" style={{ backgroundColor: "#1C2E3F" }} />
          <div className="text">secondaryDark2</div>
          <div className="text">#1C2E3F</div>
        </div>
        <div className="card-color-palette">
          <div className="color" style={{ backgroundColor: "#ECF4FF" }} />
          <div className="text">backgroundBluer</div>
          <div className="text">
            the interactive color for navbar and sidebar
          </div>
          <div className="text">#ECF4FF</div>
        </div>
        <div className="card-color-palette">
          <div className="color" style={{ backgroundColor: "#313B44" }} />
          <div className="text">textPrimary</div>
          <div className="text">#313B44</div>
        </div>
        <div className="card-color-palette">
          <div className="color" style={{ backgroundColor: "#8593A0" }} />
          <div className="text">textSecondary</div>
          <div className="text">#8593A0</div>
        </div>
        <div className="card-color-palette">
          <div className="color" style={{ backgroundColor: "#A5A5A5" }} />
          <div className="text">border</div>
          <div className="text">the border for the input</div>
          <div className="text">#A5A5A5</div>
        </div>
        <div className="card-color-palette">
          <div className="color" style={{ backgroundColor: "#A5A5A5" }} />
          <div className="text">borderLight</div>
          <div className="text">the rowline for the table</div>
          <div className="text">#A5A5A5</div>
        </div>
        <div className="card-color-palette">
          <div className="color" style={{ backgroundColor: "#25AC56" }} />
          <div className="text">healthy</div>
          <div className="text">#25AC56</div>
        </div>
        <div className="card-color-palette">
          <div className="color" style={{ backgroundColor: "#75FE63" }} />
          <div className="text">healthyLight</div>
          <div className="text">#75FE63</div>
        </div>
        <div className="card-color-palette">
          <div className="color" style={{ backgroundColor: "#FEFA51" }} />
          <div className="text">warning</div>
          <div className="text">#FEFA51</div>
        </div>
        <div className="card-color-palette">
          <div className="color" style={{ backgroundColor: "#BE2543" }} />
          <div className="text">critical</div>
          <div className="text">#BE2543</div>
        </div>
      </div>
      <h3> Color Palette - dark mode</h3>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <div className="card-color-palette">
          <div className="color" style={{ backgroundColor: "#121214" }} />
          <div className="text">background</div>
          <div className="text">#121214</div>
        </div>
        <div className="card-color-palette">
          <div className="color" style={{ backgroundColor: "#1D1D1F" }} />
          <div className="text">primary</div>
          <div className="text">#1D1D1F</div>
        </div>
        <div className="card-color-palette">
          <div className="color" style={{ backgroundColor: "#171718" }} />
          <div className="text">primaryDark1</div>
          <div className="text">#171718</div>
        </div>
        <div className="card-color-palette">
          <div className="color" style={{ backgroundColor: "#0A0A0A" }} />
          <div className="text">primaryDark2</div>
          <div className="text">#0A0A0A</div>
        </div>
        <div className="card-color-palette">
          <div className="color" style={{ backgroundColor: "#6A7B92" }} />
          <div className="text">base</div>
          <div className="text">primary button</div>
          <div className="text">#6A7B92</div>
        </div>
        <div className="card-color-palette">
          <div className="color" style={{ backgroundColor: "#037AFF" }} />
          <div className="text">secondary</div>
          <div className="text">the main interactive color</div>
          <div className="text">#037AFF</div>
        </div>
        <div className="card-color-palette">
          <div className="color" style={{ backgroundColor: "#1C3D59" }} />
          <div className="text">secondaryDark1</div>
          <div className="text">#1C3D59</div>
        </div>
        <div className="card-color-palette">
          <div className="color" style={{ backgroundColor: "#1C2E3F" }} />
          <div className="text">secondaryDark2</div>
          <div className="text">#1C2E3F</div>
        </div>
        <div className="card-color-palette">
          <div className="color" style={{ backgroundColor: "#192A41" }} />
          <div className="text">backgroundBluer</div>
          <div className="text">
            the interactive color for navbar and sidebar
          </div>
          <div className="text">#192A41</div>
        </div>
        <div className="card-color-palette">
          <div className="color" style={{ backgroundColor: "#FFFFFF" }} />
          <div className="text">textPrimary</div>
          <div className="text">#FFFFFF</div>
        </div>
        <div className="card-color-palette">
          <div className="color" style={{ backgroundColor: "#A8B5C1" }} />
          <div className="text">textSecondary</div>
          <div className="text">#A8B5C1</div>
        </div>
        <div className="card-color-palette">
          <div className="color" style={{ backgroundColor: "#A5A5A5" }} />
          <div className="text">border</div>
          <div className="text">the border for the input</div>
          <div className="text">#A5A5A5</div>
        </div>
        <div className="card-color-palette">
          <div className="color" style={{ backgroundColor: "#2C3137" }} />
          <div className="text">borderLight</div>
          <div className="text">the rowline for the table</div>
          <div className="text">#2C3137</div>
        </div>
        <div className="card-color-palette">
          <div className="color" style={{ backgroundColor: "#25AC56" }} />
          <div className="text">healthy</div>
          <div className="text">#25AC56</div>
        </div>
        <div className="card-color-palette">
          <div className="color" style={{ backgroundColor: "#75FE63" }} />
          <div className="text">healthyLight</div>
          <div className="text">#75FE63</div>
        </div>
        <div className="card-color-palette">
          <div className="color" style={{ backgroundColor: "#FEFA51" }} />
          <div className="text">warning</div>
          <div className="text">#FEFA51</div>
        </div>
        <div className="card-color-palette">
          <div className="color" style={{ backgroundColor: "#BE2543" }} />
          <div className="text">critical</div>
          <div className="text">#BE2543</div>
        </div>
      </div>
    </div>
  );
});
