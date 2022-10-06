import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import reducer, { initialState } from "./reducer";
import { StateProvider } from "./StateProvider";

import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement } from "@stripe/react-stripe-js";

const promise = loadStripe(
  "pk_test_51KyH4gIAYWQydRzUp0M47hbXUIAdvFwG9gGsc3SmzmE4HZmAfgMJElI7EorLmPGABlWqZAnrFGjtsXrjmmVjRuMD004hWZmKtB"
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <Elements stripe={promise}>
        <App />
      </Elements>
    </StateProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
