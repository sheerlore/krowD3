import { PerspectiveCamera } from "../../../vendor/three/build/three.module.js";

function createCamera() {
  const camera = new PerspectiveCamera(
    75, //fov Field Of View
    window.innerWidth / window.innerHeight, // aspect ratio (dummy value)
    0.1, // near clipping plane
    1000 // far clipping plane
  );

  camera.position.y = 20;

  return camera;
}

export { createCamera };
