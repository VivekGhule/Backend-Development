const mongoose = require('mongoose');

main().then( () => {
     console.log("Connection Sucessful")
    
}
)
.catch((err) => {
    console.log(err);
    
})
async function  main(params) {
    await mongoose.connect('mongodb://127.0.0.1:27017/test');
    
}

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age:Number
})

const User = mongoose.model("User",userSchema)

const user1 = new User({
    name: "Adam",
    email : "demo@gmail.com",
    age : 18
})




user1.save();


