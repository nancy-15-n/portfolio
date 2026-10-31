import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";

document.documentElement.style.setProperty(
  "--workspace-background-image",
  `url("${new URL("workspace-background.png", window.location.href).href}")`,
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
