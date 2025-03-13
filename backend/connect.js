const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config({ path: "./config.env" });

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.ATLAS_URI, {
  // Connection string, store this in hidden folders if the file is going to be public
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let database; // Variable to allow quick access to our data base

module.exports = {
  // Like an export default in React
  connectToServer: () => {
    // A function we want to export
    database = client.db("blogData"); // Connects to the database named "blogData"
  },
  getDb: () => {
    // A function we want to export
    return database; // Returns the database
  },
};

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log(
//       "Pinged your deployment. You successfully connected to MongoDB!"
//     );
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);
