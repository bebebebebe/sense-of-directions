import React from 'react';
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";

const MAPBOX_TOKEN = "pk.eyJ1IjoiYmViZWJlIiwiYSI6ImNqMjVjcmVleDAwNzYycXBjcDcwbWQwYXUifQ.3Uxev45SWOJ7jOebH_OmLg";
const CENTER_DEFAULT = [-74.001002, 40.720878] // lng, lat of RC to center map by default

class Map extends React.Component {

  clickHandler(map, event) {
    console.log('click', event.lngLat);
  }

  render() {
    return (
      <ReactMapboxGl
        onClick={(map, event) => this.clickHandler(map, event)}
        style="mapbox://styles/mapbox/streets-v8"
        accessToken={MAPBOX_TOKEN}
        center={CENTER_DEFAULT}
        zoom={[15]}
        containerStyle={{
          height: "100vh",
          width: "100vw"
        }}>

          <Layer
            type="symbol"
            id="marker"
            layout={{ "icon-image": "marker-15" }}>
            <Feature coordinates={CENTER_DEFAULT}/>
          </Layer>

      </ReactMapboxGl>
    );
  }
}

export {Map}


