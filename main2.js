import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import GUI from 'lil-gui';

// VARIABLES
let width = window.innerWidth;
let height = window.innerHeight;

console.log(width, height);

// GUI PARAMETERS
let gui;
const parameters = {
  numberOfCubes: 10, // Set the default number of cubes
};

// CREATE SCENE AND CAMERA
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
camera.position.set(0, 0, 20);

// CREATE RENDERER
const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
const container = document.querySelector('#threejs-container');
container.append(renderer.domElement);

// CREATE MOUSE CONTROLS
const controls = new OrbitControls(camera, renderer.domElement);

// RESPONSIVE
function handleResize() {
  width = window.innerWidth;
  height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
  renderer.render(scene, camera);
}

// GUI
function setupGUI() {
  gui = new GUI();
  gui.add(parameters, 'numberOfCubes', 1, 20, 1).name('Number of Cubes'); // Updated the maximum value to 20
  gui.onChange(() => {
    updateCubes();
  });
}

// CREATE MULTIPLE CUBES
function createCubes() {
  const numberOfCubes = parameters.numberOfCubes;
  for (let i = 1; i <= numberOfCubes; i++) {
    const geometry = new THREE.BoxGeometry(i, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0xff1493 });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(i, i * 2, 0);
    scene.add(cube);
  }
}

// UPDATE CUBES
function updateCubes() {
  clearCubes();
  createCubes();
}

// CLEAR CUBES
function clearCubes() {
  scene.children.forEach((object) => {
    if (object instanceof THREE.Mesh) {
      scene.remove(object);
    }
  });
}

// EVENT LISTENERS
window.addEventListener('resize', handleResize);

// ANIMATE AND RENDER
function animate() {
  requestAnimationFrame(animate);

  controls.update();

  // Rotate all cubes in the scene
  scene.children.forEach((object) => {
    if (object instanceof THREE.Mesh) {
      object.rotation.x += 0.00;
      object.rotation.y += 0.02;
    }
  });

  renderer.render(scene, camera);
}

// INITIALIZATION
setupGUI();
createCubes();
animate();