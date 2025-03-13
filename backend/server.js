const connect = require("./connect");
const express = require("express");
const cors = require("cors");
const posts = require("./postRoutes");

const app = express();
const PORT = 5000;

app.use(cors()); // This line mounts middleware, cors is the library that ahllows express to share resources throughout different domains without this connecting frontend would have issues
app.use(express.json()); // Tells express to parse requests with JSON
app.use(posts); // Mounts the middle ware, this is the router we created in postRoutes.js

app.listen(PORT, () => {
  // express will listen on port 3000, and needs a callback function to run
  connect.connectToServer(); // Connects to the database
  console.log(`Server is running on port ${PORT}`); // Logs a message to the console
});
