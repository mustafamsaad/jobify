import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "normalize.css";
import "./index.css";
import { AppProvider } from "./context/appContext.jsx";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

if (import.meta.env.NODE_ENV === "production") {
  disableReactDevTools();
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);
