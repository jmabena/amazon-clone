import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CheckoutProduct from "./CheckoutProduct";
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import {
  CardElement,
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import axios from "./axios";
import { v4 as uuidv4 } from "uuid";
import { Card } from "@mui/material";
import { async } from "@firebase/util";
import { db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";
function Payment() {
  const [{ user, basket }, dispatch] = useStateValue();
  const navigate = useNavigate();

  const wait = (n) => new Promise((resolve) => setTimeout(resolve, n));

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);

  const stripe = useStripe();
  const elements = useElements();

  var done = false;

  useEffect(() => {
    if (!stripe || !elements) {
      return;
    }
    const getClientSecret = async () => {
      if (getBasketTotal(basket) > 0) {
        const repsonse = await axios({
          method: "post",
          url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
        });
        setClientSecret(repsonse.data.clientSecret);
      }
    };

    getClientSecret();
  }, [basket]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);
    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        const paymentRef = doc(
          db,
          "users",
          user?.uid,
          "orders",
          paymentIntent.id
        );
        setDoc(paymentRef, {
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });
        // db
        // .collection('users')
        // .doc(user?.uid)
        // .collection('orders')
        // .doc(paymentIntent.id)
        // .set({
        //   basket: basket,
        //   amount: paymentIntent.amount,
        //   created: paymentIntent.created
        // })

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatch({
          type: "EMPTY_BASKET",
        });
        navigate("/orders", { replace: true });
      });
  };
  const handleChange = (event) => {
    //listen for changes and display errors
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
      base: {
        iconColor: "#c4f0ff",
        color: "#fff",
        fontWeight: 500,
        fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
        fontSize: "16px",
        fontSmoothing: "antialiased",
        ":-webkit-autofill": {
          color: "black",
        },
        "::placeholder": {
          color: "#87bbfd",
        },
      },
      invalid: {
        iconColor: "#ffc7ee",
        color: "#ffc7ee",
      },
    },
  };
  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} items</Link>)
        </h1>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>123 example address</p>
            <p>example city and state</p>
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map((item) => (
              <CheckoutProduct
                key={uuidv4()}
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            <form onSubmit={handleSubmit}>
              <CardElement
                className="payment__cardElement"
                onChange={handleChange}
                onReady={() => {
                  console.log("card ready");
                }}
              />
              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
