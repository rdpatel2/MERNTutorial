const express = require("express");
const database = require("./connect");
const ObjectId = require("mongodb").ObjectId; // This is a function that allows us to create a new object id

let postRoutes = express.Router(); // Creates a router, after this think of 5 essential operations you need from a router

// 1 - Retrieve all
// http://localhost:3000/posts
postRoutes.route("/posts").get(async (req, res) => {
  // Req is what is being requested by the front end, repsonse is what the front end will get back
  let db = database.getDb(); // Retrieves the database
  let data = await db.collection("posts").find({}).toArray(); // Retrieves the collection "posts" and converts it to an array, waits for the promise to resolve "await"
  if (data.length > 0) {
    res.json(data); // Sends the data as a JSON response
  } else {
    throw new Error("Data not found"); // Without a catch block this will stop the execution of the server, should be changed in prod
  }
});
// 2 - Retrieve one
postRoutes.route("/posts/:id").get(async (req, res) => {
  // adding : in front of id makes it dynamic so whatever the user types in the url will be stored in req.params.id
  let db = database.getDb(); // Retrieves the database
  let data = await db
    .collection("posts")
    .findOne({ _id: new ObjectId(req.params.id) }); // Retrieves the one post with the id from the parameter
  if (Object.keys(data).length > 0) {
    res.json(data); // Sends the data as a JSON response
  } else {
    throw new Error("Data not found"); // Without a catch block this will stop the execution of the server, should be changed in prod
  }
});
// 3 - Create one
postRoutes.route("/posts").post(async (req, res) => {
  let db = database.getDb(); // Retrieves the database
  let mongoObject = {
    title: req.body.title,
    description: req.body.description,
    content: req.body.content,
    author: req.body.author,
    dateCreated: requrest.body.dateCreated,
  };
  let data = await db.collection("posts").insertOne(mongoObject); // Inserts the object into the collection
  response.json(data); // Sends the data as a JSON response
});
// 4 - Update one
postRoutes.route("/posts/:id").put(async (req, res) => {
  let db = database.getDb(); // Retrieves the database
  let mongoObject = {
    $set: {
      title: req.body.title,
      description: req.body.description,
      content: req.body.content,
      author: req.body.author,
      dateCreated: requrest.body.dateCreated,
    },
  };
  let data = await db
    .collection("posts")
    .updateOne({ _id: new ObjectId(req.params.id) }, mongoObject); // Inserts the object into the collection
  response.json(data); // Sends the data as a JSON response
});
// 5 - Delete one
postRoutes.route("/posts/:id").delete(async (req, res) => {
  let db = database.getDb(); // Retrieves the database
  let data = await db
    .collection("posts")
    .deleteOne({ _id: new ObjectId(req.params.id) }); // Inserts the object into the collection
  response.json(data); // Sends the data as a JSON response
});

module.exports = postRoutes; // Exports the router
