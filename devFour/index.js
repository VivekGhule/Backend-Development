const express = require('express')
const app = express()


const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User =  require('../models/user.models.js');
const { render } = require('ejs');




app.set("view engine","ejs")
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.get("/", (req,res) => {
    res.render("index")
})
app.get("/login", (req,res) => {
    res.render("login")
})
app.post("/login", async(req,res) => {
    let user = await User.findOne({email: req.body.email});
    console.log(user);
    
    if(!user) res.send("Somthing Went Wrong!!")
    
    bcrypt.compare(req.body.password,user.password, (err,result) => {
        if(result){
       
            let token = jwt.sign({email : user.email} , "Shhhhh");
            res.cookie("Token",token)
            res.redirect("home")
        } else{
            res.send("Somthing Went Wrong")
        }
            

    })

    
})
app.get("/registration", (req,res) => {
    res.render("registration")
})
app.post("/user", (req,res) => {
   let {name,email,password} = req.body;
   bcrypt.genSalt(10,(err,salt) => {
        bcrypt.hash(password,salt,async (err,hash) => {
            let usercreated = await User.create({
                name,
                email,
                password : hash
            })
            let token = jwt.sign({email} , "Shhhhh");
            res.cookie("Token",token)
            res.redirect    ("/home")
        })

   })
})

app.get("/home", (req,res) => {
    res.render("home")
})
app.get("/logout", (req,res) => {
    res.cookie("Token","")
    res.redirect("/")
})

app.listen(3000)

