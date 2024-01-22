import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

const earthGroup = new THREE.Group();
earthGroup.rotation.z = -23.4 * Math.PI / 180;
scene.add(earthGroup);
new OrbitControls(camera, renderer.domElement);
const detail = 12;
const loader = new THREE.TextureLoader();
const geometry = new THREE.IcosahedronGeometry(1, detail);

const material = new THREE.MeshPhongMaterial({
  map: loader.load("./public/img/earth_1.jpg"),
});

const earthMesh = new THREE.Mesh(geometry, material);
earthGroup.add(earthMesh);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Create a group for the markers
const markersGroup = new THREE.Group();
earthGroup.add(markersGroup);

// Function to add a marker at a specific latitude and longitude
function addMarker(latitude, longitude) {
  // Convert latitude and longitude to spherical coordinates
  const phi = (90 - latitude) * Math.PI / 180;
  const theta = (180 - longitude) * Math.PI / 180;

  // Calculate the position in 3D space
  const x = Math.sin(phi) * Math.cos(theta);
  const y = Math.cos(phi);
  const z = Math.sin(phi) * Math.sin(theta);

  // Create a marker geometry and material
  const markerGeometry = new THREE.SphereGeometry(0.01, 10, 10);
  const markerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });

  // Create the marker mesh
  const markerMesh = new THREE.Mesh(markerGeometry, markerMaterial);

  // Position the marker
  markerMesh.position.set(x, y, z).normalize().multiplyScalar(1);

  // Add the marker to the markers group
  markersGroup.add(markerMesh);
}

// === countries ===
// netherlands
addMarker(52.1326, 5.2913);

// belgium
addMarker(50.5039, 4.4699);

// germany
addMarker(51.1657, 10.4515);

// austria
addMarker(47.5162, 14.5501);

// sweden
addMarker(60.1282, 18.6435);

// finland
addMarker(61.9241, 25.7482);

// norway
addMarker(60.4720, 8.4689);

// denmark
addMarker(56.2639, 9.5018);

// uk
addMarker(55.3781, 3.4360);

function animate() {
  requestAnimationFrame(animate);

  earthMesh.rotation.y += 0.002;
  markersGroup.rotation.y += 0.002;
  renderer.render(scene, camera);
}

animate();

function handleWindowResize () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', handleWindowResize, false);
