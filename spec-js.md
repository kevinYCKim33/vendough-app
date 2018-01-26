# Specifications for the Rails with jQuery Assessment

Specs:
- [x] Use jQuery for implementing new requirements
        I did my share of $.get and $.post.  
- [x] Include a show resource rendered using jQuery and an Active Model Serialization JSON backend.
        When I click the View Details button of a transaction, it fires an AJAX get request to /dealings/:id.json where it hits the dealings_controller's show action, where the json is rendered via Active Model Serializer titled DealingSerializer that lists all the necessary attributes required to display the sender and the recipient of the transaction, the time of the transaction, the amount, hashtags, and accompany comments.
- [x] Include an index resource rendered using jQuery and an Active Model Serialization JSON backend.
        When the globe icon is clicked, it sends an AJAX request to /dealings.json where it hits the dealings_controller's index action, where the json is rendered via Active Model Serializer titled DealingSerializer that lists all the necessary attributes required to display the sender and the recipient of the transaction, the time of the transaction, the amount, and etc.  
- [x] Include at least one has_many relationship in information rendered via JSON and appended to the DOM.
        When I click the View Details button of a transaction, it reveals any comments that the transaction may include.
- [x] Use your Rails API and a form to create a resource and render the response without a page refresh.
        When clicking 'Comment' after clicking 'View Details', the user is taken to the dealing's show page where they can comment on the dealing.  Posting sends an AJAX post request to the Dealing Controller's post action, and appends the response to the DOM.  
- [x] Translate JSON responses into js model objects.
        All JSON responses get converted into JS model objects, where Handlebars gets implemented.

- [x] At least one of the js model objects must have at least one method added by your code to the  prototype.
        When posting a comment, the JSON response gets turned into a new instance of a Comment class, where the response then gets put into the Handlebars Template['new_comment'] by the prototype method template().  

Confirm
- [x] You have a large number of small Git commits
        I've made 150 commits so far.
- [x] Your commit messages are meaningful
        They all say things that are useful for me to peek back at in case I break my code.
- [x] You made the changes in a commit that relate to the commit message
        commit message just states the changes
- [x] You don't include changes in a commit that aren't related to the commit message
        no, I don't do that.
