import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

var scene = new THREE.Scene();

window.addEventListener("resize", onWindowResize, false);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

//Camera
var height = window.innerHeight;
var width = window.innerWidth;
var distance = 1000;
var diag = Math.sqrt(height * height + width * width);
var fov = 2 * Math.atan(diag / (2 * distance)) * (180 / Math.PI);

var camera = new THREE.PerspectiveCamera(
  fov,
  window.innerWidth / window.innerHeight,
  0.1,
  distance
);
camera.position.set(0, 25, -50);

var myCanvas = document.getElementById("myCanvas");

var renderer = new THREE.WebGLRenderer({
  antialias: true,
  canvas: myCanvas,
  alpha: true,
});

// renderer.setClearColor(0x000000);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.shadowMap.enabled = true;
// renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.gammaInput = true;
renderer.gammaOutput = true;
renderer.antialias = true;
document.body.appendChild(renderer.domElement);

//LIGHTS
var light = new THREE.AmbientLight(0xffffff, 3);
light.power = 6640; // GE Lumens @ 60W incade.
light.decay = 2;
light.distance = Infinity;
light.position.set(0, 2, 0);
light.castShadow = true;
light.shadowCameraVisible = true;
scene.add(light);

//OrbitControls
const orbit = new OrbitControls(camera, renderer.domElement);
orbit.maxPolarAngle = Math.PI / 2;
orbit.update();

// Instantiate a loader
var loader = new GLTFLoader();
loader.load("cube.glb", handle_load);

var mesh;

function handle_load(gltf) {
  mesh = gltf.scene;
  scene.add(mesh);
}

//Render loop
render();

var delta = 0;
var prevTime = Date.now();

function render() {
  //exposure
  renderer.toneMappingExposure = Math.pow(0.7, 5.0); // -> exposure: 0.168
  renderer.render(scene, camera);

  requestAnimationFrame(render);
}
