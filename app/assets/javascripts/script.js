$( document ).ready(function() {
    loadGlobalTransactions();
    loadContacts();
    youGotHit();
});

function loadGlobalTransactions() {
  $("#globe").on('click', function() {
    $.get("/dealings" + ".json", function(resp) {
      const transactionsListHtml = HandlebarsTemplates['transactions_list']({
        transactions: resp
      });
      $('.list-group').html(transactionsListHtml);
    });
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
