import {
  AxesHelper,
  MathUtils,
} from "../../vendor/three/build/three.module.js";

import { createCamera } from "./components/camera.js";
import { createCarrots, selectCarrot } from "./components/carrot.js";
import { loadAmong } from "./components/demo/among.js";
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
  constructor(container) {
    camera = createCamera();
    scene = createScene();
    renderer = createRenderer();
    loop = new Loop(camera, scene, renderer);
    container.appendChild(renderer.domElement);

    // const axes = new AxesHelper(100);

    const controls = createControls(camera, renderer.domElement);
    const { hemisphereLight } = createLights();
    const floor = createFloor();
    const carrots = createCarrots(200, camera);

    for (let c of carrots) {
      loop.updatables.push(c);
      scene.add(c);
    }
    loop.updatables.push(controls);
    scene.add(hemisphereLight, floor);

    // 画面のリサイズ処理
    const resizer = new Resizer(container, camera, renderer);
  }

  render() {
    renderer.render(scene, camera);
  }

  async init() {
    const { among } = await loadAmong();

    scene.add(among);
  }

  start() {
    loop.start();
  }

  end() {
    loop.stop();
  }
}

export { World };
