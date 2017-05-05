import React from 'react';
import ReactMapboxGl, {Layer, Feature, Marker} from 'react-mapbox-gl';
import {markersArray, cssHexString} from '../MarkerUtil.js';

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

        <MapMarkerCollection data={markersArray} />

      </ReactMapboxGl>
    );
  }
}

class MapMarker extends React.Component {

  clickHandler() {
    console.log('%c' + this.props.name, 'color:' + this.props.color);
  }

  render() {
    const style = {
      width: '7px',
      height: '100px',
      background: this.props.color,
      opacity: '0.7',
      transform: 'skew(-10deg, -10deg)',
      WebkitTransform: 'skew(-10deg, -10deg)'
    };

    return (
      <Marker
        coordinates={this.props.coordinates}
        anchor="bottom"
        onClick={(e) => this.clickHandler(e)}
      >
      <div style={style}></div>
      </Marker>
    );
  }
}

class MapMarkerCollection extends React.Component {

  render() {
    var markers = this.props.data.map(function(marker) {
      return <MapMarker
        coordinates={[marker.geocoords.lng, marker.geocoords.lat]}
        color={cssHexString(marker.color)}
        name={marker.name}
      />
    });

    return (
      <div>{markers}</div>
    )
  }
}

export {Map}
