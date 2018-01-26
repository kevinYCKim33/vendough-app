$( document ).on('turbolinks:load',function() {
  // turbolinks is a rails 5 fix
    loadGlobalTransactions();
    loadContacts();
    loadPersonalTransactions();
    loadDetailedTransaction();
    createComment();
    hideComments();
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

function loadDetailedTransaction() {
  $(".list-group").on('click', '.details-button', function() {
    let transactionId = this.href.split("/").slice().pop();
    event.preventDefault();
    $.get('/dealings/' + transactionId + '.json', function(resp) {
      let detailedTransactionHtml = HandlebarsTemplates['detailed_transaction']({
        transaction: resp
      });
      $(`#${transactionId}.list-group-item`).replaceWith(detailedTransactionHtml);
    })
  })
}

function hideComments() {
  $('.list-group').on('click', '.hide-comments', function() {
    event.preventDefault();
    let transactionId = this.dataset.id;
    $.get('/dealings/' + transactionId + '.json', function(resp) {
      let transactionHtml = HandlebarsTemplates['single_transaction']({
        transaction: resp
      });
      $(`#${transactionId}.comment`).remove();
      $(`#${transactionId}.list-group-item`).replaceWith(transactionHtml);
    })
  })
}

function Comment(data) {
  this.data = data;
}

Comment.prototype.template = function() {
  
}

Comment.prototype.template = function() {
  const newCommentHtml = HandlebarsTemplates['new_comment']({
    comment: this.data
  });
  return newCommentHtml;
}

function createComment() {
  $('form#new_comment').submit(function(event) {
    event.preventDefault();
    let values = $(this).serialize();
    let posting = $.post('/comments', values);
    posting.done(function(data) {
      const comment = new Comment(data);
      const filledOutComment = comment.template();
      $(filledOutComment).insertAfter('.list-group-item:last');
      $('.new_comment input[type="submit"]').removeAttr('disabled');
      $('#comment_content').val("");
    })
  })
}
