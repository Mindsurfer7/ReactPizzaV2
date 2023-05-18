import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Link } from "react-router-dom";
import App from "./App.tsx";
import { PizzaStore } from "./Redux/ReduxStrore.ts";
import { Provider } from "react-redux";

const rootElem = document.getElementById("root");

if (rootElem) {
  const root = ReactDOM.createRoot(rootElem);
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={PizzaStore}>
          <App />
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
  );
}
