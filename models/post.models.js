const mongoose = require("mongoose");

let postschema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  date : {
    type : Date,
    default : Date.now

  },
  title : String,
  content : String,
  likes:[
    {type : mongoose.Schema.Types.ObjectId,ref : "user"
     }
  ]
});

module.exports = mongoose.model("Post", postschema);
