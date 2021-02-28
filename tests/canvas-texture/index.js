import * as THREE from '../../build/three.module';
import { BrowserPlatform } from '../../src/BrowserPlatform/index';

THREE.PLATFORM.set(new BrowserPlatform());

const renderer = new THREE.WebGL1Renderer({ alpha: true });
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
const scene = new THREE.Scene();
// const canvas = document.createElement('canvas');
// const ctx = canvas.getContext('2d');
// const canvasTexture = new THREE.CanvasTexture(canvas);

// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ map: canvasTexture });
// const box = new THREE.Mesh(geometry, material);

for (let i = 0; i < 100; i++) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const canvasTexture = new THREE.CanvasTexture(canvas);

  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({ map: canvasTexture });
  const box = new THREE.Mesh(geometry, material);

  canvas.width = 2 ** 10;
  canvas.height = 2 ** 10;
  ctx.fillStyle = `rgb(${~~(Math.random() * 255)},${~~(Math.random() * 255)},${~~(Math.random() * 255)})`;
  ctx.fillRect(0, 0, 2 ** 9, 2 ** 9);

  box.position.set(Math.random(), Math.random(), -Math.random());

  scene.add(box);
}

const render = () => {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
};

document.body.appendChild(renderer.domElement);

renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(devicePixelRatio);

camera.position.z = 1;

render();
