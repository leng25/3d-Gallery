/*This is the component for the 3d displayed on the login page */
import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from 'react-three-fiber';
import * as THREE from 'three';
import circle from './circle.gltf';
import { useLoader } from 'react-three-fiber';
import {TextureLoader} from 'three/src/loaders/TextureLoader';
import Texture from './rock.jpg'
import { OrbitControls, PerspectiveCamera, Stars } from '@react-three/drei';
import NewLoginPage from './src/script';


const Box = (props) => {
    const mesh = useRef();
    const [active, setActive] = useState(false);
    

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        mesh.current.position.y = mesh.current.position.y + Math.sin(time*2)/100;

        /*mesh.current.rotation.y = mesh.current.rotation.x += 0.01; - Spins the model*/

    });

    const texture = useMemo(() => new THREE.TextureLoader().load(circle), []);
    const colormap = useLoader(TextureLoader, Texture);

    return(
        <mesh
        {...props}
        ref={mesh}
        scale={active ? [2, 2, 2] : [1, 1, 1]}
        //onClick={(e) => setActive(!active)}
          >
          <sphereBufferGeometry args={[1,41,41]} />
          <meshStandardMaterial map={colormap} />
        </mesh>
    )
}

const DBox = () => {
    return (
      <body>
       <NewLoginPage />
      </body>
    );
  }

  export default DBox;