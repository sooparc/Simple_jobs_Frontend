import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./Page/EmployeeUsers/auth-context";
import { AuthContextProvider2 } from "./Page/EmployerUsers/auth-context2";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const PUBLIC_KEY =
  "pk_test_51KnW1bIEfybo69bN2lBrq3qU7TkQK5jAC8U675F6gt2oqXavP3G05aMFQofkQAO9pKRTiKA6FJLeswhaBsQPmCv200TrGlR3Cq";
const stripePromise = loadStripe(PUBLIC_KEY);

ReactDOM.render(
  <Elements stripe={stripePromise}>
    <AuthContextProvider2>
      <AuthContextProvider>
        <React.StrictMode>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </React.StrictMode>
      </AuthContextProvider>
    </AuthContextProvider2>
  </Elements>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
