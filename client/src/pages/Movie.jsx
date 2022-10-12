import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Seat from "../components/Seat";
import { useSelector, useDispatch } from "react-redux";
import MovieDetails from "../components/MovieDetails";
import BookingForm from "../components/BookingForm";
import {
  addSeat,
  clearCart,
  setCartData,
  removeSeat,
  clearAllSeats,
} from "../slices/cartReducer";
import BookingInstructions from "../components/BookingInstructions";

function Movie() {
  const [filmDetails, setFilmDetails] = useState({});
  const [theaterSeats, setTheaterSeats] = useState([]);
  const { id } = useParams();

  const { date, seats } = useSelector((state) => state.cart.value);

  const dispatch = useDispatch();

  useEffect(async () => {
    const result = await axios.get("http://localhost:5000/movie/" + id);
    setFilmDetails(result.data);

    // clear our data
    dispatch(clearAllSeats());
    dispatch(clearCart());

    // set movie id and booking date
    dispatch(setCartData({ movieId: id }));
    dispatch(setCartData({ date: new Date().toISOString().split("T")[0] }));
  }, [id]);

  useEffect(() => {
    // clear our data when date changed
    dispatch(clearAllSeats());
    getSeats();
  }, [date]);

  // fetch seats data for a specific showing
  const getSeats = async () => {
    dispatch(clearAllSeats());
    if (date === undefined) return;
    const result = await axios.get(
      "http://localhost:5000/showings/" + id + "/" + date
    );
    setTheaterSeats(result.data);
  };

  // handle toggling seat selection
  const handleSeatSelect = (seatNo) => {
    if (seats?.includes(seatNo)) {
      dispatch(removeSeat(seatNo));
    } else {
      dispatch(addSeat(seatNo));
    }
  };

  return (
    <div className="md:flex">
      <div className="w-screen  p-4">
        <MovieDetails filmDetails={filmDetails} />
      </div>
      <div className="w-screen p-4">
        <BookingInstructions />
        <p className="font-lg font-bold">Select a date:</p>

        {/* DATE SELECTOR FOR SHOWING   */}
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            onChange={(e) => dispatch(setCartData({ date: e.target.value }))}
            className="text-lg p-2"
            defaultValue={new Date().toISOString().split("T")[0]}
            min={new Date().toISOString().split("T")[0]}
            type="date"
          />
          <button
            className="rounded-sm bg-blue-600 text-white font-semibold p-2 text-center"
            onClick={getSeats}
          >
            Refresh seats
          </button>
        </form>

        {/* SHOW SEATS AND ALLOW SEAT SELECTION  */}
        {theaterSeats.length > 0 && "Price per ticket: Rs 200"}
        <p className="font-lg font-bold">Select your seats:</p>
        <div className="flex w-96 flex-wrap">
          {theaterSeats.map((seat, index) => (
            <Seat
              key={index}
              booked={seat === 1}
              seatNo={index + 1}
              handleSelect={() => handleSeatSelect(index + 1)}
              selected={seats?.includes(index + 1)}
            />
          ))}
        </div>
        {/* RENDERS BASIC DATA OF SELECTED SEATS AND TOTAL PRICE   */}
        <p className="my-3 text-xl font-semibold">Your seats:</p>
        <div className="flex flex-wrap font-semibold text-lg">
          {seats?.map((seat) => (
            <div key={seat} className="p-2 mr-2 mb-2 border-1 border-black">
              {seat}{" "}
            </div>
          ))}
        </div>
        <p className="my-3 text-xl font-semibold">
          Price: Rs {seats?.length * 200}{" "}
        </p>
        {/* BOOK NOW  */}
        <BookingForm
          failedCallback={getSeats}
          price={200}
          movieName={filmDetails?.film_name}
        />
      </div>
      {/*  */}
    </div>
  );
}

export default Movie;
