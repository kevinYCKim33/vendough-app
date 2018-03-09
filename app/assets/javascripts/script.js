$( document ).on('turbolinks:load',function() {
  // turbolinks is a rails 5 fix
  let currentUserId = parseInt($('body').attr('data-userid'));
  if (top.location.pathname === '/' || top.location.pathname === '/users/' + currentUserId + '/dealings') {
    loadGlobalTransactions();
    loadContacts();
    loadPersonalTransactions();
    if (top.location.pathname === '/'){
      $("#globe").click()
    } else {
      $("#you").click()
    }
  }

  // a bit forced way of getting other user's id
  // href: /users/1/dealings
  let urlArray = top.location.pathname.split("/"); // ["", "users", "1", "dealings"]
  // the if condition extracts out the number 1, making sure it's not the current user
  if (urlArray.length === 4 && urlArray[1] === "users" && urlArray[3] === "dealings" && urlArray[2] != currentUserId) {
    let userId = parseInt(urlArray[2])
    loadIndividualTransactions(userId)
  }

  createLike();
  unlike();
  // loadDetailedTransaction();
  createComment();
  clickShowHeart();
  clickUnlikeHeart();
  // hideComments();
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
    loadIndividualTransactions(currentUserId);
  })
}

function loadIndividualTransactions(userId) {
  $.get("/users/" + userId + "/dealings" + ".json", function(resp){
    if (resp.length > 0) {
      const userTransactions = new Transaction(resp).createTransactionPanels();
      $('.list-group').html(userTransactions);
    } else {
      const displayEmptyTransactionMessage = "<br><br><center><p><b>When you/this person completes a transaction it will show up here.</b></p></center>"
      $('.list-group').html(displayEmptyTransactionMessage);
    }
  })
}

// function loadDetailedTransaction() {
//   $(".list-group").on('click', '.details-button', function() {
//     let transactionId = this.href.split("/").slice().pop();
//     event.preventDefault();
//     $.get('/dealings/' + transactionId + '.json', function(resp) {
//       const detailedTransaction = new Transaction(resp).createDetailedTransactionPanel();
//       $(`#${transactionId}.list-group-item`).replaceWith(detailedTransaction);
//     })
//   })
// }

// function hideComments() {
//   $('.list-group').on('click', '.hide-comments', function() {
//     event.preventDefault();
//     let transactionId = this.dataset.id;
//     $.get('/dealings/' + transactionId + '.json', function(resp) {
//       const simplePanel = new Transaction(resp).revertToSimpleTransactionPanel();
//       $(`#${transactionId}.comment`).remove();
//       $(`#${transactionId}.list-group-item`).replaceWith(simplePanel);
//     })
//   })
// }

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
      $("#" + resp.dealing_id + " .like-button").addClass('unlike-button').removeClass('like-button').html('Unlike');
    })
  })
}

function clickShowHeart() {
  $(".froggy").on('click', '.show-heart', function() {
    let id = this.id;
    let posting = $.post('/likes', {id});
    posting.done(function(resp){
      let names = resp.liked_users.map(person => {
        return (`<a href=users/${person.id}/dealings>${person.name}</a>`)
      });
      $("#" + resp.dealing_id).css('color', 'rgb(061,149,206)');
      $(".show-likes").html(names.join(", "));
      $("#" + resp.dealing_id).addClass('unlike-heart').removeClass('show-heart');
    })
  })
}

function clickUnlikeHeart() {
  $(".froggy").on('click', '.unlike-heart', function() {
    // debugger;
    $.ajax({
      url: '/likes/' + this.id,
      type: 'DELETE',
      success: function(resp) {
        if (resp.liked_users.length === 0) {
          $(".show-likes").html("");
        } else {
          let names = resp.liked_users.map(person => {
            return (`<a href=users/${person.id}/dealings>${person.name}</a>`)
          })
          $(".show-likes").html(names.join(", "));
        }
        $("#" + resp.dealing_id).css('color', '#a8a8a8');
        $("#" + resp.dealing_id).addClass('show-heart').removeClass('unlike-heart');
      }
    });
  })
}

function unlike() {
  $('.list-group').on('click', '.unlike-button', function(event) {
    event.preventDefault();
    $.ajax({
      url: '/likes/' + this.id,
      type: 'DELETE',
      success: function(resp) {
        if (resp.liked_users.length === 0) {
          $("#" + resp.dealing_id + " .likes").html("");
        } else {
          let names = resp.liked_users.map(person => {
            return (`<a href=users/${person.id}/dealings>${person.name}</a>`)
          })
          $("#" + resp.dealing_id + " .likes").html(`<span class="glyphicon glyphicon-heart" style="color:gray"></span> &nbsp;${names.join(", ")}`);
        }
        $("#" + resp.dealing_id + " .unlike-button").addClass('like-button').removeClass('.unlike-button').html('Like');
      }
    });
  })
}
