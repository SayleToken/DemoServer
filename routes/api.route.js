var express = require('express')

var router = express.Router()
var users = require('./api/users.route')
var payments = require('./api/payments.route')
var products = require('./api/products.route')


router.use('/users', users);
router.use('/transactions', payments);
router.use('/products', products);


module.exports = router;