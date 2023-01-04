# Apartment Rental Template API

For development reasons only

This is REST API about a Apartment Rental Template website. It has the following routes:

- GET/properties
  Returns a JSON object with all the avaliable properties. Each property has two elements. The name and an array with the rooms (bedroom, kitchen etc.).

- GET/properties/:bedrooms
  The :bedrooms parameter should be written in a format that ends with a number, for example /properties/bedrooms_2. The GET request returns all the apartments that have this specific number of bedrooms.
- POST/properties
  The post request's body should be a JSON object that has the following format:

  {
  name:"Achilles Apartement",
  units:["bedroom","bedroom","ktchen","bathroom","living-room"]
  }

  In this example, a new property is added which is names Achilles Apartment and has 2 bedrooms, 1 kitchen, 1 bathroom, 1 living-room.

- DELETE/properties
  The delete request's body should be a JSON object that has the following format:

  {
  name:"Achilles Apartement"
  }

  In this example, if there is a property in the database that has the name "Achilles Apartment", this property is going to be deleted.

## Tools used for this project

- Node.js, Express.js

- MongoDB, Mongoose

- Body Parser

## Deployment

The API is deployed with Cyclic.sh at https://gifted-fly-purse.cyclic.app/properties

#### Developed with love

#### Achilles
