// Accessing the Service that we just created

var UserService = require('../services/users.service')

// Saving the context of this module inside the _the variable

_this = this


// Async Controller function to get the To do List

exports.getUsers = async function(req, res, next){

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10; 

    try{
    
        var Users = await UserService.getUsers({}, page, limit)
        
        // Return the Users list with the appropriate HTTP Status Code and Message.
        
        return res.status(200).json({status: 200, data: Users, message: "Succesfully Users Recieved"});
        
    }catch(e){
        
        //Return an Error Response Message with Code and the Error Message.
        
        return res.status(400).json({status: 400, message: e.message});
        
    }
}

exports.createUser = async function(req, res, next){

    // Req.Body contains the form submit values.

    var User = {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email
    }

    try{
        
        // Calling the Service function with the new object from the Request Body
    
        var createdUser = await UserService.createUser(User)
        return res.status(201).json({status: 201, data: createdUser, message: "Succesfully Created User"})
    }catch(e){
        
        //Return an Error Response Message with Code and the Error Message.
        
        return res.status(400).json({status: 400, message: "User Creation was Unsuccesfull"})
    }
}

exports.updateUser = async function(req, res, next){

    // Id is necessary for the update

    if(!req.body.id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body.id;

    console.log(req.body)

    var User = {
        id,
        name: req.body.name ? req.body.name : null,
        phone: req.body.phone ? req.body.phone : null,
        email: req.body.email ? req.body.email : null,
    }

    try{
        var updatedUser = await UserService.updateUser(User)
        return res.status(200).json({status: 200, data: updatedUser, message: "Succesfully Updated Tod"})
    }catch(e){
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeUser = async function(req, res, next){

    var id = req.params.id;

    try{
        var deleted = await UserService.deleteUser(id)
        return res.status(204).json({status:204, message: "Succesfully User Deleted"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }

}