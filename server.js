const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db');

const app = express();

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running...');
});

const testimonialsRoutes = require('./routes/testimonials.route');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');


//middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use('/', testimonialsRoutes);
app.use('/', concertsRoutes);
app.use('/', seatsRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).send('message: Not found ...');
});
