;(function(window) {

  // RC coords used as map origin
  var ORIGIN_LNG = -74.001002;
  var ORIGIN_LAT = 40.720878;

  var MAP_WIDTH = 1000000;
  var MAP_HEIGHT = 1000000;

  var originCoords = coordsWorld(ORIGIN_LAT, ORIGIN_LNG);

  function coordsWorld(lat, lng) {
    var east = (lng + 180) * (MAP_WIDTH / 360);

    var latRad = lat * (Math.PI / 180); // latitude in radians
    var mercN = Math.log(Math.tan((Math.PI/4) + (latRad/2)));

    var north = (MAP_HEIGHT/2) - (MAP_WIDTH * mercN / (2 * Math.PI));

    return {east: east, north: north};
  }

  // calculate east, north relative to map origin
  function coordsMap(lat, lng) {
    var coords = coordsWorld(lat, lng);

    var east = coords.east - originCoords.east;
    var north = originCoords.north - coords.north;

    return {east: east, north: north};
  }

  window.coordsMap = coordsMap;

}(this));
