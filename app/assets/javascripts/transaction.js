function Transaction(data) {
  this.data = data;
}

Transaction.prototype.createTransactionPanels = function() {
  return HandlebarsTemplates['transactions_list']({
    transactions: this.data
  });
}
