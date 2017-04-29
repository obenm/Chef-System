var mongoose = require('mongoose');
var productsModel = mongoose.model('products');

exports.findAllProducts = function(req, res) {
  productsModel.find(function(err, productResult) {
    if(err)
      res.send(500, err.message);
    res.status(200).jsonp(productResult);
  });
};

exports.findProductById = function(req, res) {
  productsModel.findById(req.params.id, function(err, productResult) {
    if(err)
      return res.send(500, err.message);
    res.status(200).jsonp(productResult);
  });
};

exports.findProductByType = function(req, res) {
  productsModel.find({'type': req.params.type}, function(err, productResult) {
    if(err)
      return res.send(500, err.message);
    res.status(200).jsonp(productResult);
  });
};

exports.addProduct = function(req, res) {
  var productItem = new productsModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      image: req.body.image,
      type: req.body.type,
  });
  productsModel.save(function(err, productItem) {
      if(err)
        return res.status(500).send(err.message);
      res.status(200).jsonp(productItem);
  });
};

exports.updateProduct = function(req, res) {
  productsModel.findById(req.params.id, function(err, productResult) {
    name: req.body.name;
    description: req.body.description;
    price: req.body.price;
    image: req.body.image;
    type: req.body.type;
    productsModel.save(function(err) {
        if(err)
          return res.status(500).send(err.message);
        res.status(200).jsonp(productResult);
    });
  });
};

exports.deleteProduct = function(req, res) {
  productsModel.findById(req.params.id, function(err, productResult) {
      productsModel.remove(function(err) {
          if(err)
            return res.status(500).send(err.message);
          res.status(200).send();
      })
  });
};
