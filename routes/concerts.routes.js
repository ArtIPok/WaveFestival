const randomID = require('@arturp/random-id-generator');
const express = require('express');
const { concerts } = require('./../db');
const router = express.Router();
const db = require('./../db');

router.route('/concerts').get((req, res) => {
  res.json(db.concerts);
});

router.route('/concerts/random').get((req, res) => {
  const randomIndex = Math.floor(Math.random() * (db.concerts.length - 1));

  res.json(db.concerts[randomIndex]);
});

router.route('/concerts/:id').get((req, res) => {
  const result = db.concerts.find(concerts => concerts.id === req.params.id);
  
  if(result){
    res.json(result);
  } else {
    res.json({ error: 'element not found' });
  }
});

router.route('/concerts').post((req, res) => {
  const { performer, genre, price, day, image } = req.body;
  
  if(performer && genre && price && day && image){
    db.concerts.push({
      id: randomID(16),
      performer,
      genre,
      price,
      day,
      image,
    });
    res.send({ message: 'OK' });
  } else {
    res.send({ message: 'some data missing' });
  }
});

router.route('/concerts/:id').put((req, res) => {
  const result = db.concerts.find(concerts => concerts.id === req.params.id);

  if(result) {
    const { performer, genre, price, day, image } = req.body;

    if(performer && genre && price && day && image) {
      const indexOfResult = db.concerts.indexOf(result);

      db.concerts[indexOfResult] = {
        id: req.params.id,
        performer,
        genre,
        price,
        day,
        image,
      }
      res.send({ message: 'OK, changed' });
    } else {
      res.send({ message: 'some data missing' })
    }
  };
});

router.route('/concerts/:id').delete((req, res) => {
  const result = db.concerts.find(concerts => concerts.id === req.params.id);

  if(result) {
    const indexOfResult = db.concerts.indexOf(result);

    db.concerts.splice(indexOfResult, 1);
    res.send({ message: 'OK, deleted' })
  } else {
    res.send({ message: 'element not found' })
  }
});

module.exports = router;