const Testimonials = require('../models/testimonial.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Testimonials.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Testimonials.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const testimonials = await Testimonials.findOne().skip(rand);

    if(!testimonials) res.status(404).json({ message: 'Not found...' });
    else res.json(testimonials);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getId = async (req, res) => {
  try {
    const testimonials = await Testimonials.findById(req.params.id);

    if(!testimonials) res.status(404).json({ message: 'Not found...' });
    else res.json(testimonials);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.post = async (req, res) => {
  try {
    const { author, text } = req.body;
    const newTestimonials = new Testimonials({ author: author, text: text });

    await newTestimonials.save();
    res.send({ message: 'OK' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.put = async (req, res) => {
  try {
    const { author, text } = req.body;
    const testimonials = await Testimonials.findById(req.params.id);

    if(testimonials) {
      await Testimonials.updataOne({ _id: req.params.id }, { $set: { author: author, text: text }});
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
    const testimonials = await Testimonials.findById(req.params.id);

    if(testimonials) {
      await Testimonials.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    }
    else res.sstatus(404).json({ message: 'Not found' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};