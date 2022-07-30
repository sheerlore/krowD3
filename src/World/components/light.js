import {
  AmbientLight,
  DirectionalLight,
} from "../../../vendor/three/build/three.module.js";

function createLights() {
  const ambientLight = new AmbientLight("white", 2);

  const mainLight = new DirectionalLight("white", 5);
  mainLight.position.set(10, 10, 10);

  return { ambientLight, mainLight };
}

export { createLights };
