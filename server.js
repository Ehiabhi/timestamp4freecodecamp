// server.js
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
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date_string", function (req, res) {
  const dateInput = req.params.date_string;
  if (dateInput === undefined) {
    res.redirect("/api");
  }
  if (/[-]{1,}/.test(dateInput) || /[.]{1,}/.test(dateInput)) {
    let result = new Date(dateInput);
    result = result.toUTCString();
    if (result == "Invalid Date") res.json({ error: result });
  }
  if (/^\d+$/.test(dateInput)) {
    res.json({
      unix: Number(dateInput),
      utc: new Date(Number(dateInput)).toUTCString(),
    });
  }
  let result = new Date(dateInput);
  let unix = result;
  result = result.toUTCString();
  res.json(
    result == "Invalid Date"
      ? { error: result }
      : {
          unix: Number(unix),
          utc: result,
        }
  );
});

app.get("/api", function (req, res) {
  let date = new Date();
  res.json({
    unix: Number(date),
    utc: date.toUTCString(),
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
