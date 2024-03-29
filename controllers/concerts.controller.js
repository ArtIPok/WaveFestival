const Concert = require('../models/concert.model');
const Seat = require('../models/seat.model');

exports.getAll = async (req, res) => {
  try {
    const seats = await Seat.find();
    const concerts = await Concert.find();
    const mapConcerts = concerts.map(concert => {
      const takenSeats = seats.filter(seat => seat.day === concert.day);
      const freeSeats = 50 - takenSeats.length;
      return {
        ...concert.toObject(),
        tickets: freeSeats,
      }
    });
    res.json(await mapConcerts);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Concert.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const concert = await Concert.findOne().skip(rand);

    if(!concert) res.status(404).json({ message: 'Not found...' });
    else res.json(concert);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getId = async (req, res) => {
  try {
    const concert = await Concert.findById(req.params.id);

    if(!concert) res.status(404).json({ message: 'Not found...' });
    else res.json(concert);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.post = async (req, res) => {
  try {
    const { performer, genre, price, day, image } = req.body;
    const newConcert = new Concert({ performer: performer, genre: genre, price: price, day: day, image: image });

    await newConcert.save();
    res.send({ message: 'OK' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.put = async (req, res) => {
  try {
    const { performer, genre, price, day, image } = req.body;
    const concert = await Concert.findById(req.params.id);

    if(concert) {
      await Concert.updataOne({ _id: req.params.id }, { $set: { performer: performer, genre: genre, price: price, day: day, image: image }});
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err })
  }
};

exports.delete = async (req, res) => {
  try {
    const concert = await Concert.findById(req.params.id);

    if(concert) {
      await Concert.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    }
    else res.sstatus(404).json({ message: 'Not found' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};