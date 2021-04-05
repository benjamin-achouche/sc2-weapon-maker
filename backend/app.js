const fs = require('fs');
const path = require('path');

const express = require('express');
const mongoose = require('mongoose');

const app = express();

const usersRoutes = require('./routes/users-routes');
const weaponsRoutes = require('./routes/weapons-routes');
const HttpError = require('./models/http-error');

app.use(express.json());

app.use('/uploads/images', express.static(path.join('uploads', 'images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
});

app.use('/api/users', usersRoutes);

app.use('/api/weapons', weaponsRoutes);

app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  return next(error);
});

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => console.log(err));
  }
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred !' });
});

mongoose
  .connect(
    'mongodb+srv://<username>:<password>@cluster0.uz1ik.mongodb.net/<dbname>?retryWrites=true&w=majority'
  )
  .then(() => app.listen(5000))
  .catch((err) => console.log(err));
