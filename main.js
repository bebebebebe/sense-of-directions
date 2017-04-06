$(document).ready(function(){
  $update = $('#update');

  var LIGHT_BLUE = 0xe1fffe;
  var LIGHT_GREEN = 0x8cb082;
  var GREEN = 0x00ff00;
  var PURPLE = 0x936693;
  var ORANGE = 0xf78909;

  var PT_1 = {lat: 40.714234, lng: -74.006323}// broadway and chambers
  var PT_2 = {lat: 40.731716, lng: -73.991496} // broadway and 10th
  var PT_3 = {lat: 40.728350, lng: -74.002804} // 6th and houston

  var renderer, scene, camera;

  init();
  wire();

  function wire() {
    $update.on('click', updateView);
  }

  function init() {
    var width = window.innerWidth;
    var height = window.innerHeight;

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(width, height);
    document.body.appendChild(renderer.domElement);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 10000);
    camera.position.z = 45;
    camera.position.y = 1;

    var cube = makeCube(GREEN);
    scene.add(cube);

    addCube(LIGHT_GREEN, PT_1);
    addCube(PURPLE, PT_2);
    addCube(ORANGE, PT_3);

    light();
    render();
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

    navigator.geolocation.getCurrentPosition(function(pos) {
      var coords = pos.coords;
      var lat = coords.latitude;
      var lng = coords.longitude;

      cameraUpd(lat, lng);
    });
  }

  function cameraUpd(lat, lng) {
    var coords = coordsMap(lat, lng);
    console.log(lat, lng);

    camera.position.x = coords.east;
    camera.position.y = 0;
    camera.position.z = 0 - coords.north;
    camera.lookAt(new THREE.Vector3(0,0,0));

    render();
  }

  function render() {
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
