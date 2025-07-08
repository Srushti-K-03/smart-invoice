// server/models/Invoice.js
const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  price: Number,
  total: Number,
});

const InvoiceSchema = new mongoose.Schema({
  invoiceNumber: String,
  date: String,
  dueDate: String,
  sender: String,
  recipient: String,
  items: [ItemSchema],
  grandTotal: Number,
});

module.exports = mongoose.model('Invoice', InvoiceSchema);
