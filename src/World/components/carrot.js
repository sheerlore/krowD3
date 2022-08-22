import {
  ConeBufferGeometry,
  CylinderGeometry,
  Mesh,
  MeshBasicMaterial,
} from "../../../vendor/three/build/three.module.js";

import { getRandomInt } from "../../utils/getRandomInt.js";
import { World } from "../World.js";

// function getRandomInt(min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min) + min);
// }

let selectedCarrot = null;

function deleteCarrot(carrot, who) {
  if (carrot && who === "rabbit") {
    carrot.removeFromParent();
    World.staticCarrots = World.staticCarrots.filter(
      (v) => v.uuid !== carrot.uuid
    );
    return true;
  }

  if (!selectedCarrot) return false;
  selectedCarrot.removeFromParent();
  World.staticCarrots = World.staticCarrots.filter(
    (v) => v.uuid !== selectedCarrot.uuid
  );
  selectedCarrot = null;
  return true;
}

function createCarrots(num, camera) {
  if (num === undefined) num = 100;
  const geometry = new ConeBufferGeometry(3, 12, 12, 8).toNonIndexed();
  geometry.rotateX(-Math.PI);
  const crHeadGeometry = new CylinderGeometry(
    3,
    0.5,
    8,
    17,
    1,
    true
  ).toNonIndexed();
  const material = new MeshBasicMaterial({ color: 0xf47a44 });
  const crHeadMaterial = new MeshBasicMaterial({ color: 0x10af10 });

  for (let i = 0; i < num; i++) {
    const carrot = new Mesh(geometry, material);
    const crHead = new Mesh(crHeadGeometry, crHeadMaterial);
    carrot.position.x = getRandomInt(-800, 800);
    carrot.position.z = getRandomInt(-800, 800);
    crHead.position.y = carrot.position.y + 8;
    carrot.add(crHead);
    let verticalAngle = 0;

    carrot.tick = (delta) => {
      if (
        Math.abs(carrot.position.x - camera.position.x) <= 8 &&
        Math.abs(carrot.position.z - camera.position.z) <= 8
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
      // selectedCarrot = null;
    };

    World.staticCarrots.push(carrot);
  }

  return;
}

export { createCarrots, deleteCarrot };
