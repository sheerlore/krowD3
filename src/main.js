import { World } from "./World/World.js";

async function main() {
  const container = document.querySelector("#scene-container");
  const world = new World(container);
  await world.init();
  // シーンの描画
  // world.render();
  return world;
}

main()
  .then((world) => {
    world.start();
  })
  .catch((err) => {
    console.log(err);
  });
