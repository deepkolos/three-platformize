import * as THREE from '../../build/three.module.js';
import { BrowserPlatform } from '../../src/BrowserPlatform/index.js';
import { GLTFLoader } from '../../examples/jsm/loaders/GLTFLoader.js';
import { MeshoptDecoder } from '../../examples/jsm/libs/meshopt_decoder.module.js';
import { disposeHierarchy, disposeNode } from '../../tools/dispose-three.js';

async function main() {
  THREE.PLATFORM.set(new BrowserPlatform());

  let frame;
  const renderer = new THREE.WebGL1Renderer({ alpha: true });
  const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
  const loader = new GLTFLoader();
  const scene = new THREE.Scene();

  renderer.setSize(innerWidth, innerHeight);
  renderer.setPixelRatio(devicePixelRatio);
  loader.setMeshoptDecoder(MeshoptDecoder);

  const gltf = await loader.loadAsync('../WaterBottle-EXT_meshopt_compression.glb');
  scene.add(gltf.scene);
  scene.add(new THREE.AmbientLight(0xffffff, 1.0));
  scene.add(new THREE.DirectionalLight(0xffffff, 1.0));

  camera.position.set(0, 0.1, 0.2);
  camera.lookAt(0, 0, 0);

  const render = () => {
    frame = requestAnimationFrame(render);
    renderer.render(scene, camera);
  };

  render();
  document.body.appendChild(renderer.domElement);

  setTimeout(() => {
    // dispose
    // renderer.forceContextLoss();
    disposeHierarchy(scene, disposeNode);
    cancelAnimationFrame(frame);
    document.body.removeChild(renderer.domElement);
    THREE.PLATFORM.dispose();
    renderer?.dispose();
    // renderer.domElement = null;
    // camera?.dispose();
    // loader?.dispose();
    // scene?.dispose();
    // gltf?.dispose();
    main();
  }, 500);
}

main();
