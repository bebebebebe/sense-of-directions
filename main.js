import $ from 'jquery';
import {default as Landscape} from './Landscape.js'

import {markersArray} from './MarkerUtil.js';

import React from 'react';
import ReactDOM from 'react-dom';

import {Map} from './components/Map.js'

$(document).ready(function(){

  ReactDOM.render(
    <Map markers={markersArray} />,
    document.getElementById('map-container')
  );

//  window.landscape = new Landscape();

  $(document).on('touchmove', function(e) {
    e.preventDefault(); // prevent scroll effect
  });
});
