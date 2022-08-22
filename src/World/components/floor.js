import {
  ClampToEdgeWrapping,
  Color,
  DynamicDrawUsage,
  Float32BufferAttribute,
  LinearFilter,
  LinearMipMapLinearFilter,
  Mesh,
  MeshBasicMaterial,
  NearestFilter,
  PlaneBufferGeometry,
  PlaneGeometry,
  TextureLoader,
  Vector3,
} from "../../../vendor/three/build/three.module.js";

const vertex = new Vector3();

function createFloor() {
  let geometry = new PlaneGeometry(2000, 2000, 100, 100);
  geometry.rotateX(-Math.PI / 2);

  let position = geometry.attributes.position;
  for (let i = 0, l = position.count; i < l; i++) {
    vertex.fromBufferAttribute(position, i);
    vertex.x += Math.random() * 20 - 10;
    vertex.y += Math.random() * 2;
    vertex.z += Math.random() * 20 - 10;
    position.setXYZ(i, vertex.x, vertex.y, vertex.z);
  }
  geometry.computeVertexNormals();

  const textureLoader = new TextureLoader();
  const texture = textureLoader.load("../../../assets/jimen.jpg");
  texture.magFilter = NearestFilter;
  const material = new MeshBasicMaterial({
    map: texture,
  });
  const floor = new Mesh(geometry, material);

  return floor;
}

export { createFloor };
