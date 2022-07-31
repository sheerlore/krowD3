import {
  DynamicDrawUsage,
  Mesh,
  MeshBasicMaterial,
  PlaneBufferGeometry,
  PlaneGeometry,
  TextureLoader,
} from "../../../vendor/three/build/three.module.js";

function createFloor() {
  const geometry = new PlaneGeometry(150, 150, 64, 64);
  geometry.rotateX(-Math.PI / 2);
  const vertices = geometry.attributes.position.array;
  for (let i = 0, j = 0, l = vertices.length; i < l; i++, j += 3) {
    vertices[j + 1] = perlin.get(vertices[i] / 20, vertices[i + 1] / 20);
  }

  const textureLoader = new TextureLoader();
  const texture = textureLoader.load("/assets/jimen.jpg");
  const material = new MeshBasicMaterial({
    map: texture,
  });

  const floor = new Mesh(geometry, material);
  floor.receiveShadow = true;

  return floor;
}

export { createFloor };
