import { Fog, Scene } from "../../../vendor/three/build/three.module.js";

function createScene() {
  const scene = new Scene();
  scene.fog = new Fog(0x000000, 10, 150);
  return scene;
}

export { createScene };
