import React from "react";
import "./index.css";
import "./App.css";
import Home from "./pages/Home";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Movie from "./pages/Movie";
import Success from "./pages/Success";
import PaymentForm from "./pages/PaymentForm";

const App = () => {
  /**
   * booking flow
   * - initiate from client
   * - lock seats on server and redirect to stripe
   * - if seats locked, find locked seats and inform user
   * - update theatre seats in front end
   * - if success, update booking status and inform user
   * - if fail, release seats and inform user
   */
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="movie/:id" element={<Movie />}></Route>
          <Route path="success" element={<Success />}></Route>
          <Route path="/pay" element={<PaymentForm />}></Route>
          <Route path="*" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
