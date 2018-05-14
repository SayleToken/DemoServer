var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var PaymentSchema = new mongoose.Schema({
    customer: String,
    amount: Number,
    product: String,
    quantity: String,
    date: Date,
})

PaymentSchema.plugin(mongoosePaginate)
const Payments = mongoose.model('Payments', PaymentSchema)

module.exports = Payments ;