# 3D Editable Cube with React, Three.js, and MUI

This project creates a 3D cube with editable text on each of its faces using React, Three.js, and Material-UI (MUI). When a face is clicked, an input box appears over that face, allowing the user to edit the text.

## Prerequisites

Before you start, ensure you have the following installed on your machine:

- **Node.js** (Recommended Version: v22.5.1)
- **npm** (Installed with Node.js)

To check your Node.js version, run:

node -v

## Install Dependencies

Run the following command to install the required dependencies:

npm install

## Running the Application
Once the dependencies are installed, you can run the project locally with:

npm start


This will start the development server, and the application will open in your browser at 
## http://localhost:3000.

## Features
    A 3D cube rendered using @react-three/fiber and Three.js
    Editable text on each face of the cube
    Orbit controls to rotate and interact with the cube
    How to Use
    Click on any face of the cube to display an input box.
    Type the new text in the input box and press Enter to save the text on that face.
    Use your mouse to rotate and zoom in/out of the cube using the orbit controls.


## Project Structure
    The main files in this project include:
    src/App.js: Contains the logic for rendering the 3D cube and handling the face-click events for editing text.
    src/index.js: The entry point that renders the React application.


## Dependencies
    This project uses the following libraries:
    React: Frontend framework for building the UI.
    @react-three/fiber: React bindings for Three.js, used to render the 3D cube.
    Three.js: A JavaScript 3D library that makes WebGL easier.
    @mui/material: Material-UI, for consistent UI components.



