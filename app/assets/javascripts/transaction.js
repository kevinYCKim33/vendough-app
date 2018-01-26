function Transaction(data) {
  this.data = data;
}

Transaction.prototype.globalTemplate = function() {
  const transactionsListHtml = HandlebarsTemplates['transactions_list']({
    transactions: this.data
  });
  return transactionsListHtml;
}
