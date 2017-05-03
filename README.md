# Sense of Directions

This web app is to be used on your phone, while walking around. Try it out <a href='https://bebebebebe.github.io/sense-of-directions/'>here</a> (see device note below). "Virtual markers" are placed in some locations. Hold your phone up to see them: see colored markers in the direction of certain locations, with markers appearing larger if they are closer to you.

Three.js, a JavaScript library for WebGL, is used to keep track of how the markers would look from different places, and directions of view. A projection from geocoordinates (longitude and latitude) is used to represent the points on a plane. Your phone's position is used to place the Three.js camera, and the camera's orientation is determined by your phone's compass.


### Default locations represented

Currently the Recurse Center location is at Three.js's origin, and other points are placed on the x - z plane (where moving towards you on the z axis is south, and moving right on the x axis is east). Six other points are represted at the moment, so the points represented are:

- Recurse Center / Broadway and Grand (bright green)
- Cafe Integral, Soho (teal)
- Broadway and Chambers (light green)
- Broadway and 10th Ave (purple)
- 6th Ave and Houston (orange)
- 13th and Third Ave (maroon)
- Park Slope Food Coop, Brooklyn (teal)

There is a "toggle view" button, that lets you switch between a dark theme, a light theme (which includes a grid representing the ground), and a bird's eye view. There is an "update" button, that lets you update your position, assuming location data is available and permittted in your browser. Your phone's compass is used to update the view depending on what direction the phone is facing.

### Compatibility/Device Note

This is being developed with ioS (i.e., mobile safari, as it is a web app) in mind at first, though it is probably ok on Android as well. (There are some differences in the api for compass data.) You can also try it out in Chrome on the desktop, using dev tools to simulate geolocation and phone sensor data (alter the alpha value to simulate rotating your phone).

### Build Notes for Development

From the main directory, do `npm install`. Then to build, do `npm run build`. This generates the bundled file `dist/app.bundle.js` referenced in `index.html`.

To set up watch, so that you don't have to rebuild after each change to a JS file, do `webpack --progress --watch`. In another terminal window, do `npm start`, and follow the directions there to see your app as you modify it. 

### Notes on Future Plans

- I'm planning to let the user add markers at locations via a map view, and to provide data about each marker with a toggleable info view.

- So far I've been finding that the dark theme, without the ground grid, works a lot better at making me form a "mental picture" of where things are in space. I'm not completely sure why, and am interested in figuring it out to see if there are ways to further improve the advantages of the dark theme.

- The compass data isn't always all that accurate. Some ideas to improve it and/or make it more stable are under investigation.
