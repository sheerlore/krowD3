import { GLTFLoader } from "../../../../vendor/three/examples/jsm/loaders/GLTFLoader.js";
import { setupModel } from "./setupModel.js";

async function loadAmong() {
  const loader = new GLTFLoader();

  const amongData = await loader.loadAsync(
    "../../../../assets/models/demo.glb"
  );

  console.log("Squaawk!", amongData);

  const among = setupModel(amongData);

  return { among };
}

export { loadAmong };
