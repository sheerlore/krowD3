import {
  AxesHelper,
  MathUtils,
} from "../../vendor/three/build/three.module.js";

import { createCamera } from "./components/camera.js";
import { createCarrots } from "./components/carrot.js";
import { loadRabbit } from "./components/rabbit/rabbit.js";
import { createFloor } from "./components/floor.js";
import { createLights } from "./components/light.js";
import { createScene } from "./components/scene.js";

import { createControls, setControlStart } from "./systems/controls.js";
import { Loop } from "./systems/Loop.js";
import { createRenderer } from "./systems/renderer.js";
import { Resizer } from "./systems/Resizer.js";

const clearMenu = document.querySelector("#clear-menu");
const clearTime = document.querySelector("#clear-time");
const instructions = document.querySelector("#instructions");

let camera;
let renderer;
let scene;
let loop;
class World {
  static staticCarrotNum = 1000;
  static staticRabbitNum = 30;
  static staticCarrots = [];
  static staticGameTime = 0;

  constructor(container) {
    camera = createCamera();
    scene = createScene();
    renderer = createRenderer();
    loop = new Loop(camera, scene, renderer);
    container.appendChild(renderer.domElement);

    const controls = createControls(scene, camera, renderer.domElement);
    const { hemisphereLight, mainLight } = createLights();
    const floor = createFloor();
    createCarrots(World.staticCarrotNum, camera);
    for (let c of World.staticCarrots) {
      loop.updatables.push(c);
      scene.add(c);
    }
    loop.updatables.push(controls);
    scene.add(hemisphereLight, mainLight, floor);
    // 画面のリサイズ処理
    const resizer = new Resizer(container, camera, renderer);

    container.addEventListener("clear", () => {
      console.log("Clear");
      this.end();
      clearMenu.style.display = "block";
      let m = Math.floor(World.staticGameTime / 1000 / 60) % 60;
      let s = Math.floor(World.staticGameTime / 1000) % 60;
      clearTime.textContent = m + "分" + s + "秒の人生の時間を無駄にしました";
    });
  }

  render() {
    renderer.render(scene, camera);
  }

  async init() {
    for (let i = 0; i < World.staticRabbitNum; i++) {
      let rabbit = await loadRabbit();
      loop.updatables.push(rabbit);
      scene.add(rabbit);
    }
  }

  start() {
    setControlStart(loop);
    // loop.start();
  }

  end() {
    loop.stop();
  }
}

export { World };
