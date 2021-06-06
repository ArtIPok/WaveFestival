const express = require('express');
const router = express.Router();
const db = require('./../db');
const randomId = require('@arturp/random-id-generator');
const { testimonials } = require('./../db');

router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials);
});

router.route('/testimonials/random').get((req, res) => {
  const randomIndex = Math.floor(Math.random() * (db.testimonials.length - 1));
  res.json(db.testimonials[randomIndex]);
});

router.route('/testimonials/:id').get((req, res) => {
  const result = db.testimonials.find(testimonials => testimonials.id === req.params.id);
  
  if(result){
    res.json(result);
  } else {
    res.json({ error: 'element not found' });
  }
});

router.route('/testimonials').post((req, res) => {
  const { id, author, text} = req.body;

  if(author && text){
    db.testimonials.push({
      id: randomId(16),
      author,
      text,
    });
    res.send({message: ' OK'});
  } else {
    res.json({ error: 'some data missing' });
  }
});

router.route('/testimonials/:id').put((req, res) => {
  const result = db.testimonials.find(testimonials => testimonials.id === req.params.id)
  
  if(result){
    const { author, text} = req.body;

    if(author && text && id) {
      const indexOfResult = db.testimonials.indexOf(result);

      db.testimonials[indexOfResult] = {
        id: req.params.id,
        author,
        text,
      };
    } else {
      res.json({ error: 'some data missing' });
    }
  res.send({message: 'OK'});
  }
});

router.route('/testimonials/:id').delete((req, res) => {
  const result = db.testimonials.find(testimonials => testimonials.id === req.params.id)
  
  if(result){
    const indexOfResult = db.testimonials.indexOf(result);

    db.testimonials.splice(indexOfResult, 1)
    res.send({message: 'OK, deleted'});
  } else {
    res.json({ error: 'element not found' });
  }
});

module.exports = router;