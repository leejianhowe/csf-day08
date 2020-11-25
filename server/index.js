const express = require("express");
const fetch = require("node-fetch");

const PORT = parseInt(process.argv[2]) || parseInt(process.env.PORT) || 3000;

const app = express();

app.get("/result/:genre/:query", (req, res) => {
  const genre = req.params.genre;
  const query = req.params.query;
  fetch(`https://api.jikan.moe/v3/search/${genre}?q=${query}`)
    .then((result) => result.json())
    .then((json) => {
      console.log("returned results", json);
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.status(200).type("application/json");
      res.json(json.results);
    })
    .catch((error) => {
      console.log('error',error);
      return res.status(404).type('application/json').json({})
    });
});

app.listen(PORT, () => {
  console.log(
    `App listening on ${PORT} at https://localhost:3000/ on ${new Date()}`
  );
});
