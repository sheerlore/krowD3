import { GLTFLoader } from "../../../../vendor/three/examples/jsm/loaders/GLTFLoader.js";
import { World } from "../../World.js";
import { setupModel } from "./setupModel.js";
import { getRandomInt } from "../../../utils/getRandomInt.js";

async function loadRabbit() {
  let loader = new GLTFLoader();
  let rabbitData = await loader.loadAsync(
    location.href + location.pathname + "/assets/models/rmodel.glb"
  );
  let rabbit = setupModel(rabbitData);
  rabbit.position.set(getRandomInt(-500, 500), 5, getRandomInt(-500, 500));
  return rabbit;
}

export { loadRabbit };
