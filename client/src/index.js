import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Initializer from "./routes/initializer/Initializer";
import { BrowserRouter } from "react-router-dom";
import mapboxgl from "mapbox-gl";

// Fuentes de Google
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoibWFpbmxha2UiLCJhIjoiY2x5dmFiOWIwMDBwNDJrcHoyNDhmcmJoNCJ9.-3AL3FN0XWB5D-vJpEkWqA";

ReactDOM.render(
  <Initializer>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Initializer>,
  document.getElementById("root")
  
);
