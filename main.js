import * as THREE from "./module/three.module.js";
import { resizeRendererToDisplaySize } from "./module/utils.module.js";

// canvas取得
const canvas = document.querySelector("#myCanvas");
const renderer = new THREE.WebGLRenderer({ canvas });
const scene = new THREE.Scene();

// renderer.setPixelRatio(window.devicePixelRatio);

// カメラ設定
const fov = 45;
const aspect = canvas.clientWidth / canvas.clientHeight;
const near = 1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(20, 25, 30);
camera.lookAt(scene.position);

// ライト設定
const color = 0xffffff;
const intensity = 2;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(50, 50, 50);
scene.add(light);

// 座標軸表示
const axes = new THREE.AxesHelper(50);
scene.add(axes);

// 箱を作成
const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshPhongMaterial({ color: 0xfafcfc });
const box = new THREE.Mesh(geometry, material);
box.position.y = 1;
scene.add(box);

// アニメーションループ
requestAnimationFrame(render);
function render(time) {
  time *= 0.001;
  const speed = 0.49;
  if (jumpFlag && box.position.y < 10) {
    box.position.y += 1.7 * speed;
  } else if (box.position.y > 1) {
    jumpFlag = false;
    box.position.y -= 1 * speed;
  }

  // ====================================
  // ここに物体の繰り返し処理を入れる
  // ====================================

  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }

  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

let jumpFlag = false;
// キーボード入力
document.addEventListener("keydown", (event) => {
  if (event.defaultPrevented) return;
  const key = event.key;
  switch (key) {
    case "Up":
    case "ArrowUp":
      box.position.z -= 1;
      console.log("up");
      break;
    case "Down":
    case "ArrowDown":
      box.position.z += 1;
      console.log("down");
      break;
    case "Right":
    case "ArrowRight":
      box.position.x += 1;
      console.log("right");
      break;
    case "Left":
    case "ArrowLeft":
      box.position.x -= 1;
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
