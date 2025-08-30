const mongoose = require('mongoose')


main().then(() => {
    console.log("Connection Established");
    
}).catch(err => {
    console.log("Unable to connect DB",err.message);
    
})

async function main() {

   await mongoose.connect(`mongodb://127.0.0.1:27017/UserDB`)
    
}


const userSchema = new mongoose.Schema({
    name: {
        type : String,
        required : true,

    },
    email: {
        type : String,
        required : true,
        unique: true
        
    },
    url: {
        type : String,
        required : true, 
    }

})

const User = mongoose.model("User", userSchema);

module.exports =  User;