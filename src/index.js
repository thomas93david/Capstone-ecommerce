import React from "react";
import ReactDOM from "react-dom";
import { App } from "./components/index";
import { StateProvider } from "./components/StateProvider";
import reducer, { initialState } from "./components/reducer";

ReactDOM.render(
  <div>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </div>,
  document.getElementById("root")
);
