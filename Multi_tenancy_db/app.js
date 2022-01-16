const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
// const _ = require('lodash');
const app = express();
const mongoose=require('mongoose');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"));
mongoose.connect('mongodb://localhost:27017/tenant_Male',{useNewUrlParser:true});
const db2=mongoose.createConnection('mongodb://localhost:27017/tenant_Female',{useNewUrlParser:true});

const db=mongoose.connection;

const Male_Schema ={
    name:String,
     age:Number,
     Phone_number:Number
 };
 const Feamle_Schema ={
     name:String,
     age:Number,
     Email_id:String
  };
  let personModel = db.model('Person', Male_Schema);
  var personModel2 = db2.model('Person', Feamle_Schema);
app.get("/",function(req,res){
    res.render("index");
});
app.get("/open_male_page",function(req,res)
{
    res.render("Male_form");
}
)
app.get("/open_female_page",function(req,res)
{
    res.render("Female_form");
}
)
app.post("/male",function(req,res){
    let name=req.body.name;
    let age=req.body.age;
    let Phone_number=req.body.Phone_number;
    console.log(name+" "+age+" "+Phone_number);


       
    
    let comment1 = new personModel({
        name: name,
        age: age,
        Phone_number:Phone_number
    });
    
    comment1.save(function (err, comment) {
        if (err) console.log(err);
        else console.log('fallowing comment was saved:', comment);
    });
    res.render("index");
});
app.post("/female",function(req,res){
    let name=req.body.name;
    let age=req.body.age;
    let Email_id=req.body.Email_id;
   
    var comment1 = new personModel2({
        name: name,
        age: age,
        Email_id:Email_id
    });
    
    comment1.save(function (err, comment) {
        if (err) console.log(err);
        else console.log('fallowing comment was saved:', comment);
    });
    res.render("index");

});


app.listen(3000, function() {
    console.log("Server started on port 3000");
  });
  