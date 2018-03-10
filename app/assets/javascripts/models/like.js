function Like(data) {
  this.data = data;
}

Like.prototype.createNewLikes = function() {
  return HandlebarsTemplates['like_list']({
    likes: this.data
  });
}
