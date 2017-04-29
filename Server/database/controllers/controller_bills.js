var mongoose = require('mongoose');
var billsModel = mongoose.model('bills');

exports.findAllBills = function(req, res) {
  billsModel.find(function(err, billsResult) {
    if(err)
      res.send(500, err.message);
    res.status(200).jsonp(billsResult);
  });
};

exports.findBillById = function(req, res) {
  billsModel.findById(req.params.id, function(err, billsResult) {
    if(err)
      return res.send(500, err.message);
    res.status(200).jsonp(billsResult);
  });
};

exports.findBillByIdentifier = function(req, res) {
  billsModel.findOne({'billIdentifier': req.params.billIdentifier}, function(err, billsResult) {
    if(err)
      return res.send(500, err.message);
    res.status(200).jsonp(billsResult);
  });
};

exports.addBill = function(req, res) {
  billsModel.create({
    items: req.body.items,
    subtotal : req.body.subtotal,
    tips: req.body.tips,
    totalPayment: req.body.totalPayment,
    billIdentifier: req.body.billIdentifier,
  }, function(err, review) {
    if (err)
      res.send(err);
  });
};

exports.updateBill = function(req, res) {
  billsModel.findOne({'billIdentifier': req.params.billIdentifier}, function(err, billsResult) {
    items: req.body.items;
    subtotal: req.body.subtotal;
    tips: req.body.tips;
    totalPayment: req.body.totalPayment;
    billIdentifier: req.body.billIdentifier;
    billsResult.save(function(err) {
      if(err)
        return res.status(500).send(err.message);
      res.status(200).send();
    });
  });
};

exports.deleteBill = function(req, res) {
  billsModel.findById(req.params.id, function(err, billsResult) {
    billsModel.remove(function(err) {
      if(err)
        return res.status(500).send(err.message);
      res.status(200).send();
    });
  });
};
