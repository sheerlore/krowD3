import {
  ConeBufferGeometry,
  Mesh,
  MeshBasicMaterial,
} from "../../../vendor/three/build/three.module.js";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

let selectedCarrot;

function selectCarrot() {
  return selectedCarrot;
}

function deleteCarrot() {
  if (selectedCarrot !== undefined) selectedCarrot.removeFromParent();
}

function createCarrots(num, camera) {
  const carrots = [];
  if (num === undefined) num = 100;
  const geometry = new ConeBufferGeometry(3, 12, 12, 8).toNonIndexed();
  geometry.rotateX(-Math.PI);
  // let position = geometry.attributes.position;
  for (let i = 0; i < num; i++) {
    const material = new MeshBasicMaterial({ color: 0xf47a44 });
    const carrot = new Mesh(geometry, material);
    carrot.position.x = getRandomInt(-800, 800);
    carrot.position.z = getRandomInt(-800, 800);
    let verticalAngle = 0;
    carrot.tick = (delta) => {
      if (
        Math.abs(carrot.position.x - camera.position.x) < 10 &&
        Math.abs(carrot.position.z - camera.position.z) < 10
      ) {
        carrot.position.y += 3.0 * delta;
        verticalAngle += 5.5 * delta;
        if (verticalAngle > Math.PI * 2) {
          verticalAngle -= Math.PI * 2;
        }
        carrot.position.y = Math.sin(verticalAngle) * 2 + 3;
        selectedCarrot = carrot;
      } else {
        carrot.position.y = 0;
      }
    };
    carrots.push(carrot);
  }

  return carrots;
}

export { createCarrots, selectCarrot, deleteCarrot };
