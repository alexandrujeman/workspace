const express = require("express");
const app = express();
var OAuth = require("oauth");

const appId = "ayR0nS3e"; // Replace with your Yahpp App ID
const clientId = "dj0yJmk9WDhxWTJOeHpLZTExJmQ9WVdrOVlYbFNNRzVUTTJVbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PWUy"; // Replace with your Yahoo Client ID (Consumer Key)
const clientSecret = "b12ed33b76014249c967f620ce143c687ab33775"; // Replace with your Yahoo Client Secret (Consumer Secret)

var header = {
  "X-Yahoo-App-Id": appId
};

var request = new OAuth.OAuth(
  null,
  null,
  clientId,
  clientSecret,
  "1.0",
  null,
  "HMAC-SHA1",
  null,
  header
);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/weather/:city/:state", async (req, res) => {
  const city = req.params.city;
  const state = req.params.state;
  // Make request to Yahoo API
  request.get(
    `https://weather-ydn-yql.media.yahoo.com/forecastrss?location=${city},${state}&u=c&format=json`,
    null,
    null,
    function(err, data, result) {
      if (err) {
        console.log(err);
      } else {
        res.json(data);
      }
    }
  );
});

// Node connection
const hostname = "0.0.0.0";
const port = 5000;
app.listen(port, hostname, () => {
  console.log(`Listening on ${hostname} 
Waiting for connections on ${port} 
Weather server started.
Make request example http://127.0.0.1:5000/weather/San%20Francisco/CA`);
});
