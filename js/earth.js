window.requestAnimFrame = (function() {
  return window.requestAnimationFrame       ||
         window.webkitRequestAnimationFrame ||
         window.mozRequestAnimationFrame    ||
         window.oRequestAnimationFrame      ||
         window.msRequestAnimationFrame     ||
         function(callback, element) {
          window.setTimeout(callback, 1000 / 60);
         };
})();

// Set scence size
var WIDTH = window.innerWidth,
    HEIGHT = window.innerHeight;

// Set camera attributes
var VIEW_ANGLE = 45,
    ASPECT = WIDTH / HEIGHT,
    NEAR = 0.01,
    FAR = 1000;

// Create WebGL renderer, camera, and scence
var renderer = new THREE.WebGLRenderer();
var camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
var scene = new THREE.Scene();

camera.position.z = 1.5;

scene.add(new THREE.AmbientLight(0x333333));

var light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5,3,5);
scene.add(light);

// Get DOM element to attach to
var container = document.createElement('div');
//document.body.appendChild(container);

// Start renderer
renderer.setSize(WIDTH, HEIGHT);
container.appendChild(renderer.domElement);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.SphereGeometry(0.5, 32, 32);
var material = new THREE.MeshPhongMaterial({
	map: THREE.ImageUtils.loadTexture("/img/3_no_ice_clouds_8k.jpg"),
  bumpMap: THREE.ImageUtils.loadTexture("/img/elev_bump_8k.jpg"),
  bumpScale: 0.005,
  specularMap: THREE.ImageUtils.loadTexture("/img/water_8k.png"),
  specular: new THREE.Color('grey')
});
var mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

var renderEarth = function(){
  mesh.rotation.y += 0.0005;
  renderer.render(scene, camera);
  requestAnimFrame(renderEarth);  
}

renderEarth();