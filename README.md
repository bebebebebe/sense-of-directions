# Sense of Directions

This web app is to be used on your phone, while walking around. Try it out <a href='https://bebebebebe.github.io/sense-of-directions/'>here</a> (see device note below). It is intended to help train a sense of directions. That is, to help you build a "mental model" of some positions in space. Hold your phone up to see colored markers in the direction of certain places, with markers appearing larger if they are closer to you.

Three.js is used to represent locations of some points in the world, using a projection from geocordinates (longitude and latitude) to points on a plane. Currently the recurse center location is at Three.js's origin, and other points are placed on the x - z plane (where moving towards you on the z axis is south, and moving right on the x axis is east). Six other points are represted at the moment, so the points represented are:

- Recurse Center / Broadway and Grand (bright green)
- Cafe Integral, Soho (teal)
- Broadway and Chambers (light green)
- Broadway and 10th Ave (purple)
- 6th Ave and Houston (orange)
- 13th and Third Ave (maroon)
- Park Slope Food Coop, Brooklyn (teal)

There is a "toggle view" button, that lets you switch between a dark theme, a light theme (which includes a grid representing the ground), and a bird's eye view. There is an "update" button, that lets you update your position, assuming location data is available and permittted in your browser. Your phone's compass is used to update the view depending on what direction the phone is facing.

### Compatibility/Device Note

This is being developed with iOS in mind at first, though it is probably ok on Android as well. (There are some differences in the api for compass data.) You can also try it out in Chrome on the desktop, using dev tools to simulate geolocation and phone sensor data (alter the alpha value to simulate rotating your phone).

### Other Notes

- I'm planning to let the user add markers at locations, and to provide data about each marker with a toggleable info view.

- So far I've been finding that the dark theme, without the ground grid, works a lot better at making me form a "mental picture" of where things are in space. I'm not completely sure why, and am interested in figuring it out to see if there are ways to further improve the advantages of the dark theme.

- The compass data isn't always all that accurate. Some ideas to improve it and/or make it more stable are under investigation.
