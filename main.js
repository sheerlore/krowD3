import * as THREE from "./module/three.module.js";
import { resizeRendererToDisplaySize } from "./module/utils.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.139.2/examples/jsm/controls/OrbitControls.js";

// canvas取得
const canvas = document.querySelector("#myCanvas");
const renderer = new THREE.WebGLRenderer({ canvas });
const scene = new THREE.Scene();

renderer.shadowMap.enabled = true;
renderer.setPixelRatio(window.devicePixelRatio);

// ========================================
// カメラ設定
// ========================================
const fov = 45;
const aspect = canvas.clientWidth / canvas.clientHeight;
const near = 1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(50, 50, 50);
camera.lookAt(scene.position);

const controls = new OrbitControls(camera, renderer.domElement);

// ========================================
// ライト設定
// ========================================
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

const light = new THREE.SpotLight(0xffffff, 1.5, 30, Math.PI / 4, 0.4, 0.5);
light.position.set(0, 20, 0);
light.castShadow = true;
scene.add(light);

// ========================================
// 座標軸表示
// ========================================
const axes = new THREE.AxesHelper(50);
scene.add(axes);

// ========================================
// 床を作成
// ========================================
const geometry = new THREE.BoxGeometry(120, 1, 120);
const material = new THREE.MeshStandardMaterial({
  color: 0xffffff,
});
const plane = new THREE.Mesh(geometry, material);
plane.position.y = -0.5;
plane.receiveShadow = true;
scene.add(plane);

// ========================================
// 箱を作成
// ========================================
const box = new THREE.Mesh(
  new THREE.BoxGeometry(2, 2, 2),
  new THREE.MeshStandardMaterial({
    color: 0x3f7b9d,
  })
);
box.position.y = 1;
box.castShadow = true;
scene.add(box);

// ========================================
// アニメーションループ
// ========================================
requestAnimationFrame(render);
function render(time) {
  time *= 0.001;
  const speed = 0.49;
  if (jumpFlag && box.position.y < 10) {
    box.position.y += 3 * speed;
  } else if (box.position.y > 1) {
    jumpFlag = false;
    box.position.y -= 1.6 * speed;
  } else {
    box.position.y = 1;
  }

  // ====================================
  // ここに物体の繰り返し処理を入れる
  // ====================================

  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }

  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

let jumpFlag = false;
// ========================================
// キーボード入力
// ========================================
document.addEventListener("keydown", (event) => {
  if (event.defaultPrevented) return;
  const key = event.key;
  switch (key) {
    case "Up":
    case "ArrowUp":
      box.position.z -= 1;
      // light.position.z -= 1;
      console.log("up");
      break;
    case "Down":
    case "ArrowDown":
      box.position.z += 1;
      // light.position.z += 1;
      console.log("down");
      break;
    case "Right":
    case "ArrowRight":
      box.position.x += 1;
      // light.position.x += 1;
      console.log("right");
      break;
    case "Left":
    case "ArrowLeft":
      box.position.x -= 1;
      // light.position.x -= 1;
      console.log("left");
      break;

    default:
      break;
  }

  if (event.code === "Space") {
    jumpFlag = true;
  }
  event.preventDefault();
});
