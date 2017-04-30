var mongoose = require('mongoose');
var ordersModel = mongoose.model('orders');

exports.findAllOrders = function(req, res) {
  ordersModel.find(function(err, ordersResult) {
    if(err)
      res.send(500, err.message);
    res.status(200).jsonp(ordersResult);
  });
};

exports.find20Orders = function(req, res) {
  ordersModel.find(function(err, ordersResult) {
    if(err)
      res.send(500, err.message);
    res.status(200).jsonp(ordersResult);
  }).limit(20).sort({'date': -1});
};

exports.findOrdersNoAdded = function(req, res) {
  productsModel.find({'wasAddedFlag': false}, function(err, productResult) {
    if(err)
      return res.send(500, err.message);
    res.status(200).jsonp(productResult);
  });
};

exports.findOrderByIdentifier = function(req, res) {
  ordersModel.find({'billIdentifier': req.params.billIdentifier}, function(err, ordersResult) {
    if(err)
      return res.send(500, err.message);
    res.status(200).jsonp(ordersResult);
  });
};

exports.findOrderById = function(req, res) {
  ordersModel.findById(req.params.id, function(err, ordersResult) {
    if(err)
      return res.send(500, err.message);
    res.status(200).jsonp(ordersResult);
  });
};

exports.addOrder = function(req, res) {
  ordersModel.create({
      name : req.body.name,
      description : req.body.descriptionToChef,
      price : req.body.price,
      image : req.body.image,
      billIdentifier : req.params.billIdentifier,
      productIdentifier : req.params.productIdentifier,
  }, function(err, orderResult) {
      if (err)
          return res.send(500, err.message);
      res.status(200).jsonp(orderResult);
  });
};

exports.updateOrder = function(req, res) {
  ordersModel.findById(req.params.id, function(err, orderResult) {
    name: req.body.name;
    description: req.body.descriptionToChef;
    price: req.body.price;
    image: req.body.image;
    billIdentifier: req.body.billIdentifier;
    ordersModel.save(function(err) {
        if(err)
          return res.status(500).send(err.message);
        res.status(200).jsonp(orderResult);
    });
  });
};

exports.deleteOrder = function(req, res) {
  ordersModel.findById(req.params.id, function(err, orderResult) {
    ordersModel.remove(function(err) {
      if(err)
        return res.status(500).send(err.message);
      res.status(200).send();
    })
  });
};
