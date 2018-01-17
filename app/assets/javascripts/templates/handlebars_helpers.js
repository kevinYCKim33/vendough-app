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
  if (this.sender.id === currentUserId || this.recipient.id === currentUserId) {
    if (this.sender.id === currentUserId && this.action === "request" || this.recipient.id === currentUserId && this.action === "pay") {
      return new Handlebars.SafeString("+ $" + Number(this.amount).toFixed(2))
    } else {
      return new Handlebars.SafeString("- $" + Number(this.amount).toFixed(2))
    }
  }
})

Handlebars.registerHelper('green_or_red', function() {
  let currentUserId = parseInt($('body').attr('data-userid'));
  if (this.sender.id === currentUserId || this.recipient.id === currentUserId) {
    if (this.sender.id === currentUserId && this.action === "request" || this.recipient.id === currentUserId && this.action == "pay") {
      return new Handlebars.SafeString("green")
    } else {
      return new Handlebars.SafeString("red")
    }
  }
})
