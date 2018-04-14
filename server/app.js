const express = require('express');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schema/schema');
const cors = require('cors');

const app = express();

// allow cross-origin-requests
app.use(cors());

// Mongo Connection
mongoose.connect("mongodb://zeshan:zeshan@ds151348.mlab.com:51348/gpl-books");
mongoose.connection.once('open', () => {
  console.log("Connection with database")
})

app.use("/graphql", expressGraphQL({
  schema,
  /* this is only for testing purposes
  if you dont provide the line(de abajo), it won't work
  because graphql is a tool where frond end apps make requests
  to this url */
  graphiql: true
}));


app.get("/", (req, res) => {
  res.json({"Manuel": "Hola"})
});


app.listen(4000, () => {
  console.log("GraphQL server listening on port 4000....");
})
