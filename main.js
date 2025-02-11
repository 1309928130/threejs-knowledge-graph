// Import Three.js
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 10);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Light
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(10, 10, 10);
scene.add(light);

// Data Structure (Nodes & Categories)
const categories = {
    'Research': 0xff5733,
    'Technical': 0x33ff57,
    'Conferences': 0x3357ff,
    'Insights': 0xff33a8
};

const nodes = [
    { id: 1, category: 'Research', position: [0, 0, 0] },
    { id: 2, category: 'Technical', position: [2, 2, 0] },
    { id: 3, category: 'Conferences', position: [-2, 2, 0] },
    { id: 4, category: 'Insights', position: [0, -2, 0] }
];

// Create Spheres for Nodes
nodes.forEach(node => {
    const geometry = new THREE.SphereGeometry(0.3, 32, 32);
    const material = new THREE.MeshStandardMaterial({ color: categories[node.category] });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(...node.position);
    sphere.userData = node;
    scene.add(sphere);
});

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();

// Resize Handling
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
