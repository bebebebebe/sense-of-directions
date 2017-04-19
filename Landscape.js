;(function(exports) {
  "use strict";

  exports.Landscape = function() {
    this.init();
    this.wire();
  };

  Landscape.prototype = {
    LIGHT_BLUE:   0xe1fffe,
    LIGHT_GREEN:  0x8cb082,
    GREEN:        0x00ff00,
    PURPLE:       0x936693,
    ORANGE:       0xf78909,
    MAROON:       0x512544,
    TEAL:         0x017a8b,

    BLACK:        0x000000,
    GRAY:         0x808080,
    LIGHT_GRAY:   0xd3d3d3,
    WHITE:        0xffffff,

    PT_1: {lat: 40.714234,  lng: -74.006323},   // broadway and chambers
    PT_2: {lat: 40.731716,  lng: -73.991496},   // broadway and 10th
    PT_3: {lat: 40.728350,  lng: -74.002804},   // 6th and houston
    PT_4: {lat: 40.7329915, lng: -73.9879134},  // 13th and 3rd
    PT_5: {lat: 40.720579,  lng: -73.995273},   // cafe integral

    PT_6: {lat: 40.674977, lng: -73.976649},    // PSFC

    // RC coords used as map origin
    ORIGIN_LNG:   -74.001002,
    ORIGIN_LAT:   40.720878,

    MAP_WIDTH:    1000000,
    MAP_HEIGHT:   1000000,

    BEV_HEIGHT: 150, // how high up for bird's eye view

    renderer: null,
    scene: null,
    camera: null,
    grid: null,

    dir: null,
    lat: null,
    lng: null,
    proj: null,

    viewType: null, // integer, representing view type in map below
    viewTypeMap: { // map of view types to description
      0: 'light theme',
      1: 'dark theme',
      2: 'bird\'s eye view, dark theme'
    },

    init: function() {
      this.$update = $('#update');
      this.$viewToggle = $('#view-toggle');
      this.$container = $('#container');

      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.aspect = this.width / this.height;

      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(75, this.aspect, 0.1, 10000);
      this.renderer = new THREE.WebGLRenderer({antialias: true});
      this.renderer.setSize(this.width, this.height);

      this.proj = new Proj(
          this.MAP_WIDTH, this.MAP_HEIGHT, this.ORIGIN_LAT, this.ORIGIN_LNG
      );
      this.dir = 0;
      this.lat = this.ORIGIN_LAT;
      this.lng = this.ORIGIN_LNG;

      this.addMarkers();
      this.light();
      this.viewTypeSet(0);

      this.$container.append(this.renderer.domElement);
      this.render();
    },

    wire: function() {
      this.$update.on('click', this.updateH.bind(this));
      this.$viewToggle.on('click', this.viewToggleH.bind(this));
      window.addEventListener('deviceorientation', this.orientationH.bind(this), true);
    },

    light: function() {
      var lightA = new THREE.AmbientLight(0x404040);
      this.scene.add(lightA);

      var lightH = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
      this.scene.add(lightH);
    },

    addGrid: function() {
      this.grid = new THREE.GridHelper(300, 20);
      this.grid.position.y = -8;

      this.scene.add(this.grid);
    },

    removeGrid: function() {
      this.scene.remove(this.grid);
      this.grid = null;
    },

    createMarker: function(color) {
      var geometry = new THREE.CubeGeometry(1, 16, 1);
      var material = new THREE.MeshLambertMaterial({color: color});

      return new THREE.Mesh(geometry, material);
    },

    addMarker: function(color, geocoords) {
      var marker = this.createMarker(color);
      var coords = this.proj.coordsMap(geocoords.lat, geocoords.lng);

      marker.position.x = coords.east;
      marker.position.z = 0 - coords.north;

      this.scene.add(marker);
      return marker;
    },

    addMarkers: function() {
      var marker = this.createMarker(this.GREEN);
      this.scene.add(marker);

      this.addMarker(this.LIGHT_GREEN, this.PT_1);
      this.addMarker(this.PURPLE, this.PT_2);
      this.addMarker(this.ORANGE, this.PT_3);
      this.addMarker(this.MAROON, this.PT_4);
      this.addMarker(this.TEAL, this.PT_5);

      this.addMarker(this.TEAL, this.PT_6);
    },

    cameraPos: function(lat, lng, height) {
      if (typeof height === 'undefined') {
        var height = (this.viewType == 2) ? this.BEV_HEIGHT : 0;
      }

      var coords = this.proj.coordsMap(lat, lng);

      this.camera.position.x = coords.east;
      this.camera.position.z = 0 - coords.north;
      this.camera.position.y = height;
    },

    cameraLookAt: function(deg) {
      var rad = this.proj.rad(deg);
      var x = this.camera.position.x + Math.sin(rad);
      var z = this.camera.position.z - Math.cos(rad);

      var vector = new THREE.Vector3(x, 0, z);

      this.camera.lookAt(vector);
    },

    orientationH: function(e) {
      if (typeof e.alpha !== 'number' && typeof e.webkitCompassHeading !== 'number') {
        return;
      }

      var alpha = e.alpha;
      var compass = e.webkitCompassHeading;

      this.dir = (typeof compass === 'number') ? compass : - alpha;
    },

    viewTypeSet: function(n) {
      console.log('update to type: ', this.viewTypeMap[n]);

      switch(n) {
        case 0: // light theme
          this.viewType = 0;
          this.renderer.setClearColor(this.LIGHT_GRAY, 1);
          if (this.grid === null) this.addGrid();

          this.camera.position.y = 0;
          //this.scene.fog = new THREE.Fog(this.White, 0,1, 200);
          break;

        case 1: // dark theme
          this.viewType = 1;
          this.renderer.setClearColor(this.BLACK, 1);
          if (this.grid !== null) this.removeGrid();

          this.camera.position.y = 0;
          break;

        case 2: // bird's eye view
          this.viewType = 2;
          this.renderer.setClearColor(this.BLACK, 1);
          if (this.grid !== null) this.removeGrid();

          this.bev(this.BEV_HEIGHT);
          break;

        default:
          throw new Error('view type not supported');
      }
    },

    viewToggleH: function() {
      var map = { // from type: to type (see this.viewTypeMap for descriptions)
        0: 1,
        1: 2,
        2: 0
      };

      if (typeof map[this.viewType] === 'undefined') {
        throw new Error('type not supported by toggle handler');
      }
      else {
        this.viewTypeSet(map[this.viewType]);
      }
    },

    updateH: function() {
      window.navigator.geolocation.getCurrentPosition(function(pos) {
        var coords = pos.coords;

        this.lat = coords.latitude;
        this.lng = coords.longitude;

        console.log('lat: ', this.lat);
        console.log('lng: ', this.lng);

        this.cameraPos(this.lat, this.lng);
      }.bind(this));
    },

    bev: function(height) {
      var x = this.camera.position.x;
      var z = this.camera.position.z;
      var below = new THREE.Vector3(x, 0, z);

      this.camera.position.y = height;
      this.camera.lookAt(below);
    },

    render: function() {
      window.requestAnimationFrame(this.render.bind(this));

      this.cameraLookAt(this.dir);

      this.renderer.render(this.scene, this.camera);
    },
  };

}(this));
