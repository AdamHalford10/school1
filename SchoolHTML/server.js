const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const port = 3000;

app.use(bodyParser.json());

const databaseFile = "names.json";
let namesData = [];

// Load names from the JSON file on startup
fs.readFile(databaseFile, "utf8", (err, data) => {
  if (!err && data) {
    namesData = JSON.parse(data);
  }
});

app.get("/api/names", (req, res) => {
  res.json({ success: true, names: namesData });
});

app.post("/api/names", (req, res) => {
  const name = req.body.name;
  if (!name || name.trim() === "") {
    res.json({ success: false, message: "Name cannot be empty." });
  } else {
    namesData.push(name);
    fs.writeFile(databaseFile, JSON.stringify(namesData), (err) => {
      if (err) {
        res.json({ success: false, message: "Failed to save the name." });
      } else {
        res.json({ success: true });
      }
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
