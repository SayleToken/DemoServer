
var express = require('express')

var router = express.Router()

// Getting the Payment Controller that we just created

var PaymentController = require('../../controllers/payment.controller');


// Map each API to the Controller FUnctions

router.get('/', PaymentController.getPayments)

router.post('/', PaymentController.createPayment)

router.put('/', PaymentController.updatePayment)

router.delete('/:id',PaymentController.removePayment)


// Export the Router

module.exports = router;
