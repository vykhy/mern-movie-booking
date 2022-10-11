const mongoose = require("mongoose");

const Booking = new mongoose.Schema(
  {
    customer_name: {
      type: String,
      required: true,
    },
    film_id: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    seats: {
      type: [Number],
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Booking", Booking);
