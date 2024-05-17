import React, { useRef, useState } from "react";
import ModelView from "./ModelView";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";

const Models = () => {
  const cameraControl = useRef();

  const carModel = useRef(new THREE.Group());

  const [rotation, setRotation] = useState(0);

  return (
    <section className="relative overflow-hidden  h-full w-full flex items-center justify-center">
      <ModelView
        controlRef={cameraControl}
        setRotationState={setRotation}
        rotation={rotation}
        groupRef={carModel}
      />

      <Canvas
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
        eventSource={document.getElementById("root")}
      >
        <View.Port />
      </Canvas>
    </section>
  );
};

export default Models;
