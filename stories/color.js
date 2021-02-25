import React from "react";
import * as defaultTheme from "../src/lib/style/theme";

export default {
  title: "Style/Color/Color",
};

export const Default = () => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      <div className="card">
        <div className="color" style={{ backgroundColor: defaultTheme.plum }} />
        <div className="text">plum</div>
        <div className="text">{defaultTheme.plum}</div>
      </div>
      <div className="card">
        <div
          className="color"
          style={{ backgroundColor: defaultTheme.hotPink }}
        />
        <div className="text">hotPink</div>
        <div className="text">{defaultTheme.hotPink}</div>
      </div>
      <div className="card">
        <div
          className="color"
          style={{ backgroundColor: defaultTheme.warmRed }}
        />
        <div className="text">warmRed</div>
        <div className="text">{defaultTheme.warmRed}</div>
      </div>
      <div className="card">
        <div className="color" style={{ backgroundColor: defaultTheme.pink }} />
        <div className="text">pink</div>
        <div className="text">{defaultTheme.pink}</div>
      </div>
      <div className="card">
        <div
          className="color"
          style={{ backgroundColor: defaultTheme.lightPink }}
        />
        <div className="text">lightPink</div>
        <div className="text">{defaultTheme.lightPink}</div>
      </div>

      <div className="card">
        <div
          className="color"
          style={{ backgroundColor: defaultTheme.mediumOrange }}
        />
        <div className="text">mediumOrange</div>
        <div className="text">{defaultTheme.mediumOrange}</div>
      </div>
      <div className="card">
        <div
          className="color"
          style={{ backgroundColor: defaultTheme.yellowOrange }}
        />
        <div className="text">yellowOrange</div>
        <div className="text">{defaultTheme.yellowOrange}</div>
      </div>
      <div className="card">
        <div
          className="color"
          style={{ backgroundColor: defaultTheme.yellow }}
        />
        <div className="text">yellow</div>
        <div className="text">{defaultTheme.yellow}</div>
      </div>
      <div className="card">
        <div className="color" style={{ backgroundColor: defaultTheme.jade }} />
        <div className="text">jade</div>
        <div className="text">{defaultTheme.jade}</div>
      </div>
      <div className="card">
        <div
          className="color"
          style={{ backgroundColor: defaultTheme.green }}
        />
        <div className="text">green</div>
        <div className="text">{defaultTheme.green}</div>
      </div>
      <div className="card">
        <div
          className="color"
          style={{ backgroundColor: defaultTheme.turquoise }}
        />
        <div className="text">turquoise</div>
        <div className="text">{defaultTheme.turquoise}</div>
      </div>

      <div className="card">
        <div
          className="color"
          style={{ backgroundColor: defaultTheme.grayDarkest }}
        />
        <div className="text">grayDarkest</div>
        <div className="text">{defaultTheme.grayDarkest}</div>
      </div>
      <div className="card">
        <div
          className="color"
          style={{ backgroundColor: defaultTheme.grayDarker }}
        />
        <div className="text">grayDarker</div>
        <div className="text">{defaultTheme.grayDarker}</div>
      </div>
      <div className="card">
        <div
          className="color"
          style={{ backgroundColor: defaultTheme.grayDark }}
        />
        <div className="text">grayDark</div>
        <div className="text">{defaultTheme.grayDark}</div>
      </div>
      <div className="card">
        <div className="color" style={{ backgroundColor: defaultTheme.gray }} />
        <div className="text">gray</div>
        <div className="text">{defaultTheme.gray}</div>
      </div>
      <div className="card">
        <div
          className="color"
          style={{ backgroundColor: defaultTheme.grayLight }}
        />
        <div className="text">grayLight</div>
        <div className="text">{defaultTheme.grayLight}</div>
      </div>
      <div className="card">
        <div
          className="color"
          style={{ backgroundColor: defaultTheme.grayLighter }}
        />
        <div className="text">grayLighter</div>
        <div className="text">{defaultTheme.grayLighter}</div>
      </div>
      <div className="card">
        <div
          className="color"
          style={{ backgroundColor: defaultTheme.grayLightest }}
        />
        <div className="text">grayLightest</div>
        <div className="text">{defaultTheme.grayLightest}</div>
      </div>
      <div className="card">
        <div
          className="color"
          style={{ backgroundColor: defaultTheme.lightBeige }}
        />
        <div className="text">lightBeige</div>
        <div className="text">{defaultTheme.lightBeige}</div>
      </div>
      <div className="card">
        <div
          className="color"
          style={{ backgroundColor: defaultTheme.blueDarkest }}
        />
        <div className="text">blueDarkest</div>
        <div className="text">{defaultTheme.blueDarkest}</div>
      </div>
      <div className="card">
        <div
          className="color"
          style={{ backgroundColor: defaultTheme.blueDarker }}
        />
        <div className="text">blueDarker</div>
        <div className="text">{defaultTheme.blueDarker}</div>
      </div>
      <div className="card">
        <div
          className="color"
          style={{ backgroundColor: defaultTheme.blueDark }}
        />
        <div className="text">blueDark</div>
        <div className="text">{defaultTheme.blueDark}</div>
      </div>
      <div className="card">
        <div className="color" style={{ backgroundColor: defaultTheme.blue }} />
        <div className="text">blue</div>
        <div className="text">{defaultTheme.blue}</div>
      </div>
      <div className="card">
        <div
          className="color"
          style={{ backgroundColor: defaultTheme.blueLight }}
        />
        <div className="text">blueLight</div>
        <div className="text">{defaultTheme.blueLight}</div>
      </div>
      <div className="card">
        <div
          className="color"
          style={{ backgroundColor: defaultTheme.blueLighter }}
        />
        <div className="text">blueLighter</div>
        <div className="text">{defaultTheme.blueLighter}</div>
      </div>
      <div className="card">
        <div
          className="color"
          style={{ backgroundColor: defaultTheme.blueLightest }}
        />
        <div className="text">blueLightest</div>
        <div className="text">{defaultTheme.blueLightest}</div>
      </div>
    </div>
  );
};
