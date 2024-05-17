import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { IoIosArrowBack, IoIosVideocam } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { Md3DRotation } from "react-icons/md";
import { PlanesContext } from "../context/ContextProvider";
import gsap from "gsap";
// import { motion } from "framer-motion";
import { transition1 } from "../transitions";
import { useGSAP } from "@gsap/react";
import { element } from "three/examples/jsm/nodes/Nodes.js";
import Models from "../components/Models";
// import {InfiniteScroll}
const Home = () => {
  const [modelState, setModelState] = useState("video");
  const {
    planedata,
    InfiniteScroll,
    prevNext,
    handleScroll,
    carouselRightRef,
    carouselLeftRef,
  } = useContext(PlanesContext);

  useGSAP(() => {
    gsap.to(".carousel-left", {
      opacity: 1,
      x: "-10%",
      ease: "bounce.in",
      duration: 1,
    });
    gsap.to(".carousel-right", {
      opacity: 1,
      x: "10%",
      ease: "bounce.in",
      duration: 1,
    });
  }, []);

  useEffect(() => {
    // handleScroll(element)
  });
  return (
    <div className="wrapper bg-black overflow-visible  relative">
      <div className="visibility-none h-[120px] w-[100%] "></div>
      <Container
        className="home-container z-500
       h-100 flex flex-col "
      >
        <div className="top padding-80 items-center space-between-row flex">
          <span
            onClick={() => {
              setTimeout(() => {
                InfiniteScroll("previous");
              }, 250);
              handleScroll(carouselLeftRef);
            }}
            to="/"
            className=" bg-white z-50 relative shadow flex all-center bg-primary 
             w-[50px] rounded-full cursor-pointer h-[50px]"
          >
            <IoIosArrowBack />
            <span
              initial={{ opacity: 0, x: "-100%" }}
              animate={{ opacity: 1, x: "0%" }}
              exit={{ opacity: 0, x: "-100%" }}
              transition={transition1}
              className="absolute ease-in-out opacityAnim
             flex all-center carousel z-50 carousel-left text-white "
              ref={carouselLeftRef}
            >
              {planedata.links[prevNext.previous]}
            </span>
          </span>
          <span
            onClick={() => {
              setTimeout(() => {
                InfiniteScroll("next");
              }, 200);
              handleScroll(carouselRightRef);
            }}
            to="/"
            className=" bg-white relative shadow blur-[5px] 
            flex all-center  bg-primary 
            w-[50px] rounded-full cursor-pointer z-50 h-[50px]"
          >
            <IoIosArrowForward />
            <span
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: "0%" }}
              exit={{ opacity: 0, x: "100%" }}
              transition={transition1}
              className="absolute ease-in-out opacityAnim 
              flex all-center carousel z-50 carousel-right text-white w-fit"
              ref={carouselRightRef}
            >
              {planedata.links[prevNext.next]}
            </span>
          </span>
        </div>
        <div className="middle padding-80 gap-5 flex-col  flex">
          <span
            onClick={() => {
              setModelState("video");
            }}
            className={` ease-in-out opacityAnimate relative
             shadow flex all-center bg-primary z-50 
            w-[50px] rounded-full cursor-pointer h-[50px] ${
              modelState === "3d"
                ? " bg-black border-2 border-solid border-white color-white"
                : " bg-white"
            }`}
          >
            <IoIosVideocam />
          </span>
          <span
            onClick={() => {
              setModelState("3d");
            }}
            className={` ease-in-out opacityAnimate 
            relative shadow flex all-center bg-primary z-50
            w-[50px] rounded-full cursor-pointer h-[50px] ${
              modelState === "video"
                ? " bg-black border-2 border-solid border-white color-white"
                : "bg-white"
            }`}
          >
            <Md3DRotation />
          </span>
        </div>
        <div className="bottom z-50 padding-40 opacityAnim w-100 flex  items-center">
          <span className="sections flex items-center h-[50px]">Sections</span>
          <div className="sections-wrapper   ml-10 flex flex-1">
            <div className="section btn-m mr-5  section-1">1</div>
            <div className="section btn-ss shadow mr-5 section-2">2</div>
            <div className="section btn-ss shadow mr-5 section-3">3</div>
            <div className="section btn-ss shadow  mr-5 section-4">4</div>
          </div>
        </div>
      </Container>
      <div className="flex overflow-visible items-center justify-center  absolute top-0 left-[0%] right-[0%] bottom-0">
        <Models />
      </div>
    </div>
  );
};
//bg-black color-white
export default Home;
const Container = styled.div`
  .top {
    flex: 0.3;
  }
  .middle {
    flex: 0.4;
    justify-content: center;
  }
  .bottom {
    flex: 0.3;
  }
`;
