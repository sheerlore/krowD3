import { World } from "./World/World.js";

function main() {
  const container = document.querySelector("#scene-container");
  const world = new World(container);

  // シーンの描画
  // world.start();
  world.render();
}

main();
