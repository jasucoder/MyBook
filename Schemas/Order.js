

const mongoose = require('mongoose')

 const OrdersSchema = new mongoose.Schema({
    u_id :{
        type : String,
        required : true,
    },
    ord_id:{
        type : String,
        required : true,
    },
    o_data: {
        type : Array,
        required : true,
    },
   time:{
        type : Number,
        required : true
    },
    status :{

        type : Number, 
        default : 0, 
        // 0 == Pending , 1 => Dispatched , 2=> Delivered 
        required : true
    },
    total : {
        type : Number, 
        required : true
    }
 })

 const Order= mongoose.model("Orders" ,  OrdersSchema)

 module.exports = Order

 