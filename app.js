const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

mongoose.set("strictQuery",true);
  
mongoose.connect("mongodb://0.0.0.0:27017/ttchannel", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(()=>{
    console.log("connected");
}).catch((e)=>{
    console.log("not connected");
});
  
const contactSchema = new mongoose.Schema({
    fname : {
        type : String,
        required : true
        //we write required to make it mandetory for user to write his or her name
    },
    lname : {
        type : String,
        required : true
    },
    age : {
        type : Number,
        required : true
    },
    email :{
        type :String,
        required : true,
        unique : true
    },
    gender : {
        type : String,
        required : true
    },
    lang: {
        type:String,
        required : true
    }
  
});
  
const Contact = mongoose.model("Contact", contactSchema);
  
const app = express();
  
app.set("view engine", "ejs");
  
app.use(bodyParser.urlencoded({
    extended: true
}));
  
app.use(express.static(__dirname + '/public'));
  
app.get("/contact", function(req, res){
    res.render("contact");
});

// const reactContact = new Contact({
//     email: "divya",
//     query: "hello"
// })
// reactContact.save();
  
 app.post("/contact", function (req, res) {
     console.log(req.body.email);
   const contact = new Contact({
       fname: req.body.fname,
       lname: req.body.lname,
       age : req.body.age,

       email: req.body.email,
       gender : req.body.gender,
       lang : req.body.lang
   });
   contact.save(function (err) {
       if (err) {
           throw err;
       } else {
         res.render("contact");
       }
   });
 });
  
app.listen(300, function(){
    console.log("App is running on Port 3000");
});