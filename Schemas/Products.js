const mongoose = require('mongoose')


const ProductSchema = new mongoose.Schema({

    name:{

        type: String,
        required: true,
        unique : true
    },

    price:{
        type :Number,
        required : true,
       
    },

    discount:{
              type: Number,
              required : true,
              

    },
    description:{
        type : String,
        required : true
    },
    image: {

        type: String,
        required : true
    },
    category : {
        type: String,
        required : true
    
    },

    brand :{
        type: String,
        required : true

    }
    
})

const Products = mongoose.model("Products", ProductSchema)
module.exports = Products