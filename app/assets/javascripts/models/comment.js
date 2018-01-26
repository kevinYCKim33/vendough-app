function Comment(data) {
  this.data = data;
}

Comment.prototype.createNewComment = function() {
  return HandlebarsTemplates['new_comment']({
    comment: this.data
  });
}
