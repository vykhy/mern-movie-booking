import React from "react";

function Seat({ booked, seatNo, selected, handleSelect }) {
  // renders a square representing a seat
  // gray seats are already booked
  // blue seats are available
  // green seats are our selected seats
  let dynamic = booked
    ? "bg-gray-400"
    : "bg-blue-500 cursor-pointer text-white";
  dynamic += selected ? " bg-green-500" : "";

  return (
    <>
      <div
        // toggle from our selected seats
        data-seat={seatNo}
        onClick={() => !booked && handleSelect(seatNo)}
        className={`m-1 pt-1 text-center text-semibold text-sm text-align-center h-8 w-8 ${dynamic}`}
      >
        {seatNo}{" "}
      </div>
    </>
  );
}

export default Seat;
