var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var UserSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    date: Date,
})

UserSchema.plugin(mongoosePaginate)
const Users = mongoose.model('Users', UserSchema)

module.exports = Users;