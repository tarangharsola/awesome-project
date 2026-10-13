import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { ConnectionStatusProvider } from "./context/ConnectionStatusContext";
import "./styles/base.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <ConnectionStatusProvider>
    <App />
  </ConnectionStatusProvider>
);
