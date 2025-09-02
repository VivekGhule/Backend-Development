const express = require('express');
const app = express();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const mongoose = require('mongoose');


main().then(() => {
    console.log(`Connection Established To DB at :`);
    
}).catch(err => {
    console.log(err.message);
    
})

async function main() {
    await mongoose.connect(`mongodb://127.0.0.1:27017/ProjectBlog`)
    
}

const Usermodel = require("../models/user.models.js")
const postmodel = require("../models/post.models.js")

app.set("view engine","ejs");
app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.get("/",function (req,res) {
    res.render("index")
} )

app.get("/login", function (req,res) {
    res.render("login")

})
app.get("/registration", function (req,res) {
    res.render("registration")

})
app.post("/user", function (req,res) {
   let {name,username,age,email,password} = req.body;

   bcrypt.genSalt(10,(err,salt) => {
    bcrypt.hash(password,salt , async(err,hash) => {
       let user = await Usermodel.create({
        name,
        username,
        age,
        email,
        password: hash
       })

       let token = jwt.sign()
       

    })
    

   })

})

app.listen(8080)