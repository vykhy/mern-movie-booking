import React from "react";
import { useSelector } from "react-redux";

// Show bookings to the user
function Success() {
  const bookings = useSelector((state) => state.bookings.value);
  return (
    <div className="p-12">
      <p className="text-xl font-bold">Your booking was successful</p>
      <p className="text-lg mt-6 font-semibold">Your bookings</p>
      {bookings?.map((booking) => (
        <div
          className="p-6 my-6 border-1 border-gray-400 text-md font-semibold"
          key={booking._id}
        >
          Movie: {booking.film_id} <br />
          Date: {booking.date} <br />
          Time: 3:00 p.m. - 5:00 p.m. <br />
          Your seats:{" "}
          <div className="flex flex-wrap">
            {booking.seats.map((seat) => (
              <div key={seat} className="p-2 mr-2 mb-2 border-1 border-black">
                {seat}
              </div>
            ))}
          </div>
        </div>
      ))}
      {bookings?.map((booking) => (
        <div
          className="p-6 my-6 border-1 border-gray-400 text-md font-semibold"
          key={booking._id}
        >
          Movie: {booking.film_id} <br />
          Date: {booking.date} <br />
          Time: 3:00 p.m. - 5:00 p.m. <br />
          Your seats:{" "}
          <div className="flex flex-wrap">
            {booking.seats.map((seat) => (
              <div key={seat} className="p-2 mr-2 mb-2 border-1 border-black">
                {seat}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Success;
