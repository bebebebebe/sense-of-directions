import $ from 'jquery';
import {default as Landscape} from './Landscape.js'

$(document).ready(function(){
  window.landscape = new Landscape();

  $(document).on('touchmove', function(e) {
    e.preventDefault(); // prevent scroll effect
  });
});
