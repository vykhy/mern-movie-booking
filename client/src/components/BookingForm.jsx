import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearAllSeats } from "../slices/seatsReducer";
import { setBookingId, create } from "../slices/cartReducer";

function BookingForm({ date, failedCallback, price, movieName, movieId }) {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // selected seats
  const seats = useSelector((state) => state.seats.value);

  const bookNow = async (e) => {
    e.preventDefault();

    // update cart
    dispatch(
      create({
        name,
        date,
        seats,
        price: price * seats.length,
        movie: movieName,
      })
    );

    // initialise booking process
    // we can add an email field to send notifications and the tickets
    const result = await axios.post("http://localhost:5000/init-booking", {
      seats: seats,
      name: name,
      date: date,
      movie: movieId,
    });

    // store booking id so we can pass it to payment and
    // update its status when paid
    if (result.data.success) {
      dispatch(setBookingId(result.data.bookingId));
      // redirect to stripe component
      navigate("/pay");
    } else {
      // main reason is that one or more seats was already locked/booked
      // we clear the selected seats and
      // call failed callback - in this case it refreshes the seat data
      dispatch(clearAllSeats());
      failedCallback();
    }
  };

  return (
    <form onSubmit={(e) => bookNow(e)}>
      <input
        placeholder="Enter your name"
        type="text"
        name="name"
        className="p-2 font-semibold rounded-sm text-lg"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        className="p-2 mt-2 bg-blue-600 font-semibold text-white rounded-sm text-lg"
        type="submit"
        disabled={seats.length < 1}
      >
        Book Now
      </button>
    </form>
  );
}

export default BookingForm;
