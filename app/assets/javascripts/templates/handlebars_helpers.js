Handlebars.registerHelper('charged_or_paid', function() {
  if(this.action === "request") {
    return new Handlebars.SafeString("charged")
  } else {
    return new Handlebars.SafeString("paid")
  }
})

Handlebars.registerHelper('concise_date', function() {
  const conciseDate = this.updated_at;
  const monthDay = new Date(conciseDate).toString().split(" ").slice(1,3).join(" ");
  return new Handlebars.SafeString(monthDay)
})

Handlebars.registerHelper('show_amount', function() {
  let currentUserId = parseInt($('body').attr('data-userid'));
  if (this.sender_id === currentUserId || this.recipient_id === currentUserId) {
    if (this.sender_id == currentUserId && this.action == "request" || this.recipient_id == currentUserId && this.action == "pay") {
      return new Handlebars.SafeString("+ $" + Number(this.amount).toFixed(2))
    } else {
      return new Handlebars.SafeString("- $" + Number(this.amount).toFixed(2))
    }
  }
})
