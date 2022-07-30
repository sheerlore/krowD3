import { AxesHelper } from "../../vendor/three/build/three.module.js";

import { createCamera } from "./components/camera.js";
import { createCube } from "./components/cube.js";
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

    const controls = createControls(camera, renderer.domElement);
    const axes = new AxesHelper(25);

    const cube = createCube();
    const { ambientLight, mainLight } = createLights();

    loop.updatables.push(cube, controls);

    scene.add(cube, ambientLight, mainLight, axes);

    // 画面のリサイズ処理
    const resizer = new Resizer(container, camera, renderer);
  }

  render() {
    renderer.render(scene, camera);
  }

  start() {
    loop.start();
  }

  end() {
    loop.stop();
  }
}

export { World };
