import {
  AxesHelper,
  MathUtils,
} from "../../vendor/three/build/three.module.js";

import { createCamera } from "./components/camera.js";
import { createCarrots } from "./components/carrot.js";
import { loadRabbit } from "./components/demo/rabbit.js";
import { createFloor } from "./components/floor.js";
import { createLights } from "./components/light.js";
import { createScene } from "./components/scene.js";

import { createControls } from "./systems/controls.js";
import { Loop } from "./systems/Loop.js";
import { createRenderer } from "./systems/renderer.js";
import { Resizer } from "./systems/Resizer.js";

let camera;
let renderer;
let scene;
let loop;
class World {
  static staticCarrotNum = 200;
  static staticRabbitNum = 1;
  static staticCarrots = [];

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
  }

  render() {
    renderer.render(scene, camera);
  }

  async init() {
    const rabbit = await loadRabbit();
    loop.updatables.push(rabbit);
    scene.add(rabbit);
  }

  start() {
    loop.start();
  }

  end() {
    loop.stop();
  }
}

export { World };
