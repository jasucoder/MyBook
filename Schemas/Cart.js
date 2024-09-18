
const mongoose = require('mongoose')


const CartSchema = new mongoose.Schema({

    p_id:{

        type: String,
        required: true,
       
    },

    u_id:{
        type :String,
        required : true,
       
    },

    quantity:{
              type: Number,
              required : true,
              

    },
    time:{
        type : Number,
        required : true
    }
    
})

const Cart = mongoose.model("Cart", CartSchema)
module.exports = Cart

