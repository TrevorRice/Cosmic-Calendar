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
var VIEW_ANGLE = 75,
    ASPECT = WIDTH / HEIGHT,
    NEAR = 1,
    FAR = 10000;

// Create WebGL renderer, camera, and scence
var renderer = new THREE.WebGLRenderer( { alpha: true } );
var camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
var scene = new THREE.Scene();

camera.position.z = 2;

// Get DOM element to attach to
//ar container = document.createElement('div');
//document.body.appendChild(container);

// Start renderer
renderer.setSize(WIDTH, HEIGHT);
//container.appendChild(renderer.domElement);
document.body.appendChild(renderer.domElement);

/*function createEarth() {
	var geometry = new THREE.SphereGeometry(0.5, 32, 32);
	var material = new THREE.MeshPhongMaterial();
	var mesh = new THREE.Mesh(geometry, material);
}*/
var texture = THREE.ImageUtils.loadTexture("img/earthmap1k.jpg");
var geometry = new THREE.SphereGeometry(0.5, 32, 32);
var material = new THREE.MeshBasicMaterial({
	map: THREE.ImageUtils.loadTexture("/img/particle.png")
  //color: 0xffff00
});
var mesh = new THREE.Mesh(geometry, material);

//function render() {         
  //var pCount = parts.length;
  //while(pCount--) {
  //  parts[pCount].update();
  //}
  //renderer.render( scene, camera );
  //requestAnimFrame(render);
//}

//var mesh = createEarth();
scene.add(mesh);
renderer.render(scene, camera);
//render();