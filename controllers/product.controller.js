// Accessing the Service that we just created

var productService = require('../services/products.service')

// Saving the context of this module inside the _the variable

_this = this


// Async Controller function to get the To do List

exports.getproducts = async function(req, res, next){

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10; 

    try{
    
        var products = await productService.getproducts({}, page, limit)
        
        // Return the products list with the appropriate HTTP Status Code and Message.
        
        return res.status(200).json({status: 200, data: products, message: "Succesfully products Recieved"});
        
    }catch(e){
        
        //Return an Error Response Message with Code and the Error Message.
        
        return res.status(400).json({status: 400, message: e.message});
        
    }
}

exports.createproduct = async function(req, res, next){

    // Req.Body contains the form submit values.

    var product = {
        name: req.body.name,
        price: req.body.price,
        supplier: req.body.supplier
    }

    try{
        
        // Calling the Service function with the new object from the Request Body
    
        var createdproduct = await productService.createproduct(product)
        return res.status(201).json({status: 201, data: createdproduct, message: "Succesfully Created product"})
    }catch(e){
        
        //Return an Error Response Message with Code and the Error Message.
        
        return res.status(400).json({status: 400, message: "product Creation was Unsuccesfull"})
    }
}

exports.updateproduct = async function(req, res, next){

    // Id is necessary for the update

    if(!req.body.id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body.id;

    console.log(req.body)

    var product = {
        id,
        name: req.body.name ? req.body.name : null,
        price: req.body.price ? req.body.price : null,
        supplier: req.body.supplier ? req.body.supplier : null
    }

    try{
        var updatedproduct = await productService.updateproduct(product)
        return res.status(200).json({status: 200, data: updatedproduct, message: "Succesfully Updated Tod"})
    }catch(e){
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeproduct = async function(req, res, next){

    var id = req.params.id;

    try{
        var deleted = await productService.deleteproduct(id)
        return res.status(204).json({status:204, message: "Succesfully product Deleted"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }

}