import * as THREE from "three";
import { MTLLoader } from "three/addons/loaders/MTLLoader.js";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"; // Correct import

function modifyTexture(texture) {
  // Set anisotropy to the maximum supported by the device
  texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

  // Enable mipmaps generation for better scaling
  texture.generateMipmaps = true;

  // Set texture filtering for sharpness
  texture.minFilter = THREE.LinearMipMapLinearFilter;
  texture.magFilter = THREE.LinearFilter;

  // Optional: Update the texture if needed
  texture.needsUpdate = true;
}

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  25, // Field of view
  window.innerWidth / window.innerHeight, // Aspect ratio
  0.1, // Near clipping plane
  1000 // Far clipping plane
);
// camera.position.set(0.6, 0.6, 0.6);
camera.position.set(5, 10, 80); // Zoom the camera out by adjusting the z position

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement); // Add this line

// Add controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

// Add lights
const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(-0.3, 1, 1);
scene.add(directionalLight);

const blueLight = new THREE.DirectionalLight(0x7cdafb, 1);
blueLight.position.set(0, -2, 1);
scene.add(blueLight);

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.generateMipmaps = true;
// texture.minFilter = THREE.LinearFilter;
// texture.magFilter = THREE.LinearFilter;

scene.background = null; // Remove the background

// scene.background = new THREE.Color(0x7cdafb);

// Loaders
const mtlLoader = new MTLLoader();
mtlLoader.load("modelInfo/Puzzle_Box.mtl", (materials) => {
  materials.preload();

  // Loop through each material
  for (const materialName in materials.materials) {
    const material = materials.materials[materialName];

    // Access and modify the diffuse map (color texture)
    if (material.map) {
      modifyTexture(material.map);
    }

    // Access and modify the bump map
    if (material.bumpMap) {
      modifyTexture(material.bumpMap);
    }

    // Access and modify other maps as needed (e.g., specularMap, normalMap)
    if (material.specularMap) {
      modifyTexture(material.specularMap);
    }
  }

  const objLoader = new OBJLoader();
  objLoader.setMaterials(materials);
  objLoader.load(
    "modelInfo/Puzzle Box.obj",
    (object) => {
      scene.add(object);
    },
    (xhr) => {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    (error) => {
      console.log("An error happened");
    }
  );
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
