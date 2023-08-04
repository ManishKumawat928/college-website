const mongoose = require('mongoose');

// Collaction
const collageSchema1 = new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:String,
        required:true,
        unique:true
    },
    subject:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    }
});

const Register1 = new mongoose.model("Register1",collageSchema1);
module.exports = Register1;