const express = require('express');
const datastore = require('nedb');

const app = express();
const PORT = 3000;
app.listen(PORT, () => console.log('listening on port ' + PORT));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded( { extended: true } ));

const trips = new datastore('trips.db');
trips.loadDatabase();
app.post('/leavetime', (request, response) => {
  const date = new Date();
  const hours = date.getHours();
  const mins = hours*60 + date.getMinutes();
  const secs = mins*60 + date.getSeconds();
  trips.insert({ start: date, startSecs: secs });
  response.send("<script>window.location.replace(\"/\");</script>");
});

app.post('/arrivetime', (request, response) => {
  trips.update({ _id: request.body.id }, { $set: { end: new Date() } }, {}, (err, numReplaced) => {
    if (err) {
      console.log(err);
      response.send("An error in querying the answer database has occurred");
    } else {
      response.send("<script>window.location.replace(\"/\");</script>");
    }
  });
});

app.post('/currentTrip', (request, response) => {
  trips.findOne({end: {$exists: false }}).sort({startSecs: 1}).exec((err, data) => {
    if (err) {
      console.log(err);
      response.send("An error in querying the answer database has occurred");
    } else {
      response.json(data);
    }
  });
});

app.get('/loadTrips', (request, response) => {
  trips.find({end: {$exists: true}}, (err, data) => {
    if (err) {
      console.log(err);
      response.send("An error in querying the answer database has occurred");
    } else {
      response.json(data);
    }
  });
});

function pad2(num) {
  if (num >= 10)
    return String(num);
  else
    return "0" + num
}
