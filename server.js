const express = require("express");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5500;

app.use(express.static("public"));

app.get("/search", (req, res) => {
  const apiKey = process.env.API_KEY;
  const cx = process.env.CX;
  const query = "how to center a div";

  const url = `https://www.googleapis.com/customsearch/v1?q=${query}&key=${apiKey}&cx=${cx}&searchType=image`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.error("Error fetching search results:", error);
      res.status(500).send("Error fetching search results");
    });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
