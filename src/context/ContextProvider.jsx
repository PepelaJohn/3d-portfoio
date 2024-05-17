import React, { createContext, useState, useRef } from "react";

export const PlanesContext = createContext(null);
const ContextProv = ({ children }) => {
  const [selected, setselected] = useState(0);
  const planedata = {
    links: ["Mitsubishi", "Subaru", "G-Wagon", "Limousine", "Cardilac"],
  };
  const [prevNext, setprevNext] = useState({
    previous: planedata.links.length - 1,
    next: 1,
  });
  const carouselLeftRef = useRef(null);
  const carouselRightRef = useRef(null);

  function InfiniteScroll(action) {
    let result = {};

    if (action === "next") {
      const next = selected + 1;
      if (next > planedata.links.length - 1) {
        result = { previous: planedata.links.length - 1, current: 0, next: 1 };
      } else if (next <= planedata.links.length - 1) {
        result = {
          previous: next <= 0 ? planedata.links.length - 1 : next - 1,
          current: next,
          next: next + 1 >= planedata.links.length ? 0 : next + 1,
        };
      }
    }
    if (action === "previous") {
      const previous = selected - 1;
      if (previous < 0) {
        result = {
          previous: planedata.links.length - 2,
          current: planedata.links.length - 1,
          next: 0,
        };
      } else if (previous < planedata.links.length - 1) {
        result = {
          previous: previous <= 0 ? planedata.links.length - 1 : previous - 1,
          current: selected - 1,
          next: previous + 1 >= planedata.links.length ? 0 : selected,
        };
      }
    }
    setselected(result?.current);
    setprevNext({ ...result });
  }

  async function handleScroll() {
    const elements = [carouselLeftRef, carouselRightRef];

    for (let index = 0; index < elements.length; index++) {
      const element = elements[index];

      element.current.classList.add("opacity-none");
    }
    // console.log(element.current.classList);
    setTimeout(() => {
      for (let index = 0; index < elements.length; index++) {
        const element = elements[index];
        element.current.classList.remove("opacity-none");
      }
    }, 500);
  }
  return (
    <PlanesContext.Provider
      value={{
        planedata,
        selected,
        setselected,
        InfiniteScroll,
        prevNext,
        setprevNext,
        carouselRightRef,
        carouselLeftRef,handleScroll
      }}
    >
      {children}
    </PlanesContext.Provider>
  );
};

export default ContextProv;

export function InfiniteScrollTrigger(selected, length, setprevNext) {
  let result = {};
  let previous;
  let next;
  const current = selected;

  if (selected === 0) {
    next = 1;
    previous = length - 1;
  } else if (selected >= length - 1) {
    next = 0;
    previous = length - 2;
  } else {
    next = selected + 1;
    previous = selected - 1;
  }
  result = { previous, next, current };
  setprevNext(result);
}
