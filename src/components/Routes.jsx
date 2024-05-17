import React from "react";
import { Routes, Route } from "react-router-dom";
import Navigation from "./Navigation";
import Home from "../routes/Home";
const RoutesWrap = () => {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
};

export default RoutesWrap;
