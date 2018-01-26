function Transaction(data) {
  this.data = data;
}

Transaction.prototype.createTransactionPanels = function(templateName) {
  return HandlebarsTemplates[templateName]({
    transactions: this.data
  });
}
