import "semantic-ui-css/semantic.min.css";
import React from "react";
import ReactDOM from "react-dom";

import Loader from "./lib/components/loader/Loader.component";
const App = () => {
  return (
    <div>
      Welcome to Scality UI
      <Loader size="large" color customized />
      <Loader size="large" customized />
      <Loader size="large" />
    </div>
  );
};
ReactDOM.render(<App />, document.getElementById("root"));
