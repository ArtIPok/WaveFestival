const Seat = require('../models/seat.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Seat.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Seat.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const seat = await Seat.findOne().skip(rand);

    if(!seat) res.status(404).json({ message: 'Not found...' });
    else res.json(seat);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};
exports.getId = async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id);

    if(!seat) res.status(404).json({ message: 'Not found...' });
    else res.json(seat);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.post = async (req, res) => {
  try {
    const { day, seat, client, email } = req.body;
    const newseat = new seat({ day: day, seat: seat, client: client, email: email });

    await newSeat.save();
    res.send({ message: 'OK' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.put = async (req, res) => {
  try {
    const { day, seat, client, email } = req.body;
    const seatId = await Seat.findById(req.params.id);

    if(seatId) {
      await Seat.updataOne({ _id: req.params.id }, { $set: { day: day, seat: seat, client: client, email: email }});
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
    const seat = await Seat.findById(req.params.id);

    if(seat) {
      await Seat.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    }
    else res.sstatus(404).json({ message: 'Not found' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};