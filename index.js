// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
function validateDate(req, res, next) {
  if (new Date(req.params.date).toUTCString() === "Invalid Date") {
    req.params.date = new Date(+req.params.date);
  }

  if (new Date(req.params.date).toUTCString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }
  next();
}

// your first API endpoint...
app.get("/api/:date", validateDate, function (req, res) {
  const { date } = req.params;
  res.json({
    unix: new Date(date).getTime(),
    utc: new Date(date).toUTCString(),
  });
});

app.get("/api", (req, res) => {
  res.json({
    unix: new Date().getTime(),
    utc: new Date().toUTCString(),
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
