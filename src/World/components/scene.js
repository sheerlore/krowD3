import {
  Color,
  Fog,
  FogExp2,
  Scene,
} from "../../../vendor/three/build/three.module.js";

function createScene() {
  const scene = new Scene();
  scene.background = new Color(0xa9e9ff);
  scene.fog = new Fog(0xa9e9ff, 0, 500);
  return scene;
}

export { createScene };
