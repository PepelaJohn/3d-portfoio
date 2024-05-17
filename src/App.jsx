import React from "react";
import Routes from "./components/Routes";
import { BrowserRouter as Router } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
const App = () => {
  return (
    <AnimatePresence initial={true} mode="wait">
      <Router>
        <Routes />
      </Router>
    </AnimatePresence>
  );
};

export default App;
