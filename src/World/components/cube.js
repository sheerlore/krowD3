import {
  BoxBufferGeometry,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
} from "../../../vendor/three/build/three.module.js";

function createCube() {
  const geometry = new BoxBufferGeometry(2, 2, 2);

  const material = new MeshStandardMaterial({ color: "purple" });

  const cube = new Mesh(geometry, material);

  const radiansPerSecond = MathUtils.degToRad(30);

  // このメソッドは１フレームごとに呼ばれる
  cube.tick = (delta) => {
    cube.rotation.z += radiansPerSecond * delta;
    cube.rotation.x += radiansPerSecond * delta;
    cube.rotation.y += radiansPerSecond * delta;
  };

  return cube;
}

export { createCube };
