const { text } = require('express');
const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  author: { type: String, required: true },
  text: { type: String, required: true },
});