var express = require("express"),
    app = express(),
    bodyParser  = require("body-parser"),
    methodOverride = require("method-override");
    mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

mongoose.connect('mongodb://localhost/Chef-System-Database');
require('./database/models/model_products');
require('./database/models/model_orders');
require('./database/models/model_bills');
//require('./database/populateDatabase');

app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});

var router = express.Router();

router.get('/', function(req, res) {
   res.send("Hello World!");
});

app.use(router);

var productsController = require('./database/controllers/controller_products');
var productsRoutes = express.Router();

productsRoutes.route('/products')
  .get(productsController.findAllProducts)
  .post(productsController.addProduct);

productsRoutes.route('/products/id=:id')
  .get(productsController.findProductById)
  .put(productsController.updateProduct)
  .delete(productsController.deleteProduct);

productsRoutes.route('/products/type=:type')
  .get(productsController.findProductByType);

app.use('/api', productsRoutes);

var ordersController = require('./database/controllers/controller_orders');
var orderRoutes = express.Router();

orderRoutes.route('/orders')
  .get(ordersController.findAllOrders);

orderRoutes.route('/orders/id=:id')
  .get(ordersController.findOrderById)
  .put(ordersController.updateOrder)
  .delete(ordersController.deleteOrder);

orderRoutes.route('/orders/last20')
  .get(ordersController.find20Orders);

orderRoutes.route('/orders/byNoAddedYet')
  .get(ordersController.findOrdersNoAdded);

orderRoutes.route('/orders/identifier=:billIdentifier')
  .get(ordersController.findOrderByIdentifier)
  .post(ordersController.addOrder);;

app.use('/api', orderRoutes);

var billsControllers = require('./database/controllers/controller_bills');
var billsRoutes = express.Router();

billsRoutes.route('/bills')
  .get(billsControllers.findAllBills)
  .post(billsControllers.addBill);

billsRoutes.route('/bills/id=:id')
  .get(billsControllers.findBillById)
  .delete(billsControllers.deleteBill);

billsRoutes.route('/bills/identifier=:billIdentifier')
  .get(billsControllers.findBillByIdentifier)
  .put(billsControllers.updateBill);

app.use('/api', billsRoutes);

app.listen(3000, function() {
  console.log("Node server running on http://localhost:3000");
});
