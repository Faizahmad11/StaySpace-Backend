// Init
import React from "react";
import { createRoot } from "react-dom/client"; // ✅ React 18 import
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { BrowserRouter } from "react-router-dom";
import { StoreProvider } from "./StoreContext";

// React 18 Root setup
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <StoreProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StoreProvider>
  </React.StrictMode>
);

// Service worker setup (optional)
serviceWorkerRegistration.unregister();
