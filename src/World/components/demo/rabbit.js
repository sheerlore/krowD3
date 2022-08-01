import { GLTFLoader } from "../../../../vendor/three/examples/jsm/loaders/GLTFLoader.js";
import { World } from "../../World.js";
import { setupModel } from "./setupModel.js";
import { getRandomInt } from "../../../utils/getRandomInt.js";

async function loadRabbit() {
  const loader = new GLTFLoader();

  const rabbitData = await loader.loadAsync(
    "../../../../assets/models/rabbit5.glb"
  );
  let rabbit = setupModel(rabbitData);
  rabbit.position.set(0, 5, 0);
  return rabbit;
}

export { loadRabbit };
