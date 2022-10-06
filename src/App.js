import React, { useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import {
  BrowserRouter as BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import Checkout from "./Checkout";
import Login from "./Login";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import { onAuthStateChanged } from "firebase/auth";
import Payment from "./Payment";
import Orders from "./Orders";
//constimport { loadStripe } from "@stripe/stripe-js";
//import { Elements,PaymentElement } from "@stripe/react-stripe-js";
import Async from "react-promise";
var done = false;
var val = null;
// const promise = loadStripe(
//   "pk_test_51KyH4gIAYWQydRzUp0M47hbXUIAdvFwG9gGsc3SmzmE4HZmAfgMJElI7EorLmPGABlWqZAnrFGjtsXrjmmVjRuMD004hWZmKtB"
// );
// promise.then((value) => {
//   done = true;
// });
// console.log(promise);
function App() {
  const [{}, dispatch] = useStateValue();

  const options = {
    // passing the client secret obtained from the server
    clientSecret:
      "sk_test_51KyH4gIAYWQydRzUDZpGIYjLaLttNI5TL6IJtltKKrcmLfQSXadr86gM6BMeJOSpeTuLD0OuUJpHRxqDC9AlsgUL00JG6KVFwY",
  };

  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      //console.log("user logged in is ", authUser);
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <div>
                <Header />
                <Home />
              </div>
            }
          />
          <Route
            path="/checkout"
            element={
              <div>
                <Header />
                <Checkout />
              </div>
            }
          />
          <Route
            path="/payment"
            element={
              <div>
                <Header />
                <Payment />
              </div>
            }
          />
          <Route
            path="/orders"
            element={
              <div>
                <Header />
                <Orders />
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
