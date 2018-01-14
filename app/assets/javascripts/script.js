$( document ).ready(function() {
    // alert( "jQUERY ready!" );
    globeGotHit();
    associatesGotHit();
    youGotHit();
});

function globeGotHit() {
  $("#globe").on('click', function() {
    alert("this globe got hit");
  })
}

function associatesGotHit() {
  $("#associates").on('click', function() {
    alert("contacts got hit");
  })
}

function youGotHit() {
  $("#you").on('click', function() {
    alert("you got hit");
  })
}
