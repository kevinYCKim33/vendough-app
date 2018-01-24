$( document ).on('turbolinks:load',function() {
  // turbolinks is a rails 5 fix
    loadGlobalTransactions();
    loadContacts();
    loadPersonalTransactions();
    createComment();
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

function loadPersonalTransactions() {
  let currentUserId = parseInt($('body').attr('data-userid'));
  $("#you").on('click', function() {
    $.get("/users/" + currentUserId + "/dealings" + ".json", function(resp){
      if (resp.length > 0) {
        const currentUserTransactionsListHtml = HandlebarsTemplates['transactions_list']({
          transactions: resp
        });
        $('.list-group').html(currentUserTransactionsListHtml);
      } else {
        const currentUserTransactionsListHtml = "<br><br><center><p><b>When you complete a transaction it will show up here.</b></p></center>"
        $('.list-group').html(currentUserTransactionsListHtml);
      }
    })
  })
}

function createComment() {
  $('form#new_comment').submit(function(event) {
    event.preventDefault();
    let values = $(this).serialize();
    let posting = $.post('/comments', values);
    posting.done(function(data) {
      const newCommentHtml = HandlebarsTemplates['new_comment']({
        comment: data
      });
      $(newCommentHtml).insertBefore('.list-group-item:last')
    })
  })
}

//change change change
