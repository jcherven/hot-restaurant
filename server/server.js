var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Star Wars Characters (DATA)
// =============================================================
var tables = [
  {
    name: "yoda",
    phoneNumber: "4076924517",
    id: 5
  },
  {
    name: "yoshi",
    phoneNumber: "4076395517",
    id: 3
  },
  {
    name: "pizza guy",
    phoneNumber: "4076392045",
    id: 1
  }
];
var waitList =  [
    {
        name: "plummer guy",
        phoneNumber: "4076392045"
      }
]

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/reservations", function(req, res) {
  res.sendFile(path.join(__dirname, "reservations.html"));
});

// Displays all characters
app.get("/tables-api", function(req, res) {
  return res.json(tables);
});

// Displays a single character, or returns false
app.get("/waitlist-api", function(req, res) {
  return res.json(waitlist);
});

// Create New Characters - takes in JSON input
app.post("/reservations", function(req, res) {
    if(tables.length<5){
        var newReservation = req.body;
        tables.push(newReservation)
    }
    else{
        var newWait = req.body;
        waitList.push(newWait);
    }
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});