import { WebGLRenderer } from "../../../vendor/three/build/three.module.js";

function createRenderer() {
  const renderer = new WebGLRenderer({ antialias: true });
  renderer.gammaOutput = true;

  return renderer;
}

export { createRenderer };
