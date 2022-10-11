import React from "react";
import { useSelector } from "react-redux";
import Stripe from "../stripe/StripeContainere";

// Stripe payment form
function PaymentForm() {
  const amount = useSelector((state) => state.cart.value.price * 100);
  return (
    <div className="w-full h-full pt-20  px-24">
      <Stripe amount={amount} />
    </div>
  );
}

export default PaymentForm;
