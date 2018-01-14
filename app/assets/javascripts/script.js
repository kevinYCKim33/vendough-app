$( document ).ready(function() {
    alert( "jQUERY ready!" );
    loadGlobalTransactions();
    loadContacts();
    youGotHit();
});

function loadGlobalTransactions() {
  $("#globe").on('click', function() {
    $.get("/dealings" + ".json", function(resp) {
      alert("you got your dealings json yet?");
    });
    //something here appending to dom
  });
};

function loadContacts() {
  $("#associates").on('click', function() {
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

//change change change
