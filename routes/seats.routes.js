const randomID = require('@arturp/random-id-generator');
const express = require('express');
const { seats } = require('./../db');
const router = express.Router();
const db = require('./../db');

router.route('/seats').get((req, res) => {
  res.json(db.seats);
});

router.route('/seats/random').get((req, res) => {
  const randomIndex = Math.floor(Math.random() * (db.seats.length - 1));

  res.json(db.seats[randomIndex]);
});

router.route('/seats/:id').get((req, res) => {
  const result = db.seats.find(seats => seats.id === req.params.id);

  if(result) {
    res.json(result);
  } else {
    res.json({ error: 'element not found' });
  }
});

router.route('/seats').post((req, res) => {
  const { day, seat, client, email } = req.body;

  if(day && seat && client && email) {
    db.seats.push({
      id: randomID(16),
      day,
      seat,
      client,
      email,
    });
    res.send({ message: ' OK' });
  } else {
    res.send({ message: 'some data missing' });
  }
});

router.route('/seats/:id').put((req, res) => {
  const result = db.seats.find(seats => seats.id === req.params.id);

  if(result){
    const { day, seat, client, email } = req.body;

    if(id && day && seat && client && email){
      const indexOfResult = db.seats.indexOf(result);

      db.seats[indexOfResult] = {
        id: req.params.id,
        day,
        seat,
        client,
        email,
      }
      res.send({ message: 'OK' })
    } else {
      res.send({ message: 'something wrong' });
    }
  };
});

router.route('/seats/:id').delete((req, res) => {
  const result = db.seats.find(seats => seats.id === req.params.id);

  if(result) {
    const indexOfResult = db.seats.indexOf(result);

    db.seats.splice(indexOfResult, 1);
    res.send({ message: 'OK, delete' });
  } else {
    res.send({ message: 'something wrong' });
  }
});

module.exports = router;