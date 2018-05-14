var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var ProductSchema = new mongoose.Schema({
    name: String,
    price: Number,
    supplier: String,
    date: Date,
})

ProductSchema.plugin(mongoosePaginate)
const Products = mongoose.model('Products', ProductSchema)

module.exports = Products ;