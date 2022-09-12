import "./styles.css";
import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { useControls } from "leva";
const Box = ({ size, position }) => {
  const boxRef = useRef();
  const [hovered, hover] = useState(false);
  useFrame((state, delta) => {
    boxRef.current.rotation.x += 0.001;
    boxRef.current.rotation.y += 0.002;
    boxRef.current.rotation.z += 0.003;
    //  console.log(delta)
  });

  return (
    <mesh
      castShadow
      ref={boxRef}
      position={position}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
    >
      <boxGeometry args={[size / 2, size * 2, size]} />
      <meshStandardMaterial
        color={hovered ? "blue" : "darkblue"}
        transparent
        opacity={0.7}
      />
    </mesh>
  );
};

const Floor = () => {
  return (
    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[20, 10]} />
      {/* <meshStandardMaterial color="blue" /> */}

      <meshPhongMaterial color="black" specular="grey" />
    </mesh>
  );
};

export default function App() {
  const { sizeBox1 } = useControls({
    sizeBox1: {
      label: "Size box 1",
      value: 2,
      min: 0.5,
      max: 3
    }
  });
  const { sizeBox2 } = useControls({
    sizeBox2: {
      value: 2,
      min: 0.5,
      max: 3,
      step: 0.1
    }
  });
  return (
    <>
      <div className="App">
        <h1>
          Hello R3F!
          {/* {((x)=> ` wtf * ${x*2}!`)(5)} */}
        </h1>
      </div>
      <Canvas shadows camera={{ position: [0, 20, 5] }}>
        <OrbitControls maxPolarAngle={Math.PI / 2.5} maxDistance={200} />
        <Stars />
        <ambientLight intensity={0.5} />
        <spotLight
          intensity={0.5}
          position={[0, 20, 0]}
          castShadow
          shadow-mapSize-height={1024}
          shadow-mapSize-width={1024}
        />
        <Box size={sizeBox1} position={[3, 3, 0]} />
        <Box size={sizeBox2} position={[-3, 3, 0]} />
        <Floor />
      </Canvas>
    </>
  );
}
