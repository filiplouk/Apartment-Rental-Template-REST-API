const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const errorHandler = require("./middleware/errorHandler");
const app = express();

require("dotenv").config();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(cors());

// Mongoose
const mongo_password = process.env.MONGO_PASSWORD;
mongoose.connect(
  "mongodb+srv://admin-filip:" +
    mongo_password +
    "@cluster0.kl1kndo.mongodb.net/propertyDB",
  {
    useNewUrlParser: true,
  }
);

const propertySchema = new mongoose.Schema({
  name: {
    type: String,
    required: { value: true, message: "Please add property name" },
  },
  units: {
    type: [String],
    required: true,
    enum: {
      values: ["kitchen", "bedroom", "bathroom", "living-room"],
      message: "Please add rooms from the list",
    },
  },
});

const Property = mongoose.model("Property", propertySchema);

app.get("/properties", async (req, res, next) => {
  try {
    let count = req.query.count;
    let cursor = await Property.find({})
      .sort({ name: 1 })
      .skip(count)
      .limit(5)
      .cursor();
    let data = [];
    let doc = await cursor.next();
    while (doc) {
      data.push(doc);
      doc = await cursor.next();
    }
    res.status(200).json({ properties: data });
  } catch (err) {
    next(err);
  }
});

app.post("/properties", async (req, res, next) => {
  try {
    const newProperty = new Property(req.body);
    if (newProperty.units.length === 0) {
      return res.send("Please add rooms.");
    }
    await newProperty.save();
    console.log("new property added");
    res.status(200).send("Congratulations! Your property has been uploaded.");
  } catch (err) {
    return next(err);
  }
});

app.delete("/properties", async (req, res, next) => {
  try {
    if (req.body.name === "") {
      return res.send("Please enter a property name.");
    }
    const value = await Property.findOneAndDelete({ name: req.body.name });
    if (value === null) {
      return res.send("Property not found.");
    }
    res.status(200).send("Property successfully deleted!");
  } catch (err) {
    return next(err);
  }
});

app.get("/properties/:bedrooms", async (req, res, next) => {
  try {
    const number_of_bedrooms = Number(req.params.bedrooms.slice(-1));
    const docs = await Property.find({});
    let data = [];
    docs.forEach((element) => {
      if (count(element.units, "bedroom") === number_of_bedrooms) {
        console.log(element);
        data.push(element);
      }
    });
    res.status(200).json(data);
  } catch (err) {
    return next(err);
  }

  function count(array, element) {
    let count = 0;
    array.forEach((item) => {
      if (item === element) {
        count += 1;
      }
    });
    return count;
  }
});

app.use(errorHandler);

app.listen(5000, function () {
  console.log("Server started on port 5000");
});
