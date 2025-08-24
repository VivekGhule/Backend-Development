const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

app.set("view engine", "ejs");
app.set(path.join("views", "..", "views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  fs.readdir(path.join(__dirname, "files"), function (err, files) {
    if (err) {
      console.log("unable to find dir : ", err);
    } else {
      res.render("index", { files: files });
    }
  });
});

app.post("/create",function(req,res){
    fs.writeFile(path.join(__dirname,`files/${req.body.title.split(" ").join("")}.txt`),req.body.desc,function (err){
        if (err) {
            console.log("unable to read file data : ",err);   
        }
        res.redirect("/")

    })
    

})

app.get("/files/:filename", function(req,res){
  fs.readFile(path.join(__dirname,`/files/${req.params.filename}`),"utf-8",function(err,filedata){
    if (err) {
      console.log(err);
      
    }else{
      res.render("show",{filedata: filedata, filename:req.params.filename.replace(".txt"," ")})
    }

  })
})

app.get("/:filename",function(req,res){
    res.render("editFilename",{filename:req.params.filename,})

})

app.post("/edit",function(req,res){
  fs.rename(path.join(__dirname,"files",`${req.body.previous}`),path.join(__dirname,"files",`${req.body.newName}.txt`),function(err){
    res.redirect("/");
  
  })
  
})

app.listen(3000);
