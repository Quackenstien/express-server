// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require("fs");
const uuid = require("uuid");
// var notesData = require("db");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
// app.use(express.static("/styles.css"));
app.use(express.json());

// Routes
// =============================================================

//HTML Routes
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "notes.html"));
});

//Route
//==============================================================

app.get("/styles.css", function (req, res) {
  res.sendFile(path.join(__dirname, "styles.css"));
});

app.get("/index.js", function (req, res) {
  res.sendFile(path.join(__dirname, "index.js"));
});

//API Routes
//==============================================================
app.get("/api/notes", function (req, res) {
  res.json("/db.json");
});

app.post("/api/notes", function (req, res) {
  let newNote = {
    title: req.body.title,
    text: req.body.text,
  };

  newNote.id = uuid.v4;
  let fileContent = JSON.parse(fs.readFileSync("db.json"));

  fileContent.push(newNote);

  fs.writeFileSync("db.json", JSON.stringify(fileContent));
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
