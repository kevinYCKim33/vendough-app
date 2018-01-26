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

function displayDoubleDigit(number){
    if (number < 10) {
        return '0' + number.toString();
    }else{
        return number.toString();
    }
}

function toStandardTime(militaryTime) {
  let hour = Number(militaryTime.slice(0,2)); // 12
  let minute = militaryTime.slice(3); // '51'
  let extension = 'AM';

  if (hour > 12) {
    hour -= 12;
    extension = 'PM';
  } else if (hour === 0) {
    hour = 12;
  }
  let standardTime = displayDoubleDigit(hour) + ':' + minute + ' ' + extension;
  return standardTime;
}

Handlebars.registerHelper('exact_date', function() {
  const exactDate = this.created_at;
  const date = new Date(exactDate).toString().split(" ");
  const monthDayYear = date.slice(1,3).join(" ") + ", " + date[3];
  const time = date[4].split(":").slice(0,2).join(":");
  const detailedTime = monthDayYear + " " + toStandardTime(time);
  return new Handlebars.SafeString(detailedTime);
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
