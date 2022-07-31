import {
  Color,
  Fog,
  FogExp2,
  Scene,
} from "../../../vendor/three/build/three.module.js";

function createScene() {
  const scene = new Scene();
  scene.background = new Color(0xffffff);
  scene.fog = new Fog(0xffffff, 0, 500);
  return scene;
}

export { createScene };
