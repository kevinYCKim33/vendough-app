$( document ).on('turbolinks:load',function() {
  // turbolinks is a rails 5 fix
  if (top.location.pathname === '/')
    {
      loadContacts();
      loadGlobalTransactions();
      loadPersonalTransactions();
      loadDetailedTransaction();
      createComment();
      hideComments();
      createLike();
      $("#globe").click()
    }

});

function loadGlobalTransactions() {
  $("#globe").on('click', function() {
    $.get("/dealings" + ".json", function(resp) {
      const globalTransactions = new Transaction(resp).createTransactionPanels();
      $('.list-group').html(globalTransactions);
    });
  });
};

function loadPersonalTransactions() {
  let currentUserId = parseInt($('body').attr('data-userid'));
  $("#you").on('click', function() {
    $.get("/users/" + currentUserId + "/dealings" + ".json", function(resp){
      if (resp.length > 0) {
        const currentUserTransactions = new Transaction(resp).createTransactionPanels();
        $('.list-group').html(currentUserTransactions);
      } else {
        const displayEmptyTransactionMessage = "<br><br><center><p><b>When you complete a transaction it will show up here.</b></p></center>"
        $('.list-group').html(displayEmptyTransactionMessage);
      }
    })
  })
}

function loadDetailedTransaction() {
  $(".list-group").on('click', '.details-button', function() {
    let transactionId = this.href.split("/").slice().pop();
    event.preventDefault();
    $.get('/dealings/' + transactionId + '.json', function(resp) {
      // debugger;
      const detailedTransaction = new Transaction(resp).createDetailedTransactionPanel();
      $(`#${transactionId}.list-group-item`).replaceWith(detailedTransaction);
    })
  })
}

function hideComments() {
  $('.list-group').on('click', '.hide-comments', function() {
    event.preventDefault();
    let transactionId = this.dataset.id;
    $.get('/dealings/' + transactionId + '.json', function(resp) {
      const simplePanel = new Transaction(resp).revertToSimpleTransactionPanel();
      $(`#${transactionId}.comment`).remove();
      $(`#${transactionId}.list-group-item`).replaceWith(simplePanel);
    })
  })
}

function loadContacts() {
  $("#associates").on('click', function() {
    $.get("/contacts" + ".json", function(resp) {
      const contactsList = new Contact(resp).createContactsPanels();
      $('.list-group').html(contactsList);
    });
  });
}

function createComment() {
  $('form#new_comment').submit(function(event) {
    event.preventDefault();
    let values = $(this).serialize();
    let posting = $.post('/comments', values);
    posting.done(function(resp) {
      const newComment = new Comment(resp).createNewComment();
      $(newComment).insertAfter('.list-group-item:last');
      $('.new_comment input[type="submit"]').removeAttr('disabled');
      $('#comment_content').val("");
    })
  })
}

function createLike() {
  $('.list-group').on('click', '.like-button', function(event) {
    event.preventDefault();
    let id = this.id;
    let posting = $.post('/likes', {id});
    posting.done(function(resp){
      let names = resp.liked_users.map(person => {
        return (`<a href=users/${person.id}/dealings>${person.name}</a>`)
      });
      $("#" + resp.dealing_id + " .likes").html(`<span class="glyphicon glyphicon-heart" style="color:rgb(061,149,206)"></span> &nbsp;${names.join(", ")}`);
      // debugger;
      $("#" + resp.dealing_id + " .like-button").addClass('unlike-button').removeClass('like-button').html('Unlike');
    })
  })
}

// $("#11 .like-button").addClass('unlike-button').removeClass('like-button').html('Unlike')
