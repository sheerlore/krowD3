import {
  AmbientLight,
  DirectionalLight,
  HemisphereLight,
} from "../../../vendor/three/build/three.module.js";

function createLights() {
  const ambientLight = new AmbientLight("white", 2);
  const hemisphereLight = new HemisphereLight(0xeeeeff, 0x777788, 0.75);
  hemisphereLight.position.set(0.5, 1, 0.75);

  const mainLight = new DirectionalLight("white");
  mainLight.position.set(50, 50, 50);

  return { hemisphereLight, ambientLight, mainLight };
}

export { createLights };
