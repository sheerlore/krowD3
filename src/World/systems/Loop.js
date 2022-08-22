import { Clock } from "../../../vendor/three/build/three.module.js";
import { World } from "../World.js";

const clock = new Clock();
const container = document.querySelector("#scene-container");
const clearEvent = new CustomEvent("clear");
let s_time = 0;
let e_time = 0;

class Loop {
  constructor(camera, scene, renderer) {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.updatables = [];
  }

  start() {
    s_time = new Date().getTime();
    this.renderer.setAnimationLoop(() => {
      if (World.staticCarrots.length === 0) {
        container.dispatchEvent(clearEvent);
      }
      this.tick();
      this.renderer.render(this.scene, this.camera);
    });
  }

  stop() {
    e_time = new Date().getTime();
    let time = e_time - s_time;
    World.staticGameTime = time;
    this.renderer.setAnimationLoop(null);
  }

  tick() {
    const delta = clock.getDelta();
    // console.log(`The last frame rendered in ${delta * 1000} milliseconds`);

    for (const object of this.updatables) {
      object.tick(delta);
    }
  }
}

export { Loop };
