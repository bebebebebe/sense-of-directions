;(function(exports) {

  exports.Proj = function(mapWidth, mapHeight, originLat, originLng) {
    this.mapWidth = mapWidth;
    this.mapHeight = mapHeight;
    this.originLat = originLat;
    this.originLng = originLng;
  }

  Proj.prototype.rad = function(deg) {
    return deg * Math.PI / 180;
  }

  // Mercator projection
  Proj.prototype.coordsMercator = function(lat, lng) {
    var east = (lng + 180) * (this.mapWidth / 360);

    var latRad = this.rad(lat);
    var mercN = Math.log(Math.tan((Math.PI/4) + (latRad/2)));

    var north = (this.mapHeight/2) - (this.mapWidth * mercN / (2 * Math.PI));

    return {east: east, north: north};
  }

  // shift axes to use specified origin coordinates
  Proj.prototype.coordsMap = function(lat, lng) {
    var coordsOrigin = this.coordsMercator(this.originLat, this.originLng);
    var coords = this.coordsMercator(lat, lng);

    var east = coords.east - coordsOrigin.east;
    var north = coordsOrigin.north - coords.north;

    return {east: east, north: north};
  }

}(this));
