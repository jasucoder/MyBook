const mongoose = require('mongoose');


const OtpSchema = new mongoose.Schema({

    time:{

        type: String,
        required: true
    },

    email:{
        type :String,
        required : true,
        unique : true
    },

    otp:{
              type:String,
              required : true,
              unique : true

    }
    
})

const OTP = mongoose.model("otp", OtpSchema)
module.exports = OTP