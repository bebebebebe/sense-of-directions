$(document).ready(function(){
  new Landscape();

  $(document).on('touchmove', function(e) {
    e.preventDefault(); // prevent scroll effect
  });
});
