function Transaction(data) {
  this.data = data;
}

Transaction.prototype.createTransactionPanels = function() {
  return HandlebarsTemplates['transactions_list']({
    transactions: this.data
  });
}

Transaction.prototype.createDetailedTransactionPanel = function() {
  // debugger;
  return HandlebarsTemplates['detailed_transaction']({
    transaction: this.data
  });
}

Transaction.prototype.revertToSimpleTransactionPanel = function() {
  return HandlebarsTemplates['single_transaction']({
    transaction: this.data
  });
}
