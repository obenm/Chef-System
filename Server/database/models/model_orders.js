var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var ordersSchema = new Schema({
  name: { type: String },
  description: { type: String },
  price: { type: Number },
  image: { type: String },
  date: {type: Date, default: Date.now},
  wasAddedFlag: {type: Boolean, default: false},
  billIdentifier: {type: String },
  productIdentifier: {type: String}
});

module.exports = mongoose.model('orders', ordersSchema);
