// import { OrbitControls } from "../../../vendor/three/examples/jsm/controls/OrbitControls.js";
// import { OrbitControls } from "https://cdn.skypack.dev/three@0.136.2/examples/jsm/controls/OrbitControls.js";
import {
  Raycaster,
  Vector3,
} from "../../../vendor/three/build/three.module.js";
import { PointerLockControls } from "../../../vendor/three/examples/jsm/controls/PointerLockControls.js";

const menu = document.querySelector("#menu");
const instructions = document.querySelector("#instructions");
const objects = [];
const velocity = new Vector3();
const direction = new Vector3();

let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let canGet = false;

function createControls(camera, canvas) {
  const controls = new PointerLockControls(camera, canvas);

  instructions.addEventListener("click", () => {
    controls.lock();
  });

  controls.addEventListener("lock", () => {
    instructions.style.display = "none";
    menu.style.display = "none";
  });

  controls.addEventListener("unlock", () => {
    menu.style.display = "block";
    instructions.style.display = "";
  });

  document.addEventListener("keydown", (e) => {
    switch (e.code) {
      case "ArrowUp":
      case "KeyW":
        moveForward = true;
        break;

      case "ArrowDown":
      case "KeyS":
        moveBackward = true;
        break;

      case "ArrowLeft":
      case "KeyA":
        moveLeft = true;
        break;

      case "ArrowRight":
      case "KeyD":
        moveRight = true;
        break;

      case "Space":
        if (canGet === true) velocity.y += 350;
        canGet = false;
        break;
    }
  });

  document.addEventListener("keyup", (e) => {
    switch (e.code) {
      case "ArrowUp":
      case "KeyW":
        moveForward = false;
        break;

      case "ArrowDown":
      case "KeyS":
        moveBackward = false;
        break;

      case "ArrowLeft":
      case "KeyA":
        moveLeft = false;
        break;

      case "ArrowRight":
      case "KeyD":
        moveRight = false;
        break;
    }
  });

  controls.tick = (delta) => {
    if (controls.isLocked === true) {
      velocity.x -= velocity.x * 10.0 * delta;
      velocity.z -= velocity.z * 10.0 * delta;
      velocity.y -= 9.8 * 100.0 * delta;

      direction.z = Number(moveForward) - Number(moveBackward);
      direction.x = Number(moveRight) - Number(moveLeft);
      direction.normalize();

      if (moveForward || moveBackward)
        velocity.z -= direction.z * 400.0 * delta;
      if (moveLeft || moveRight) velocity.x -= direction.x * 400.0 * delta;
      controls.moveRight(-velocity.x * delta);
      controls.moveForward(-velocity.z * delta);

      controls.getObject().position.y += velocity.y * delta;

      if (controls.getObject().position.y < 10) {
        velocity.y = 0;
        controls.getObject().position.y = 10;
        canGet = true;
      }
    }
  };

  return controls;
}

export { createControls };
