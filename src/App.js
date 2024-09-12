import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Function to create a canvas texture with text
function createTextTexture(text) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.width = 256;
  canvas.height = 512;

  // Set background color
  context.fillStyle = 'white';
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Set text properties
  context.fillStyle = 'black';
  context.font = '24px Arial';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(text, canvas.width / 2, canvas.height / 2);

  // Create texture from the canvas
  return new THREE.CanvasTexture(canvas);
}

// Cube component where text can be dynamically added to cube faces
function Cube({ onFaceClick, texts, setFacePosition }) {
  const color = ['red', 'green', 'yellow', 'blue', 'orange', 'magenta']
  const meshRef = useRef();
  const { camera, size } = useThree();
  const vector = new THREE.Vector3();

  useEffect(() => {
    if (meshRef.current) {
      // For each face, create a texture with text
      texts.forEach((text, index) => {
        const texture = createTextTexture(text);
        meshRef.current.material[index].map = texture;
        meshRef.current.material[index].map.needsUpdate = true;
      });
    }
  }, [texts]);

  const handleClick = (e) => {
    const faceIndex = e.face.materialIndex;
    onFaceClick(faceIndex);  // Pass the clicked face index to parent component

    // Compute the center of the clicked face and project to screen space
    const position = meshRef.current.geometry.attributes.position;
    const faceVertices = new THREE.Vector3(
      position.getX(faceIndex * 4),
      position.getY(faceIndex * 4),
      position.getZ(faceIndex * 4)
    );

    const projected = vector.set(faceVertices.x, faceVertices.y, faceVertices.z).project(camera);
    const halfWidth = size.width / 2;
    const halfHeight = size.height / 2;

    setFacePosition({
      x: (projected.x * halfWidth) + halfWidth,
      y: -(projected.y * halfHeight) + halfHeight,
    });
  };

  return (
    <mesh ref={meshRef} onClick={handleClick}>
      <boxGeometry args={[2, 2, 2]} />
      {/* Create six materials for the cube */}
      {Array(6).fill().map((_, index) => (
        <meshBasicMaterial key={index} color={color[index]} attach={`material-${index}`} />
      ))}
    </mesh>
  );
}

function App() {
  const [selectedFace, setSelectedFace] = useState(null);  // Store which face is clicked
  const [texts, setTexts] = useState(['', '', '', '', '', '']);  // Store text for each face
  const [editingText, setEditingText] = useState('');  // The text being edited
  const [facePosition, setFacePosition] = useState(null);  // Position of the clicked face in 3D space

  const handleFaceClick = (faceIndex) => {
    // Set the clicked face as editable
    setSelectedFace(faceIndex);
    setEditingText(texts[faceIndex]);
  };

  const handleTextChange = (event) => {
    setEditingText(event.target.value);
  };

  const handleTextSubmit = (event) => {
    if (event.key === 'Enter') {
      const updatedTexts = [...texts];
      updatedTexts[selectedFace] = editingText;
      setTexts(updatedTexts);  // Update the text on the clicked face
      setSelectedFace(null);  // Close the editable state
    }
  };

  return (
    <div>
      <Canvas style={{ height: '800px' }}>
        <ambientLight intensity={0.5} />
        <Cube onFaceClick={handleFaceClick} texts={texts} setFacePosition={setFacePosition} />
        <OrbitControls />
      </Canvas>

      {/* Editable input rendered only when a face is clicked */}
      {selectedFace !== null && facePosition && (
        <input
          type="text"
          value={editingText}
          onChange={handleTextChange}
          onKeyDown={handleTextSubmit}
          style={{
            position: 'absolute',
            left: `${facePosition.x}px`,
            top: `${facePosition.y}px`,
            zIndex: 1000,
            width: '200px',
          }}
        />
      )}
    </div>
  );
}

export default App;
