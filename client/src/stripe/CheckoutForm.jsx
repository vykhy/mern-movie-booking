import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { clearCart } from "../slices/cartReducer";
import { clearAllSeats } from "../slices/cartReducer";
import { add } from "../slices/bookingsReducer";
import { useNavigate } from "react-router-dom";

export const CheckoutForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const bookingId = useSelector((state) => state.cart.value.bookingId);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post("http://localhost:5000/pay", {
          bookingId: bookingId,
          amount: amount,
          id: id,
        });

        if (response.data.success) {
          dispatch(add(response.data.booking));
          console.log("Payment successful!");
          navigate("/success");
        }
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(clearCart());
        dispatch(clearAllSeats());
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
      <CardElement />
      <button className="p-2 mt-2 bg-blue-600 font-semibold text-white rounded-sm text-lg">
        Pay now
      </button>
    </form>
  );
};
