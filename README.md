First "sketch" for sense of directions app.

Three.js is used to represent locations of some points in the world, using a projection from geocordinates (longitude and latitude) to points on a plane. Currently the recurse center location is at Three.js's origin, and other points are placed on the x - z plane (where moving towards you on the z axis is south, and moving right on the x axis is east). Three other points are represted at the moment, so the points represented are:

- Recurse Center / Broadway and Grand (bright green)
- Broadway and Chambers (light green)
- Broadway and 10th Ave (purple)
- 6th Ave and Houston (orange)

There is an 'update' button in the lower right. When you click it, a geocoordinate reading is taken, and the Three.js camera is placed at the representation of your current longitude and latitude, the camera is set to point to the origin (RC's location), and the image is re rendered. So you see how the points above look from where you are if you were facing RC. You can use browser dev tools to simulate various locations to try it out.
