let scene, camera, rendered;
let ADD = 0.001;
let theta = 0;
const planets = [];
const LEFT = 37,
  RIGHT = 39;

const createSpace = () => {
  texture = new THREE.TextureLoader().load("./img/space.png");
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(10, 10);
  let material = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.DoubleSide
  });
  let geometry = new THREE.SphereGeometry(100, 100, 100);
  sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);
};

class Planet {
  constructor(textureimg, size, position, rotationSpeed) {
    //console.log(size, textureimg, position, rotationSpeed);
    let geometry = new THREE.SphereGeometry(size, 100, 100);
    let texture = new THREE.TextureLoader().load(textureimg);
    let material = new THREE.MeshStandardMaterial({
      map: texture,
      side: THREE.DoubleSide
    });
    let planet = new THREE.Mesh(geometry, material);
    planet.position.set(position[0], position[1], position[2]);
    this.object = planet;
    this.rotationSpeed = rotationSpeed;
  }
  rotate() {
    this.object.rotation.y += this.rotationSpeed;
  }
}

const onKeyDown = function(e) {
  if (e.keyCode == LEFT || e.keyCode == RIGHT) ADD *= -1;
  else return;
};

const init = () => {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );

  camera.position.set(0, 0, 40);

  target = new THREE.Object3D();
  camera.lookAt(target.position);

  light = new THREE.DirectionalLight(0xffffff, 0.6);
  light.position.set(-20, -20, 40);
  scene.add(light);

  createSpace();

  planets.push(new Planet("./img/texture_1.jpg", 5, [-5, -5, -10], 0.002));
  planets.push(new Planet("./img/texture_2.png", 10, [-30, 10, 0], 0.005));
  planets.push(new Planet("./img/texture_3.jpg", 3, [10, 10, 0], 0.005));
  planets.push(new Planet("./img/texture_4.png", 15, [50, 0, 10], 0.003));
  planets.push(new Planet("./img/texture_5.jpg", 10, [50, 0, 60], 0.005));

  planets.forEach(item => scene.add(item.object));

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);
  document.addEventListener("keydown", onKeyDown, false);
};

const mainLoop = () => {
  target.position.x = 80 * Math.sin(theta);
  target.position.z = 80 * Math.cos(theta);
  camera.lookAt(target.position);
  renderer.render(scene, camera);
  planets.forEach(item => item.rotate());
  theta += ADD;
  requestAnimationFrame(mainLoop);
};

init();
mainLoop();
