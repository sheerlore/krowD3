import {
  ConeBufferGeometry,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  MeshToonMaterial,
} from "../../../vendor/three/build/three.module.js";

function createCarrot() {
  const geometry = new ConeBufferGeometry(3, 10, 15, 8);
  // geometry.rotateX(-Math.PI);
  const material = new MeshBasicMaterial({ color: 0xf47a44 });
  const carrot = new Mesh(geometry, material);

  return carrot;
}

export { createCarrot };
