import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import classes from "./Payment.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Modal, Button } from "react-bootstrap";

const Payment = () => {
  const [success, setSuccess] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const handleClose = () => setShowPayment(false);
  const handleShow = () => setShowPayment(true);

  const axios = require("axios");

  const check = <FontAwesomeIcon icon={faCheck} />;

  const btnClickHandler = () => {
    setShowPayment(true);
  };

  useEffect((index) => {
    const id = localStorage.getItem("user_id");
    setUserId(id);
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    axios
      .post("https://pt-finder.herokuapp.com/paymentInfo", {
        userId: userId,
        name: name,
        street: street,
        city: city,
        state: state,
        zipcode: zipcode,
      })
      .then((response) => {
        alert("Successfully paid !");
      });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post(
          "https://pt-finder.herokuapp.com/payment",
          {
            amount: 100,
            id,
          }
        );

        if (response.data.success) {
          console.log("Successful payment");
          setSuccess(true);
        }
      } catch (error) {
        console.log("Error", error);
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="text-center">
        <div className={classes.body}>
          <div className={classes.cardContent}>
            <div className={classes.cardPricing}>
              <div className={classes.cardPricingNumber}>
                <span className={classes.cardPricingSymbol}></span>Free
              </div>
            </div>
            <div className={classes.cardHeader}>
              <span className={classes.cardHeaderSubtitle}>Free trial</span>
              <h1 className={classes.cardHeaderTitle}>BASIC</h1>
            </div>

            <div className={classes.cardUl}>
              <p className={classes.cardLi}>
                {check}
                <span> </span>Post part time jobs
              </p>
              <p className={classes.cardLi}>
                {check}
                <span> </span>Post one time jobs
              </p>
              <p className={classes.cardLi}>
                {check}
                <span> </span>Up to 5 job posting
              </p>
            </div>

            <button className={classes.cardButton} disabled>
              Free Trial
            </button>
          </div>

          <div className={classes.cardContent}>
            <div className={classes.cardPricing}>
              <div className={classes.cardPricingNumber}>
                <span className={classes.cardPricingSymbol}>$</span>9.99
              </div>
              <span className={classes.cardPricingMonth}>/month</span>
            </div>

            <div className={classes.cardHeader}>
              <span className={classes.cardHeaderSubtitle}>
                Affordable Plan
              </span>
              <h1 className={classes.cardHeaderTitle}>STANDARD</h1>
            </div>

            <div className={classes.cardUl}>
              <p className={classes.cardLi}>
                {check}
                <span> </span> Exclusive access
              </p>
              <p className={classes.cardLi}>
                {check}
                <span> </span>Increased visibility for jobs
              </p>
              <p style={{ color: "#218AEC" }} className={classes.cardLi}>
                {check}
                <span> </span>Up to 50 job posting
              </p>
            </div>

            <button className={classes.cardButton} onClick={handleShow}>
              Choose this plan
            </button>
          </div>

          <div className={classes.cardContent}>
            <div className={classes.cardPricing}>
              <div className={classes.cardPricingNumber}>
                <span className={classes.cardPricingSymbol}>$</span>19.99
              </div>
              <span className={classes.cardPricingMonth}>/month</span>
            </div>

            <div className={classes.cardHeader}>
              <span className={classes.cardHeaderSubtitle}>FULL ACCESS</span>
              <h1 className={classes.cardHeaderTitle}>PREMIUM</h1>
            </div>

            <div className={classes.cardUl}>
              <p className={classes.cardLi}>
                {check}
                <span> </span>Full access
              </p>
              <p className={classes.cardLi}>
                {check}
                <span> </span>Unlimited job posting
              </p>
              <p style={{ color: "#218AEC" }} className={classes.cardLi}>
                {check}
                <span> </span>Find candidates for you
              </p>
            </div>

            <button className={classes.cardButton} onClick={handleShow}>
              Choose this plan
            </button>
          </div>
        </div>

        <Modal
          show={showPayment}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          size="xl"
          className={classes.modalContainer}
        >
          <Modal.Header closeButton>
            <Modal.Title style={{ fontSize: "20px" }}>PAYMENTS</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-lg-6">
                <div className={classes.cardContainer}>
                  <form className={classes.paymentForm} onSubmit={handleSubmit}>
                    <label htmlFor="card-element" className={classes.label}>
                      Card
                    </label>
                    <CardElement id="card-element" />
                  </form>

                  <p className={classes.cardInstruction}>
                    *Please fill out the form above
                  </p>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="text-center mt-5">
                  <div className={classes.formContainer}>
                    <p className={classes.paymentTitle}>Billing Address</p>
                    <label className={classes.label}>Name on card</label>

                    <input
                      type="text"
                      className={classes.input}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <div className={classes.inputDivider}>
                      <label className={classes.label2}>Street</label>
                      <input
                        type="text"
                        className={classes.input2}
                        onChange={(e) => setStreet(e.target.value)}
                      />
                      <label className={classes.label2}>City</label>
                      <input
                        type="text"
                        className={classes.input2}
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </div>
                    <div className={classes.inputDivider}>
                      <label className={classes.label2}>State</label>
                      <input
                        type="text"
                        className={classes.input2}
                        onChange={(e) => setState(e.target.value)}
                      />
                      <label className={classes.label2}>Zip code</label>
                      <input
                        type="text"
                        className={classes.input2}
                        onChange={(e) => setZipcode(e.target.value)}
                      />
                    </div>

                    <div className="text-center">
                      <button
                        type="submit"
                        disabled={!stripe || !elements}
                        className={classes.payBtn}
                        onClick={handleSubmit}
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="mt-5">
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default withRouter(Payment);
