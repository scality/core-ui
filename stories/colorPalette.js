import React from "react";
import * as defaultTheme from "../src/lib/style/theme";

export default {
  title: "ColorPalette",
};

export const Default = () => {
  return (
    <div>
      <h3> Color Palette - Light Mode</h3>
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
          <div className="color" style={{ backgroundColor: "#0F7FFF" }} />
          <div className="text">secondary</div>
          <div className="text">The main interactive color</div>
          <div className="text">#0F7FFF</div>
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
            The interactive color for navbar and sidebar
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
          <div className="color" style={{ backgroundColor: "#A7B6C3" }} />
          <div className="text">textTertiary</div>
          <div className="text">#A7B6C3</div>
        </div>
        <div className="card-color-palette">
          <div className="color" style={{ backgroundColor: "#A5A5A5" }} />
          <div className="text">border</div>
          <div className="text">The border for the input</div>
          <div className="text">#A5A5A5</div>
        </div>
        <div className="card-color-palette">
          <div className="color" style={{ backgroundColor: "#EBEBEB" }} />
          <div className="text">borderLight</div>
          <div className="text">The rowline for the table</div>
          <div className="text">#EBEBEB</div>
        </div>
        <div className="card-color-palette">
          <div className="color" style={{ backgroundColor: "#8C8C8C" }} />
          <div className="text">info</div>
          <div className="text">Grey-medium (Pill, button anddropdown)</div>
          <div className="text">#8C8C8C</div>
        </div>
        <div className="card-color-palette">
          <div className="color" style={{ backgroundColor: "#607080" }} />
          <div className="text">base</div>
          <div className="text">primary button</div>
          <div className="text">#607080</div>
        </div>
        <div className="card-color-palette">
          <div className="color" style={{ backgroundColor: "#33A919" }} />
          <div className="text">healthy</div>
          <div className="text">Green-light healthy element</div>
          <div className="text">#33A919</div>
        </div>
        <div className="card-color-palette">
          <div className="color" style={{ backgroundColor: "#24871D" }} />
          <div className="text">healthySecondary</div>
          <div className="text">Green healthy text</div>
          <div className="text">#24871D</div>
        </div>
        <div className="card-color-palette">
          <div className="color" style={{ backgroundColor: "#006F62" }} />
          <div className="text">success</div>
          <div className="text">Deprecated color</div>
          <div className="text">#006F62</div>
        </div>
        <div className="card-color-palette">
          <div className="color" style={{ backgroundColor: "#A39300" }} />
          <div className="text">warning</div>
          <div className="text">Yellow warning element (button)</div>
          <div className="text">#A39300</div>
        </div>
        <div className="card-color-palette">
          <div className="color" style={{ backgroundColor: "#946F00" }} />
          <div className="text">alert</div>
          <div className="text">Yellow warning text</div>
          <div className="text">#946F00</div>
        </div>

        <div className="card-color-palette">
          <div className="color" style={{ backgroundColor: "#BE321F" }} />
          <div className="text">danger</div>
          <div className="text">Red critical text</div>
          <div className="text">#BE321F</div>
        </div>
        <div className="card-color-palette">
          <div className="color" style={{ backgroundColor: "#AA1D05" }} />
          <div className="text">critical</div>
          <div className="text">Red critical element (button)</div>
          <div className="text">#AA1D05</div>
        </div>
      </div>
      <h3> Color Palette - Dark Mode</h3>
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
          <div className="color" style={{ backgroundColor: "#0F7FFF" }} />
          <div className="text">secondary</div>
          <div className="text">The main interactive color</div>
          <div className="text">#0F7FFF</div>
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
            The interactive color for navbar and sidebar
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
          <div className="color" style={{ backgroundColor: "#313131" }} />
          <div className="text">border</div>
          <div className="text">The border for the input</div>
          <div className="text">#313131</div>
        </div>
        <div className="card-color-palette">
          <div className="color" style={{ backgroundColor: "#A5A5A5" }} />
          <div className="text">borderLight</div>
          <div className="text">The rowline for the table</div>
          <div className="text">#A5A5A5</div>
        </div>
        <div className="card-color-palette">
          <div className="color" style={{ backgroundColor: "#434343" }} />
          <div className="text">info</div>
          <div className="text">Grey-medium (Pill, button anddropdown)</div>
          <div className="text">#434343</div>
        </div>
        <div className="card-color-palette">
          <div className="color" style={{ backgroundColor: "#6A7B92" }} />
          <div className="text">base</div>
          <div className="text">Primary button</div>
          <div className="text">#6A7B92</div>
        </div>
        <div className="card-color-palette">
          <div className="color" style={{ backgroundColor: "#69E44C" }} />
          <div className="text">healthy</div>
          <div className="text">Green-light healthy element</div>
          <div className="text">#69E44C</div>
        </div>
        <div className="card-color-palette">
          <div className="color" style={{ backgroundColor: "#30AC26" }} />
          <div className="text">healthySecondary</div>
          <div className="text">Green healthy text</div>
          <div className="text">#30AC26</div>
        </div>
        <div className="card-color-palette">
          <div className="color" style={{ backgroundColor: "#006F62" }} />
          <div className="text">success</div>
          <div className="text">Deprecated color</div>
          <div className="text">#006F62</div>
        </div>
        <div className="card-color-palette">
          <div className="color" style={{ backgroundColor: "#FFE508" }} />
          <div className="text">warning</div>
          <div className="text">Yellow warning element (button)</div>
          <div className="text">#FFE508</div>
        </div>
        <div className="card-color-palette">
          <div className="color" style={{ backgroundColor: "#FFC10A" }} />
          <div className="text">alert</div>
          <div className="text">Yellow warning text</div>
          <div className="text">#FFC10A</div>
        </div>
        <div className="card-color-palette">
          <div className="color" style={{ backgroundColor: "#BE321F" }} />
          <div className="text">danger</div>
          <div className="text">Red critical text</div>
          <div className="text">#BE321F</div>
        </div>
        <div className="card-color-palette">
          <div className="color" style={{ backgroundColor: "#BE2543" }} />
          <div className="text">critical</div>
          <div className="text">Red critical element (button)</div>
          <div className="text">#BE2543</div>
        </div>
      </div>
    </div>
  );
};
