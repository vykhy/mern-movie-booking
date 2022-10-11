import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Seat from "../components/Seat";
import { addSeat, clearAllSeats, removeSeat } from "../slices/seatsReducer";
import { useSelector, useDispatch } from "react-redux";
import MovieDetails from "../components/MovieDetails";
import BookingForm from "../components/BookingForm";
import { clearCart } from "../slices/cartReducer";

function Movie() {
  const [filmDetails, setFilmDetails] = useState({});
  const [theaterSeats, setTheaterSeats] = useState([]);
  const [date, setDate] = useState();
  const { id } = useParams();

  const selectedSeats = useSelector((state) => state.seats.value);

  const dispatch = useDispatch();

  useEffect(async () => {
    const result = await axios.get("http://localhost:5000/movie/" + id);
    setFilmDetails(result.data);

    // clear our data when movie changed
    dispatch(clearAllSeats());
    dispatch(clearCart());
  }, [id]);

  useEffect(() => {
    // update seats when date changed
    getSeats();
    // clear our data when movie changed
    dispatch(clearAllSeats());
    dispatch(clearCart());
  }, [date]);

  // handle toggling seat selection
  const handleSeatSelect = (seatNo) => {
    if (selectedSeats.includes(seatNo)) {
      dispatch(removeSeat(seatNo));
    } else {
      dispatch(addSeat(seatNo));
    }
  };

  // fetch seats data for a specific showing
  const getSeats = async () => {
    dispatch(clearAllSeats());
    if (date === undefined) return;
    const result = await axios.get(
      "http://localhost:5000/showings/" + id + "/" + date
    );
    setTheaterSeats(result.data);
  };

  return (
    <div className="md:flex">
      <div className="w-screen  p-4">
        <MovieDetails filmDetails={filmDetails} />
      </div>
      <div className="w-screen p-4">
        <p className="font-semibold mb-8 mt-2 text-lg">
          How to book? <br />
          1. Select a date <br />
          2. Choose your seats <br />
          3. Enter your name <br />
          4. Complete your payment on the next page <br />
        </p>
        <p className="font-lg font-bold">Select a date:</p>
        {/* DATE FOR SHOWING SELECTOR/  */}
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            onChange={(e) => setDate(e.target.value)}
            className="text-lg p-2"
            type="date"
          />
          <button
            className="rounded-sm bg-blue-600 text-white font-semibold p-2 text-center"
            onClick={getSeats}
          >
            {theaterSeats.length > 0 ? "Refresh seats" : "Get seats"}
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
              selected={selectedSeats.includes(index + 1)}
            />
          ))}
        </div>
        {/* RENDERS BASIC DATA OF SELECTED SEATS AND TOTAL PRICE   */}
        <p className="my-3 text-xl font-semibold">Your seats:</p>
        <div className="flex flex-wrap font-semibold text-lg">
          {selectedSeats.map((seat) => (
            <div key={seat} className="p-2 mr-2 mb-2 border-1 border-black">
              {seat}{" "}
            </div>
          ))}
        </div>
        <p className="my-3 text-xl font-semibold">
          Price: Rs {selectedSeats.length * 200}{" "}
        </p>
        {/* BOOK NOW  */}
        <BookingForm
          date={date}
          failedCallback={getSeats}
          price={200}
          movieName={filmDetails?.film_name}
          movieId={id}
        />
      </div>
      {/*  */}
    </div>
  );
}

export default Movie;
