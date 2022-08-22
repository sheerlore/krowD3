import { GLTFLoader } from "../../../../vendor/three/examples/jsm/loaders/GLTFLoader.js";
import { World } from "../../World.js";
import { setupModel } from "./setupModel.js";
import { getRandomInt } from "../../../utils/getRandomInt.js";

async function loadRabbit() {
  let loader = new GLTFLoader();
  let rabbitData = await loader.loadAsync(
    "../../../../assets/models/rabbit5.glb"
  );
  let rabbit = setupModel(rabbitData);
  rabbit.position.set(getRandomInt(-500, 500), 5, getRandomInt(-500, 500));
  return rabbit;
}

export { loadRabbit };