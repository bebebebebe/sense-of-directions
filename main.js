$(document).ready(function(){
  $update = $('#update');
  $container = $('#container');

  var LIGHT_BLUE = 0xe1fffe;
  var LIGHT_GREEN = 0x8cb082;
  var GREEN = 0x00ff00;
  var PURPLE = 0x936693;
  var ORANGE = 0xf78909;
  var MAROON = 0x512544;
  var TEAL = 0x017a8b;

  var GRAY = 0x808080;
  var LIGHT_GRAY = 0xd3d3d3;
  var WHITE = 0xffffff;

  var PT_1 = {lat: 40.714234, lng: -74.006323}// broadway and chambers
  var PT_2 = {lat: 40.731716, lng: -73.991496} // broadway and 10th
  var PT_3 = {lat: 40.728350, lng: -74.002804} // 6th and houston
  var PT_4 = {lat: 40.7329915, lng: -73.9879134}; // 13th and 3rd
  var PT_5 = {lat: 40.720579, lng: -73.995273}; // cafe integral

  // RC coords used as map origin
  var ORIGIN_LNG = -74.001002;
  var ORIGIN_LAT = 40.720878;

  var MAP_WIDTH = 1000000;
  var MAP_HEIGHT = 1000000;


  var renderer, scene, camera;

  var dir = 0; // you are looking alpha degrees east
  var lat;
  var lng;

  var proj;

  var marker;

  init();
  wire();

  function wire() {
    $update.on('click', updateView);
    window.addEventListener('deviceorientation', orientationH, true);
  }

  function init() {
    var width = window.innerWidth;
    var height = window.innerHeight;

    scene = new THREE.Scene();

    scene.fog = new THREE.Fog(WHITE, 0.1, 200);
    //scene.fog = new THREE.FogExp2(WHITE, 0.01);

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(width, height);
    renderer.setClearColor(LIGHT_GRAY, 1);

    $container.append(renderer.domElement);

    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 10000);

    proj = new Proj(MAP_WIDTH, MAP_HEIGHT, ORIGIN_LAT, ORIGIN_LNG);


    var gridHelper = new THREE.GridHelper(300,20);
    gridHelper.position.y = -8;
    scene.add(gridHelper);

    marker = makeMarker(GREEN);
    scene.add(marker);

    addMarker(LIGHT_GREEN, PT_1);
    addMarker(PURPLE, PT_2);
    addMarker(ORANGE, PT_3);
    addMarker(MAROON, PT_4);
    addMarker(TEAL, PT_5);

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

  function addMarker(color, pt) {
    var marker = makeMarker(color);
    var coords = proj.coordsMap(pt.lat, pt.lng);

    marker.position.x = coords.east;
    marker.position.z = 0 - coords.north;

    scene.add(marker);
    return marker;
  }

  function makeMarker(color) {
    var geometry = new THREE.CubeGeometry(1,16,1);
    var material = new THREE.MeshLambertMaterial({color: color});
   
    return new THREE.Mesh(geometry, material);
  }

  function light() {
    var lightA = new THREE.AmbientLight(0x404040); // soft white light
    scene.add(lightA);

    var lightH = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
    scene.add(lightH);
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

    var coords = proj.coordsMap(lat, lng);
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
    var coords = proj.coordsMap(lat, lng);

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
  window.marker = marker;

});
