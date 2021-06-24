import './style.css';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer(
  {
    canvas: document.querySelector('#bg'),
  }
);

renderer.setPixelRatio( window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const anomalyTexture = new THREE.TextureLoader().load('anomaly.jpg'); 

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xFF6347, map: anomalyTexture});
const torus = new THREE.Mesh( geometry, material);

const pointLight = new THREE.PointLight(0xffffff);
const ambientLight = new THREE.AmbientLight(0xffffff);
const lightHelpper = new THREE.PointLightHelper(pointLight);
const gridHelpper = new THREE.GridHelper(200, 50);

const controls = new OrbitControls(camera, renderer.domElement)



const spaceTexture = new THREE.TextureLoader().load('space4.jpg'); 
const moonTexture = new THREE.TextureLoader().load('moon.jpg'); 

scene.background = spaceTexture;

pointLight.position.set(5,5,5);

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial(
    {
      map: moonTexture,
    }
  )
)

scene.add(moon);

scene.add(torus, pointLight, ambientLight, lightHelpper, gridHelpper);

function addStars(){

  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff});
  const star = new THREE.Mesh( geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ));

  star.position.set(x, y, z)
  scene.add(star);
}

Array(200).fill().forEach(addStars);

function animate() {
  requestAnimationFrame( animate );

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  controls.update();

  renderer.render( scene, camera);
}

animate();

