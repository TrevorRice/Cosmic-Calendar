/* See http://paulirish.com/2011/requestanimationframe-for-smart-animating/ */
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
var renderer = new THREE.WebGLRenderer();
var camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
var scene = new THREE.Scene();

camera.position.z = 1000;

// Get DOM element to attach to
var container = document.createElement('div');
document.body.appendChild(container);

// Start renderer
renderer.setSize(WIDTH, HEIGHT);
container.appendChild(renderer.domElement);

// Create particle variables
var numParticles = 3000;
var particleSize = 50;
var movementSpeed = 80;
var sizeRandomness = 4000;

var directions = [];
var parts = [];

/**
* Create particle explosion
* @param {x,y} coords to start animation
*/
function ExplodeAnimation (x,y) {
  var geometry = new THREE.Geometry();
  
  for (i = 0; i < numParticles; i ++) { 
    var vertex = new THREE.Vector3();
    vertex.x = x;
    vertex.y = y;
    vertex.z = 0;
  
    geometry.vertices.push( vertex );
    directions.push({x:(Math.random() * movementSpeed)-(movementSpeed/2),y:(Math.random() * movementSpeed)-(movementSpeed/2),z:(Math.random() * movementSpeed)-(movementSpeed/2)});
  }

  var material = new THREE.PointCloudMaterial({
    size: particleSize,
    color: 0xFFFFFF,
    map: THREE.ImageUtils.loadTexture("/img/particle.png"),
    blending: THREE.AdditiveBlending,
    transparent: true
  });
  var particles = new THREE.PointCloud( geometry, material );
  particles.sortParticles = true;
  
  this.object = particles;
  this.status = true;
  
  this.xDir = (Math.random() * movementSpeed)-(movementSpeed/2);
  this.yDir = (Math.random() * movementSpeed)-(movementSpeed/2);
  this.zDir = (Math.random() * movementSpeed)-(movementSpeed/2);
  
  scene.add( this.object ); 
  
  this.update = function(){
    if (this.status == true){
      var pCount = numParticles;
      while(pCount--) {
        var particle =  this.object.geometry.vertices[pCount]
        particle.y += directions[pCount].y;
        particle.x += directions[pCount].x;
        particle.z += directions[pCount].z;
      }
      this.object.geometry.verticesNeedUpdate = true;
    }
  }
  
}

parts.push(new ExplodeAnimation(0, 0));

function render() {         
  var pCount = parts.length;
  while(pCount--) {
    parts[pCount].update();
  }
  renderer.render( scene, camera );
  requestAnimFrame(render);
}

//render();