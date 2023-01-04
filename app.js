const express = require("express");
const cors = reqquire("cors");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const app = express();

require('dotenv').config();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(cors());



// Mongoose 
const mongo_password = process.env.MONGO_PASSWORD;
mongoose.connect('mongodb+srv://admin-filip:'+mongo_password+'@cluster0.kl1kndo.mongodb.net/propertyDB', {
  useNewUrlParser: true
});

const propertySchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
    
  },
  units:{
    type:[String],
    required:true,
    validate:{
      validator: v => {
        if (v==="undefined"){
          return false;
        }
        let allowed_values = ["kitchen", "bedroom", "bathroom", "living-room"];
        let flag=true;
        v.forEach(value=>{
          if (!allowed_values.includes(value)){
            flag=false;
          }
        })
        return flag
      },
      message:"Please add rooms from the list"
    }
  }
});

const Property = mongoose.model("Property", propertySchema);


//




// class Properties {
//   constructor(){
//     this.properties = {properties:[]};
//   }

//   newProperty(property){
    
//   }

//   getAllProperties(){
//     return(this.properties);
//   }

//   getProperty(name){

//   }

//   deleteProperty(name){
//     let updatedProperties = this.properties.filter(each => each.name !== name);
//     this.properties = updatedProperties;
//   }
// }




app.get("/properties", (req,res)=>{
  
  Property.find({}).sort({name:1}).exec(function(err,data){
    if (err){
      res.send(err)
    }
    else{
      console.log("data sent")
      res.json({
        properties:data
      });
    }
  })
})

app.post("/properties", (req,res)=>{
   const newProperty = new Property(req.body);
   
   newProperty.save(function(err){
    if (err){
      console.log(err);
      res.send(err.message);
    }
    else{
      console.log("new property added")
      res.send("Congratulations! Your property has been uploaded.")
    }
   })

})

app.delete("/properties", (req,res)=>{
  if (req.body.name===""){
    res.send("Please enter a property name.")
  }
  else{
    Property.findOneAndDelete({name:req.body.name}, function(err, value){
      if (err){
        res.send(err);
      }
      else{
        if (value===null){
          res.send("Property not found.")
        }
        else{
          res.send('Property successfully deleted!')
        }
      }
    })
  }
})

app.get("/properties/:bedrooms",(req,res)=>{
  const number_of_bedrooms = Number(req.params.bedrooms.slice(-1));
 
  Property.find({}, (err,docs)=>{
    let data=[];
    docs.forEach(element=>{
      if (count(element.units, "bedroom")===number_of_bedrooms){
        console.log(element)
        data.push(element)
      }
    })
    res.json(data)

  })
  function count(array, element){
    let count = 0;
    array.forEach(item => {
      if (item === element){
        count +=1;
      }
    })
    return(count)
  }
  
  

})


app.listen(5000, function() {
  console.log("Server started on port 5000");
});
