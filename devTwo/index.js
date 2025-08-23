const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

app.set("view engine","ejs");
app.set(path.join("views","..","views"))
app.use(express.json());
app.use(express.urlencoded({extended : true}));



app.get("/",function(req,res){
    fs.readdir(path.join(__dirname,"files"), function (err,files){
        if (err) {
          console.log("unable to find dir : ",err);  
        }else{
            res.render("index" ,{files: files});
          
        }
        
        
    })




})

app.listen(3000)