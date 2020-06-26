const express = require('express');
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const cors = require("cors");
const https = require('https');

dotenv.config();
console.log("dotenv", dotenv);

const { resolve, join } = require('path');
const passport = require('passport');

const routes = require('./routes');
const app = express();
var multer = require('multer');
var upload = multer();

app.listen(5000, () => console.log('Example app listening on port 3000!'))

// Bodyparser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(upload.array()); 
app.use(express.static('public'));
app.use(cors());
app.use(passport.initialize());
require('./services/jwtStrategy');
require('./services/localStrategy');

const isProduction = process.env.NODE_ENV === 'production';

// DB Config
const dbConnection = isProduction ? process.env.MONGO_URI_PROD : process.env.MONGO_URI_DEV;

// Connect to Mongo
mongoose
  .connect(dbConnection, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('MongoDB Connected...');
  })
  .catch((err) => console.log(err));

// Use Routes
app.use('/', routes);
app.use('/public', express.static(join(__dirname, '../public')));


module.exports = app;
