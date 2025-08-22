const express = require('express');
const db = require('./data.json');
const path = require('path')


const app = express();

app.set("view engine" , "ejs");
app.set(path.join("views","..","views"));


app.get("/" , function (req,res) {
    res.send("Server is Start")

})
app.get("/:username" , function (req,res) {
    let {username}  = req.params;
    let data = db[username];
//    if (! data[username]) {
//     res.send("User Not Found")
    
//    }else{
     res.render("index",{ data,username})
//    }

    // res.render("index", {data})
})

app.listen(3000)