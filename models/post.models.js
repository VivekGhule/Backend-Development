const mongoose = require('mongoose');

let userschema = new mongoose.Schema({
    name : {
        type : String,
        required: true,
    },
    email : {
        type : String,
        required: true,
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

mongoose.exports = mongoose.model("user",userschema)