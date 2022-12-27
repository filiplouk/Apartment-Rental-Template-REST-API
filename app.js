const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const app = express();


app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

//


class Properties {
  constructor(){
    this.properties = [];
  }

  newProperty(property){
    this.properties.push(property)
  }

  getAllProperties(){
    return(this.properties);
  }

  deleteProperty(name){
    let updatedProperties = this.properties.filter(each => each.name !== name);
    this.properties = updatedProperties;
  }
}
app.get("/properties", (req,res){


})

app.post("/properties", (req,res)=>{

})

app.delete("/properties", (req,res){

})

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
