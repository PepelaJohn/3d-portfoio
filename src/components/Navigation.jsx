import React, { useContext } from "react";
import styled from "styled-components";
import { CgMenuRight } from "react-icons/cg";
import { Link } from "react-router-dom";
import { PlanesContext } from "../context/ContextProvider";
import { InfiniteScrollTrigger } from "../context/ContextProvider";
import { CgAirplane } from "react-icons/cg";
import { motion } from "framer-motion";
import { transition1 } from "../transitions";
const Navigation = () => {
  const { selected, setselected, setprevNext, planedata, handleScroll } =
    useContext(PlanesContext);

  return (
    <Nav className="flex z-50 lg:grid nav-wrapper ease-in-out items-center fixed padding-80 top-0 left-0 right-0">
      <Link
        to="/"
        className="logo-wrap  flex all-center bg-primary
         bg-black  text-white w-[55px] rounded-full cursor-pointer h-[55px]"
      >
        <h5 className="logo flex items-center">
          B<CgAirplane className="rotate-up flex all-center" />C
        </h5>
      </Link>
      <motion.ul
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={transition1}
        className="hidden lg:flex list-items pt-5 pb-5 items-center  all-center"
      >
        {useContext(PlanesContext).planedata.links.map((element, index) => {
          return (
            <li
              onClick={() => {
                setselected(index);
                setTimeout(() => {
                  InfiniteScrollTrigger(
                    index,
                    planedata.links.length,
                    setprevNext
                  );
                }, 250);
                handleScroll();
              }}
              key={index}
              className={`list-item shadow opacityAnim ${
                selected === index ? "btn" : "btn-s"
              }`}
            >
              {element}
            </li>
          );
        })}
      </motion.ul>
      <div className="hambgurger cursor-pointer">
        <CgMenuRight />
      </div>
    </Nav>
  );
};

export default Navigation;

const Nav = styled.nav`
  grid-template-columns: min-content auto min-content;
  min-height: 120px;
  justify-content: space-between;
`;
