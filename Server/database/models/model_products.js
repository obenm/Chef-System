var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var productsSchema = new Schema({
  name: { type: String },
  description: { type: String },
  price: { type: Number },
  image: { type: String },
  type: {type: String }
});

module.exports = mongoose.model('products', productsSchema);
