function Contact(data) {
  this.data = data;
}

Contact.prototype.createContactsPanels = function() {
  return HandlebarsTemplates['contacts_list']({
    contacts: this.data
  });
}
