const express = require('express');
const expressGraphQL = require('express-graphql');

const app = express();


app.use("/graphql", expressGraphQL({

}));


app.get("/", (req, res) => {
  res.json({"Manuel": "Hola"})
});


app.listen(4000, () => {
  console.log("GraphQL server listening on port 4000....");
})
