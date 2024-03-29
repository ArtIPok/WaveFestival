const express = require('express');
const cors = require('cors');
const path = require('path');
const socket = require('socket.io');
const mongoose = require('mongoose');
const helmet = require('helmet');


const app = express();

app.use(helmet());

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running...');
});

// connects with the database
// mongoose.connect('mongodb://localhost:27017/NewWaveDB', { useNewUrlParser: true });
mongoose.connect('mongodb+srv://ArtI:Kodilla2021@cluster0.8isjm.mongodb.net/NewWaveDB?retryWrites=true&w=majority', { useNewUrlParser: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database on the Atlas');
});
db.on('error', err => console.log('Error', + err));

const io = socket(server);

io.on('connection', (socket) => {
  console.log('New socket!');
});


app.use((req, res, next) => {
  req.io = io;
  next();
});

const testimonialsRoutes = require('./routes/testimonials.route');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');


//middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).send('message: Not found ...');
});

module.exports = server;