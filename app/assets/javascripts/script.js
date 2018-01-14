$( document ).ready(function() {
    alert( "jQUERY ready!" );
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
    // debugger;
    $.get("/contacts" + ".json", function(resp) {
      const contactsListHtml = HandlebarsTemplates['contacts_list']({
        contacts: resp
      });
      $('.list-group').html(contactsListHtml);
    });
  });
}

function youGotHit() {
  $("#you").on('click', function() {
    alert("you got hit");
  })
}
