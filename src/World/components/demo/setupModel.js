import {
  AnimationMixer,
  Vector3,
} from "../../../../vendor/three/build/three.module.js";
import { World } from "../../World.js";

let mixer;
let distMin = 10000000;
let nearX = 0;
let nearZ = 0;

function setupModel(data) {
  const model = data.scene;
  model.setRotationFromAxisAngle(new Vector3(0, 0, 0), Math.PI / 2);
  const clip = data.animations;
  if (clip && clip.length) {
    mixer = new AnimationMixer(model);
    const action = mixer.clipAction(clip[0]);
    action.play();
  }

  model.tick = (delta) => {
    mixer.update(delta);
    // 最も近いにんじんの座標を調べる
    for (let c of World.staticCarrots) {
      let dx = c.position.x - model.position.x;
      let dy = c.position.z - model.position.z;
      let dist2 = dx * dx + dy * dy;
      if (dist2 < distMin) {
        distMin = dist2;
        nearX = c.position.x;
        nearZ = c.position.z;
      }
    }
    distMin = 1000000;

    if (
      Math.abs(model.position.x - nearX) > 2 &&
      Math.abs(model.position.z - nearZ) > 2
    ) {
      model.lookAt(nearX, 5, -nearZ);
      model.position.x += delta * (nearX - model.position.x);
      model.position.z += delta * (nearZ - model.position.z);
    }
  };
  return model;
}

export { setupModel };
