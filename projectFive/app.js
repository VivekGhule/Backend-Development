const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Usermodel = require("../models/user.models.js");
const postmodel = require("../models/post.models.js");
const cookieParser = require("cookie-parser");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
main()
  .then(() => {
    console.log(`Connection Established To DB at :`);
  })
  .catch((err) => {
    console.log(err.message);
  });

async function main() {
  await mongoose.connect(`mongodb://127.0.0.1:27017/ProjectBlog`);
}

app.get("/", function (req, res) {
  res.render("index");
});
app.get("/home", isLoggedIn, async function (req, res) {
  let fetchuser = await Usermodel.findOne({ email: req.user.email });
  let fetchposts = await postmodel.find({ user: fetchuser._id });
  res.render("home", { fetchuser, fetchposts });
});
app.get("/like/:id", isLoggedIn, async function (req, res) {

  let fetchposts = await postmodel.findOne({ _id: req.params.id}).populate("user");
  if (fetchposts.likes.indexOf(req.user_id) === -1) {
    
    fetchposts.likes.push(req.user._id);
      await fetchposts.save();
  }else{
    fetchposts.likes.splice(fetchposts.likes.indexOf(req.user._id),1)
  }
  res.redirect("/home");
});

app.get("/logout", function (req, res) {
  res.cookie("token", "");
  res.redirect("login");
});
app.get("/login", function (req, res) {
  res.render("login");
});
app.post("/checkuser", async function (req, res) {
  let { email, password } = req.body;
  let fetchUserDet = await Usermodel.findOne({ email });
  if (!fetchUserDet) return res.status(500).send("Somthing went wrong");

  await bcrypt.compare(password, fetchUserDet.password, (err, result) => {
    if (result) {
      let token = jwt.sign(
        { _id: fetchUserDet._id, email: fetchUserDet.email },
        "shh"
      );
      res.cookie("token", token);
      res.redirect("/home");
    } else {
      res.send("Wrong PAsss");
    }
  });
});
app.get("/registration", function (req, res) {
  res.render("registration");
});
app.post("/user", async function (req, res) {
  let { name, username, age, email, password } = req.body;
  let checkuser = await Usermodel.findOne({ email });
  if (checkuser) return res.status(500).send("User already registered");

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      let user = await Usermodel.create({
        name,
        username,
        age,
        email,
        password: hash,
      });
      let token = jwt.sign({ _id: user._id, email: user.email }, "shh");
      res.cookie("token", token);
      res.redirect("home");
    });
  });
});

//** Blog */

app.post("/createblog", isLoggedIn, async function (req, res) {
  let fetchuser = await Usermodel.findOne({ email: req.user.email });
  let { title, body } = req.body;
  let post = await postmodel.create({
    user: fetchuser._id,
    title: title,
    content: body,
  });

  fetchuser.posts.push(post._id);
  await fetchuser.save();
  res.redirect("/home");
});

app.get("/edit/:postid", async function (req, res) {
  let post_id = req.params.postid;
  let post = await postmodel.findById(post_id);
  console.log(post);

  res.render("editpost", { post });
});
app.post("/edit/:postid", async function (req, res) {
  let { title, body } = req.body;

  let post_id = req.params.postid;
  let post = await postmodel.findByIdAndUpdate(
    { _id: post_id },
    {
      title,
      content: body,
    }
  );
  res.redirect("/home");
});
app.get("/allpost", async function (req, res) {
  let allposts = await postmodel.find();
  res.render("globalPosts", { allposts });
});

function isLoggedIn(req, res, next) {
  if (req.cookies.token === "") return res.send("You need To login first");
  else {
    let data = jwt.verify(req.cookies.token, "shh");
    req.user = data;
  }
  next();
}

app.listen(8080);
