const mongoose = require('mongoose');


main().then(res => {
    console.log("Connection Established to db");
    
}).catch(err => console.log("Failed to connect to db : ",err.message))


async function main(){
    await mongoose.connect(`mongodb://127.0.0.1:27017/Authdb`)
}





const userSchma = new mongoose.Schema({
    name : {
        type: String,
        required : true,

    },
    email : {
        type: String,
        required : true,
        unique: true

    },
    password : {
        type: String,
        required : true,
    },

})

let User = mongoose.model("User", userSchma);

module .exports = User;