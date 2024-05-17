import React, { Suspense, useEffect, useState } from "react";
import Lights from "./Lights";
import * as THREE from "three";
import Car from "./Car";
import {
  Html,
  View,
  PerspectiveCamera,
  OrbitControls,
} from "@react-three/drei";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);
const ModelView = ({ controlRef, setRotationState, rotation, groupRef }) => {
  const [num, setNum] = useState(0);
  const [mode, setMode] = useState("+");

  function handleMove() {
    if (num <= 0 && mode === "-") setMode("+");
    if (num >= 5 && mode === "+") setMode("-");
    setNum(parseInt(`${num} mode ${1}`));
  }
  useEffect(() => {
    console.log("this is it");
    setInterval(() => {
    handleMove()

      controlRef.current.setAzimuthalAngle(num);
    }, "5000");

    return () => {
      console.log("clearing");
      clearInterval();
    };
  }, []);

  useGSAP(() => {
    gsap.from("#carmodel", {
      scale: 10,
      duration: 1,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: "#carmodel",
        start: "top top",
        toggleActions: "restart none none none",
      },
    });
  }, []);
  return (
    <View id="carmodel" className="w-full overflow-visible h-full">
      <ambientLight intensity={10} />

      <PerspectiveCamera makeDefault position={[10, 0, 14]} />
      <Lights />
      <OrbitControls
        ref={controlRef}
        makeDefault
        enablePan={false}
        enableZoom={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
        target={new THREE.Vector3(0, 0, 2)}
        onEnd={() => setRotationState(controlRef.current.getAzimuthalAngle())}
        onChange={() => {
          console.log();
        }}
      />

      <group ref={controlRef} name="car" position={[0, 2, 0]}>
        <Suspense fallback={<Html>Loading...</Html>}>
          <Car scale={[1.5, 1.5, 1.5]} />
        </Suspense>
      </group>
    </View>
  );
};

export default ModelView;
