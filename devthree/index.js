const express = require('express');
const app = express();

const path = require('path')
const mongoose = require('mongoose');

app.set("view engine","ejs")
app.use(express.json());
app.use(express.urlencoded({extended : true}))

app.get("/", (req,res) => {
    res.render("index")

})
app.get("/user", (req,res) => {
    res.render("read")

})
app.get("/read", (req,res) => {
    res.render("read")

})

app.listen(3000)