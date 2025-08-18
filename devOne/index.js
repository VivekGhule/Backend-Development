const express = require('express');
const app = express();
const path = require('path');
const db = require("./data.json")

app.set("view engine", "ejs")
app.set('views', path.join(__dirname, '..', 'views'));


app.get("/" ,function (req,res) {
    res.send("Hello Ji")

})

app.get("/:username", function (req, res) {
    let { username } = req.params;
    let data = db[username];

    if (!data) {
        return res.send("User not found");
    }

    res.render("index", { data });
});



app.listen(3000)