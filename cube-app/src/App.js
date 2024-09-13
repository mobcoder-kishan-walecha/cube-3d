
import React, { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Colors array for each face of the cube
const faceColors = [
  { color: 'red', name: 'Red' },
  { color: 'green', name: 'Green' },
  { color: 'blue', name: 'Blue' },
  { color: 'yellow', name: 'Yellow' },
  { color: 'purple', name: 'Purple' },
  { color: 'orange', name: 'Orange' },
];

// Function to create a texture for a face with or without text
function createTextTexture(text, color, showText = false) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.width = 256;
  canvas.height = 256;

  // Set background color of the face
  context.fillStyle = color;
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Set text properties and display text only if showText is true
  if (showText) {
    context.fillStyle = 'white'; // Text color
    context.font = '40px Arial';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(text, canvas.width / 2, canvas.height / 2);
  }

  // Create a texture from the canvas
  return new THREE.CanvasTexture(canvas);
}

// Cube component
function Cube({ onFaceClick, faceTextures }) {
  const meshRef = useRef();

  useEffect(() => {
    if (meshRef.current) {
      // Update the texture for each face based on the current state
      faceTextures.forEach((texture, index) => {
        meshRef.current.material[index].map = texture;
        meshRef.current.material[index].map.needsUpdate = true;
      });
    }
  }, [faceTextures]);

  const handleClick = (e) => {
    const faceIndex = e.face.materialIndex;
    onFaceClick(faceIndex);  // Pass the clicked face index to parent component
  };

  return (
    <mesh ref={meshRef} onClick={handleClick}>
      <boxGeometry args={[2, 2, 2]} />
      {faceColors.map((_, index) => (
        <meshBasicMaterial key={index} attach={`material-${index}`} />
      ))}
    </mesh>
  );
}

function App() {
  const [faceTextures, setFaceTextures] = useState(
    faceColors.map((face) => createTextTexture(face.name, face.color, false))
  );  // Initially, no face has text

  const handleFaceClick = (faceIndex) => {
    const updatedTextures = [...faceTextures];
    const clickedFace = faceColors[faceIndex];

    // Update the clicked face texture to show the color name
    updatedTextures[faceIndex] = createTextTexture(clickedFace.name, clickedFace.color, true);
    setFaceTextures(updatedTextures);  // Trigger a re-render with the updated textures
  };

  return (
    <div>
      <Canvas style={{ height: '800px' }}>
        <ambientLight intensity={0.5} />
        <Cube onFaceClick={handleFaceClick} faceTextures={faceTextures} />
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default App;
