import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Initializer from "./routes/initializer/Initializer";
import { BrowserRouter } from "react-router-dom";

// Fuentes de Google
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

ReactDOM.render(
  <Initializer>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Initializer>,
  document.getElementById("root")
  
);
