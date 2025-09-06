const mongoose = require('mongoose');

let userschema = new mongoose.Schema({
    name : {
        type : String,
        required: true,
    },
    username : {
        type : String,
        required: true,
        unique:true,
    },
    age : {
        type : String,
        required: true,
        
    },
    email : {
        type : String,
        required: true,
        unique:true,
    },
    password : {
        type : String,
        required: true,
    },
    posts :[
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "post"
        }
    ]

})

module.exports = mongoose.model("User",userschema)