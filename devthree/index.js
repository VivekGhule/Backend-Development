const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user.models'); // Ensure this path is correct

const app = express();

// Middleware
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routes
app.get("/", (req, res) => {
    res.render("index"); // This should be a form to add users
});

// CREATE
app.post("/user", async (req, res) => {
    let { name, email, url } = req.body;
    await User.create({ name, email, url });
    res.redirect("/read");
});

// READ
app.get("/read", async (req, res) => {
    let users = await User.find();
    res.render("read", { users });
});

// UPDATE (Form Page)
app.get("/edit/:userId", async (req, res) => {
    let userId = req.params.userId;
    let user = await User.findById(userId);
    res.render("edit", { user });
});

// UPDATE (Form Submission)
app.post("/edit/:userId", async (req, res) => {
    let userId = req.params.userId;
    let { name, email, url } = req.body;
    await User.findByIdAndUpdate(userId, { name, email, url }, { new: true });
    res.redirect("/read"); // <-- previously was res.render("read") (wrong)
});

// DELETE
app.get("/delete/:userId", async (req, res) => {
    let userId = req.params.userId;
    await User.findByIdAndDelete(userId);
    res.redirect("/read");
});

// Start Server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
