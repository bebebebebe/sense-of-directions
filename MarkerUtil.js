function GeoPoint(lat, lng) {
  this.lat = lat;
  this.lng = lng;
}

// point: GeoPoint or object {lat: [number], lng: [number]}
// color: hex or string, defaults to teal
// name: string or null
function MarkerData(point, color, name) {
  if (color == null) var color = 0x017a8b;

//  this.id = this._createId();

  this.lat = point.lat;
  this.lng = point.lng;
  this.color = color;
  this.name = name;
}

MarkerData.prototype = {
  _createId: function() { // random number to serve as unique key
    return Date.now() + Math.random;
  },

  colorSet: function(color) {
    this.color = color;
  }
};

function MarkerUtil(){};

MarkerUtil.prototype = {

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

  PT_0: {lat: 40.720878, lng: -74.001002},    // RC
  PT_1: {lat: 40.714234,  lng: -74.006323},   // broadway and chambers
  PT_2: {lat: 40.731716,  lng: -73.991496},   // broadway and 10th
  PT_3: {lat: 40.728350,  lng: -74.002804},   // 6th and houston
  PT_4: {lat: 40.7329915, lng: -73.9879134},  // 13th and 3rd
  PT_5: {lat: 40.720579,  lng: -73.995273},   // cafe integral
  PT_6: {lat: 40.674977, lng: -73.976649},    // PSFC
  PT_7: {lat: 40.714234, lng: -73.989566},    // jajaja restaurant

}

Object.defineProperty(MarkerUtil.prototype, 'defaultSet', {
  get: function() {
    return [
      new MarkerData(this.PT_0, this.GREEN, 'RC'),
      new MarkerData(this.PT_1, this.LIGHT_GREEN, 'Broadway and Chambers'),
      new MarkerData(this.PT_2, this.PURPLE, 'Broadway and 10th'),
      new MarkerData(this.PT_3, this.ORANGE, '6th and Houston'),
      new MarkerData(this.PT_4, this.MAROON, 'E. 13th and 3rd Ave'),
      new MarkerData(this.PT_5, this.TEAL, 'Cafe Integral'),
      new MarkerData(this.PT_6, this.TEAL, 'Park Slope Food Coop')
    ];
  }
});

export {MarkerUtil, MarkerData, GeoPoint};
