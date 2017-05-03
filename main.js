import $ from 'jquery';
import {default as Landscape} from './Landscape.js'

import React from 'react';
import ReactDOM from 'react-dom';

import {Map} from './components/map.js'

$(document).ready(function(){

  ReactDOM.render(
    <Map />,
    document.getElementById('map-container')
  );

  window.landscape = new Landscape();

  $(document).on('touchmove', function(e) {
    e.preventDefault(); // prevent scroll effect
  });
});
