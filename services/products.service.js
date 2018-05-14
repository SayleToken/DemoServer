// Gettign the Newly created Mongoose Model we just created 
var product = require('../models/product.model')

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the To do List
exports.getproducts = async function(query, page, limit){

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    
    // Try Catch the awaited promise to handle the error 
    
    try {
        var list = await product.paginate(query, options)
        
        // Return the todod list that was retured by the mongoose promise
        return list;

    } catch (e) {

        // return a Error message describing the reason 
        throw Error('Error while Paginating Todos')
    }
}

exports.createproduct = async function(todo){
    
    // Creating a new Mongoose Object by using the new keyword
    var newItem = new product({
        name: todo.name,
        price: todo.price,
        supplier: todo.supplier,
        date: new Date(),
    })

    try{

        // Saving the Todo 
        var savedItem = await newItem.save()

        return savedItem;
    }catch(e){
      
        // return a Error message describing the reason     
        throw Error("Error while Creating Todo")
    }
}

exports.updateproduct = async function(todo){
    var id = todo.id

    try{
        //Find the old Todo Object by the Id
    
        var oldTodo = await product.findById(id);
    }catch(e){
        throw Error("Error occured while Finding the Todo")
    }

    // If no old Todo Object exists return false
    if(!oldTodo){
        return false;
    }

    console.log(oldTodo)

    //Edit the Todo Object
    oldTodo.name = todo.name
    oldTodo.supplier = todo.supplier
    oldTodo.price = todo.price


    console.log(oldTodo)

    try{
        var savedTodo = await oldTodo.save()
        return savedTodo;
    }catch(e){
        throw Error("And Error occured while updating the Todo");
    }
}

exports.deleteTodo = async function(id){
    
    // Delete the Todo
    try{
        var deleted = await product.remove({_id: id})
        if(deleted.result.n === 0){
            throw Error("Todo Could not be deleted")
        }
        return deleted
    }catch(e){
        throw Error("Error Occured while Deleting the Todo")
    }
}