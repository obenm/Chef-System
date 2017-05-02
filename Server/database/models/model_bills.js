var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var billsSchema = new Schema({
  items: { type : Array , default : [] },
  subtotal: { type: Number },
  tips: { type: Number },
  totalPayment: { type: Number },
  date: { type: Date , default: Date.now },
  billIdentifier: { type: String },
  billStatus: { type: Boolean, default: true },
});

module.exports = mongoose.model('bills', billsSchema);
