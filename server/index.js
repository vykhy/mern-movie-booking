const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const Booking = require("./models/Booking");

mongoose.connect("mongodb://localhost/cloudville", () => {
  console.log("db connected...");
});

// simply returns date in a suitable format for our api call
function getDateString() {
  return new Date().toISOString();
}

// base url of movie api
const BASE_URL = "https://api-gate2.movieglu.com/";

// axios instance for making movie api calls
const apiAxios = axios.create({
  headers: {
    "api-version": process.env.API_VERSION,
    client: process.env.API_CLIENT,
    "x-api-key": process.env.API_KEY,
    authorization: process.env.AUTHORIZATION_KEY,
    "device-datetime": getDateString(),
    "geo-location": "-22.0;14.0",
    territory: "XX",
  },
});

// lock seats and start bookin process
app.post("/init-booking", async (req, res) => {
  const { name, seats, date, movie } = req.body;

  // check if some seats have been booked by someone else
  const seatsBooked = await Booking.find({
    film_id: movie,
    date: date,
    seats: { $in: seats },
  });

  // if some of the selected seats are taken, return and refresh seats UI
  if (seatsBooked.length > 0) {
    return res.json({
      success: false,
      message: "Some seats were already taken",
    });
  } else {
    // initiate booking and lock seats
    const booking = await Booking.create({
      film_id: movie,
      date: date,
      customer_name: name,
      seats: seats,
      status: "pending",
    });
    // free seats if not paid in 5 minutes
    setTimeout(() => {
      Booking.findOneAndDelete({
        _id: booking._id,
        status: "pending",
      });
    }, 1000 * 60 * 5);
    // redirect client to payment
    return res.json({ success: true, bookingId: booking._id });
  }
});

// fetches the movies
app.get("/movies", async (req, res) => {
  try {
    const result = await apiAxios.get(`${BASE_URL}filmsNowShowing/?n=15`);
    res.json(result.data);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// gets additional movie details
app.get("/movie/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await apiAxios.get(BASE_URL + `filmDetails/?film_id=${id}`);
    res.json(result.data);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// finalise and complete payment
app.post("/pay", async (req, res) => {
  let { amount, id, bookingId } = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      amount: amount,
      currency: "INR",
      description: "Movie Bookings Inc.",
      payment_method: id,
      confirm: true,
    });

    // if paid, update booking status
    const booking = await Booking.findOneAndUpdate(
      {
        _id: mongoose.Types.ObjectId(bookingId),
      },
      {
        status: "fulfilled",
      },
      { new: true }
    );
    // send booking details as well so that we can show in the UI
    res.json({
      message: "Payment Successful",
      success: true,
      booking: booking,
    });
  } catch (error) {
    // release seats
    Booking.findOneAndDelete({
      _id: mongoose.Types.ObjectId(bookingId),
    });
    res.json({
      message: "Payment Failed",
      success: false,
    });
  }
});

app.get("/showings/:film_id/:date", async (req, res) => {
  const { film_id, date } = req.params;
  // GET ALL BOOKINGS MADE FOR THE SELECTED SHOWING
  // THIS CAN BE EXTENDED FOR MORE FIELDS, eg for theater_id
  const bookings = await Booking.find({
    film_id: film_id,
    date: date,
  });

  // This array represents the seats in the theater
  // For a real application, this can come from a theater collection/table
  // I have used it as a placeholder for the purpose of demonstration
  const theaterSeats = new Array(100).fill(0);

  // FILTER OUT BOOKED SEATS
  // BOOKED SEATS MARKED AS 1
  bookings.forEach((booking) => {
    booking.seats.forEach((seat) => {
      theaterSeats[seat - 1] = 1;
    });
  });
  // RETURN SEATS
  res.json(theaterSeats);
});

app.listen(5000, () => {
  console.log("server running...");
});
