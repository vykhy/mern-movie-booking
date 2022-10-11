import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { CheckoutForm } from "./CheckoutForm";

const PUBLIC_KEY =
  "pk_test_51LcnbWSGKH5tfHebvGCT9tuQWYyDDocDIFSNUikgZ5RAWJi3KyekTDD4tIdDjMbo7W0ALS122o1IVrK4Tnxbidmk00XQbN1am9";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

const Stripe = ({ amount }) => {
  return (
    <Elements stripe={stripeTestPromise}>
      <CheckoutForm amount={amount} />
    </Elements>
  );
};

export default Stripe;
