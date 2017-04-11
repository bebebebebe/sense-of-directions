// convience, for demo
eg_lat = 40.731716;
eg_lng = -73.991496;


$(document).ready(function(){
  $update = $('#update');

  var LIGHT_BLUE = 0xe1fffe;
  var LIGHT_GREEN = 0x8cb082;
  var GREEN = 0x00ff00;
  var PURPLE = 0x936693;
  var ORANGE = 0xf78909;
  var MAROON = 0x512544;

  var PT_1 = {lat: 40.714234, lng: -74.006323}// broadway and chambers
  var PT_2 = {lat: 40.731716, lng: -73.991496} // broadway and 10th
  var PT_3 = {lat: 40.728350, lng: -74.002804} // 6th and houston
  var PT_4 = {lat: 40.7329915, lng: -73.9879134}; // 13th and 3rd

  var renderer, scene, camera;

  var dir = 0; // you are looking alpha degrees east
  var lat;
  var lng;

  init();
  wire();

  function wire() {
    $update.on('click', updateView);
    window.addEventListener('deviceorientation', orientationH, true);
  }

  function init() {
    var width = window.innerWidth;
    var height = window.innerHeight;

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(width, height);
    document.body.appendChild(renderer.domElement);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 10000);
    //cameraPos(PT_4.lat, PT_4.lng, 0);

    var cube = makeCube(GREEN);
    scene.add(cube);

    addCube(LIGHT_GREEN, PT_1);
    addCube(PURPLE, PT_2);
    addCube(ORANGE, PT_3);
    addCube(MAROON, PT_4);

    light();
    render();
  }

  function orientationH(e) {
    if (typeof e.alpha !== 'number' && typeof e.webkitCompassHeading !== 'number') {
      return;
    }

    var alpha = e.alpha;
    var compass = e.webkitCompassHeading;

    dir = (typeof compass === 'number') ? compass : - alpha;
  }

  function addCube(color, pt) {
    var cube = makeCube(color);
    var coords = coordsMap(pt.lat, pt.lng);

    cube.position.x = coords.east;
    cube.position.z = 0 - coords.north;

    scene.add(cube);
  }

  function makeCube(color) {
    var geometry = new THREE.CubeGeometry(1,15,1);
    var material = new THREE.MeshLambertMaterial({color: color});
   
    return new THREE.Mesh(geometry, material);
  }

  function light() {
    var light = new THREE.AmbientLight( 0x404040 ); // soft white light
    scene.add(light);

    var light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
    scene.add(light);
  }

  function updateView() {
    console.log('updating...');
    console.log('degrees east: ', dir);

    navigator.geolocation.getCurrentPosition(function(pos) {
      var coords = pos.coords;
      lat = coords.latitude;
      lng = coords.longitude;

      console.log('lat: ', lat);
      console.log('lng: ', lng);

      cameraPos(lat, lng, 0);
    });
  }

  function cameraPos(lat, lng, height) {
    if (typeof height === 'undefined') {
      var height = 0;
    }

    var coords = coordsMap(lat, lng);
    camera.position.x = coords.east;
    camera.position.z = 0 - coords.north;
    camera.position.y = height;
  }

  // deg: degrees east
  function cameraLookAt(deg) {
    var rad = deg * Math.PI / 180;
    var x = camera.position.x + Math.sin(rad);
    var z = camera.position.z - Math.cos(rad);
    var vector = new THREE.Vector3(x,0,z);

    camera.lookAt(vector);
  }

  function render() {
    requestAnimationFrame(render);

    cameraLookAt(dir);

    renderer.render(scene, camera);
  }

  //****************
  // convenience methods for moving blocks, camera from console
  //

  window.render = render;

  window.cameraPosLL = function(lat, lng) {
    var coords = coordsMap(lat, lng);

    cameraPos(coords.east, 0, 0 - coords.north);
  }

  window.cameraPos = function(x,y,z) {
    if (x !== null) camera.position.x = x
    if (y !== null) camera.position.y = y
    if (z !== null) camera.position.z = z

    render();
  }

  window.cubePos = function(x,y,z) {
    if (x !== null) cube.position.x = x
    if (y !== null) cube.position.y = y
    if (z !== null) cube.position.z = z

    render();
  }

  window.cameraDir = function(x,y,z) {
    var vector = new THREE.Vector3(x,y,z);
    camera.lookAt(vector);

    render();
  }

  // bird's eye view
  window.bev = function(height) {
    var origin = new THREE.Vector3(0, 0, 0);

    camera.position.x = 0;
    camera.position.y = height;
    camera.position.z = 0;
    camera.lookAt(origin);

    render();
  }

  window.camera = camera;

});
