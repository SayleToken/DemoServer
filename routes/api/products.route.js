
var express = require('express')

var router = express.Router()

// Getting the product Controller that we just created

var productController = require('../../controllers/product.controller');


// Map each API to the Controller FUnctions

router.get('/', productController.getproducts)

router.post('/', productController.createproduct)

router.put('/', productController.updateproduct)

router.delete('/:id',productController.removeproduct)


// Export the Router

module.exports = router;
